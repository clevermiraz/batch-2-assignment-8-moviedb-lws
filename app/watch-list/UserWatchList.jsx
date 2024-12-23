"use client";

import { performAddOrRemoveToWatchList } from "@/actions";
import { useAuth } from "@/hooks/useAuth";
import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function UserWatchList() {
    const { auth, setAuth } = useAuth();

    const watchList = auth?.watchList;

    if (watchList?.length === 0) {
        return (
            <div className="container mx-auto pt-24 pb-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-white">Watch Later</h1>
                    <p className="text-light/70 mt-2">Movies you&apos;ve saved to watch in the future</p>
                </header>
                <div id="emptyState" className="text-center py-16">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold text-light mb-2">Your Watch Later list is empty</h2>
                    <p className="text-light/70 mb-6">Explore movies and add them to your list to watch later</p>
                    <Link
                        href="/"
                        className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
                    >
                        Explore Movies
                    </Link>
                </div>
            </div>
        );
    }

    const handleWatchList = async (movie) => {
        const updatedUser = await performAddOrRemoveToWatchList(auth.id, movie);

        setAuth(updatedUser);
        // Update the local storage
        window.localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    };

    return (
        <div className="container mx-auto pt-24 pb-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-white">Watch Later</h1>
                <p className="text-light/70 mt-2">Movies you&apos;ve saved to watch in the future</p>
            </header>

            <div id="watchLaterList" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* <!-- Movie Card Template --> */}
                {watchList?.map((movie) => (
                    <Link
                        href={`/movie/${movie?.id}`}
                        key={movie.id}
                        className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
                    >
                        <Image
                            width={227}
                            height={450}
                            src={absoluteUrlOfImage(movie?.poster_path)}
                            alt={movie?.original_title}
                            className="w-full h-[450px] object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h2 className="text-xl font-bold text-light mb-2">{movie?.original_title}</h2>
                            <div className="flex justify-between items-center">
                                <span className="text-primary">{movie?.release_date}</span>
                                <button
                                    onClick={() => handleWatchList(movie)}
                                    className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
