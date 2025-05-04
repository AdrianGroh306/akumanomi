import { useState } from 'react';
import { Fruit } from '../../api/fetchDevilFruits'; 
import defaultImage from '../../assets/devil_fruit_.avif';
import { useDevilFruitsContext } from '../../context/DevilFruitsContext';

const defaultFruit: Fruit = {
    id: 0,
    name: '???',
    type: 'unknown',
    description: 'Click the button to find your Devil Fruit!',
    user: 'unknown',
    avatarSrc: defaultImage,
    meaning: undefined,
    previousOwner: undefined,
};

export const useFindDevilFruit = () => {
    const { fruits, isLoading, error } = useDevilFruitsContext();
    const [randomFruit, setRandomFruit] = useState<Fruit>(defaultFruit);

    const findRandomFruit = () => {
        if (fruits && fruits.length > 0 && !isLoading && !error) {
            const randomIndex = Math.floor(Math.random() * fruits.length);
            setRandomFruit(fruits[randomIndex]);
        } else {
            
        }
    };

    return {
        randomFruit,
        findRandomFruit,
        isLoadingFruits: isLoading,
        fruitsError: error 
    };
};