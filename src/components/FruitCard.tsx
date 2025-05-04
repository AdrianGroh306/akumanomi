import React from 'react';
import { Fruit } from '../api/fetchDevilFruits';
import { motion } from 'framer-motion'; 
import defaultImage from '../assets/devil_fruit_.avif'; 

interface FruitCardProps {
  fruit: Fruit;
  onClick?: (fruit: Fruit) => void; 
}

const getTypeStyles = (type: string | undefined) => {
  switch (type?.toLowerCase()) {
    case 'paramecia':
      return {
        borderColor: 'border-blue-500', 
        textColor: 'text-blue-600',     
      };
    case 'zoan':
      return {
        borderColor: 'border-purple-500',
        textColor: 'text-purple-600',
      };
    case 'logia':
      return {
        borderColor: 'border-orange-400',
        textColor: 'text-orange-500',
      };
    case 'unknown':
      return {
        borderColor: 'border-gray-400',
        textColor: 'text-gray-500',
      };
    default:
      return {
        borderColor: 'border-pink-400',
        textColor: 'text-pink-500',  
      };
  }
};

export const FruitCard: React.FC<FruitCardProps> = ({ fruit, onClick }) => {
  const { id, name, type, avatarSrc } = fruit;
  const imageSrc = avatarSrc || defaultImage; 
  
  const { borderColor, textColor } = getTypeStyles(type);
  const formattedId = `#${id.toString().padStart(3, '0')}`;

  const handleCardClick = () => {
    if (onClick) {
      onClick(fruit); 
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = defaultImage; 
    target.alt = 'Image not available';
  };

  return (
    <motion.div 
      layoutId={`fruit-card-${id}`} 
      className={`relative bg-white rounded-lg shadow-md overflow-hidden text-center p-4 transition-transform transform hover:scale-105 cursor-pointer h-full flex flex-col border-2 ${borderColor}`} 
      onClick={handleCardClick} 
    >
      <div className="absolute top-2 left-2 bg-gray-100 bg-opacity-80 text-gray-700 text-xs font-bold px-2 py-1 rounded-full z-10"> 
        {formattedId}
      </div>

      <div className="w-full h-48 mb-4 rounded-4xl bg-blue-500 flex items-center justify-center overflow-hidden"> 
         <motion.img 
           src={imageSrc} 
           alt={name || 'Devil Fruit'} 
           className="w-full h-full object-cover" 
           onError={handleImageError}
         />
       </div>
      <div className="mt-auto pt-2 border-t border-gray-200"> 
        <h3 className="text-lg font-semibold text-gray-800 min-h-16 flex items-center justify-center"> 
          {name || '???'}
        </h3>
        <p className={`text-sm font-medium mt-1 ${textColor}`}>{type || 'Unknown'}</p> 
      </div>
    </motion.div>
  );
};