import average from "../utils/average";
export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="/* 1. CONTAINER: A slightly darker glass 'island' at the top */ mb-6 w-full rounded-2xl border border-white/5 bg-white/[0.03] p-6 shadow-inner backdrop-blur-md">
      <h2 className="text-muted/50 mb-4 text-sm font-bold tracking-widest uppercase">
        Your Activity
      </h2>

      {/* 2. STATS GRID: 4 columns for a clean row of data */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat icon="#️⃣" label="Movies" value={`${watched.length}`} />
        <Stat icon="⭐️" label="IMDb" value={avgImdbRating.toFixed(1)} />
        <Stat icon="🌟" label="Your Rating" value={avgUserRating.toFixed(1)} />
        <Stat icon="⏳" label="Runtime" value={`${Math.round(avgRuntime)}m`} />
      </div>
    </div>
  );
}

/* Helper Component for the stats to keep code clean */
function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-text flex items-center gap-2 text-lg font-semibold">
        <span className="text-base grayscale-[40%]">{icon}</span>
        <span>{value}</span>
      </div>
      <p className="text-muted/40 text-[10px] font-bold tracking-tighter uppercase">
        {label}
      </p>
    </div>
  );
}

export function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
export function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li className="/* 1. LAYOUT: Compact row */ group /* 2. DESIGN: Subtle glass plate */ relative flex items-center gap-4 border-b border-white/5 bg-white/[0.01] p-3 transition-all duration-300 last:border-0 hover:bg-white/[0.04]">
      {/* 3. POSTER: Small & sharp for the sidebar */}
      <img
        src={movie.poster}
        alt={`${movie.title} poster`}
        className="h-16 w-12 rounded-md object-cover shadow-sm brightness-90 transition-all group-hover:brightness-100"
      />

      {/* 4. INFO SECTION */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-text truncate text-sm font-medium">
          {movie.title}
        </h3>

        <div className="text-muted/50 flex items-center gap-4 text-xs">
          <p className="flex items-center gap-1">
            <span>⭐️</span> {movie.imdbRating}
          </p>
          <p className="flex items-center gap-1">
            <span>🌟</span> {movie.userRating}
          </p>
          <p className="flex items-center gap-1">
            <span>⏳</span> {movie.runtime} min
          </p>
        </div>
      </div>

      {/* 5. DELETE BUTTON: Minimalist & 'Danger' on hover */}
      <button
        className="ml-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500/10 text-[10px] text-red-500 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-500 hover:text-white"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        ✕
      </button>
    </li>
  );
}
