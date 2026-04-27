# The Curator — High-End Portfolio & Gallery Engine

A professional portfolio platform built for photographers and designers who refuse to be ordinary.

---

## Project Overview

**The Curator** is a premium, visually immersive portfolio/gallery web application designed specifically for creative professionals like photographers, graphic designers, illustrators, and digital artists. Think Pinterest, but stripped of clutter and rebuilt with intention for serious creators.

The platform focuses entirely on **how work is presented**, treating every image as a piece in a gallery and not just a thumbnail in a feed.

---

## Core Features

### Masonry Grid Layout
- Implemented using [`react-masonry-css`](https://www.npmjs.com/package/react-masonry-css)
- The grid **intelligently reorganizes itself** as the browser window is resized
- Different column counts at different breakpoints (mobile → tablet → desktop)
- Images maintain their natural aspect ratios — no cropping, no distortion

### Light / Dark Mode Toggle
- A seamless **sunset-inspired transition** between light and dark themes
- CSS custom properties (`--color-bg`, `--color-text`, etc.) power the entire theme system
- Smooth animated transition using `transition: all 0.6s ease`

### Category Filtering
- Filter gallery by: **Photography / Design / Illustration / All**
- Smooth re-layout animation when switching filters

### Unsplash API Integration
- Fetches **high-resolution, professional imagery** via the [Unsplash API](https://unsplash.com/developers)
- Images are always premium quality — the platform always looks polished
- Search functionality to pull images by keyword/topic

### Lightbox Preview
- Click any image to open a full-screen lightbox view
- Shows image metadata: photographer name, resolution, tags

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React.js (Vite) |
| Masonry Layout | `react-masonry-css` |
| Styling | CSS Modules + CSS Custom Properties |
| API | Unsplash API (free tier) |
| Routing | React Router DOM |
| Icons | Lucide React |
| Deployment | Vercel / Netlify |

---

## Project Structure
the-curator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top bar with logo + dark mode toggle
│   │   ├── MasonryGrid.jsx     # Core masonry layout using react-masonry-css
│   │   ├── ImageCard.jsx       # Individual image card with hover effects
│   │   ├── Lightbox.jsx        # Full-screen image preview
│   │   └── FilterBar.jsx       # Category filter buttons
│   ├── hooks/
│   │   └── useUnsplash.js      # Custom hook for Unsplash API calls
│   ├── context/
│   │   └── ThemeContext.jsx    # Light/Dark mode state management
│   ├── styles/
│   │   ├── globals.css         # CSS variables, resets, theme tokens
│   │   └── masonry.css         # Masonry column styles
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md

---

## Team Members

| Name |
|----------------------|
| [Member 1 Tanishkka] |
| [Member 2 Kunal Agarwal] |
| [Member 3 Gautam Bhardwaj] |

---

## Project Timeline

| Project setup, Vite + React, Unsplash API integration |
| Masonry grid layout, Image cards, Responsive design |
| Light/Dark mode, Lightbox, Filter system |
| Polish, deployment on Vercel, final testing |

---

## Live Demo

> Coming soon — will be deployed on Vercel

---

*Built for WAP Capstone Project*
