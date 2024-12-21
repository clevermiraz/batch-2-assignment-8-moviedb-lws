import Navbar from "@/components/Navbar";
import { fetchDataFromApi } from "@/lib/axiosInstance";
import { absoluteUrlOfImage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
    const { query, page } = searchParams;

    const url = `/search/movie?query=${query}&page=${page ? page : 1}`;
    const data = await fetchDataFromApi(url);

    return (
        <main className="bg-black text-white min-h-screen">
            <Navbar />

            <main className="container mx-auto px-4 pt-24 pb-8">
                {/* <!-- Search Stats --> */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Search Results for &quot;{query}&quot;</h1>
                    <p className="text-gray-400">Found {data?.total_results ? data?.total_results : 0} results</p>
                </div>

                {/* <!-- Filters and Sort Section --> */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* <!-- Movie Card 1 --> */}
                    {data?.results.map((movie) => (
                        <Link
                            key={movie?.id}
                            href={`/movie/${movie?.id}`}
                            className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                        >
                            <Image
                                width={229}
                                height={334}
                                src={absoluteUrlOfImage(movie?.poster_path)}
                                alt={movie?.original_title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold mb-2">{movie?.original_title}</h3>
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>{movie?.release_date}</span>
                                    <span>⭐ {movie?.vote_average}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </main>
    );
}
