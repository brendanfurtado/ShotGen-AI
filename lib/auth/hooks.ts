/**
 * Authentication Hooks
 * Client-side hooks for auth state management
 */

"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/lib/types";

/**
 * Hook to get the current authenticated user
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

/**
 * Hook to get the current user's profile from the database
 */
export function useUserProfile() {
  const { user, loading: userLoading } = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Don't fetch if still loading user
    if (userLoading) return;

    // No user means no profile - but we handle this in the return value
    // rather than calling setState synchronously in the effect
    if (!user) return;

    let isMounted = true;
    const supabase = createClient();

    // Get user profile
    supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          console.error("Error fetching user profile:", error);
          setProfile(null);
        } else {
          setProfile(data);
        }
        setLoading(false);
      });

    // Listen for profile changes
    const channel = supabase
      .channel("user-profile")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          if (isMounted) {
            setProfile(payload.new as UserProfile);
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [user, userLoading]);

  // Derive the actual loading and profile states
  // If no user, we're not loading and profile is null
  const isLoading = userLoading || (user !== null && loading);
  const effectiveProfile = user ? profile : null;

  return { profile: effectiveProfile, loading: isLoading };
}
