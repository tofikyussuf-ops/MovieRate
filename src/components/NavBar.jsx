import { useEffect, useRef } from "react";

export function NavBar({ children }) {
  return (
    <nav className="bg-surface rounded-radius-md flex h-auto w-full flex-col items-center justify-between gap-8 border border-white/5 py-6 pb-10 shadow-xl sm:flex-row sm:gap-16 sm:px-20 sm:py-4">
      <Logo />
      {children}
    </nav>
  );
}
export function Logo() {
  return (
    <div className="/* Layout & Gap */ gap-space-2 /* Padding: Left padding for all screens, vertical only for mobile */ pl-space-4 py-space-4 flex items-center sm:py-0 sm:pl-0">
      <span role="img" className="text-3xl">
        🍿
      </span>
      <h1 className="text-2xl font-bold tracking-tight text-white">
        Movie<span className="text-accent">Rate</span>
      </h1>
    </div>
  );
}
export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery],
  );

  return (
    <input
      type="text"
      placeholder="  Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
      className="/* 2. THE TONE FIX: Slightly lighter than the nav bar to show it is an 'opening' */ /* We use white/5 to just barely lift the color from the surface */ text-text placeholder:text-muted/30 /* 3. BORDER: Invisible until clicked */ /* 4. INTERACTION: Smooth to a more solid state */ /* Becomes slightly more when active */ focus:ring-accent/10 /* 5. TAPPABLE HINT: A very subtle hover change */ visible h-10 w-full max-w-[20rem] rounded-md border border-transparent bg-white/5 px-6 text-base backdrop-blur-md transition transition-all duration-200 ease-in-out hover:bg-white/8 focus:border-white/10 focus:bg-white/10 focus:ring-2 focus:outline-none sm:max-w-[28rem]"
    />
  );
}

export function NumResults({ movies }) {
  return (
    // text-muted: #94a3b8 (the 30% supporting color)
    <p className="text-muted hidden justify-self-end text-lg md:block">
      Found <strong className="text-accent">{movies.length}</strong> results
    </p>
  );
}
