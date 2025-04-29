import { useFindDevilFruit } from './useFindDevilFruit';

export const FindDevilFruit = () => {
    const { fruit, findRandomFruit } = useFindDevilFruit();

    return (
        <main className="flex-grow flex flex-col items-center justify-center text-center">
            {fruit && (
                <div className="mt-8 p-4 border rounded shadow">
                    <h3 className="text-2xl font-bold mb-2">{fruit.name}</h3>
                    <p className="italic mb-1">{fruit.type}</p>
                    <p>{fruit.description}</p>
                    <p className="mt-2 text-sm text-gray-600">User: {fruit.user}</p>
                </div>
            )}
            <button onClick={findRandomFruit} className="px-6 py-3 my-12 bg-indigo-600 text-white rounded-lg text-lg hover:scale-105 transform transition">
                Find your DEVILFRUIT
            </button>
        </main>)
}