import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";
import { Suspense } from "react";
import AddToWatchList from "./AddToWatchList";
import SocialShare from "./SocialShare";

export default function MovieDetails({ currentMovie, currentMovieCastingActor }) {
    return (
        <>
            <div id="movieDetails" className="min-h-screen pt-20 mb-8">
                <div className="relative h-screen">
                    <div className="absolute inset-0">
                        <Image
                            width={488}
                            height={275}
                            src={absoluteUrlOfImage(currentMovie?.poster_path)}
                            alt={currentMovie?.original_title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
                    </div>

                    <div className="relative container mx-auto px-4 pt-32">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <Image
                                    width={488}
                                    height={275}
                                    src={absoluteUrlOfImage(currentMovie?.backdrop_path)}
                                    alt={currentMovie?.original_title}
                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>

                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{currentMovie?.original_title}</h1>

                                <div className="flex items-center mb-4 space-x-4">
                                    <span className="text-green-500">{currentMovie?.release_date}</span>
                                    <span>| </span>
                                    <span>{currentMovie?.runtime} min</span>
                                </div>

                                <p className="text-lg mb-6">{currentMovie?.overview}</p>

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentMovie?.genres.map((g) => (
                                            <span key={g.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* cast actor */}
                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Cast</h3>
                                    <div className="flex overflow-x-auto gap-4 p-2">
                                        {currentMovieCastingActor.map((actor) => (
                                            <div key={actor?.id} className="text-center flex-shrink-0 w-24">
                                                <Image
                                                    width={96}
                                                    height={96}
                                                    src={absoluteUrlOfImage(actor?.profile_path)}
                                                    alt={actor?.name}
                                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                                />
                                                <p className="text-sm">{actor?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <AddToWatchList movie={currentMovie} />

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Share on social media</h3>
                                    <Suspense fallback={<div>Loading...</div>}>
                                        <SocialShare />
                                    </Suspense>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
