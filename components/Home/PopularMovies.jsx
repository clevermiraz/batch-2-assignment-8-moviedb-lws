import { fetchDataFromApi } from "@/lib/axiosInstance";
import MovieCard from "./MovieCard";

export default async function PopularMovies() {
    const data = await fetchDataFromApi("/movie/popular");

    const popularMovies = data?.results;

    return (
        <>
            <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Popular on MOVIE DB</h2>
                <div id="popularMovies" className="flex space-x-4 overflow-x-auto pb-4">
                    {popularMovies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </>
    );
}
