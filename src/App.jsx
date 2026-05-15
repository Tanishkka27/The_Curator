import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FilterTabs from "./components/FilterTabs";
import PermanentCollection from "./components/PermanentCollection";
import TrendingCollections from "./components/TrendingCollections";
import FeaturedArtists from "./components/FeaturedArtists";
import ArtistHero from "./components/ArtistHero";

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className={dark ? "dark" : ""}>
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero dark={dark} />
            <FilterTabs active={activeFilter} setActive={setActiveFilter} dark={dark} />
            <PermanentCollection dark={dark} />
            <TrendingCollections dark={dark} />
          </>
        } />
        <Route path="/designers" element={<FeaturedArtists dark={dark} />} />
        <Route path="/artist/:id" element={<ArtistHero dark={dark} />} />
        {/* Fallback route if needed, or mapping /artist to generic */}
        <Route path="/artist" element={<ArtistHero dark={dark} />} />
      </Routes>
    </div>
  );
}