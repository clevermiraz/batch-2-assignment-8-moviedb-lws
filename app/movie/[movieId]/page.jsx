import MovieDetails from "@/components/MovieDetails/MovieDetails";
import SimilarMovies from "@/components/MovieDetails/SimilarMovies";
import Navbar from "@/components/Navbar";
import { fetchDataFromApi } from "@/lib/axiosInstance";

export default async function MovieDetailsPage({ params }) {
    const { movieId } = params;
    const currentMovie = await fetchDataFromApi(`/movie/${movieId}`);
    const currentMovieCastingActor = await fetchDataFromApi(`/movie/${movieId}/credits`);
    const similarMovies = await fetchDataFromApi(`/movie/${movieId}/similar`);

    return (
        <>
            <main className="bg-black text-white">
                <Navbar />
                <MovieDetails currentMovie={currentMovie} currentMovieCastingActor={currentMovieCastingActor?.cast} />
                <SimilarMovies similarMovies={similarMovies?.results} />
            </main>
        </>
    );
}
