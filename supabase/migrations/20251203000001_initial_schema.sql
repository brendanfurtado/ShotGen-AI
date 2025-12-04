-- ShotGen Database Schema
-- Initial migration for core tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,

  -- Subscription info
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  subscription_status TEXT CHECK (subscription_status IN ('active', 'canceled', 'past_due', 'incomplete', 'trialing')),
  subscription_period_start TIMESTAMPTZ,
  subscription_period_end TIMESTAMPTZ,

  -- Stripe info
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,

  -- Credits
  credits_remaining INTEGER NOT NULL DEFAULT 5,
  credits_total INTEGER NOT NULL DEFAULT 5,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- PROJECTS TABLE
-- ============================================================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Project details
  title TEXT NOT NULL,
  description TEXT,

  -- Script
  script_content TEXT,
  word_count INTEGER DEFAULT 0,

  -- Generation settings
  generation_style TEXT DEFAULT 'photorealistic' CHECK (generation_style IN (
    'photorealistic', 'illustration', 'noir', 'cinematic', 'vintage', 'anime', 'sketch'
  )),
  aspect_ratio TEXT DEFAULT '16:9' CHECK (aspect_ratio IN ('16:9', '9:16', '1:1', '4:3')),

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- ============================================================================
-- SCENES TABLE
-- ============================================================================
CREATE TABLE public.scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  -- Scene details
  scene_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  location TEXT,
  time_of_day TEXT CHECK (time_of_day IN ('day', 'night', 'dawn', 'dusk', 'magic_hour')),
  description TEXT NOT NULL,

  -- Ordering
  sort_order INTEGER NOT NULL,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- SHOTS TABLE
-- ============================================================================
CREATE TABLE public.shots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  scene_id UUID NOT NULL REFERENCES public.scenes(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  -- Shot details
  shot_number INTEGER NOT NULL,
  description TEXT NOT NULL,

  -- Image
  image_url TEXT,
  image_prompt TEXT,
  storage_path TEXT,

  -- Camera metadata
  shot_type TEXT CHECK (shot_type IN (
    'extreme_wide', 'wide', 'full', 'medium', 'close_up', 'extreme_close_up', 'over_shoulder', 'pov'
  )),
  camera_angle TEXT CHECK (camera_angle IN (
    'eye_level', 'high_angle', 'low_angle', 'birds_eye', 'dutch_angle'
  )),
  camera_movement TEXT CHECK (camera_movement IN (
    'static', 'pan', 'tilt', 'dolly', 'track', 'zoom', 'handheld', 'crane', 'steadicam'
  )),
  lens_type TEXT,
  lighting_setup TEXT,

  -- Notes
  notes TEXT,

  -- Ordering
  sort_order INTEGER NOT NULL,

  -- Generation tracking
  generation_cost INTEGER DEFAULT 1,
  generated_at TIMESTAMPTZ,
  moderation_flagged BOOLEAN DEFAULT FALSE,
  moderation_categories JSONB,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- TAGS TABLE
-- ============================================================================
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,

  name TEXT NOT NULL,
  color TEXT DEFAULT '#facc15', -- Primary yellow color

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(project_id, name)
);

-- ============================================================================
-- SHOT_TAGS (Join Table)
-- ============================================================================
CREATE TABLE public.shot_tags (
  shot_id UUID NOT NULL REFERENCES public.shots(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (shot_id, tag_id)
);

-- ============================================================================
-- CREDIT_TRANSACTIONS TABLE
-- ============================================================================
CREATE TABLE public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Transaction details
  amount INTEGER NOT NULL, -- Positive for add, negative for deduct
  transaction_type TEXT NOT NULL CHECK (transaction_type IN (
    'purchase', 'subscription_grant', 'generation_deduct', 'refund', 'bonus'
  )),
  description TEXT,

  -- Related entities
  shot_id UUID REFERENCES public.shots(id) ON DELETE SET NULL,
  stripe_payment_intent_id TEXT,

  -- Balance after transaction
  balance_after INTEGER NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- SUBSCRIPTION_HISTORY TABLE
-- ============================================================================
CREATE TABLE public.subscription_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Event details
  event_type TEXT NOT NULL CHECK (event_type IN (
    'created', 'updated', 'canceled', 'reactivated', 'payment_failed'
  )),
  tier TEXT NOT NULL CHECK (tier IN ('free', 'premium')),
  billing_period TEXT CHECK (billing_period IN ('monthly', 'quarterly', 'yearly')),

  -- Stripe info
  stripe_event_id TEXT,
  stripe_subscription_id TEXT,

  -- Metadata
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Users
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_stripe_customer ON public.users(stripe_customer_id);

-- Projects
CREATE INDEX idx_projects_user_id ON public.projects(user_id);
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX idx_projects_deleted_at ON public.projects(deleted_at) WHERE deleted_at IS NULL;

-- Scenes
CREATE INDEX idx_scenes_project_id ON public.scenes(project_id);
CREATE INDEX idx_scenes_sort_order ON public.scenes(project_id, sort_order);

-- Shots
CREATE INDEX idx_shots_scene_id ON public.shots(scene_id);
CREATE INDEX idx_shots_project_id ON public.shots(project_id);
CREATE INDEX idx_shots_sort_order ON public.shots(scene_id, sort_order);
CREATE INDEX idx_shots_generated_at ON public.shots(generated_at);

-- Tags
CREATE INDEX idx_tags_project_id ON public.tags(project_id);

-- Credit Transactions
CREATE INDEX idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);

-- Subscription History
CREATE INDEX idx_subscription_history_user_id ON public.subscription_history(user_id);
CREATE INDEX idx_subscription_history_created_at ON public.subscription_history(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shot_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_history ENABLE ROW LEVEL SECURITY;

-- Users: Can only view/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Projects: Users can only access their own projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can create own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- Scenes: Users can only access scenes from their projects
CREATE POLICY "Users can view own scenes"
  ON public.scenes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create scenes in own projects"
  ON public.scenes FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own scenes"
  ON public.scenes FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own scenes"
  ON public.scenes FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = scenes.project_id
    AND projects.user_id = auth.uid()
  ));

-- Shots: Users can only access shots from their projects
CREATE POLICY "Users can view own shots"
  ON public.shots FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = shots.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create shots in own projects"
  ON public.shots FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = shots.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own shots"
  ON public.shots FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = shots.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own shots"
  ON public.shots FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = shots.project_id
    AND projects.user_id = auth.uid()
  ));

-- Tags: Users can only access tags from their projects
CREATE POLICY "Users can view own tags"
  ON public.tags FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = tags.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create tags in own projects"
  ON public.tags FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = tags.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own tags"
  ON public.tags FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = tags.project_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own tags"
  ON public.tags FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = tags.project_id
    AND projects.user_id = auth.uid()
  ));

-- Shot Tags: Users can only access shot tags from their projects
CREATE POLICY "Users can view own shot tags"
  ON public.shot_tags FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.shots
    JOIN public.projects ON projects.id = shots.project_id
    WHERE shots.id = shot_tags.shot_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can create shot tags in own projects"
  ON public.shot_tags FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.shots
    JOIN public.projects ON projects.id = shots.project_id
    WHERE shots.id = shot_tags.shot_id
    AND projects.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own shot tags"
  ON public.shot_tags FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.shots
    JOIN public.projects ON projects.id = shots.project_id
    WHERE shots.id = shot_tags.shot_id
    AND projects.user_id = auth.uid()
  ));

-- Credit Transactions: Users can only view their own transactions
CREATE POLICY "Users can view own credit transactions"
  ON public.credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Subscription History: Users can only view their own history
CREATE POLICY "Users can view own subscription history"
  ON public.subscription_history FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scenes_updated_at BEFORE UPDATE ON public.scenes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shots_updated_at BEFORE UPDATE ON public.shots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create storage bucket for shot images
INSERT INTO storage.buckets (id, name, public)
VALUES ('shots', 'shots', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for shots bucket
CREATE POLICY "Users can upload shot images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'shots' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view shot images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'shots');

CREATE POLICY "Users can update own shot images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'shots' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own shot images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'shots' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
