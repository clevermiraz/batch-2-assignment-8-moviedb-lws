import { fetchDataFromApi } from "@/lib/axiosInstance";
import MovieCard from "./movieCard";

export default async function TrendingMovies() {
    const data = await fetchDataFromApi("/movie/upcoming");

    const trendingMovies = data?.results;

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
                {/* movie card */}
                {trendingMovies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}
