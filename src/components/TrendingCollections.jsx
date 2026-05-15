import { useState, useEffect } from "react";

const UNSPLASH_KEY = "0tYUshO3KokmKsm_pmu1SW5-U9A-H7N8Z9kEI0kT2eI";

const collections = [
  { id: 1, title: "Linear Geometry", count: 24, curator: "A. Rossi", bg: "bg-[#c8bfb0]" },
  { id: 2, title: "Tactile Earth", count: 18, curator: "Studio O", bg: "bg-[#7a5a30]" },
  { id: 3, title: "Chromotherapy", count: 32, curator: "The Curator", bg: "bg-[#c0b8b0]" },
];


function CollectionCard({ col, index, dark }) {
  let wrapperClass = "";
  if (index === 1) {
    wrapperClass = "mt-8";
  }

  let metaClass = "text-[10px] tracking-[0.15em] uppercase ";
  if (dark) {
    metaClass += "text-[#f0ede6]/50";
  } else {
    metaClass += "text-[#1a1a1a]/50";
  }

  return (
    <div className={wrapperClass}>
      <div className={`w-full h-[460px] overflow-hidden group cursor-pointer ${col.bg}`}>
        {col.imageUrl ? (
          <img
            src={col.imageUrl}
            alt={col.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full animate-pulse ${col.bg}`} />
        )}
      </div>

      <div className="mt-4">
        <h3 className="font-serif text-2xl font-bold mb-1">{col.title}</h3>
        <p className={metaClass}>
          {col.count} Artworks &bull; Curated by {col.curator}
        </p>
      </div>
    </div>
  );
}


export default function TrendingCollections({ dark }) {
  const [items, setItems] = useState(collections);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchCovers() {
      const url = "https://api.unsplash.com/photos/random?query=fine+art+editorial&count=3&client_id=" + UNSPLASH_KEY;

      const response = await fetch(url);

      if (response.ok === false) {
        setError("Could not load collection covers. Check your Unsplash API key.");
        return;
      }

      const data = await response.json();

      const updated = items.map(function (col, index) {
        const updatedCol = {};
        updatedCol.id = col.id;
        updatedCol.title = col.title;
        updatedCol.count = col.count;
        updatedCol.curator = col.curator;
        updatedCol.bg = col.bg;

        if (data[index]) {
          updatedCol.imageUrl = data[index].urls.regular;
        }

        return updatedCol;
      });

      setItems(updated);
    }

    fetchCovers();
  }, []);


  let sectionClass = "px-10 py-16 transition-colors duration-300 ";
  if (dark) {
    sectionClass += "bg-[#0c3028] text-[#f0ede6]";
  } else {
    sectionClass += "bg-[#f0ede8] text-[#1a1a1a]";
  }

  let eyebrowClass = "text-[10px] tracking-[0.2em] uppercase mb-2 ";
  if (dark) {
    eyebrowClass += "text-[#c9a227]";
  } else {
    eyebrowClass += "text-[#1a1a1a]/50";
  }

  let viewAllClass = "text-[11px] tracking-[0.2em] uppercase font-medium border-b pb-0.5 transition-opacity hover:opacity-60 ";
  if (dark) {
    viewAllClass += "border-[#f0ede6]";
  } else {
    viewAllClass += "border-[#1a1a1a]";
  }

  return (
    <section className={sectionClass}>

      <div className="flex items-end justify-between mb-10">
        <div>
          <p className={eyebrowClass}>Curated Selections</p>
          <h2 className="font-serif text-4xl font-bold">Trending Collections</h2>
        </div>
        <button className={viewAllClass}>View All</button>
      </div>

      {error ? (
        <p className="text-center text-red-400 mb-8">{error}</p>
      ) : null}

      <div className="grid grid-cols-3 gap-6 items-start">
        {items.map(function (col, i) {
          return (
            <CollectionCard key={col.id} col={col} index={i} dark={dark} />
          );
        })}
      </div>

    </section>
  );
}