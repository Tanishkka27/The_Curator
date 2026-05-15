export default function Hero({ dark }) {
  // Section background and text color flip with dark mode
  let sectionClass = "px-10 pt-16 pb-12 transition-colors duration-300 ";
  if (dark) {
    sectionClass += "bg-[#0c3028] text-[#f0ede6]";
  } else {
    sectionClass += "bg-[#f0ede8] text-[#1a1a1a]";
  }

  let subtitleClass = "text-sm leading-relaxed max-w-md ";
  if (dark) {
    subtitleClass += "text-[#f0ede6]/70";
  } else {
    subtitleClass += "text-[#1a1a1a]/60";
  }

  return (
    <section className={sectionClass}>

      {/* Main heading */}
      <h1 className="font-serif text-5xl font-bold leading-[1.15] max-w-xl mb-6">
        A curated exhibition of architectural precision and digital craft.
      </h1>

      {/* Supporting description */}
      <p className={subtitleClass}>
        Quietly celebrating the intersection of high-end photography,
        conceptual design, and meticulous illustration.
      </p>

    </section>
  );
}