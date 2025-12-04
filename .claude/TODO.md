# ShotGen Development TODO

## Week 1: Foundation (Dec 3-9)

### Day 1 - Project Initialization ✅
- [x] Create Next.js project with TypeScript
- [x] Configure TailwindCSS and ShadCN/UI
- [x] Set up project structure
- [x] Initialize Git repository
- [x] Create Supabase project
- [x] Create comprehensive README
- [x] Design database schema
- [x] Create migration files
- [x] Create Supabase client utilities
- [x] Create authentication system
- [x] Create SETUP.md guide

### Day 2 - Database & Auth ✅
- [x] Configure environment variables (.env.local)
- [x] Run database migration in Supabase dashboard
- [x] Set up Google OAuth in Supabase
- [x] Create auth middleware (session refresh + route protection)
- [x] Implement login page with Google OAuth
- [x] Implement login/logout flow
- [x] Create user profile hooks
- [x] Create dashboard page
- [x] Auto-redirect logged-in users from / to /dashboard

### Day 3 - Layout & Navigation
- [ ] Create root layout with theme
- [ ] Build header component
- [ ] Build sidebar component (dashboard)
- [ ] Create protected route wrapper
- [ ] Implement user menu dropdown
- [ ] Set up Zustand stores

### Day 4 - Projects CRUD
- [ ] Create projects API routes
- [ ] Build project list page
- [ ] Create project card component
- [ ] Implement create project modal
- [ ] Add delete project functionality
- [ ] Enforce free tier limit (1 project)

### Day 5 - Script Input
- [ ] Build script editor page
- [ ] Create text paste component
- [ ] Implement file upload (TXT)
- [ ] Implement PDF text extraction
- [ ] Add word count tracking
- [ ] Enforce word limits by tier

### Day 6 - Script Parsing
- [ ] Set up OpenAI client
- [ ] Create parsing API route
- [ ] Build parsing prompt engineering
- [ ] Display parsed scenes
- [ ] Allow scene editing
- [ ] Handle parsing errors

### Day 7 - Scene Management
- [ ] Scene list component
- [ ] Scene card with expand/collapse
- [ ] Scene reordering (drag-and-drop)
- [ ] Scene CRUD operations
- [ ] Scene split/merge functionality
- [ ] Week 1 testing & bug fixes

---

## Week 2: Core Features (Dec 10-16)

### Day 8 - Generation Setup
- [ ] Create generation settings UI
- [ ] Build style preset selector
- [ ] Add aspect ratio selector
- [ ] Create metadata toggles
- [ ] Set up DALL·E 3 client
- [ ] Create image generation API

### Day 9 - Shot Generation
- [ ] Generate shots from scene
- [ ] Upload images to Supabase Storage
- [ ] Display shots in grid
- [ ] Create shot card component
- [ ] Implement loading states
- [ ] Handle generation errors

### Day 10 - Shot Details
- [ ] Build shot detail modal
- [ ] Image preview component
- [ ] Description editor
- [ ] Metadata dropdowns
- [ ] Regenerate with edited prompt
- [ ] Accept/save shot functionality

### Day 11 - Credits System
- [ ] Display credits in UI
- [ ] Deduct credits on generation
- [ ] Block generation if no credits
- [ ] Show usage warnings
- [ ] Track usage in database
- [ ] Credits API endpoints

### Day 12 - Organization
- [ ] Shot drag-and-drop reordering
- [ ] Tag management system
- [ ] Create tag modal
- [ ] Apply tags to shots
- [ ] Filter shots by tag
- [ ] Filter shots by scene

### Day 13 - PDF Export
- [ ] Set up Puppeteer
- [ ] Create export template HTML
- [ ] Build cover page template
- [ ] Build shot grid template
- [ ] PDF generation API
- [ ] Download handling

### Day 14 - Word Export
- [ ] Set up docx library
- [ ] Create document structure
- [ ] Build shot tables
- [ ] Image embedding
- [ ] Word generation API
- [ ] Week 2 testing & bug fixes

---

## Week 3: Polish & Payment (Dec 17-23)

### Day 15 - Stripe Setup
- [ ] Create Stripe account/products
- [ ] Set up Stripe client
- [ ] Create checkout session API
- [ ] Build pricing page
- [ ] Implement billing cycle selector
- [ ] Add credit slider

### Day 16 - Subscription Flow
- [ ] Webhook handler for Stripe
- [ ] Update subscription on success
- [ ] Grant monthly credits
- [ ] Customer portal integration
- [ ] Billing history page
- [ ] Cancel subscription flow

### Day 17 - Content Moderation
- [ ] Integrate OpenAI moderation API
- [ ] Pre-check prompts before generation
- [ ] Implement fallback generation
- [ ] Flag filtered shots in UI
- [ ] User notification for filtered content
- [ ] Test with edge cases

### Day 18 - Error Handling
- [ ] Global error boundary
- [ ] Toast notifications
- [ ] API error responses
- [ ] Retry logic for AI failures
- [ ] Offline detection
- [ ] Loading skeleton states

### Day 19 - Responsive Design
- [ ] Mobile header/menu
- [ ] Responsive project grid
- [ ] Mobile shot cards
- [ ] Touch-friendly drag-and-drop
- [ ] Mobile export flow
- [ ] Cross-browser testing

### Day 20 - UI Polish
- [ ] Animation polish (Framer Motion)
- [ ] Micro-interactions
- [ ] Empty states
- [ ] Onboarding hints
- [ ] Keyboard shortcuts
- [ ] Accessibility audit

### Day 21 - Testing & Fixes
- [ ] End-to-end user flow testing
- [ ] Payment flow testing
- [ ] Edge case handling
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Documentation

### Day 22 - Launch Prep
- [ ] Production environment check
- [ ] Domain configuration
- [ ] SSL verification
- [ ] Analytics setup
- [ ] Error monitoring (Sentry)
- [ ] Final smoke test

### Day 23 - LAUNCH 🚀
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Announce launch
- [ ] Respond to feedback
- [ ] Celebrate!
