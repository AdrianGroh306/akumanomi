import { Character } from '../api/fetchCharacters';
import { useState } from 'react';
import defaultImage from '../assets/devil_fruit_.avif';

interface CharacterDetailModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterDetailModal = ({ character, onClose }: CharacterDetailModalProps) => {
  const [imageError, setImageError] = useState(false);

  if (!character) return null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{character.englishName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img
                src={imageError ? defaultImage : (character.avatarSrc || defaultImage)}
                alt={character.englishName}
                className="w-full rounded-lg shadow-lg"
                onError={handleImageError}
              />
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {character.japaneseName && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Japanese Name</h4>
                    <p className="text-gray-900 dark:text-white">{character.japaneseName}</p>
                  </div>
                )}
                
                {character.age && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Age</h4>
                    <p className="text-gray-900 dark:text-white">{character.age}</p>
                  </div>
                )}
                
                {character.birthday && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Birthday</h4>
                    <p className="text-gray-900 dark:text-white">{character.birthday}</p>
                  </div>
                )}
                
                {character.bloodType && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Blood Type</h4>
                    <p className="text-gray-900 dark:text-white">{character.bloodType}</p>
                  </div>
                )}
                
                {character.origin && character.origin !== 'N/A' && (
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Origin</h4>
                    <p className="text-gray-900 dark:text-white">{character.origin}</p>
                  </div>
                )}
              </div>
              
              {character.bounty && character.bounty !== 'N/A' && character.bounty !== '0' && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Bounty</h4>
                  <p className="text-2xl font-bold text-red-600">₿{character.bounty}</p>
                </div>
              )}
              
              {character.affiliations && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Affiliations</h4>
                  <p className="text-gray-900 dark:text-white">{character.affiliations}</p>
                </div>
              )}
              
              {character.devilFruitName && character.devilFruitName !== 'N/A' && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Devil Fruit</h4>
                  <p className="text-gray-900 dark:text-white font-medium">{character.devilFruitName}</p>
                </div>
              )}
              
              {character.debut && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Debut</h4>
                  <p className="text-gray-900 dark:text-white">{character.debut}</p>
                </div>
              )}
              
              {character.description && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">Description</h4>
                  <p className="text-gray-900 dark:text-white text-sm leading-relaxed">{character.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
