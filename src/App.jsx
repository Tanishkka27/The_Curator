import { useState } from "react";
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
      <Hero dark={dark} />
      <FilterTabs active={activeFilter} setActive={setActiveFilter} dark={dark} />
      <PermanentCollection dark={dark} />
      <TrendingCollections dark={dark} />
      <FeaturedArtists dark={dark} />
      <ArtistHero dark={dark} />
    </div>
  );
}