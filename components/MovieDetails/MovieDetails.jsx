import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";

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

                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="text-center">
                                            <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-file-plus"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                                    <path d="M12 11l0 6" />
                                                    <path d="M9 14l6 0" />
                                                </svg>
                                                Add to Watch List
                                            </button>
                                        </div>

                                        <div className="text-center">
                                            <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                                                >
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M7 12l5 5l10 -10" />
                                                    <path d="M2 12l5 5m5 -5l5 -5" />
                                                </svg>
                                                Added to Watch List
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Share on social media</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <button className="text-center cursor-pointer">
                                            <Image
                                                width={32}
                                                height={32}
                                                src="http://facebook.com/favicon.ico"
                                                alt="Facebook"
                                                className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                                            />
                                            <p className="text-sm">Facebook</p>
                                        </button>

                                        <button className="text-center cursor-pointer">
                                            <Image
                                                width={32}
                                                height={32}
                                                src="http://x.com/favicon.ico"
                                                alt="X"
                                                className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                                            />
                                            <p className="text-sm">X</p>
                                        </button>

                                        <button className="text-center cursor-pointer">
                                            <Image
                                                width={32}
                                                height={32}
                                                src="http://linkedin.com/favicon.ico"
                                                alt="Linkedin"
                                                className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                                            />
                                            <p className="text-sm">Linkedin</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
