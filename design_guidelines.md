# Design Guidelines: Help the Group - Cancer Support Community

## Design Philosophy
Premium SaaS aesthetic with calm, trustworthy healthcare theme. Clean, card-based layouts with professional polish. Desktop-first approach (1440px). No clutter, minimal animations.

## Color Palette
- **Primary Blue**: #1D4ED8
- **Soft Teal**: #22D3EE  
- **Accent Green**: #10B981
- **Background**: #F9FAFB
- **Card Background**: #FFFFFF
- **Border**: #E5E7EB
- **Primary Text**: #111827
- **Secondary Text**: #6B7280

## Typography
- **Headings**: Poppins (Google Font)
- **Body**: Inter (Google Font)
- **H1**: 36px bold
- **H2**: 28px semibold
- **H3**: 22px semibold
- **Body**: 16px regular

## Component Specifications
- **Buttons**: 8px border radius
- **Cards**: 12px border radius, shadow: 0 1px 3px rgba(0,0,0,0.1)
- **Inputs**: 8px border radius
- **Layout**: Bootstrap 5 container (max-width 1440px), 12-column grid
- **Dashboard Layout**: Sidebar navigation pattern

## Page Structures

### 1. Landing Page (index.html)
- Header: Logo left, Login + "Join Community" buttons right
- Hero Section: "You Are Not Alone" headline, subtitle about support community, primary CTA
- "How It Works": 3-card grid (Join → Invite → Support & Grow)
- Trust/Purpose section
- Footer with links

### 2. Login Page (login.html)
Centered card with Email, Password fields, Login button

### 3. Signup Page (signup.html)
Form with: Name, Email, Password, Referral Code (readonly/auto-filled), "Create Account" button

### 4. User Dashboard (dashboard-user.html)
- Sidebar: Dashboard, Referrals, Email Invitations, Logout
- Stats cards: Total Referrals, Level 1, Level 2, Join Date
- Referral link card with copy button
- Referral users table: Name | Email | Level | Join Date

### 5. Admin Dashboard (dashboard-admin.html)
- Admin stats: Total Users, Active Users, Total Referrals, Daily Growth
- Users management table: Name | Email | Referral Count | Status

### 6. Email Invitations (email.html)
**Section A - Send Email**: Multi-email input, Subject, Message textarea with {{REFERRAL_URL}} placeholder, Send button
**Section B - Email Logs**: Table with Recipient Email | Sender Role | Date | Status

## Images
No hero images required for this healthcare-focused application. Focus on clean, professional UI with icon-based visual elements.

## Technical Constraints
- HTML5, CSS3, Bootstrap 5, jQuery only
- No frameworks (React/Vue/Angular/Next.js)
- Semantic HTML, clean class naming
- Use Bootstrap 5 and jQuery CDNs
- Well-commented, readable code