import { FruitCard } from './FruitCard';

interface Fruit {
  id: number;
  name: string;
  type: string;
  description: string;
  user: string;
  avatarSrc?: string;
  meaning?: string;
  previousOwner?: string;
}

interface FruitGridProps {
  fruits: Fruit[];
}

export const FruitGrid = ({ fruits }: FruitGridProps) => {
  if (!fruits) {
    return <p>No fruits to display.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} />
      ))}
    </div>
  );
};