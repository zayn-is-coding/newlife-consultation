# Feature Todo — New Life Consulting

> Actionable checklist derived from client survey requirements.
> Status: `pending` | `in_progress` | `blocked` | `done` | `deferred`

---

## Phase 1 — Launch Essentials

### Booking / Appointment System
- [ ] Decide on solution: Calendly embed, Cal.com, or custom calendar
- [ ] If Calendly: create account, set up 30-min free consultation slot
- [ ] If custom: build `/booking` page with date/time picker
- [ ] Replace "Book Now" navbar CTA link with booking URL
- [ ] Replace "Book Free Consultation" button links with booking URL
- [ ] Add booking confirmation email via Resend
- [ ] Test booking flow end-to-end

### Newsletter Signup
- [ ] Decide on provider: Resend Audiences, Mailchimp, or ConvertKit
- [ ] Create audience/list in chosen provider
- [ ] Build `NewsletterSignup` component (email input + submit)
- [ ] Add component to footer (all pages)
- [ ] Optionally add inline section on homepage
- [ ] Create `/api/newsletter` POST route
- [ ] Add confirmation/success toast
- [ ] Style to match existing design system

### Social Media Integration
- [ ] Get real social media URLs from client (Facebook, Instagram, Twitter/X, LinkedIn)
- [ ] Update `Footer.tsx` social links from `#` to real URLs
- [ ] Add `sameAs` URLs to structured data in `lib/metadata.ts`
- [ ] Add Open Graph profile links if applicable

### Domain & Hosting
- [ ] Help client purchase domain name
- [ ] Set up Vercel hosting (or client's preferred host)
- [ ] Configure DNS records
- [ ] Ensure SSL certificate is active
- [ ] Set `SITE_URL` env variable to production domain
- [ ] Verify all OG images and structured data use correct production URL

### Logo
- [ ] Receive logo file from client (SVG preferred, min 112x112px)
- [ ] Replace "NL" text badge in Navbar with logo image
- [ ] Replace "NL" text badge in OG image (`/api/og`) with logo
- [ ] Add logo to structured data (`organizationSchema.logo`)
- [ ] Add favicon from logo

### Client Photos
- [ ] Receive actual photos from client
- [ ] Replace Unsplash placeholder images in:
  - [ ] Homepage value props (`proven-results.jpg`, `personal-touch.jpg`, `fast-simple.jpg`)
  - [ ] Homepage parallax breaks
  - [ ] About page workspace photos
  - [ ] Services page parallax break
  - [ ] Contact page (if applicable)
- [ ] Optimize images for web (WebP, proper dimensions)
- [ ] Update OG background images if changed

### Copywriting
- [ ] Review all page headlines with client
- [ ] Review all page body copy with client
- [ ] Review service descriptions
- [ ] Review pricing plan descriptions
- [ ] Review FAQ questions and answers
- [ ] Review meta titles and descriptions
- [ ] Ensure brand voice is consistent: "bold and playful with warm welcoming feel"

---

## Phase 2 — Post-Launch Features

### Blog System
- [ ] Decide on approach: MDX files, headless CMS (Sanity/Strapi), or Notion API
- [ ] Set up blog infrastructure
- [ ] Create `/blog` page with post listing
- [ ] Create blog post template with:
  - [ ] Featured image
  - [ ] Author info
  - [ ] Published date
  - [ ] Reading time
  - [ ] Social share buttons
- [ ] Add Article structured data to blog posts
- [ ] Add RSS feed
- [ ] Create initial 3-5 posts (credit tips, client stories, industry news)
- [ ] Add blog link to navbar and footer

### Portfolio / Case Studies
- [ ] Create `/portfolio` or `/results` page
- [ ] Design case study card component
- [ ] Create individual case study template
- [ ] Include: client photo (with permission), score before/after, timeline, testimonial
- [ ] Add BreadcrumbList structured data
- [ ] Link from services page "Real Results" section

### Testimonials Page
- [ ] Create `/testimonials` page
- [ ] Build testimonial card component with:
  - [ ] Client initials or photo
  - [ ] Star rating
  - [ ] Quote text
  - [ ] Service used
  - [ ] Score improvement (if applicable)
- [ ] Move/add more testimonials beyond the 6 on homepage
- [ ] Add AggregateRating structured data if feasible
- [ ] Link from navbar or footer

### Online Payments (If Needed)
- [ ] Confirm with client if online payments are required
- [ ] If yes: set up Stripe account
- [ ] Create pricing/checkout flow
- [ ] Build `/checkout` page
- [ ] Add payment confirmation email
- [ ] Add Order/Product structured data

### User Accounts (If Needed)
- [ ] Confirm with client if user accounts are required
- [ ] If yes: set up auth (NextAuth, Clerk, or similar)
- [ ] Build login/signup pages
- [ ] Build client dashboard:
  - [ ] View credit score progress
  - [ ] Download reports
  - [ ] Message consultant
  - [ ] View billing

### Multi-language (If Needed)
- [ ] Confirm with client if multi-language is required
- [ ] If yes: set up next-intl or similar
- [ ] Translate all content to required languages
- [ ] Add language switcher to navbar
- [ ] Update `hreflang` tags in metadata

---

## Technical Debt / Improvements

- [ ] Remove unused components: `ResultsShowcase`, `TiltOnHover`
- [ ] Remove unused SVGs: `pie-and-charts.svg`, `Partnership.svg`, `Team Brainstorming 3.svg`
- [ ] Remove unused Next.js default assets: `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `file.svg`
- [ ] Remove `mantas-hesthaven-_g1WdcKcV3w-unsplash.jpg` if not needed
- [ ] Add proper error boundaries for each page
- [ ] Add 404 page with helpful navigation
- [ ] Set up Google Search Console and verify site
- [ ] Set up Google Analytics or Plausible
- [ ] Run Lighthouse audit and fix any issues
- [ ] Test all forms on mobile devices
- [ ] Ensure all images have proper alt text
