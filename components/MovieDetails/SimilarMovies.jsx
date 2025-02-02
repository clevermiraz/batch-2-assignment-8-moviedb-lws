import MovieCard from "../Home/MovieCard";

export default function SimilarMovies({ similarMovies }) {
    return (
        <>
            <div className="container mx-auto px-4 py-32">
                <h2 className="text-2xl font-bold mb-4">More Like This</h2>

                <div className="flex space-x-4 overflow-x-auto pb-4">
                    {similarMovies.map((movie) => (
                        <MovieCard key={movie?.id} movie={movie} />
                    ))}
                </div>
            </div>
        </>
    );
}
