/**
 * Supabase Admin Client
 * ONLY use this when you need to bypass RLS or perform admin operations
 *
 * ⚠️ WARNING: This client has FULL ACCESS to the database
 * - Never expose this to the client
 * - Only use in server-side code (Server Actions, API Routes)
 * - Use sparingly - prefer the regular server client when possible
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import type { SubscriptionStatus } from "@/lib/types";

/**
 * Create an admin Supabase client that bypasses RLS
 * Use this ONLY for operations that require elevated privileges
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

/**
 * Example: Update user subscription after Stripe webhook
 * This bypasses RLS because the Stripe webhook doesn't have a user session
 */
export async function updateUserSubscription(
  userId: string,
  subscriptionData: {
    tier: "free" | "premium";
    status: SubscriptionStatus;
    stripe_subscription_id: string;
    period_start: string;
    period_end: string;
  }
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      subscription_tier: subscriptionData.tier,
      subscription_status: subscriptionData.status,
      stripe_subscription_id: subscriptionData.stripe_subscription_id,
      subscription_period_start: subscriptionData.period_start,
      subscription_period_end: subscriptionData.period_end,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating subscription:", error);
    throw error;
  }

  return data;
}

/**
 * Example: Deduct credits and create transaction record
 * Requires admin access to update credits and create transaction atomically
 */
export async function deductCredits(
  userId: string,
  amount: number,
  shotId: string,
  description: string
) {
  const supabase = createAdminClient();

  // Get current user credits
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("credits_remaining")
    .eq("id", userId)
    .single();

  if (userError) throw userError;
  if (!user) throw new Error("User not found");
  if (user.credits_remaining < amount) {
    throw new Error("Insufficient credits");
  }

  const newBalance = user.credits_remaining - amount;

  // Update user credits
  const { error: updateError } = await supabase
    .from("users")
    .update({ credits_remaining: newBalance })
    .eq("id", userId);

  if (updateError) throw updateError;

  // Create transaction record
  const { error: transactionError } = await supabase
    .from("credit_transactions")
    .insert({
      user_id: userId,
      amount: -amount,
      transaction_type: "generation_deduct",
      description,
      shot_id: shotId,
      balance_after: newBalance,
    });

  if (transactionError) throw transactionError;

  return { newBalance };
}

/**
 * Example: Grant monthly credits to premium subscribers
 * Background job that runs monthly - no user session
 */
export async function grantMonthlyCredits() {
  const supabase = createAdminClient();

  // Find all active premium subscribers
  const { data: users, error } = await supabase
    .from("users")
    .select("id, subscription_tier")
    .eq("subscription_tier", "premium")
    .eq("subscription_status", "active");

  if (error) throw error;

  const MONTHLY_CREDITS = 100; // Example: 100 credits per month

  // Grant credits to each user
  for (const user of users || []) {
    const { data: currentUser } = await supabase
      .from("users")
      .select("credits_remaining")
      .eq("id", user.id)
      .single();

    if (!currentUser) continue;

    const newBalance = currentUser.credits_remaining + MONTHLY_CREDITS;

    await supabase.from("users").update({ credits_remaining: newBalance }).eq("id", user.id);

    await supabase.from("credit_transactions").insert({
      user_id: user.id,
      amount: MONTHLY_CREDITS,
      transaction_type: "subscription_grant",
      description: "Monthly premium subscription credits",
      balance_after: newBalance,
    });
  }

  return { usersUpdated: users?.length || 0 };
}
