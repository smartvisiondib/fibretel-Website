# CyberNet ISP Website - PRD

## Original Problem Statement
Build a Broadband Internet Service Provider website with:
- New Connection form option
- Contact Us option
- Tariff Plan options (10 plans)
- My Services options (informational cards)

## User Choices
- 10 tariff plans
- Basic info form (Name, Email, Phone, Address, Plan Selection)
- Informational cards for services
- Modern & Professional dark theme
- Backend integrations for form storage

## Tech Stack
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB
- **Theme**: Cyber-Utility dark theme (#030712 bg, Cyan accents)

## Core Requirements
| Feature | Status |
|---------|--------|
| Home page with hero | ✅ Implemented |
| 10 Tariff Plans | ✅ Implemented |
| New Connection Form | ✅ Implemented |
| Contact Us Form | ✅ Implemented |
| My Services Page | ✅ Implemented |
| MongoDB Storage | ✅ Implemented |
| Dark Theme | ✅ Implemented |

## What's Been Implemented (Dec 2024)
1. **Homepage**: Hero section, features grid, popular plans preview, CTA
2. **Tariff Plans**: 10 plans (7 Home, 3 Business) with tabs filter
3. **New Connection**: Form with validation, plan selection, success screen
4. **Contact Us**: Form with validation, contact info cards
5. **My Services**: 8 service cards in bento grid layout
6. **Navigation**: Responsive navbar with mobile sheet menu
7. **Footer**: Brand info, quick links, contact details

## API Endpoints
- `GET /api/plans` - Get all tariff plans
- `GET /api/plans?plan_type=Home|Business` - Filter by type
- `POST /api/connections` - Submit new connection request
- `POST /api/contact` - Submit contact message

## Prioritized Backlog

### P0 (Critical) - DONE
- ✅ All core pages functional
- ✅ Forms submit to backend
- ✅ Plan selection working

### P1 (Important) - Future
- Admin dashboard for managing requests
- Email notifications on form submission
- Bill payment integration
- Customer login portal

### P2 (Nice to Have)
- Speed test feature
- Live chat support
- Plan comparison tool
- Coverage area checker

## Next Tasks
1. Add email notifications (Resend/SendGrid)
2. Admin dashboard for connection requests
3. Customer portal with account management
