# ShotGen

> AI-powered pre-production tool that transforms scripts into visual shot lists with generated reference images and camera metadata.

---

## ⚠️ Development Status

**Current Phase**: Week 1 - Foundation (Active Development)
**Target Launch**: December 23, 2025

This project is currently under active development. Core features are being implemented. See the [Development Roadmap](#development-roadmap) for details.

**Completed**:
- ✅ Project initialization and configuration
- ✅ Next.js, TailwindCSS, TypeScript setup
- ✅ shadcn/UI component library integration
- ✅ Theme system ("Cinematic Warmth" design)
- ✅ Landing page with marketing content

**In Progress/Planned**:
- 🚧 Database setup and authentication
- 🚧 Script upload and AI parsing
- 🚧 Shot generation with DALL-E 3
- 🚧 Export functionality (PDF, Word)
- 🚧 Payment integration with Stripe

---

## Overview

**ShotGen** is a SaaS application designed for filmmakers, videographers, and content creators to streamline the pre-production process. It leverages AI to automatically convert scripts into organized shot lists with visual references, eliminating hours of manual planning work.

### Core Problem
Traditional shot list creation is time-consuming and manual. Directors and cinematographers spend hours breaking down scripts scene-by-scene, sketching storyboards, and documenting camera requirements.

### Solution
ShotGen automates this workflow:
1. Upload or paste your script
2. AI parses scenes and generates visual references
3. Organize shots with drag-and-drop
4. Export production-ready documents (PDF/Word)

### Target Audience
- Independent filmmakers
- Video production companies
- Content creators (YouTube, commercial, music videos)
- Film students
- Pre-production coordinators

---

## Features

### Current Features
- Landing page with product showcase
- Responsive UI with custom theme system
- Component library (shadcn/UI)

### Planned Features

#### Script Processing
- Upload scripts via text paste, TXT files, or PDF
- AI-powered script parsing using GPT models
- Automatic scene detection and breakdown
- Scene editing and drag-and-drop reordering

#### Shot Generation
- AI-generated visual reference images (DALL-E 3)
- Customizable generation styles:
  - Photorealistic
  - Illustration
  - Film noir
  - Custom styles
- Camera metadata suggestions per shot:
  - Lens type
  - Camera movement
  - Lighting setup
  - Shot type (wide, medium, close-up, etc.)
- Content safety/moderation via OpenAI Moderation API

#### Organization
- Drag-and-drop interface for scene and shot reordering
- Tag-based shot filtering
- Shot detail modal with editing capabilities
- Project management (multiple projects per user)

#### Export
- PDF generation with shot grids and metadata
- Word document export with embedded images
- Professional cover page templates
- Shot tables with technical details

#### Subscription & Billing
- Free tier: 5 generations, 1 project limit
- Premium tiers: Monthly, Quarterly, Yearly
- Per-generation credit system
- Buy additional credits
- Stripe integration for payments

#### User Management
- Google OAuth authentication
- User profiles and subscription tracking
- Billing history and customer portal
- Tier-based limits (word count, project count)

---

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) 16.0.7 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x
- **Styling**: [TailwindCSS](https://tailwindcss.com/) 4.x
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) 5.0.9
- **Animations**: [Framer Motion](https://www.framer.com/motion/) 12.23.25
- **Icons**: [Lucide React](https://lucide.dev/) 0.555.0

### Backend & Database
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Auth**: Supabase Auth (Google OAuth)
- **Supabase Client**: 2.86.0
- **SSR Support**: @supabase/ssr 0.8.0

### AI & ML
- **AI Provider**: [OpenAI](https://openai.com/)
  - GPT-4 for script parsing and prompt generation
  - DALL-E 3 for image generation
  - Moderation API for content safety
- **SDK**: openai 6.9.1

### Payment Processing
- **Provider**: [Stripe](https://stripe.com/)
- **Client SDK**: @stripe/stripe-js 8.5.3
- **Server SDK**: stripe 20.0.0

### Key Libraries
- **Drag & Drop**: @dnd-kit/core 6.3.1, @dnd-kit/sortable 10.0.0
- **PDF Generation**: puppeteer 24.32.0 (headless Chrome)
- **Word Documents**: docx 9.5.1
- **Validation**: zod 4.1.13
- **Date Utilities**: date-fns 4.1.0
- **Notifications**: sonner 2.0.7 (toast notifications)
- **Theming**: next-themes 0.4.6

---

## Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **Package Manager**: npm, yarn, pnpm, or bun
- **Accounts Required**:
  - [Supabase](https://supabase.com/) project
  - [OpenAI](https://platform.openai.com/) API key
  - [Stripe](https://stripe.com/) account (for payment features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shotgen
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

   Fill in the required values (see [Environment Variables](#environment-variables) section below).

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_APP_URL` | Application URL (e.g., `http://localhost:3000`) | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT and DALL-E | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (client-side) | Yes |
| `STRIPE_PREMIUM_MONTHLY_PRICE_ID` | Stripe Price ID for monthly subscription | Yes |
| `STRIPE_PREMIUM_QUARTERLY_PRICE_ID` | Stripe Price ID for quarterly subscription | Yes |
| `STRIPE_PREMIUM_YEARLY_PRICE_ID` | Stripe Price ID for yearly subscription | Yes |
| `STRIPE_CREDIT_PRICE_ID` | Stripe Price ID for additional credits | Yes |

See `.env.example` for the full template.

---

## Project Structure

```
shotgen/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page (marketing)
│   └── globals.css          # Global styles and theme variables
│
├── components/
│   └── ui/                  # shadcn/UI component library
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── slider.tsx
│       ├── sonner.tsx       # Toast notifications
│       ├── tabs.tsx
│       └── textarea.tsx
│
├── lib/
│   └── utils.ts             # Utility functions (cn() helper)
│
├── public/                  # Static assets
│
├── .env.example             # Environment variable template
├── components.json          # shadcn/UI configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # TailwindCSS theme config
└── tsconfig.json            # TypeScript configuration
```

---

## Architecture

### Application Architecture

ShotGen is built as a **full-stack serverless Next.js application** using the App Router with React Server Components.

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│  ┌────────────────────────────────────────────────────┐ │
│  │   Next.js App (React 19 + TypeScript)              │ │
│  │   - shadcn/UI Components                           │ │
│  │   - Zustand State Management                       │ │
│  │   - Framer Motion Animations                       │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ API Routes / Server Actions
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  Next.js Server (Edge)                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │   API Routes / Server Actions                      │ │
│  │   - Authentication Middleware                      │ │
│  │   - Business Logic                                 │ │
│  │   - PDF/Word Generation (Puppeteer/docx)          │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
           │                  │                  │
           │                  │                  │
           ↓                  ↓                  ↓
    ┌──────────┐      ┌──────────┐      ┌──────────┐
    │ Supabase │      │  OpenAI  │      │  Stripe  │
    │          │      │          │      │          │
    │ - Auth   │      │ - GPT-4  │      │ - Payment│
    │ - DB     │      │ - DALL-E │      │ - Billing│
    │          │      │ - Modapi │      │          │
    └──────────┘      └──────────┘      └──────────┘
```

### Data Flow

1. **User Authentication**: Google OAuth via Supabase Auth
2. **Script Upload**: User pastes/uploads script → stored in Supabase
3. **AI Processing**:
   - Script sent to GPT-4 for scene parsing
   - Structured scene data returned
4. **Image Generation**:
   - Scene descriptions sent to DALL-E 3
   - Generated images stored (Supabase Storage or CDN)
5. **Organization**: User reorders shots via drag-and-drop (client-side state)
6. **Export**:
   - Server-side PDF generation with Puppeteer
   - Word document generation with docx library
7. **Billing**: Stripe webhooks handle subscription events

### Integration Points

#### Supabase
- **Authentication**: Google OAuth provider
- **Database**: PostgreSQL for users, projects, scenes, shots, subscriptions
- **Storage**: Image hosting for generated shots
- **Row Level Security (RLS)**: User data isolation

#### OpenAI
- **GPT-4**: Script parsing, scene extraction, prompt engineering
- **DALL-E 3**: Visual reference image generation
- **Moderation API**: Content safety filtering

#### Stripe
- **Checkout Sessions**: Subscription and credit purchases
- **Customer Portal**: Manage subscriptions and billing
- **Webhooks**: Handle payment events (subscription created, updated, canceled)

---

## Development Roadmap

### Week 1: Foundation (Dec 3-9) - **Current Phase**
- [x] Project initialization
- [x] Next.js, TailwindCSS, TypeScript setup
- [x] shadcn/UI installation
- [x] Theme configuration
- [x] Landing page creation
- [ ] Supabase database setup
- [ ] Authentication implementation
- [ ] Dashboard navigation

### Week 2: Core Features (Dec 10-16)
- [ ] Script upload (paste, TXT, PDF)
- [ ] OpenAI script parsing
- [ ] Shot generation with DALL-E
- [ ] Drag-and-drop shot organization
- [ ] PDF export
- [ ] Word document export

### Week 3: Launch Preparation (Dec 17-23)
- [ ] Stripe payment integration
- [ ] Subscription tiers and credit system
- [ ] Content moderation
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Production deployment
- [ ] **Launch: December 23, 2025**

---

## Contributing

This project is currently in early development. Contribution guidelines will be added as the codebase matures.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- TypeScript strict mode
- ESLint configuration (Next.js recommended)
- Component-driven architecture
- Server Components by default, Client Components when needed

---

## License

This project is proprietary software. All rights reserved.

---

## Contact

For questions or support, please open an issue in this repository.

---

**Built with**:
Next.js · React · TypeScript · TailwindCSS · Supabase · OpenAI · Stripe
