import { Navbar } from "../components/Navbar";
import { FindDevilFruit } from "./FindDevilFruit.tsx/FindDevilFruit";

export const HomeView = () => {
    return (
        <div className="flex flex-col bg-white dark:bg-neutral-900 min-h-screen">
            <Navbar />
            <FindDevilFruit />
        </div>
    );
};