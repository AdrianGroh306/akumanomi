import { useState } from 'react';
import { fruits } from '../../data/fruits';

export const useFindDevilFruit = () => {
    const [fruit, setFruit] = useState<typeof fruits[0] | null>(null);

    const findRandomFruit = () => {
        const randomIndex = Math.floor(Math.random() * fruits.length);
        setFruit(fruits[randomIndex]);
    };

    return {
        fruit,
        findRandomFruit
    };
};