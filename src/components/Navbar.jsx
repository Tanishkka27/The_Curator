import { Moon, Sun } from "lucide-react";

const navLinks = ["Gallery", "Designers", "About"];



function NavLink({ item, dark }) {
  // Base styles shared by all links
  let linkClass = "text-[11px] tracking-[0.2em] uppercase font-medium transition-opacity ";

  if (item === "Gallery") {
    // Active link — underline, and gold color in dark mode
    if (dark) {
      linkClass += "text-[#c9a227] border-b border-[#c9a227] pb-0.5";
    } else {
      linkClass += "border-b border-[#1a1a1a] pb-0.5";
    }
  } else {
    // Inactive links — just faded with a hover brighten
    linkClass += "opacity-60 hover:opacity-100";
  }

  return (
    <a key={item} href="#" className={linkClass}>
      {item}
    </a>
  );
}



export default function Navbar({ dark, toggleDark }) {
  // Nav background and text flip with dark mode
  let navClass = "flex items-center justify-between px-10 py-5 sticky top-0 z-50 transition-colors duration-300 ";
  if (dark) {
    navClass += "bg-[#0c3028] text-[#f0ede6]";
  } else {
    navClass += "bg-[#f0ede8] text-[#1a1a1a]";
  }

  return (
    <nav className={navClass}>

      {/* Brand name on the left */}
      <span className="font-serif text-xl font-bold tracking-widest uppercase">
        The Curator
      </span>

      {/* Nav links in the centre */}
      <div className="flex items-center gap-10">
        {navLinks.map(function (item) {
          return <NavLink key={item} item={item} dark={dark} />;
        })}
      </div>

      {/* Dark mode toggle on the right — swaps icon based on current mode */}
      <button
        onClick={toggleDark}
        className="opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

    </nav>
  );
}