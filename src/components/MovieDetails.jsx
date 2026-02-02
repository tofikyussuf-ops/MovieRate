import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
  apiKey,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating > 0) countRef.current++;
    },
    [userRating],
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const isTop = Number(imdbRating) > 8;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating) || 0,
      runtime: Number(runtime?.split?.(" ")?.at(0)) || 0,
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie],
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`,
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId, apiKey],
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title],
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 flex w-full flex-col duration-500">
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <p className="text-accent animate-pulse font-medium tracking-widest uppercase">
            Loading Cinema...
          </p>
        </div>
      ) : (
        <>
          {/* Header: Fixed for 927px threshold */}
          <header className="/* Below ~1024px (lg), it stays a column. Above, it becomes a row */ relative flex flex-col items-center gap-6 rounded-t-3xl border-b border-white/5 bg-white/[0.03] p-6 text-center lg:flex-row lg:items-end lg:gap-8 lg:p-8 lg:text-left">
            <button
              className="absolute top-4 left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-xl backdrop-blur-md transition-all hover:bg-white/20 active:scale-90"
              onClick={onCloseMovie}
            >
              &larr;
            </button>

            {/* Poster: Scales down on mobile, fixed size on desktop */}
            <img
              src={poster}
              alt={`Poster of ${title}`}
              className="aspect-[2/3] w-40 shrink-0 rounded-xl object-cover shadow-2xl ring-1 ring-white/10 sm:w-44 lg:w-40"
            />

            <div className="flex w-full flex-col justify-end gap-3">
              <h2 className="text-text text-2xl leading-tight font-bold sm:text-3xl">
                {title}
              </h2>
              <div className="text-muted/60 flex flex-wrap justify-center gap-3 text-sm lg:justify-start">
                <span>{released}</span>
                <span>•</span>
                <span>{runtime}</span>
              </div>
              <p className="text-accent/80 text-sm font-medium italic">
                {genre}
              </p>
              <p className="text-text/80 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1 text-sm lg:mx-0">
                <span className="text-yellow-500">⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section className="flex flex-col gap-8 p-6 lg:p-8">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-6 shadow-inner">
              {!isWatched ? (
                <div className="flex w-full flex-col items-center overflow-hidden">
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className="mt-4 w-full cursor-pointer rounded-2xl border border-white/20 bg-white px-6 py-4 text-xs font-bold tracking-[0.15em] text-black uppercase transition-all duration-300 ease-out hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                      onClick={handleAdd}
                    >
                      Add to list
                    </button>
                  )}
                </div>
              ) : (
                <p className="text-muted/70 flex items-center gap-2 font-medium">
                  You rated this movie {watchedUserRating}{" "}
                  <span className="text-yellow-500">⭐️</span>
                </p>
              )}
            </div>

            <div className="space-y-6 leading-relaxed">
              <p className="text-text/90 font-serif text-lg leading-relaxed italic">
                "{plot}"
              </p>
              <div className="grid gap-2 text-sm">
                <p>
                  <span className="text-muted/50 mr-2 font-bold tracking-tighter uppercase">
                    Starring:
                  </span>{" "}
                  {actors}
                </p>
                <p>
                  <span className="text-muted/50 mr-2 font-bold tracking-tighter uppercase">
                    Directed by:
                  </span>{" "}
                  {director}
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
