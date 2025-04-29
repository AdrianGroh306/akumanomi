import { useDevilFruitsQuery } from '../api/fetchDevilFruits';
import { FruitGrid } from '../components/FruitGrid';

export const HubView = () => {
    const { data: allDevilFruits, isLoading, isError } = useDevilFruitsQuery(); // Get loading and error states

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 flex justify-between items-center">
               <a href='/'> <h1 className="text-2xl font-bold">Akumanomi</h1></a>
                <nav>
                    <a href="/hub" className="text-lg hover:underline">
                        Hub
                    </a>
                </nav>
            </header>

            <main className="flex-grow flex flex-col items-center p-8">
                <h2 className="text-3xl font-semibold mb-8">Discover All Devil Fruits 🍈</h2>
                {isLoading && <p>Loading fruits...</p>}
                {isError && <p>Error loading fruits.</p>}
                {allDevilFruits && <FruitGrid fruits={allDevilFruits} />}
            </main>
        </div>
    );
};
