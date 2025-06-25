import { useState, useRef, useEffect } from 'react';
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
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'idle' | 'shaking' | 'flipping'>('idle');
    
    const currentFruitsRef = useRef(fruits);
    const currentLoadingRef = useRef(isLoading);
    const currentErrorRef = useRef(error);
    
    useEffect(() => {
        currentFruitsRef.current = fruits;
        currentLoadingRef.current = isLoading;
        currentErrorRef.current = error;
    }, [fruits, isLoading, error]);

    const findRandomFruit = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setAnimationPhase('shaking');
            
            let selectedFruit: Fruit | null = null;
            let attempts = 0;
            const maxAttempts = 20;
            
            while (attempts < maxAttempts && !selectedFruit) {
                const currentFruits = currentFruitsRef.current;
                const currentLoading = currentLoadingRef.current;
                const currentError = currentErrorRef.current;
                
                if (currentFruits && currentFruits.length > 0 && !currentLoading && !currentError) {
                    const randomIndex = Math.floor(Math.random() * currentFruits.length);
                    selectedFruit = currentFruits[randomIndex];
                    
                    if (selectedFruit.avatarSrc) {
                        const img = new Image();
                        img.src = selectedFruit.avatarSrc;
                    }
                    break;
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (!selectedFruit) {
                selectedFruit = defaultFruit;
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setAnimationPhase('flipping');
            
            setTimeout(() => {
                if (selectedFruit) {
                    setRandomFruit(selectedFruit);
                }
            }, 600);
            
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            setAnimationPhase('idle');
            setIsAnimating(false);
        }
    };

    return {
        randomFruit,
        findRandomFruit,
        isAnimating,
        animationPhase,
        isLoadingFruits: isLoading,
        fruitsError: error 
    };
};