# Luxe Beauty Studio — Demo Website

A fully-featured **salon and spa demo website** built as a static HTML/CSS/JS site. Designed as a portfolio demonstration for AI-powered booking automation, social content generation, and client retention workflows.

---

## Live Demo

**GitHub Repository:** https://github.com/MSMITH71910/Salon_Spa_Demo_SIte

---

## Fake Business Credentials (Demo Only)

| Field | Value |
|---|---|
| **Business Name** | Luxe Beauty Studio & Spa |
| **Owner** | Sophia Laurent, Color Director |
| **Phone** | (555) 874-2190 |
| **Email** | hello@luxebeautystudio.com |
| **Address** | 2847 Lakeside Blvd, Columbus, OH 43210 |
| **License** | OH-COS-48192 (fake) |
| **Founded** | 2012 |
| **Google Rating** | 4.9/5 — 680+ reviews (simulated) |
| **Instagram** | @LuxeBeautyStudio — 28K followers (simulated) |

---

## Pages (7 Total)

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Hero, services overview, team preview, automation showcase, testimonials |
| Services & Pricing | `services.html` | Full menu: hair, facials, massage, nails, bridal + Instagram Caption Studio |
| Our Team | `stylists.html` | 6 stylist profiles with bios, specialties, and booking links |
| Photo Gallery | `gallery.html` | 18 photos across hair, nails, skincare, spa, and studio interior |
| Memberships | `membership.html` | 3-tier plan comparison (Essential $49 / Luxe $99 / VIP $189) |
| Book Appointment | `booking.html` | Full booking form with service picker, stylist selection, and SMS confirmation |
| Contact | `contact.html` | General contact form, bridal inquiry form, Google review CTA |

---

## Key Features

### AI Booking Chatbot — Aria
- Floating chat widget on every page
- 18+ conversation topics: hair color, balayage, highlights, facials, massage, nails, bridal, membership, pricing, location, products, gift cards, reviews, cancel/reschedule, stylists, Instagram
- Quick-reply buttons throughout conversation
- Auto-greeting appears after 3 seconds with notification badge
- Smooth spring animation on open/close

### Instagram Caption Generator
- On the Services page — interactive "Caption Studio" panel
- 6 pre-written AI-style captions rotate on click
- Full hashtag set displayed below each caption
- Copy to clipboard button with confirmation feedback

### Appointment Reminder Automation (Simulated)
- 24-hour SMS reminder shown via modal on booking confirmation
- Automated sequence preview displayed in booking sidebar

### Lapsed Client Reactivation (60-Day Trigger)
- Simulated via demo modals on Index and Membership pages
- "We miss you" email preview with 20% off returning-client offer

### Post-Visit Review Request
- Demo modal showing automated SMS + email sent 24 hours after appointment
- Google review link simulation

### Membership Program
- 3 tiers (Essential / Luxe / VIP)
- Full side-by-side comparison table
- FAQ section with 5 common questions

### Portfolio Gallery with 18 Photos
- Hair color, balayage, cuts & blowouts, skincare, massage, nails, studio interior
- Hover overlays with service tag and caption

---

## Tech Stack

- **HTML5 / CSS3 / Vanilla JS** — no frameworks or dependencies
- **Font Awesome 6** — icons via CDN
- **Google Fonts** — Playfair Display (headings) + Inter (body)
- **Unsplash** — royalty-free photo URLs
- **IntersectionObserver** — scroll fade-in animations
- **CSS Custom Properties** — full color system (plum/gold/rose/cream palette)

---

## Team Roster (All Fake)

| Name | Role | Specialty |
|---|---|---|
| Sophia Laurent | Color Director | Balayage, color correction, vivid color |
| Jade Williams | Balayage Specialist | Hand-painted balayage |
| Elena Rossi | Lead Esthetician | Anti-aging, acne, Dermalogica educator |
| Marcus Bell | Style Specialist | Precision cuts, blowouts, men's |
| Priya Sharma | Licensed Massage Therapist | Swedish, deep tissue, hot stone, prenatal |
| Chloe Davis | Nail Art Specialist | Gel sets, acrylics, 3D nail art |

---

## Customization Guide

To adapt this for a real salon client:

1. **Replace all fake credentials** in the top bar, footer, contact page, and `<meta>` tags
2. **Update photos** — replace Unsplash URLs with real client photos
3. **Update pricing** — edit the `price-row-price` values in `services.html`
4. **Connect a real booking system** — replace the form submit handler in `js/main.js` with a Calendly embed, Vagaro, or Mindbody link
5. **Connect SMS** — integrate Twilio or SimpleTexting for the appointment reminder and review request flows
6. **Connect Instagram Caption AI** — wire the generator to OpenAI or Claude API for true AI captions
7. **Update chatbot** — expand `botResponses` in `js/main.js` with client-specific details

---

## Automation Workflows to Build (Production)

| Automation | Tool | Trigger |
|---|---|---|
| Appointment Confirmation SMS | Twilio | Form submit |
| 24-Hour Reminder | Twilio + Make.com | Scheduled |
| Post-Visit Review Request | Twilio / Mailchimp | 24 hr after appointment date |
| 60-Day Reactivation Email | Mailchimp / Make.com | 60 days since last booking |
| Instagram Caption Generator | OpenAI API | Weekly scheduled |

---

*This is a demo website. All credentials, reviews, and data are fictional and for demonstration purposes only.*
