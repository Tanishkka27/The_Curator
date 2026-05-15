import { useState, useEffect } from "react";

const UNSPLASH_KEY = "0tYUshO3KokmKsm_pmu1SW5-U9A-H7N8Z9kEI0kT2eI";

const stats = [
  { label: "Curated Pieces", value: "1,280" },
  { label: "Exhibitions", value: "14" },
  { label: "Years Active", value: "18" },
  { label: "Collections", value: "03" },
];


function PortraitColumn({ imageUrl, dark }) {
  let badgeClass = "absolute bottom-0 left-0 w-[88%] px-7 py-6 ";
  if (dark) {
    badgeClass += "bg-[#0a2822]";
  } else {
    badgeClass += "bg-[#0c3028]";
  }

  return (
    <div className="relative w-[42%] flex-shrink-0 min-h-[640px]">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Julian Vane"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-[#8a8a88] animate-pulse" />
      )}


      <div className={badgeClass}>
        <p className="text-[10px] tracking-[0.25em] uppercase text-[#f0ede6]/50 mb-1.5">
          Legacy Status
        </p>
        <p className="font-serif text-2xl font-bold text-[#f0ede6]">
          Senior Fellow
        </p>
      </div>
    </div>
  );
}



function StatItem({ stat, dark }) {
  let labelClass = "text-[9px] tracking-[0.18em] uppercase mb-2 ";
  if (dark) {
    labelClass += "text-[#f0ede6]/45";
  } else {
    labelClass += "text-[#1a1a1a]/45";
  }

  return (
    <div>
      <p className={labelClass}>{stat.label}</p>
      <p className="font-serif text-4xl font-bold">{stat.value}</p>
    </div>
  );
}



function InfoColumn({ dark }) {
  let ruleBg = "w-8 h-px ";
  if (dark) {
    ruleBg += "bg-[#f0ede6]/25";
  } else {
    ruleBg += "bg-[#1a1a1a]/25";
  }

  let roleLabelClass = "text-[10px] tracking-[0.22em] uppercase ";
  if (dark) {
    roleLabelClass += "text-[#f0ede6]/50";
  } else {
    roleLabelClass += "text-[#1a1a1a]/50";
  }

  let bioClass = "text-sm leading-relaxed max-w-lg mb-10 ";
  if (dark) {
    bioClass += "text-[#f0ede6]/65";
  } else {
    bioClass += "text-[#1a1a1a]/65";
  }

  let dividerClass = "grid grid-cols-4 gap-8 pb-10 mb-10 border-b ";
  if (dark) {
    dividerClass += "border-[#f0ede6]/10";
  } else {
    dividerClass += "border-[#1a1a1a]/10";
  }

  let primaryBtnClass = "flex items-center gap-3 px-7 py-3.5 text-[10px] tracking-[0.22em] uppercase font-medium transition-opacity hover:opacity-80 ";
  if (dark) {
    primaryBtnClass += "bg-[#f0ede6] text-[#0c3028]";
  } else {
    primaryBtnClass += "bg-[#1a1a1a] text-[#f0ede6]";
  }

  let secondaryBtnClass = "px-7 py-3.5 text-[10px] tracking-[0.22em] uppercase font-medium border transition-opacity hover:opacity-60 ";
  if (dark) {
    secondaryBtnClass += "border-[#f0ede6]/25 text-[#f0ede6]";
  } else {
    secondaryBtnClass += "border-[#1a1a1a]/25 text-[#1a1a1a]";
  }

  return (
    <div className="flex-1 px-14 py-16 flex flex-col justify-center">

      <div className="flex items-center gap-4 mb-5">
        <div className={ruleBg} />
        <span className={roleLabelClass}>Creative Director</span>
      </div>

      <h1 className="font-serif text-6xl font-bold leading-tight mb-6">
        Julian Vane
      </h1>

      <p className={bioClass}>
        Architecting digital stillness through a lens of brutalist elegance.
        Julian Vane has spent two decades refining the intersection of archival
        photography and contemporary UI. His work is characterized by a
        "content-first" philosophy, where the interface serves as a silent,
        structural support for visual narrative. Based in Zurich, he curates
        global movements that redefine the luxury digital experience.
      </p>

      <div className={dividerClass}>
        {stats.map(function (s) {
          return <StatItem key={s.label} stat={s} dark={dark} />;
        })}
      </div>

      <div className="flex items-center gap-4">
        <button className={primaryBtnClass}>
          Inquire Portfolio <span>→</span>
        </button>
        <button className={secondaryBtnClass}>
          Download Monograph
        </button>
      </div>

    </div>
  );
}



export default function ArtistHero({ dark }) {
  const [portraitUrl, setPortraitUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchHeroPhoto() {
      const url = "https://api.unsplash.com/photos/random?query=creative+director+studio&count=1&client_id=" + UNSPLASH_KEY;

      const response = await fetch(url);

      if (response.ok === false) {
        setError("Could not load hero photo.");
        return;
      }

      const data = await response.json();

      if (data[0]) {
        setPortraitUrl(data[0].urls.regular);
      }
    }

    fetchHeroPhoto();
  }, []);


  let sectionClass = "flex transition-colors duration-300 ";
  if (dark) {
    sectionClass += "bg-[#0c3028] text-[#f0ede6]";
  } else {
    sectionClass += "bg-[#f0ede8] text-[#1a1a1a]";
  }

  return (
    <section className={sectionClass}>
      {error ? (
        <p className="p-10 text-red-400">{error}</p>
      ) : null}
      <PortraitColumn imageUrl={portraitUrl} dark={dark} />
      <InfoColumn dark={dark} />
    </section>
  );
}