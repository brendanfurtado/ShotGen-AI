# ShotGen Setup Guide

This guide will help you set up the ShotGen project locally and configure all required services.

## Prerequisites

- Node.js v20.x or higher
- A Supabase account and project
- An OpenAI API key
- A Stripe account (for payment features)
- Git

## Step 1: Clone and Install

```bash
git clone <repository-url>
cd shotgen
npm install
```

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in project details:
   - Project name: `shotgen` (or your preferred name)
   - Database password: Generate a strong password
   - Region: Choose closest to your location
4. Click "Create new project" and wait for it to initialize

### 2.2 Get Your Supabase Credentials

Once your project is ready:

1. Go to Project Settings → API
2. Copy the following values:
   - **Project URL**: `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep this secret!)

### 2.3 Run Database Migrations

You have two options to run the migration:

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click "New query"
4. Copy the entire contents of `supabase/migrations/20251203000001_initial_schema.sql`
5. Paste it into the SQL editor
6. Click "Run" to execute the migration

**Option B: Via Supabase CLI** (if you have it installed)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Link to your project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db push
```

### 2.4 Configure Google OAuth

1. Go to your Supabase project
2. Navigate to **Authentication → Providers**
3. Enable **Google** provider
4. Follow the instructions to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://<your-project-ref>.supabase.co/auth/v1/callback`
5. Copy Client ID and Client Secret to Supabase
6. Save the configuration

### 2.5 Configure Storage

The migration should have created a storage bucket named "shots". Verify:

1. Go to **Storage** in Supabase dashboard
2. Confirm "shots" bucket exists
3. If not, create it manually:
   - Click "New bucket"
   - Name: `shots`
   - Public bucket: ✅ (checked)
   - Create bucket

## Step 3: OpenAI Setup

1. Go to [https://platform.openai.com](https://platform.openai.com)
2. Sign in or create an account
3. Navigate to **API keys**
4. Click "Create new secret key"
5. Copy the API key immediately (you won't be able to see it again)
6. Make sure you have billing set up to use GPT-4 and DALL-E 3

## Step 4: Stripe Setup (Optional - for payments)

1. Go to [https://stripe.com](https://stripe.com) and sign in
2. Navigate to **Developers → API keys**
3. Copy the following:
   - **Publishable key**: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key**: `STRIPE_SECRET_KEY`

4. Create Products and Prices:
   - Go to **Products** in Stripe dashboard
   - Create the following products:

   **Premium Subscription - Monthly**
   - Name: "Premium Monthly"
   - Pricing: Recurring, $X/month
   - Copy Price ID → `STRIPE_PREMIUM_MONTHLY_PRICE_ID`

   **Premium Subscription - Quarterly**
   - Name: "Premium Quarterly"
   - Pricing: Recurring, $X every 3 months
   - Copy Price ID → `STRIPE_PREMIUM_QUARTERLY_PRICE_ID`

   **Premium Subscription - Yearly**
   - Name: "Premium Yearly"
   - Pricing: Recurring, $X/year
   - Copy Price ID → `STRIPE_PREMIUM_YEARLY_PRICE_ID`

   **Additional Credits**
   - Name: "Additional Credits"
   - Pricing: One-time, $X (for Y credits)
   - Copy Price ID → `STRIPE_CREDIT_PRICE_ID`

5. Set up Webhooks:
   - Go to **Developers → Webhooks**
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

## Step 5: Environment Variables

⚠️ **Important**: Use `.env.local` for your actual secrets (this file is git-ignored).

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all the values you collected in `.env.local`:

   ```env
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # OpenAI
   OPENAI_API_KEY=sk-...your_openai_key_here

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_...your_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...your_publishable_key
   STRIPE_PREMIUM_MONTHLY_PRICE_ID=price_xxxxxxxxxxxxx
   STRIPE_PREMIUM_QUARTERLY_PRICE_ID=price_xxxxxxxxxxxxx
   STRIPE_PREMIUM_YEARLY_PRICE_ID=price_xxxxxxxxxxxxx
   STRIPE_CREDIT_PRICE_ID=price_xxxxxxxxxxxxx
   ```

## Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verification Checklist

Before you start developing, verify everything is working:

- [ ] Supabase project is created and accessible
- [ ] Database migration ran successfully (check tables in Supabase dashboard)
- [ ] Google OAuth is configured in Supabase
- [ ] Storage bucket "shots" exists
- [ ] OpenAI API key is valid (test in OpenAI playground)
- [ ] Stripe products and prices are created
- [ ] All environment variables are set in `.env`
- [ ] Development server starts without errors
- [ ] Can access landing page at http://localhost:3000

## Next Steps

Once setup is complete:

1. Test authentication by signing in with Google
2. Check that user profile is created in `public.users` table
3. Explore the codebase and start implementing features per the TODO list

## Troubleshooting

### "Invalid API key" error
- Check that your Supabase keys are correct in `.env`
- Make sure you're using the anon key, not the service role key for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### OAuth redirect error
- Verify the callback URL in Google Cloud Console matches your Supabase URL
- Check that Google OAuth is enabled in Supabase → Authentication → Providers

### Database connection error
- Ensure the migration ran successfully
- Check Supabase project status (should be "Active")
- Verify RLS policies are enabled

### OpenAI API errors
- Confirm you have billing set up in OpenAI
- Check that your API key has access to GPT-4 and DALL-E 3
- Verify the key starts with `sk-`

## Support

For issues or questions:
- Check the main README.md
- Review the Supabase docs: https://supabase.com/docs
- OpenAI API docs: https://platform.openai.com/docs
- Stripe docs: https://stripe.com/docs
