# Testing Google OAuth Authentication

## Prerequisites

Before testing, make sure you've completed:
- ✅ Created Supabase project
- ✅ Set up Google OAuth in Google Cloud Console
- ✅ Configured Google OAuth provider in Supabase
- ✅ Run the database migration (creates tables and triggers)
- ✅ Created `.env.local` with your credentials

## Step 1: Verify Environment Variables

Make sure your `.env.local` has:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Step 2: Start the Development Server

```bash
npm run dev
```

The app should start at http://localhost:3000

## Step 3: Test the Flow

### 3.1 Landing Page
1. Visit http://localhost:3000
2. You should see the ShotGen landing page
3. Click **"Sign In"** in the navigation
4. OR click **"Get Started Free"** in the hero section

### 3.2 Login Page
1. You should be redirected to http://localhost:3000/login
2. You should see:
   - "Welcome to ShotGen" heading
   - "Continue with Google" button with Google logo
   - Free tier benefits listed

### 3.3 Google OAuth
1. Click **"Continue with Google"**
2. You should be redirected to Google's OAuth consent screen
3. Select your Google account
4. Grant permissions (email and profile)
5. You should be redirected back to your app

### 3.4 Dashboard
1. After successful sign-in, you should land on http://localhost:3000/dashboard
2. You should see:
   - Your name/email in the header
   - Your Google profile picture
   - "Sign Out" button
   - Credits remaining: 5 (default for new users)
   - Subscription tier: Free
   - "No projects yet" message

### 3.5 Verify Database
1. Open Supabase dashboard
2. Go to **Table Editor** → **users** table
3. You should see a new row with your user data:
   - `id`: Your user ID (UUID)
   - `email`: Your Google email
   - `full_name`: Your Google name
   - `avatar_url`: Your Google profile picture URL
   - `subscription_tier`: "free"
   - `credits_remaining`: 5
   - `credits_total`: 5

### 3.6 Test Sign Out
1. Click **"Sign Out"** in the dashboard
2. You should be redirected to the landing page (/)
3. Try visiting http://localhost:3000/dashboard
4. You should be redirected to /login (middleware protection working!)

### 3.7 Test Protected Routes
1. While signed out, try to visit http://localhost:3000/dashboard
2. You should be automatically redirected to /login
3. Sign in again
4. You should be redirected back to /dashboard

## Expected Behavior

### ✅ Success Indicators:
- Google OAuth popup appears
- Redirects work smoothly (no errors)
- User profile created in database automatically
- Dashboard shows your profile data
- Credits and tier are set correctly
- Sign out redirects to home
- Protected routes redirect to login when not authenticated

### ❌ Common Issues:

**"redirect_uri_mismatch"**
- The callback URL in Google Cloud Console doesn't match Supabase
- Fix: Make sure it's exactly `https://[your-project-ref].supabase.co/auth/v1/callback`

**"Invalid provider"**
- Google OAuth not enabled in Supabase
- Fix: Go to Authentication → Providers → Enable Google

**"User not found" or blank dashboard**
- Database trigger didn't fire
- Fix: Check migration ran successfully, verify `handle_new_user()` function exists

**Stuck at login page after clicking Google**
- OAuth credentials incorrect
- Fix: Double-check Client ID and Secret in Supabase match Google Cloud Console

**"Network error" or CORS issues**
- Environment variables not set
- Fix: Verify `.env.local` exists and has all required values

## Database Verification Queries

Run these in Supabase SQL Editor to verify:

```sql
-- Check if user was created
SELECT * FROM public.users ORDER BY created_at DESC LIMIT 1;

-- Check if auth user exists
SELECT * FROM auth.users ORDER BY created_at DESC LIMIT 1;

-- Verify trigger function exists
SELECT routine_name FROM information_schema.routines
WHERE routine_name = 'handle_new_user';
```

## Next Steps After Successful Test

Once authentication is working:
1. ✅ Mark authentication as complete
2. Move on to building projects CRUD
3. Implement script upload
4. Add AI features (OpenAI integration)
5. Build shot generation

## Troubleshooting Commands

```bash
# Restart dev server
npm run dev

# Check if .env.local is being loaded
# Add this to any page temporarily:
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Support

If you encounter issues:
1. Check Supabase logs: Dashboard → Logs
2. Check browser console for errors (F12)
3. Check terminal for server errors
4. Verify all environment variables are set
5. Review the SETUP.md guide again
