import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import MovieSearchModal from "./MovieSearchModal";

export default function SelectMovieSlot({ slotId, movie, onMovieSelect, onRemoveSlot }) {
    const [isMovieSelected, setIsMovieSelected] = useState(false);
    const [isSearchForMovie, setIsSearchForMovie] = useState(false);

    const handleSelectMovie = (movie) => {
        onMovieSelect(slotId, movie); // Update parent with selected movie data
        setIsMovieSelected(true);
        setIsSearchForMovie(false);
    };

    console.log(movie, "hello form movie");

    return (
        <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
            <div className="flex justify-end mb-4">
                <button onClick={() => onRemoveSlot(slotId)} className="text-gray-400 hover:text-white">
                    ✕
                </button>
            </div>
            <>
                {isMovieSelected ? (
                    <div className="grid grid-cols-5 gap-8">
                        <div className="col-span-2 h-full">
                            <Image
                                width={262}
                                height={394}
                                src={absoluteUrlOfImage(movie?.poster_path)}
                                alt={movie?.original_title}
                                className="w-full rounded-lg mb-4 object-contain max-h-full"
                            />
                            <h2 className="text-xl font-bold mb-2 text-center">{movie?.original_title}</h2>
                        </div>
                        <div className="w-full space-y-4 col-span-3">
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Rating:</span>
                                <span className="float-right">
                                    {movie?.vote_average && movie.vote_average.toFixed(2)}/10
                                </span>
                            </div>
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Release Year:</span>
                                <span className="float-right">{movie?.release_date}</span>
                            </div>
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Runtime:</span>
                                <span className="float-right">134 min</span>
                            </div>
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Budget:</span>
                                <span className="float-right">$40.0M</span>
                            </div>
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Revenue:</span>
                                <span className="float-right">$37.4M</span>
                            </div>
                            <div className="bg-zinc-800 p-3 rounded">
                                <span className="text-gray-400">Genres:</span>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">Drama </span>
                                    <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">History </span>
                                    <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">Crime </span>
                                    <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">Thriller</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center">
                        <button
                            onClick={() => setIsSearchForMovie(true)}
                            className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                        >
                            Select Movie
                        </button>
                    </div>
                )}
            </>

            {isSearchForMovie && (
                <MovieSearchModal
                    onHideModal={() => setIsSearchForMovie(false)}
                    handleSelectMovie={handleSelectMovie}
                />
            )}
        </div>
    );
}
