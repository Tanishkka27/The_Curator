import { useState, useEffect } from "react";

const UNSPLASH_KEY = "0tYUshO3KokmKsm_pmu1SW5-U9A-H7N8Z9kEI0kT2eI";


const piece1 = {};
piece1.id = 1;
piece1.aspect = "tall";
piece1.category = "Architecture";

const piece2 = {};
piece2.id = 2;
piece2.aspect = "short";
piece2.category = "Atmosphere";

const piece3 = {};
piece3.id = 3;
piece3.aspect = "tall";
piece3.category = "Atmosphere";

const piece4 = {};
piece4.id = 4;
piece4.aspect = "tall";
piece4.category = "Architecture";

const piece5 = {};
piece5.id = 5;
piece5.aspect = "short";
piece5.category = "Architecture";

const piece6 = {};
piece6.id = 6;
piece6.aspect = "tall";
piece6.category = "Atmosphere";

const piece7 = {};
piece7.id = 7;
piece7.aspect = "tall";
piece7.category = "Atmosphere";

const piece8 = {};
piece8.id = 8;
piece8.aspect = "short";
piece8.category = "Architecture";

const piece9 = {};
piece9.id = 9;
piece9.aspect = "tall";
piece9.category = "Architecture";

const piece10 = {};
piece10.id = 10;
piece10.aspect = "tall";
piece10.category = "Atmosphere";

const piece11 = {};
piece11.id = 11;
piece11.aspect = "short";
piece11.category = "Atmosphere";

const piece12 = {};
piece12.id = 12;
piece12.aspect = "short";
piece12.category = "Architecture";

const piece13 = {};
piece13.id = 13;
piece13.aspect = "tall";
piece13.category = "Atmosphere";

const piece14 = {};
piece14.id = 14;
piece14.aspect = "short";
piece14.category = "Architecture";

const piece15 = {};
piece15.id = 15;
piece15.aspect = "short";
piece15.category = "Atmosphere";

const piece16 = {};
piece16.id = 16;
piece16.aspect = "short";
piece16.category = "Architecture";

const pieces = [
  piece1, piece2, piece3, piece4,
  piece5, piece6, piece7, piece8,
  piece9, piece10, piece11, piece12,
  piece13, piece14, piece15, piece16,
];

const filters = ["Filter All", "Architecture", "Atmosphere"];



function GalleryCard({ item }) {
  let heightClass = "";
  if (item.aspect === "tall") {
    heightClass = "h-[500px]";
  } else {
    heightClass = "h-[240px]";
  }

  return (
    <div className={`mb-4 break-inside-avoid overflow-hidden group cursor-pointer ${heightClass} bg-[#c8bfb0]`}>
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-[#c8bfb0] animate-pulse" />
      )}
    </div>
  );
}


function FilterTabs({ active, setActive, dark }) {
  return (
    <div className="flex items-center gap-6 mt-2 flex-shrink-0">
      {filters.map(function (filterName) {
        let tabClass = "text-[10px] tracking-[0.18em] uppercase font-medium pb-1 transition-all ";

        if (active === filterName) {
          if (dark) {
            tabClass += "text-[#f0ede6] border-b border-[#f0ede6]";
          } else {
            tabClass += "text-[#1a1a1a] border-b border-[#1a1a1a]";
          }
        } else {
          if (dark) {
            tabClass += "text-[#f0ede6]/40 hover:text-[#f0ede6]/70";
          } else {
            tabClass += "text-[#1a1a1a]/35 hover:text-[#1a1a1a]/70";
          }
        }

        return (
          <button
            key={filterName}
            onClick={function () { setActive(filterName); }}
            className={tabClass}
          >
            {filterName}
          </button>
        );
      })}
    </div>
  );
}


export default function PermanentCollection({ dark }) {
  const [active, setActive] = useState("Filter All");

  const [galleryItems, setGalleryItems] = useState(pieces);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchImages() {
      const url = "https://api.unsplash.com/photos/random?query=architecture+atmosphere+art&count=16&client_id=" + UNSPLASH_KEY;

      const response = await fetch(url);

      if (response.ok === false) {
        setError("Could not load images. Check your Unsplash API key.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      const updatedItems = galleryItems.map(function (piece, index) {
        const updatedPiece = {};
        updatedPiece.id = piece.id;
        updatedPiece.aspect = piece.aspect;
        updatedPiece.category = piece.category;

        if (data[index]) {
          updatedPiece.imageUrl = data[index].urls.regular;
        }

        return updatedPiece;
      });

      setGalleryItems(updatedItems);
      setLoading(false);
    }

    fetchImages();
  }, []);


  let filtered = [];
  if (active === "Filter All") {
    filtered = galleryItems;
  } else {
    filtered = galleryItems.filter(function (piece) {
      return piece.category === active;
    });
  }

  let sectionClass = "px-10 pt-16 pb-24 relative transition-colors duration-300 ";
  if (dark) {
    sectionClass += "bg-[#0c3028] text-[#f0ede6]";
  } else {
    sectionClass += "bg-[#f0ede8] text-[#1a1a1a]";
  }

  let subtitleClass = "text-sm ";
  if (dark) {
    subtitleClass += "text-[#f0ede6]/55";
  } else {
    subtitleClass += "text-[#1a1a1a]/55";
  }

  let archiveBtnClass = "text-[11px] tracking-[0.22em] uppercase font-medium border-b pb-1 transition-opacity hover:opacity-50 ";
  if (dark) {
    archiveBtnClass += "border-[#f0ede6]/40 text-[#f0ede6]";
  } else {
    archiveBtnClass += "border-[#1a1a1a]/40 text-[#1a1a1a]";
  }

  return (
    <section className={sectionClass}>

      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="font-serif text-5xl font-bold mb-3">
            The Permanent Collection
          </h2>
          <p className={subtitleClass}>
            A curated selection of archival imagery and spatial design studies.
          </p>
        </div>
        <FilterTabs active={active} setActive={setActive} dark={dark} />
      </div>

      {error ? (
        <p className="text-center text-red-400 mb-8">{error}</p>
      ) : null}

      <div className="columns-4 gap-4">
        {filtered.map(function (item) {
          return (
            <GalleryCard key={item.id} item={item} dark={dark} />
          );
        })}
      </div>

      <div className="flex justify-center mt-16">
        <button className={archiveBtnClass}>
          Load Archive (2012 — 2024)
        </button>
      </div>

    </section>
  );
}