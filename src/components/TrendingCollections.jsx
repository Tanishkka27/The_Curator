import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

function CollectionCard({ item, index, isDark }) {
  const isStaggered = index === 1;
  const textColor = isDark ? "text-[#f0ede6]/50" : "text-[#1a1a1a]/50";

  return (
    <div className={isStaggered ? "mt-8" : ""}>
      <div className="w-full h-[460px] overflow-hidden group cursor-pointer bg-[#e5e5e5]">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full animate-pulse bg-gray-300" />
        )}
      </div>

      <div className="mt-4">
        {/* We use a fallback title if the photo has no description */}
        <h3 className="font-serif text-2xl font-bold mb-1 capitalize">
          {item.title || "Untitled Perspective"}
        </h3>
        <p className={`text-[10px] tracking-[0.15em] uppercase ${textColor}`}>
          Art No. {item.id} &bull; Photo by {item.curator}
        </p>
      </div>
    </div>
  );
}

export default function TrendingCollections({ dark }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFreshContent = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=minimalist+architecture&count=3&client_id=${API_KEY}`
        );

        if (!response.ok) throw new Error("Connection issues");

        const data = await response.json();

        // Create the collection objects directly from the API results
        const dynamicContent = data.map((photo) => ({
          id: photo.id.slice(0, 4), // Use part of the Unsplash ID
          title: photo.alt_description || photo.description,
          curator: photo.user.name,
          imageUrl: photo.urls.regular,
        }));

        setCollections(dynamicContent);
      } catch {
        console.warn("Unsplash API rate limit reached. Using fallback images.");
        setCollections([
          { id: "1001", title: "Brutalist Silence", curator: "Julian Vane", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
          { id: "1002", title: "Urban Shadows", curator: "Elena Vosc", imageUrl: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=800&auto=format&fit=crop" },
          { id: "1003", title: "Concrete Layers", curator: "Mark Thorne", imageUrl: "https://images.unsplash.com/photo-1506526190800-47b15d65ea74?q=80&w=800&auto=format&fit=crop" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFreshContent();
  }, []);

  const theme = {
    section: dark ? "bg-[#0c3028] text-[#f0ede6]" : "bg-[#f0ede8] text-[#1a1a1a]",
    eyebrow: dark ? "text-[#c9a227]" : "text-[#1a1a1a]/50",
    button: dark ? "border-[#f0ede6]" : "border-[#1a1a1a]"
  };

  return (
    <section className={`px-10 py-16 transition-colors duration-300 ${theme.section}`}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 ${theme.eyebrow}`}>
            Live Feed
          </p>
          <h2 className="font-serif text-4xl font-bold">New Discoveries</h2>
        </div>
        <button className={`text-[11px] tracking-[0.2em] uppercase font-medium border-b pb-0.5 hover:opacity-60 ${theme.button}`}>
          Refresh Gallery
        </button>
      </div>

      {loading && <p className="text-center opacity-50">Curating images...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      <div className="grid grid-cols-3 gap-6 items-start">
        {collections.map((item, i) => (
          <CollectionCard 
            key={item.id} 
            item={item} 
            index={i} 
            isDark={dark} 
          />
        ))}
      </div>
    </section>
  );
}