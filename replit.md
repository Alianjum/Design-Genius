# Help the Group - Cancer Support Community

## Overview

Help the Group is a web application designed as a support community for cancer patients and survivors. The platform enables users to join the community through referral links, build support networks through a two-level referral system, and send email invitations to potential members. It features both user and admin dashboards with referral tracking, user management, and email invitation capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for healthcare-themed styling
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers
- **Design System**: Premium SaaS aesthetic with calm healthcare theme (Primary Blue #1D4ED8, Soft Teal #22D3EE, Accent Green #10B981)
- **Typography**: Poppins for headings, Inter for body text

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: HTTP server with support for development (Vite middleware) and production (static file serving)
- **API Design**: RESTful JSON API under `/api` prefix
- **Authentication**: Simple session-based auth stored in localStorage (no JWT or session middleware currently implemented)
- **Storage Layer**: Abstract storage interface (`IStorage`) with in-memory implementation (`MemStorage`), designed for easy database migration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod schemas generated from Drizzle schema using drizzle-zod
- **Database Schema**:
  - `users`: Core user table with referral tracking (id, name, email, password, referralCode, referredBy, role, isActive, joinDate)
  - `emailLogs`: Email invitation tracking (senderId, recipientEmail, subject, message, status, sentAt)

### Key Design Patterns
- **Shared Schema**: Types and validation schemas shared between client and server via `@shared/*` path alias
- **API Client**: Centralized fetch wrapper with error handling in `queryClient.ts`
- **Component Composition**: Dashboard layout component wraps authenticated pages with sidebar navigation
- **Role-Based Access**: Separate routes and dashboards for users (`/dashboard/*`) and admins (`/admin/*`)

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migration tooling (`db:push` command)

### Third-Party Services
- **Email**: Nodemailer configured for sending invitation emails (SMTP configuration required)
- **Session Storage**: connect-pg-simple for PostgreSQL session storage capability

### Key NPM Packages
- **UI/UX**: Full suite of Radix UI primitives, Embla Carousel, Recharts for charts, date-fns
- **Forms**: react-hook-form, zod, @hookform/resolvers
- **Server**: express, express-session, express-rate-limit
- **Build**: Vite, esbuild, tsx for TypeScript execution

### Development Tools
- **Replit Plugins**: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- **Type Checking**: TypeScript with strict mode enabled