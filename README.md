
# The Curator

A high-end gallery and portfolio platform for photographers, designers, and illustrators who take their craft seriously.

---

## What Is This?

The Curator is a clean, minimal gallery web app built for creative professionals. Think of it as a curated art exhibition — not a chaotic image dump. Every piece gets the space and attention it deserves.

It has a light mode and a dark mode, a filterable masonry grid, trending collections, featured artists, and an artist profile hero — all in one scroll.

---

## Features

- **Light / Dark Mode** — toggle with one click, smooth transition across every section
- **Masonry Grid** — images stack naturally without cropping, using CSS columns
- **Category Filter** — switch between Architecture, Atmosphere, or view all
- **Trending Collections** — staggered 3-column layout with hover zoom
- **Featured Artists** — side-by-side cards with portrait + bio + CTA buttons
- **Artist Hero** — big featured profile with stats, bio, and action buttons
- **Real Images via API** — photos fetched live from Unsplash on page load
>>>>>>> d10fbcb (API Fetched successfully)

---

## Tech Stack

| What       | How                  |
|------------|----------------------|
| Framework  | React (Vite)         |
| Styling    | Tailwind CSS         |
| Icons      | Lucide React         |
| Fonts      | Serif + system       |
| Images     | Unsplash API         |
| Deployment | Vercel / Netlify     |

No extra libraries. No Redux. No routing. Just React + Tailwind + Fetch API.

---

## Folder Structure

```
>>>>>>> d10fbcb (API Fetched successfully)
the-curator/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Logo + dark mode toggle
│   │   ├── Hero.jsx                # Top headline section
│   │   ├── FilterTabs.jsx          # All / Photography / Design / Illustration
│   │   ├── PermanentCollection.jsx # Masonry grid — fetches 16 images
│   │   ├── TrendingCollections.jsx # 3-col cards — fetches 3 cover images
│   │   ├── FeaturedArtists.jsx     # Artist cards — fetches 2 portrait photos
│   │   └── ArtistHero.jsx          # Big profile section — fetches 1 hero photo
│   ├── App.jsx                     # Root — holds dark mode state, renders all sections
│   └── main.jsx                    # Entry point
├── package.json
└── README.md
```

---

## How to Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173` and you're good.

---

## Setting Up the Unsplash API (Required for Images)

The app pulls all photos from [Unsplash](https://unsplash.com/developers), which is free.

### Step 1 — Get your API key

1. Go to [https://unsplash.com/developers](https://unsplash.com/developers)
2. Click **"Register as a developer"** and sign up (free)
3. Click **"New Application"**
4. Fill in the form (app name, description — anything works)
5. Scroll down and copy your **Access Key**

### Step 2 — Add it to the components

Open each of these four files and find this line at the top:

```js
const UNSPLASH_KEY = "YOUR_UNSPLASH_ACCESS_KEY";
```

Replace `YOUR_UNSPLASH_ACCESS_KEY` with the key you copied. You need to do this in:

- `PermanentCollection.jsx`
- `TrendingCollections.jsx`
- `FeaturedArtists.jsx`
- `ArtistHero.jsx`

### Step 3 — Done

Save and refresh. Images will now load from Unsplash automatically.

> **Note:** The free Unsplash plan allows 50 requests per hour, which is more than enough for development and demo use.

---

## How the Image Fetching Works (Simple Explanation)

Each component that needs images does the same three steps:

```
1. Component loads on screen
       ↓
2. useEffect runs → fetch() sends a request to Unsplash
       ↓
3. We get back an array of photo objects → we attach the URLs to our items → React re-renders with real images
```

While the fetch is happening, each card shows a light grey shimmer (via `animate-pulse`) so the layout doesn't jump around.

If the API key is wrong or the request fails, an error message appears in place of the images.

---

## How Dark Mode Works

Dark mode state lives in `App.jsx`. It passes a `dark` prop down to every component. Each component uses it to swap Tailwind classes between light and dark values.

```jsx
// In App.jsx
const [dark, setDark] = useState(false);

// Passed to every component
<Navbar dark={dark} toggleDark={() => setDark(!dark)} />
<Hero dark={dark} />
// ...and so on
```

No CSS variables needed — it's all just conditional Tailwind classes.

---

## Team

| Name              |
|-------------------|
| Tanishkka         |
| Kunal Agarwal     |
| Gautam Bhardwaj   |

---

## Timeline

| Week | Work                                                        |
|------|-------------------------------------------------------------|
| 1    | Project setup, Vite + React, component scaffolding          |
| 2    | Masonry grid, image cards, responsive layout                |
| 3    | Dark mode, filters, collections + artist sections           |
| 4    | Unsplash API integration, loading states, polish, deploy    |

---

*Built for WAP Capstone Project*
>>>>>>> d10fbcb (API Fetched successfully)
