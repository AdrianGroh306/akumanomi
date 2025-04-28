import { FruitCard } from './FruitCard';

interface Fruit {
    id: number;
    name: string;
    type: string;
    description: string;
    user: string;
  }
interface FruitGridProps {
  fruits: Fruit[];
}

export const FruitGrid = ({ fruits }: FruitGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
    </div>
  );
};