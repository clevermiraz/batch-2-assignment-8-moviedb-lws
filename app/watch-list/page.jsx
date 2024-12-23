import CheckLoggiedInUser from "@/components/CheckLoggedInUser";
import Navbar from "@/components/Navbar";
import UserWatchList from "./UserWatchList";

export default function WatchList() {
    return (
        <>
            <main className="bg-body text-light min-h-screen">
                <Navbar />
                <CheckLoggiedInUser />

                <UserWatchList />
            </main>
        </>
    );
}
