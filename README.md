# Nau K Do — Website

> **"Loud, on purpose."**  
> Social-first creative agency for ambitious brands across India and Western markets.

---

## Overview

Nau K Do provides end-to-end creative production:
- **Social Media Management & Posting**
- **Content Creation & Real-Camera Shoots**
- **Website Design & Development**
- **Logo & Brand Identity**
- **Video Editing & Motion Graphics**

Built strictly following the official **Nau K Do Brand Kit v2.0**:
- **Palette**: Signature Red (`#D70406`), Ink (`#141414`), Cream (`#FAF5EE`), White (`#FFFFFF`), Warm Grey (`#6B635D`).
- **Typography**: Single type family **Poppins** via `next/font/google`.
- **Styling**: 20px rounded corners, sticker badges, pill buttons, responsive layout, full-red and ink contrast panels.
- **Logos**: Supplied vector wordmarks in `/public/brand/` (`logo-red.svg`, `logo-white.svg`, `logo-black.svg`) and favicon (`mark-n-white.png`).

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations & Icons**: Framer Motion, Lucide React
- **Fonts**: Poppins (`next/font/google`)
- **Deployment**: Vercel-ready with zero additional configuration

---

## Getting Started

### 1. Prerequisites
Ensure you have Node.js (v18.17+ or v20+) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## Deployment (Vercel)

This project is fully optimized for **Vercel** with zero extra configuration required:
1. Push this repository to GitHub, GitLab, or Bitbucket.
2. In the Vercel dashboard, click **"Add New Project"** and select the repository.
3. Framework Preset: **Next.js** (detected automatically).
4. Root Directory: `./` (root).
5. Click **"Deploy"**. The site will build cleanly and deploy instantly.

---

## Content & Placeholder Configuration

### 1. Central Site Config (`/content/site.ts`)
Controls company metadata, WhatsApp contact number, prefilled chat message, and optional social channels:
```typescript
export const siteConfig = {
  name: "Nau K Do",
  tagline: "Loud, on purpose.",
  whatsapp: "919829396397", // Your 10 or 12 digit WhatsApp number
  whatsappMessage: "Hi Nau K Do! I would love to talk about our brand and content.",
  email: null, // Set to your email (e.g. "hello@naukdo.com") to display email buttons
  instagram: null, // Set to handle (e.g. "naukdo") to display Instagram link
  url: "https://naukdo.com",
};
```
*Note: In compliance with brand guidelines, email and Instagram links only render when a real value is provided.*

### 2. Projects & Portfolio (`/content/projects.ts`)
All projects are currently set up as honest sample layouts (`type: "placeholder"` with "Sample layout" badges). To replace with a real client case study:
1. Open `/content/projects.ts`.
2. Update the project object:
   - `slug`: unique URL identifier
   - `title`: project or client name
   - `category`: service category
   - `type`: change `"placeholder"` to `"client"`
   - `overview`: brief project description
   - `deliverables`: list of deliverables
   - `media`: array of image or video objects (e.g. `{ type: "video", url: "/projects/<slug>/reel.mp4", poster: "..." }`)
3. Drop the corresponding media files in `/public/projects/<slug>/`.

---

## Project Structure

```
├── content/               # Centralized data sources
│   ├── site.ts            # Site configuration, tagline, contact numbers
│   └── projects.ts        # Project definitions & sample layouts
├── public/
│   ├── brand/             # Supplied official SVG & PNG logos & mark
│   └── projects/          # Directory for project media assets (images, mp4)
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Home page
│   │   ├── work/          # /work and /work/[slug]
│   │   ├── services/      # /services
│   │   ├── about/         # /about
│   │   ├── contact/       # /contact (WhatsApp-first, no forms)
│   │   ├── layout.tsx     # Root layout with Poppins & shared Header/Footer
│   │   ├── sitemap.ts     # Dynamic XML sitemap
│   │   └── robots.ts      # Robots.txt configuration
│   └── components/        # Reusable UI components
│       ├── Navbar.tsx     # Shared header with SVG logo & WhatsApp CTA
│       ├── Footer.tsx     # Shared Ink panel footer
│       ├── Marquee.tsx    # Infinite looping services marquee
│       ├── HeroTiles.tsx  # 9:16 and 1:1 interactive reel strip
│       ├── ProjectCard.tsx# Universal project card
│       └── ProcessCards.tsx# 5-step process workflow
├── tailwind.config.ts     # Brand colors (#D70406, #141414, etc.) & 20px radii
└── tsconfig.json          # TypeScript config with path aliases
```
