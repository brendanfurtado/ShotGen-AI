# Next Steps for ShotGen Development

## ✅ What We've Completed

### Database & Infrastructure
1. **Database Schema** - Comprehensive PostgreSQL schema with:
   - Users table (with subscription and credits tracking)
   - Projects, Scenes, Shots tables
   - Tags and Shot_Tags for organization
   - Credit_Transactions for usage tracking
   - Subscription_History for billing events
   - Row Level Security (RLS) policies for all tables
   - Indexes for performance
   - Triggers for automatic timestamps
   - Storage bucket for shot images

2. **Supabase Client Utilities**:
   - `lib/supabase/client.ts` - Browser client for Client Components
   - `lib/supabase/server.ts` - Server client for Server Components/Actions
   - `lib/supabase/middleware.ts` - Middleware for session refresh
   - `lib/supabase/database.types.ts` - TypeScript types for all tables

3. **Authentication System**:
   - `middleware.ts` - Route protection and session management
   - `lib/auth/actions.ts` - Server actions (signInWithGoogle, signOut, getUser)
   - `lib/auth/hooks.ts` - Client hooks (useUser, useUserProfile)
   - `app/auth/callback/route.ts` - OAuth callback handler

4. **Documentation**:
   - `README.md` - Comprehensive project documentation
   - `SETUP.md` - Step-by-step setup guide
   - Updated `PROGRESS.md` and `TODO.md`

## 🚀 What You Need to Do Next

### Step 1: Run the Database Migration
1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Click "New query"
4. Copy the contents of `supabase/migrations/20251203000001_initial_schema.sql`
5. Paste and click **Run**
6. Verify tables were created in **Table Editor**

### Step 2: Configure Environment Variables
1. Follow the instructions in `SETUP.md`
2. Get your Supabase credentials from the dashboard
3. Create a `.env` file with all required values
4. Start with just Supabase credentials to test auth first

### Step 3: Set Up Google OAuth
1. In Supabase dashboard, go to **Authentication → Providers**
2. Enable **Google**
3. Create OAuth credentials in Google Cloud Console
4. Add the callback URL to Google OAuth app
5. Copy Client ID and Secret to Supabase

### Step 4: Test the Setup
1. Run `npm run dev`
2. Verify the app starts without errors
3. Try to sign in with Google
4. Check that a user record is created in `public.users` table

## 📋 What to Build Next

Once authentication is working, here's the recommended order:

### 1. Create Login Page (`app/login/page.tsx`)
- Simple page with "Sign in with Google" button
- Use `signInWithGoogle()` action from `lib/auth/actions.ts`

### 2. Create Dashboard Layout (`app/dashboard/layout.tsx`)
- Header with user menu
- Sign out button
- Display user's name and avatar

### 3. Create Projects Page (`app/dashboard/page.tsx` or `app/projects/page.tsx`)
- List user's projects
- "Create New Project" button
- Enforce free tier limit (1 project max)

### 4. Create Project Detail Page
- Script input area
- Scene list
- Shot grid
- Export buttons

### 5. Implement AI Features
- Script parsing with OpenAI
- Shot generation with DALL-E 3
- Credit deduction system

## 📁 File Structure Created

```
shotgen/
├── supabase/
│   └── migrations/
│       └── 20251203000001_initial_schema.sql
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── middleware.ts
│   │   └── database.types.ts
│   └── auth/
│       ├── actions.ts
│       └── hooks.ts
├── app/
│   └── auth/
│       └── callback/
│           └── route.ts
├── middleware.ts
├── README.md
├── SETUP.md
└── .claude/
    ├── PROGRESS.md
    ├── TODO.md
    └── NEXT_STEPS.md (this file)
```

## 🔧 Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📚 Important Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/<your-project-ref>
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **OpenAI API**: https://platform.openai.com/docs
- **Stripe Dashboard**: https://dashboard.stripe.com

## ⚠️ Important Notes

1. **Service Role Key**: Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Only use in server-side code.

2. **RLS Policies**: All tables have Row Level Security enabled. Users can only access their own data.

3. **Storage**: The "shots" bucket is public for reading, but users can only upload/delete their own images.

4. **Credits**: Free tier users start with 5 credits. Each shot generation costs 1 credit.

5. **Project Limits**: Free tier is limited to 1 project. Premium users have unlimited projects.

## 🎯 Current Priority

**Your immediate next step is to:**
1. Open SETUP.md
2. Follow Step 2 (Supabase Setup) section 2.3 to run the migration
3. Get your environment variables configured
4. Test that authentication works

Once that's done, we can start building the UI!
