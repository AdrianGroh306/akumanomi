import React, { useState } from 'react';
import { Fruit } from '../api/fetchDevilFruits';
import { FruitCard } from './FruitCard';
import { FruitDetailModal } from './FruitCardDetailsModal';

interface FruitGridProps {
  fruits: Fruit[];
}

export const FruitGrid: React.FC<FruitGridProps> = ({ fruits }) => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {fruits.map((fruit) => (
        <FruitCard key={fruit.id} fruit={fruit} onClick={handleCardClick} />
      ))}
      <FruitDetailModal fruit={selectedFruit} onClose={handleCloseModal} />
    </div>
  );
};