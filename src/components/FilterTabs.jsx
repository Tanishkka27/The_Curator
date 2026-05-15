const tabs = ["All", "Photography", "Design", "Illustration"];

function TabButton({ tab, active, setActive, dark }) {
  let btnClass = "text-[11px] tracking-[0.18em] uppercase font-medium pb-2 transition-all ";

  if (active === tab) {
    // This tab is selected — show the underline indicator
    if (dark) {
      btnClass += "text-[#c9a227] border-b-2 border-[#c9a227]";
    } else {
      btnClass += "text-[#1a1a1a] border-b-2 border-[#1a1a1a]";
    }
  } else {
    // Not selected — dimmed, brightens slightly on hover
    if (dark) {
      btnClass += "text-[#f0ede6]/50 hover:text-[#f0ede6]/80";
    } else {
      btnClass += "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70";
    }
  }

  return (
    <button
      key={tab}
      onClick={function () { setActive(tab); }}
      className={btnClass}
    >
      {tab}
    </button>
  );
}


export default function FilterTabs({ active, setActive, dark }) {
  let wrapperClass = "flex items-center gap-8 px-10 pb-8 transition-colors duration-300 ";
  if (dark) {
    wrapperClass += "bg-[#0c3028]";
  } else {
    wrapperClass += "bg-[#f0ede8]";
  }

  return (
    <div className={wrapperClass}>
      {tabs.map(function (tab) {
        return (
          <TabButton
            key={tab}
            tab={tab}
            active={active}
            setActive={setActive}
            dark={dark}
          />
        );
      })}
    </div>
  );
}