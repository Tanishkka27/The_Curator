import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const key=import.meta.env.VITE_UNSPLASH_ACCESS_KEY


const artists = [
  {
    id: 1,
    name: "Julian Thorne",
    bio: "Thorne's work explores the intersection of brutalist architecture and digital fluidity, creating pieces that feel both ancient and futuristic.",
    bg: "bg-[#3a3a3a]",
  },
  {
    id: 2,
    name: "Elena Vosc",
    bio: "Specializing in light-based installations, Vosc transforms empty spaces into atmospheric narratives using only primary colors and geometric shadow.",
    bg: "bg-[#2a2a2a]",
  },
];


function ArtistButtons({ dark, artistId }) {
  const navigate = useNavigate();
  let primaryClass = "px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-80 ";
  if (dark) {
    primaryClass += "bg-[#f0ede6] text-[#0c3028]";
  } else {
    primaryClass += "bg-[#1a1a1a] text-[#f0ede6]";
  }

  let secondaryClass = "px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium border transition-opacity hover:opacity-60 ";
  if (dark) {
    secondaryClass += "border-[#f0ede6]/40 text-[#f0ede6]";
  } else {
    secondaryClass += "border-[#1a1a1a]/30 text-[#1a1a1a]";
  }

  return (
    <div className="flex items-center gap-3 mt-5">
      <button onClick={() => navigate(`/artist/${artistId}`)} className={primaryClass}>Portfolio</button>
      <button className={secondaryClass}>Follow</button>
    </div>
  );
}


function ArtistCard({ artist, dark }) {
  let cardClass = "flex gap-6 p-6 border transition-colors duration-300 ";
  if (dark) {
    cardClass += "border-[#f0ede6]/10 bg-[#0b2f2f]";
  } else {
    cardClass += "border-[#1a1a1a]/10 bg-[#f0ede8]";
  }

  let bioClass = "text-sm leading-relaxed ";
  if (dark) {
    bioClass += "text-[#f0ede6]/70";
  } else {
    bioClass += "text-[#1a1a1a]/65";
  }

  return (
    <div className={cardClass}>
      {/* Portrait — real image if loaded, shimmer placeholder otherwise */}
      <div className={`w-[180px] h-[200px] flex-shrink-0 overflow-hidden ${artist.bg}`}>
        {artist.imageUrl ? (
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full animate-pulse ${artist.bg}`} />
        )}
      </div>

      <div className="flex flex-col justify-between py-1">
        <div>
          <h3 className="font-serif text-3xl font-bold mb-3">{artist.name}</h3>
          <p className={bioClass}>{artist.bio}</p>
        </div>
        <ArtistButtons dark={dark} artistId={artist.id} />
      </div>
    </div>
  );
}

export default function FeaturedArtists({ dark }) {
  const [items, setItems] = useState(artists);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchPortraits() {
      // "portrait studio photography" gives us clean artist-style photos
      const url = "https://api.unsplash.com/photos/random?query=portrait+studio+photography&count=2&client_id=" + key;

      const response = await fetch(url);

      if (response.ok === false) {
        console.warn("Unsplash API rate limit reached. Using fallback images.");
        setItems(prevItems => prevItems.map(function (artist, index) {
          const updatedArtist = { ...artist };
          updatedArtist.imageUrl = index === 0 
            ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
            : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop";
          return updatedArtist;
        }));
        return;
      }

      const data = await response.json();

      setItems(prevItems => prevItems.map(function (artist, index) {
        const updatedArtist = {};
        updatedArtist.id = artist.id;
        updatedArtist.name = artist.name;
        updatedArtist.bio = artist.bio;
        updatedArtist.bg = artist.bg;

        if (data[index]) {
          updatedArtist.imageUrl = data[index].urls.small;
        }

        return updatedArtist;
      }));
    }

    fetchPortraits();
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

  return (
    <section className={sectionClass}>
      <p className={eyebrowClass}>Makers &amp; Visions</p>
      <h2 className="font-serif text-4xl font-bold mb-10">Featured Artists</h2>

      {error ? (
        <p className="text-center text-red-400 mb-8">{error}</p>
      ) : null}

      <div className="grid grid-cols-2 gap-6">
        {items.map(function (artist) {
          return <ArtistCard key={artist.id} artist={artist} dark={dark} />;
        })}
      </div>
    </section>
  );
}