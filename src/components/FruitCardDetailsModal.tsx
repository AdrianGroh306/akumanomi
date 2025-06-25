// Filepath: /Users/adriangroh/Documents/github-projects/akumanomi/src/components/FruitCardDetailsModal.tsx
import React from 'react';
import { Fruit } from '../api/fetchDevilFruits'; 
import { FruitCard } from './FruitCard';

interface FruitDetailModalProps {
  fruit: Fruit | null;
  onClose: () => void;
}

export const FruitDetailModal: React.FC<FruitDetailModalProps> = ({ fruit, onClose }) => {
  if (!fruit) {
    return null;
  }

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 dark:bg-white/60  flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-neutral-900 rounded-lg shadow-xl p-6 max-w-3xl w-full flex flex-col md:flex-row gap-6 relative"
        onClick={handleContentClick}
      >
        <button 
          onClick={onClose} 
          className="cursor-pointer absolute top-2 right-3 text-gray-500 dark:hover:text-white hover:text-gray-800 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times; 
        </button>
        
        <div className="w-full md:w-1/3 flex-shrink-0">
           <FruitCard fruit={fruit} /> 
        </div>

        <div className="text-gray-800 flex-grow overflow-y-auto max-h-[70vh]">
          <h2 className="text-2xl font-bold dark:text-white mb-3">{fruit.name}</h2>
          <p className="mb-1 dark:text-white"><strong className="font-semibold text-purple-600">Current Owner:</strong> {fruit.user || 'Unknown'}</p>
          {fruit.previousOwner && (
            <p className="mb-4 dark:text-white"><strong className="font-semibold text-purple-600">Previous Owner:</strong> {fruit.previousOwner}</p>
          )}

          {fruit.meaning && (
            <>
              <h3 className="text-lg font-semibold mt-4 mb-2 border-b border-gray-300 pb-1 text-purple-700 dark:text-white">Meaning</h3>
              <p className="text-sm mb-4 dark:text-white">{fruit.meaning}</p>
            </>
          )}
          <h3 className="text-lg font-semibold mt-4 mb-2 border-b border-gray-300 pb-1 text-purple-700 dark:text-white">Description</h3>
          <p className="text-sm mb-4 dark:text-white">{fruit.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};