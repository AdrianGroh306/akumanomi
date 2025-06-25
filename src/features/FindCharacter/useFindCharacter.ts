import { useState, useRef, useEffect } from 'react';
import { Character } from '../../api/fetchCharacters'; 
import { useCharactersContext } from '../../context/CharactersContext';

const defaultCharacter: Character = {
    id: 0,
    englishName: '???',
    description: 'Click the button to find your Character!',
    avatarSrc: '/default-character.png',
};

export const useFindCharacter = () => {
    const { characters, isLoading, error } = useCharactersContext();
    const [randomCharacter, setRandomCharacter] = useState<Character>(defaultCharacter);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationPhase, setAnimationPhase] = useState<'idle' | 'shaking' | 'flipping'>('idle');
    
    const currentCharactersRef = useRef(characters);
    const currentLoadingRef = useRef(isLoading);
    const currentErrorRef = useRef(error);
    
    useEffect(() => {
        currentCharactersRef.current = characters;
        currentLoadingRef.current = isLoading;
        currentErrorRef.current = error;
    }, [characters, isLoading, error]);

    const findRandomCharacter = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setAnimationPhase('shaking');
            
            let selectedCharacter: Character | null = null;
            let attempts = 0;
            const maxAttempts = 20;
            
            while (attempts < maxAttempts && !selectedCharacter) {
                const currentCharacters = currentCharactersRef.current;
                const currentLoading = currentLoadingRef.current;
                const currentError = currentErrorRef.current;
                
                if (currentCharacters && currentCharacters.length > 0 && !currentLoading && !currentError) {
                    const randomIndex = Math.floor(Math.random() * currentCharacters.length);
                    selectedCharacter = currentCharacters[randomIndex];
                    
                    if (selectedCharacter.avatarSrc) {
                        const img = new Image();
                        img.src = selectedCharacter.avatarSrc;
                    }
                    break;
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            if (!selectedCharacter) {
                selectedCharacter = defaultCharacter;
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setAnimationPhase('flipping');
            
            setTimeout(() => {
                if (selectedCharacter) {
                    setRandomCharacter(selectedCharacter);
                }
            }, 600);
            
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            setAnimationPhase('idle');
            setIsAnimating(false);
        }
    };

    return {
        randomCharacter,
        findRandomCharacter,
        isAnimating,
        animationPhase,
        isLoadingCharacters: isLoading,
        charactersError: error 
    };
};
