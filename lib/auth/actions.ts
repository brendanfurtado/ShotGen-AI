/**
 * Authentication Server Actions
 * Handle sign in, sign out, and user management
 */

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(redirectTo?: string) {
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback${redirectTo ? `?redirectTo=${redirectTo}` : ""}`,
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Get the current user session
 */
export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error getting user:", error);
    return null;
  }

  return user;
}

/**
 * Get the current user profile from the database
 */
export async function getUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error getting user profile:", error);
    return null;
  }

  return profile;
}
