import React from 'react';

interface Fruit {
  id: number;
  name: string;
  type: string;
  description: string;
  user: string;
}

interface FruitCardProps {
  fruit: Fruit;
}

export const FruitCard: React.FC<FruitCardProps> = ({ fruit }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">{fruit.name}</h2>
      <p><span className="font-semibold">Type:</span> {fruit.type}</p>
      <p><span className="font-semibold">Description:</span> {fruit.description}</p>
      <p><span className="font-semibold">Current User:</span> {fruit.user}</p>
    </div>
  );
};