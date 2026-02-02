export default function MovieList({ movies, onSelectMovie }) {
  return (
    /* w-full ensures it spans the Box width, gap-4 keeps items separate */
    <ul className="flex w-full list-none flex-col gap-4 p-2">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      className="/* 1. LAYOUT: Horizontal row */ group /* 2. DESIGN: The Glassy 'Tappable' Row */ /* 3. INTERACTION: Soft pop and */ flex cursor-pointer items-center gap-6 rounded-2xl border border-transparent bg-white/[0.02] p-3 shadow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.06] hover:shadow-lg"
    >
      {/* 4. THE POSTER: Sharp and constrained */}
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        className="h-22 w-16 rounded-lg object-cover shadow-md grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
      />

      {/* 5. TEXT CONTENT */}
      <div className="flex flex-col gap-1 overflow-hidden">
        <h3 className="text-text group-hover:text-accent truncate text-lg font-medium transition-colors">
          {movie.Title}
        </h3>

        <div className="text-muted/60 flex items-center gap-3 text-sm">
          <p className="flex items-center gap-1.5">
            <span className="text-base">🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
