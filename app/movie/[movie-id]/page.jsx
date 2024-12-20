import MovieDetails from "@/components/MovieDetails/MovieDetails";
import SimilarMovies from "@/components/MovieDetails/SimilarMovies";
import Navbar from "@/components/Navbar";

export default function MovieDetailsPage() {
    return (
        <>
            <main className="bg-black text-white">
                <Navbar />
                <MovieDetails />
                <SimilarMovies />
            </main>
        </>
    );
}
