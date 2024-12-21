import MainContent from "@/components/Compare/MainContent";
import Navbar from "@/components/Navbar";

export default function ComparePage() {
    return (
        <>
            <main className="bg-black text-white min-h-screen">
                <Navbar />
                <MainContent />
            </main>
        </>
    );
}
