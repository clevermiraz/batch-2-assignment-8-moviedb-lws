import HeroSection from "@/components/Home/HeroSection";
import MovieSection from "@/components/Home/MovieSection";
import Navbar from "@/components/Navbar";

export default function Home() {
    return (
        <>
            <main className="bg-black text-white">
                <Navbar />
                <HeroSection />
                <MovieSection />
            </main>
        </>
    );
}
