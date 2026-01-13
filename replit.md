# Help the Group - Cancer Support Community

## Overview

Help the Group is a web application designed as a support community for cancer patients and survivors. The platform enables users to join the community through referral links, build support networks through direct referrals, and send email invitations to potential members. It features both user and admin dashboards with referral tracking, user management, and email invitation capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.
Technology preference: PHP, HTML, CSS, Bootstrap, jQuery

## System Architecture

### Frontend Architecture
- **HTML5/CSS3**: Semantic HTML with custom CSS
- **Bootstrap 5**: Responsive grid system and UI components (via CDN)
- **jQuery 3.7**: DOM manipulation and AJAX requests (via CDN)
- **Bootstrap Icons**: Icon library for visual elements
- **Design System**: Premium SaaS aesthetic with calm healthcare theme
  - Primary Blue: #1D4ED8
  - Soft Teal: #22D3EE
  - Accent Green: #10B981
- **Typography**: Poppins for headings, Inter for body text (Google Fonts)

### Backend Architecture
- **Language**: PHP 8.3
- **Server**: PHP built-in development server
- **Authentication**: PHP sessions with password_hash/password_verify
- **Database Connection**: PDO with PostgreSQL driver

### Data Layer
- **Database**: PostgreSQL
- **Connection**: PDO with environment variables (PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD)
- **Database Schema**:
  - `users`: id, name, email, password, referral_code, referred_by, role, is_active, join_date
  - `email_logs`: id, sender_id, recipient_email, subject, message, status, sent_at

### Project Structure
```
/
├── config/
│   ├── database.php      # Database connection and helper functions
│   └── init_db.php       # Database initialization and seeding
├── includes/
│   ├── header.php        # HTML head and meta tags
│   ├── footer.php        # Scripts and closing tags
│   └── sidebar.php       # Dashboard sidebar navigation
├── admin/
│   ├── dashboard.php     # Admin dashboard
│   ├── users.php         # All users list
│   ├── user-detail.php   # Individual user details
│   └── emails.php        # Email logs
├── assets/
│   ├── css/style.css     # Custom styles
│   └── js/main.js        # jQuery scripts
├── index.php             # Landing page
├── login.php             # User login
├── signup.php            # User registration
├── logout.php            # Session logout
├── dashboard.php         # User dashboard
├── referrals.php         # User's referrals list
├── email-invitations.php # Send email invitations
├── about.php             # About Us page
├── how-it-works.php      # How It Works page
├── resources.php         # Resources page
├── contact.php           # Contact Us page
├── faq.php               # FAQ page
├── support.php           # Help Center page
├── privacy.php           # Privacy Policy
├── terms.php             # Terms of Service
└── cookies.php           # Cookie Policy
```

## Key Features

### User Features
- Create account with optional referral code
- Personal dashboard with referral statistics
- Unique referral link with copy functionality
- View and track direct referrals
- Send email invitations to potential members

### Admin Features
- Overview dashboard with community statistics
- View all registered users
- Click on any user to view their details and referrals
- View all email logs sent by members

## Running the Application

To run the PHP server:
```bash
php -S 0.0.0.0:5000
```

To initialize/reset the database:
```bash
php config/init_db.php
```

## SMTP Email Configuration

To enable email sending, set the following environment variables/secrets:
- `SMTP_HOST` - SMTP server hostname (e.g., smtp.gmail.com)
- `SMTP_PORT` - SMTP port (usually 587 for TLS, 465 for SSL)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password or app password
- `SMTP_FROM_EMAIL` - From email address
- `SMTP_FROM_NAME` - From name (optional, defaults to "Help the Group")
- `SMTP_ENCRYPTION` - Encryption type: 'tls' or 'ssl' (optional, defaults to 'tls')

## Admin Credentials
- Email: admin@helpthegroup.com
- Password: admin123

## Sample Users
- Sarah Johnson (sarah@example.com / password123) - Referred by Admin, has 1 referral
- Michael Chen (michael@example.com / password123) - Referred by Sarah
- Emily Davis (emily@example.com / password123) - Referred by Admin
- James Wilson (james@example.com / password123) - Referred by Admin
