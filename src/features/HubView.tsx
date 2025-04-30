import { useDevilFruitsQuery } from '../api/fetchDevilFruits';
import { FruitGrid } from '../components/FruitGrid';
import { Navbar } from '../components/Navbar';

export const HubView = () => {
    const { data: allDevilFruits, isLoading, isError } = useDevilFruitsQuery(); // Get loading and error states

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col items-center p-8">
                <h2 className="text-3xl font-semibold mb-8">Discover All Devil Fruits 🍈</h2>
                {isLoading && <p>Loading fruits...</p>}
                {isError && <p>Error loading fruits.</p>}
                {allDevilFruits && <FruitGrid fruits={allDevilFruits} />}
            </main>
        </div>
    );
};
