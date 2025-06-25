import { Character } from '../api/fetchCharacters';
import { useState } from 'react';
import defaultImage from '../assets/devil_fruit_.avif';

interface CharacterCardProps {
  character: Character;
  onClick: (character: Character) => void;
}

export const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    onClick(character);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getHighestBounty = (bountyString?: string): string | null => {
    if (!bountyString || bountyString === 'N/A' || bountyString === '0') {
      return null;
    }

    // Split by spaces to handle multiple bounties
    const bountyParts = bountyString
      .split(/\s+/)
      .map(part => part.trim())
      .filter(part => part.length > 0);

    // Find all parts that look like bounty numbers (contain only digits and commas)
    const validBounties = bountyParts
      .filter(part => /^\d{1,3}(,\d{3})*$/.test(part))
      .map(part => ({
        formatted: part,
        numeric: parseInt(part.replace(/,/g, ''))
      }))
      .filter(bounty => bounty.numeric > 0);

    if (validBounties.length === 0) {
      return null;
    }

    // Return the highest bounty in its original formatted form
    const highest = validBounties.reduce((max, current) => 
      current.numeric > max.numeric ? current : max
    );

    return highest.formatted;
  };

  const formattedId = `#${character.id.toString().padStart(3, '0')}`;
  const highestBounty = getHighestBounty(character.bounty);

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <picture>
          <img
            src={imageError ? defaultImage : (character.avatarSrc || defaultImage)}
            alt={character.englishName}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={handleImageError}
          />
        </picture>
        
        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full font-bold">
          {formattedId}
        </div>
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
          {character.englishName}
        </h3>
        
        {highestBounty && (
          <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
            ₿{highestBounty}
          </div>
        )}
      </div>
    </div>
  );
};
