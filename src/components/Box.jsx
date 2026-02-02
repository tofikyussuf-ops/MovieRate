import { useState } from "react";
export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="/* 1. DIMENSIONS */ /* Use but prevent it from exceeding screen width minus margins */ /* 2. FLEX & OVERFLOW */ /* allows it to share space on desktop, is a CSS trick to allow items to below content size */ bg-surface/40 relative mx-auto flex w-full max-w-[92vw] min-w-0 flex-1 shrink flex-col items-center rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:max-w-[36rem] lg:max-w-[42rem]">
      {/* TOGGLE BUTTON */}
      <button
        className="text-text absolute top-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl leading-none font-bold shadow-sm transition-all hover:scale-110 hover:bg-white/10 active:scale-95"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "−" : "+"}
      </button>

      <div
        className={`/* Add smooth scrolling for that premium feel */ /* Custom thin scrollbar utility if your plugin supports it, otherwise the CSS above handles it! */ w-full overflow-x-hidden overflow-y-auto scroll-smooth transition-all duration-300 ease-in-out ${isOpen ? "max-h-[70vh] p-4 opacity-100" : "h-0 overflow-hidden opacity-0"} `}
      >
        {isOpen && children}
      </div>
    </div>
  );
}
