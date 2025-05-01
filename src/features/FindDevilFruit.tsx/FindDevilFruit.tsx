import { useState } from 'react';
import { FruitCard } from '../../components/FruitCard';
import { useFindDevilFruit } from './useFindDevilFruit';
import { Fruit } from '../../api/fetchDevilFruits';
import { FruitDetailModal } from '../../components/FruitCardDetailsModal';

export const FindDevilFruit = () => {
    const { randomFruit, findRandomFruit } = useFindDevilFruit();
    const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);

    const handleCardClick = (fruit: Fruit) => {
        if (fruit.id !== 0) { 
            setSelectedFruit(fruit);
        }
    };

    const handleCloseModal = () => {
        setSelectedFruit(null);
    };

    return (
        <div>
            <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                <h1 className="text-4xl pt-32 font-bold mb-4">Find Your Devil Fruit!</h1>

                <div className="mb-8 w-full max-w-xs pt-16">
                    {randomFruit && <FruitCard fruit={randomFruit} onClick={handleCardClick} />} 
                </div>
                <button onClick={findRandomFruit} className="px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-lg text-lg hover:scale-105 transform transition">
                FIND DEVIL FRUIT
            </button>
            </main>
        <FruitDetailModal fruit={selectedFruit} onClose={handleCloseModal} />
        </div>
    )
}