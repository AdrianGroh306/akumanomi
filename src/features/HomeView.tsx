import { FindDevilFruit } from "./FindDevilFruit.tsx/FindDevilFruit";

export const HomeView = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Akumanomi</h1>
                <nav>
                    <a href="/hub" className="text-lg hover:underline">
                        Hub
                    </a>
                </nav>
            </header>
            <FindDevilFruit />
        </div>
    );
};