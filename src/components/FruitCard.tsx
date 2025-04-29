import React from 'react';

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

interface FruitCardProps {
  fruit: Fruit;
}

export const FruitCard: React.FC<FruitCardProps> = ({ fruit }) => {
  return (
    <div className="rounded-lg p-4 shadow-2xl bg-white flex flex-col items-center">
       <h2 className="text-xl font-bold mb-2 text-center">{fruit.name}</h2>
      {fruit.avatarSrc && <img src={fruit.avatarSrc} alt={fruit.name} className="w-32 h-32 object-cover rounded-4xl mb-4" />}
      <p><span className="font-semibold">Type:</span> {fruit.type}</p>
      {fruit.meaning && <p><span className="font-semibold">Meaning:</span> {fruit.meaning}</p>}
      <p><span className="font-semibold">Current User:</span> {fruit.user}</p>
      <p><span className="font-semibold">Description:</span> {fruit.description}</p>
    </div>
  );
};