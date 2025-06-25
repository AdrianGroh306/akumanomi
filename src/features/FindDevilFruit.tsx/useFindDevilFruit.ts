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
    
    // Ref um aktuelle Werte zu speichern
    const currentFruitsRef = useRef(fruits);
    const currentLoadingRef = useRef(isLoading);
    const currentErrorRef = useRef(error);
    
    // Refs aktuell halten
    useEffect(() => {
        currentFruitsRef.current = fruits;
        currentLoadingRef.current = isLoading;
        currentErrorRef.current = error;
    }, [fruits, isLoading, error]);

    const findRandomFruit = async () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setAnimationPhase('shaking');
            
            console.log('Animation gestartet, Früchte:', fruits?.length, 'Loading:', isLoading, 'Error:', error);
            
            // Bereits während der Wackel-Phase die neue Frucht auswählen und Bild preloaden
            let selectedFruit: Fruit | null = null;
            
            // Warten bis Früchte verfügbar sind und auswählen
            let attempts = 0;
            const maxAttempts = 20; // 2 Sekunden bei 100ms Intervallen
            
            while (attempts < maxAttempts && !selectedFruit) {
                const currentFruits = currentFruitsRef.current;
                const currentLoading = currentLoadingRef.current;
                const currentError = currentErrorRef.current;
                
                if (currentFruits && currentFruits.length > 0 && !currentLoading && !currentError) {
                    const randomIndex = Math.floor(Math.random() * currentFruits.length);
                    selectedFruit = currentFruits[randomIndex];
                    console.log('Frucht ausgewählt und Bild wird preloaded:', selectedFruit.name);
                    
                    // Bild im Hintergrund preloaden
                    if (selectedFruit.avatarSrc) {
                        const img = new Image();
                        img.src = selectedFruit.avatarSrc;
                        console.log('Bild wird preloaded:', selectedFruit.avatarSrc);
                    }
                    break;
                }
                
                await new Promise(resolve => setTimeout(resolve, 100));
                attempts++;
            }
            
            // Falls keine Frucht gefunden wurde, verwende Standard
            if (!selectedFruit) {
                selectedFruit = defaultFruit;
                console.warn('Keine Früchte verfügbar nach', attempts, 'Versuchen, verwende Standardfrucht');
            }
            
            // Längere, natürlichere Wackel-Phase (2s) - Bild lädt währenddessen
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Flip-Phase starten
            setAnimationPhase('flipping');
            
            // Nach 0.6s die neue Frucht setzen (Bild sollte schon geladen sein)
            setTimeout(() => {
                if (selectedFruit) {
                    console.log('Neue Frucht angezeigt (Bild sollte bereits geladen sein):', selectedFruit.name);
                    setRandomFruit(selectedFruit);
                }
            }, 600);
            // Flip-Animation beenden (weitere 0.6s = 1.2s total)
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