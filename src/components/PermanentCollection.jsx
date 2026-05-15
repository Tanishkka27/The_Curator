import { useState, useEffect } from "react";

// Pull the API key from your environment variables
const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const INITIAL_PIECES = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  aspect: i % 3 === 0 ? "short" : "tall", // Creates a mix of tall/short
  category: i % 2 === 0 ? "Architecture" : "Atmosphere",
}));

const FILTERS = ["Filter All", "Architecture", "Atmosphere"];

// -----------------------------------------------------------
// Gallery Card: Individual image items
// -----------------------------------------------------------
function GalleryCard({ item }) {
  const isTall = item.aspect === "tall";
  
  return (
    <div className={`mb-4 break-inside-avoid overflow-hidden group cursor-pointer bg-[#c8bfb0] 
      ${isTall ? "h-[500px]" : "h-[240px]"}`}>
      
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full animate-pulse bg-[#c8bfb0]" />
      )}
    </div>
  );
}

// -----------------------------------------------------------
// Main Section Component
// -----------------------------------------------------------
export default function PermanentCollection({ dark }) {
  const [activeFilter, setActiveFilter] = useState("Filter All");
  const [galleryItems, setGalleryItems] = useState(INITIAL_PIECES);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadImages() {
      try {
        const url = `https://api.unsplash.com/search/photos?query=architecture,minimalist&per_page=16&client_id=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("API Limit Reached");

        const data = await response.json();

        // Merge the API photos into our local grid data
        const updatedItems = INITIAL_PIECES.map((piece, index) => ({
          ...piece,
          imageUrl: data.results[index]?.urls?.regular,
        }));

        setGalleryItems(updatedItems);
      } catch {
        // Fallback gracefully to direct image URLs if rate limited
        console.warn("Unsplash API rate limit reached. Using fallback images.");
        const fallbackItems = INITIAL_PIECES.map((piece, index) => ({
          ...piece,
          imageUrl: piece.category === "Architecture" 
            ? `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop&sig=${index}`
            : `https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop&sig=${index}`,
        }));
        setGalleryItems(fallbackItems);
      }
    }

    loadImages();
  }, []);

  // Logic: Filter the list based on selection
  const filteredItems = activeFilter === "Filter All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Theme Helpers
  const theme = {
    section: dark ? "bg-[#0c3028] text-[#f0ede6]" : "bg-[#f0ede8] text-[#1a1a1a]",
    subtitle: dark ? "text-[#f0ede6]/55" : "text-[#1a1a1a]/55",
    btn: dark ? "border-[#f0ede6]/40 text-[#f0ede6]" : "border-[#1a1a1a]/40 text-[#1a1a1a]"
  };

  return (
    <section className={`px-10 pt-16 pb-24 transition-colors duration-300 ${theme.section}`}>
      
      {/* Header & Filter Controls */}
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="font-serif text-5xl font-bold mb-3">The Permanent Collection</h2>
          <p className={theme.subtitle}>A curated selection of archival imagery and spatial design studies.</p>
        </div>

        <nav className="flex gap-6 mt-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[10px] tracking-[0.18em] uppercase font-medium pb-1 border-b transition-all
                ${activeFilter === f 
                  ? (dark ? "text-[#f0ede6] border-white" : "text-[#1a1a1a] border-black") 
                  : "text-gray-400 border-transparent hover:text-gray-600"}`}
            >
              {f}
            </button>
          ))}
        </nav>
      </div>

      {error && <p className="text-center text-red-400 mb-8">{error}</p>}

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-4 gap-4">
        {filteredItems.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="flex justify-center mt-16">
        <button className={`text-[11px] tracking-[0.22em] uppercase font-medium border-b pb-1 hover:opacity-50 ${theme.btn}`}>
          Load Archive (2012 — 2024)
        </button>
      </div>
    </section>
  );
}