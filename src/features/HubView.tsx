import { useState } from 'react';
import { useDevilFruitsContext } from '../context/DevilFruitsContext';
import { FruitGrid } from '../components/FruitGrid';
import { Navbar } from '../components/Navbar';
import { Fruit } from '../api/fetchDevilFruits';

export const HubView = () => {
    const { fruits: allDevilFruits, isLoading, error } = useDevilFruitsContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const categories = ['All', 'Paramecia', 'Zoan', 'Logia'];
    const fruitsList = allDevilFruits || [];
    const filteredFruits = fruitsList
        .filter((f: Fruit) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((f: Fruit) => category === 'All' || f.type.toLowerCase() === category.toLowerCase());


        const typeStyles: Record<string, {

            text: string
            hoverBg: string
            activeBg: string
          }> = {
            All: {

              text: 'text-gray-600',
              hoverBg: 'hover:bg-gray-50',
              activeBg: 'bg-indigo-600',
            },
            Paramecia: {

              text: 'text-blue-600',
              hoverBg: 'hover:bg-blue-50',
              activeBg: 'bg-blue-600',
            },
            Zoan: {

              text: 'text-purple-600',
              hoverBg: 'hover:bg-purple-50',
              activeBg: 'bg-purple-600',
            },
            Logia: {

              text: 'text-orange-500',
              hoverBg: 'hover:bg-orange-50',
              activeBg: 'bg-orange-500',
            },
          }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col items-center p-8">
                <h2 className="text-3xl font-semibold mb-8">Discover All Devil Fruits 🍈</h2>
                <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
                    <div className="relative flex-1 mr-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Search fruits..."
                            className="w-full rounded-2xl border border-gray-300 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.415l4.387 4.387a1 1 0 01-1.414 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                           <button
                           key={c}
                           onClick={() => setCategory(c)}
                           className={`px-3 py-1 rounded-full text-sm font-medium transition cursor-pointer shadow-md ${
                             category === c
                               ? `${typeStyles[c].activeBg} text-white`
                               : `bg-white ${typeStyles[c].text} ${typeStyles[c].hoverBg}`
                           }`}
                         >
                           {c}
                         </button>
                        ))}
                    </div>
                </div>

                {isLoading && <p>Loading fruits...</p>}
                {error && <p>Error loading fruits.</p>}
                <FruitGrid fruits={filteredFruits} />
            </main>
        </div>
    );
};
