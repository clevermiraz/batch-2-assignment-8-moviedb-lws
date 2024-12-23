import MovieDetails from "@/components/MovieDetails/MovieDetails";
import SimilarMovies from "@/components/MovieDetails/SimilarMovies";
import Navbar from "@/components/Navbar";
import { fetchDataFromApi } from "@/lib/axiosInstance";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    // Get the movie id from the params
    const { movieId } = params;

    // fetch data
    const currentMovie = await fetchDataFromApi(`/movie/${movieId}`);

    return {
        title: currentMovie?.original_title?.slice(0, 100),
        description: currentMovie?.overview?.slice(0, 100),
        openGraph: {
            images: [
                {
                    url: currentMovie.poster_path,
                    width: 1200,
                    height: 600,
                },
            ],
        },
    };
}

export default async function MovieDetailsPage({ params }) {
    const { movieId } = params;

    const currentMovie = await fetchDataFromApi(`/movie/${movieId}`);
    const currentMovieCastingActor = await fetchDataFromApi(`/movie/${movieId}/credits`);
    const similarMovies = await fetchDataFromApi(`/movie/${movieId}/similar`);

    if (currentMovie.status === 404) {
        return notFound();
    }

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
