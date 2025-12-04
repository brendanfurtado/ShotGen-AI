/**
 * Centralized Type Definitions
 * Single source of truth for all application types
 */

import type { Database } from "@/lib/supabase/database.types";

// Table Row Types (for reading data)
export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Scene = Database["public"]["Tables"]["scenes"]["Row"];
export type Shot = Database["public"]["Tables"]["shots"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type ShotTag = Database["public"]["Tables"]["shot_tags"]["Row"];
export type CreditTransaction = Database["public"]["Tables"]["credit_transactions"]["Row"];
export type SubscriptionHistory = Database["public"]["Tables"]["subscription_history"]["Row"];

// Table Insert Types (for creating data)
export type UserProfileInsert = Database["public"]["Tables"]["users"]["Insert"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type SceneInsert = Database["public"]["Tables"]["scenes"]["Insert"];
export type ShotInsert = Database["public"]["Tables"]["shots"]["Insert"];
export type TagInsert = Database["public"]["Tables"]["tags"]["Insert"];
export type ShotTagInsert = Database["public"]["Tables"]["shot_tags"]["Insert"];
export type CreditTransactionInsert = Database["public"]["Tables"]["credit_transactions"]["Insert"];
export type SubscriptionHistoryInsert = Database["public"]["Tables"]["subscription_history"]["Insert"];

// Table Update Types (for updating data)
export type UserProfileUpdate = Database["public"]["Tables"]["users"]["Update"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];
export type SceneUpdate = Database["public"]["Tables"]["scenes"]["Update"];
export type ShotUpdate = Database["public"]["Tables"]["shots"]["Update"];
export type TagUpdate = Database["public"]["Tables"]["tags"]["Update"];
export type ShotTagUpdate = Database["public"]["Tables"]["shot_tags"]["Update"];
export type CreditTransactionUpdate = Database["public"]["Tables"]["credit_transactions"]["Update"];
export type SubscriptionHistoryUpdate = Database["public"]["Tables"]["subscription_history"]["Update"];

// Enum Types
export type SubscriptionTier = UserProfile["subscription_tier"];
export type SubscriptionStatus = UserProfile["subscription_status"];
export type GenerationStyle = Project["generation_style"];
export type AspectRatio = Project["aspect_ratio"];
export type TimeOfDay = Scene["time_of_day"];
export type ShotType = Shot["shot_type"];
export type CameraAngle = Shot["camera_angle"];
export type CameraMovement = Shot["camera_movement"];
export type TransactionType = CreditTransaction["transaction_type"];
export type SubscriptionEventType = SubscriptionHistory["event_type"];
export type BillingPeriod = SubscriptionHistory["billing_period"];
