import { FruitCard } from '../../components/FruitCard';
import { useFindDevilFruit } from './useFindDevilFruit';

export const FindDevilFruit = () => {
    const { randomFruit, findRandomFruit } = useFindDevilFruit();

    return (
        <main className="flex-grow flex flex-col items-center justify-center text-center">
           <div className='w-92'><FruitCard fruit={randomFruit}/></div>
            <button onClick={findRandomFruit} className="px-6 py-3 my-12 bg-indigo-600 text-white rounded-lg text-lg hover:scale-105 transform transition">
                Find your DEVILFRUIT
            </button>
        </main>)
}