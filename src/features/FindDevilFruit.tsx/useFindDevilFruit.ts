import { useState } from 'react';
import { useDevilFruitsQuery, Fruit } from '../../api/fetchDevilFruits'; 
import defaultImage from '../../assets/devil_fruit_.png';

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
    const { data: allFruits, isLoading, isError } = useDevilFruitsQuery();
    const [randomFruit, setRandomFruit] = useState<Fruit>(defaultFruit);

    const findRandomFruit = () => {
        if (allFruits && allFruits.length > 0 && !isLoading && !isError) {
            const randomIndex = Math.floor(Math.random() * allFruits.length);
            setRandomFruit(allFruits[randomIndex]);
        } else {
            
        }
    };

    return {
        randomFruit,
        findRandomFruit,
        isLoadingFruits: isLoading,
        fruitsError: isError 
    };
};