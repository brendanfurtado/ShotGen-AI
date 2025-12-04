/**
 * Database Types
 * Auto-generated types for Supabase tables
 *
 * To regenerate: Run `npx supabase gen types typescript --local > lib/supabase/database.types.ts`
 * Or manually define types matching your schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: "free" | "premium";
          subscription_status:
            | "active"
            | "canceled"
            | "past_due"
            | "incomplete"
            | "trialing"
            | null;
          subscription_period_start: string | null;
          subscription_period_end: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          credits_remaining: number;
          credits_total: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: "free" | "premium";
          subscription_status?:
            | "active"
            | "canceled"
            | "past_due"
            | "incomplete"
            | "trialing"
            | null;
          subscription_period_start?: string | null;
          subscription_period_end?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          credits_remaining?: number;
          credits_total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: "free" | "premium";
          subscription_status?:
            | "active"
            | "canceled"
            | "past_due"
            | "incomplete"
            | "trialing"
            | null;
          subscription_period_start?: string | null;
          subscription_period_end?: string | null;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          credits_remaining?: number;
          credits_total?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          script_content: string | null;
          word_count: number;
          generation_style:
            | "photorealistic"
            | "illustration"
            | "noir"
            | "cinematic"
            | "vintage"
            | "anime"
            | "sketch";
          aspect_ratio: "16:9" | "9:16" | "1:1" | "4:3";
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          script_content?: string | null;
          word_count?: number;
          generation_style?:
            | "photorealistic"
            | "illustration"
            | "noir"
            | "cinematic"
            | "vintage"
            | "anime"
            | "sketch";
          aspect_ratio?: "16:9" | "9:16" | "1:1" | "4:3";
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          script_content?: string | null;
          word_count?: number;
          generation_style?:
            | "photorealistic"
            | "illustration"
            | "noir"
            | "cinematic"
            | "vintage"
            | "anime"
            | "sketch";
          aspect_ratio?: "16:9" | "9:16" | "1:1" | "4:3";
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      scenes: {
        Row: {
          id: string;
          project_id: string;
          scene_number: number;
          title: string;
          location: string | null;
          time_of_day: "day" | "night" | "dawn" | "dusk" | "magic_hour" | null;
          description: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          scene_number: number;
          title: string;
          location?: string | null;
          time_of_day?: "day" | "night" | "dawn" | "dusk" | "magic_hour" | null;
          description: string;
          sort_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          scene_number?: number;
          title?: string;
          location?: string | null;
          time_of_day?: "day" | "night" | "dawn" | "dusk" | "magic_hour" | null;
          description?: string;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "scenes_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      shots: {
        Row: {
          id: string;
          scene_id: string;
          project_id: string;
          shot_number: number;
          description: string;
          image_url: string | null;
          image_prompt: string | null;
          storage_path: string | null;
          shot_type:
            | "extreme_wide"
            | "wide"
            | "full"
            | "medium"
            | "close_up"
            | "extreme_close_up"
            | "over_shoulder"
            | "pov"
            | null;
          camera_angle:
            | "eye_level"
            | "high_angle"
            | "low_angle"
            | "birds_eye"
            | "dutch_angle"
            | null;
          camera_movement:
            | "static"
            | "pan"
            | "tilt"
            | "dolly"
            | "track"
            | "zoom"
            | "handheld"
            | "crane"
            | "steadicam"
            | null;
          lens_type: string | null;
          lighting_setup: string | null;
          notes: string | null;
          sort_order: number;
          generation_cost: number;
          generated_at: string | null;
          moderation_flagged: boolean;
          moderation_categories: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          scene_id: string;
          project_id: string;
          shot_number: number;
          description: string;
          image_url?: string | null;
          image_prompt?: string | null;
          storage_path?: string | null;
          shot_type?:
            | "extreme_wide"
            | "wide"
            | "full"
            | "medium"
            | "close_up"
            | "extreme_close_up"
            | "over_shoulder"
            | "pov"
            | null;
          camera_angle?:
            | "eye_level"
            | "high_angle"
            | "low_angle"
            | "birds_eye"
            | "dutch_angle"
            | null;
          camera_movement?:
            | "static"
            | "pan"
            | "tilt"
            | "dolly"
            | "track"
            | "zoom"
            | "handheld"
            | "crane"
            | "steadicam"
            | null;
          lens_type?: string | null;
          lighting_setup?: string | null;
          notes?: string | null;
          sort_order: number;
          generation_cost?: number;
          generated_at?: string | null;
          moderation_flagged?: boolean;
          moderation_categories?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          scene_id?: string;
          project_id?: string;
          shot_number?: number;
          description?: string;
          image_url?: string | null;
          image_prompt?: string | null;
          storage_path?: string | null;
          shot_type?:
            | "extreme_wide"
            | "wide"
            | "full"
            | "medium"
            | "close_up"
            | "extreme_close_up"
            | "over_shoulder"
            | "pov"
            | null;
          camera_angle?:
            | "eye_level"
            | "high_angle"
            | "low_angle"
            | "birds_eye"
            | "dutch_angle"
            | null;
          camera_movement?:
            | "static"
            | "pan"
            | "tilt"
            | "dolly"
            | "track"
            | "zoom"
            | "handheld"
            | "crane"
            | "steadicam"
            | null;
          lens_type?: string | null;
          lighting_setup?: string | null;
          notes?: string | null;
          sort_order?: number;
          generation_cost?: number;
          generated_at?: string | null;
          moderation_flagged?: boolean;
          moderation_categories?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shots_scene_id_fkey";
            columns: ["scene_id"];
            referencedRelation: "scenes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shots_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      tags: {
        Row: {
          id: string;
          project_id: string;
          name: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          name: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          name?: string;
          color?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tags_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      shot_tags: {
        Row: {
          shot_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          shot_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          shot_id?: string;
          tag_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "shot_tags_shot_id_fkey";
            columns: ["shot_id"];
            referencedRelation: "shots";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "shot_tags_tag_id_fkey";
            columns: ["tag_id"];
            referencedRelation: "tags";
            referencedColumns: ["id"];
          }
        ];
      };
      credit_transactions: {
        Row: {
          id: string;
          user_id: string;
          amount: number;
          transaction_type:
            | "purchase"
            | "subscription_grant"
            | "generation_deduct"
            | "refund"
            | "bonus";
          description: string | null;
          shot_id: string | null;
          stripe_payment_intent_id: string | null;
          balance_after: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          amount: number;
          transaction_type:
            | "purchase"
            | "subscription_grant"
            | "generation_deduct"
            | "refund"
            | "bonus";
          description?: string | null;
          shot_id?: string | null;
          stripe_payment_intent_id?: string | null;
          balance_after: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          amount?: number;
          transaction_type?:
            | "purchase"
            | "subscription_grant"
            | "generation_deduct"
            | "refund"
            | "bonus";
          description?: string | null;
          shot_id?: string | null;
          stripe_payment_intent_id?: string | null;
          balance_after?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "credit_transactions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "credit_transactions_shot_id_fkey";
            columns: ["shot_id"];
            referencedRelation: "shots";
            referencedColumns: ["id"];
          }
        ];
      };
      subscription_history: {
        Row: {
          id: string;
          user_id: string;
          event_type:
            | "created"
            | "updated"
            | "canceled"
            | "reactivated"
            | "payment_failed";
          tier: "free" | "premium";
          billing_period: "monthly" | "quarterly" | "yearly" | null;
          stripe_event_id: string | null;
          stripe_subscription_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          event_type:
            | "created"
            | "updated"
            | "canceled"
            | "reactivated"
            | "payment_failed";
          tier: "free" | "premium";
          billing_period?: "monthly" | "quarterly" | "yearly" | null;
          stripe_event_id?: string | null;
          stripe_subscription_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          event_type?:
            | "created"
            | "updated"
            | "canceled"
            | "reactivated"
            | "payment_failed";
          tier?: "free" | "premium";
          billing_period?: "monthly" | "quarterly" | "yearly" | null;
          stripe_event_id?: string | null;
          stripe_subscription_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscription_history_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
