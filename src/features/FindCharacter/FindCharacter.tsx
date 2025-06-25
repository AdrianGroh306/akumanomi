import { useState } from 'react';
import { motion } from 'framer-motion';
import { CharacterCard } from '../../components/CharacterCard';
import { useFindCharacter } from './useFindCharacter';
import { Character } from '../../api/fetchCharacters';
import { CharacterDetailModal } from '../../components/CharacterDetailModal';
import { Navbar } from '../../components/Navbar';

export const FindCharacter = () => {
    const { randomCharacter, findRandomCharacter, isAnimating, animationPhase } = useFindCharacter();
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleCardClick = (character: Character) => {
        if (character.id !== 0 && !isAnimating) { 
            setSelectedCharacter(character);
        }
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    return (
        <div className="flex flex-col bg-white dark:bg-neutral-900 min-h-screen">
            <title>
                {isAnimating
                    ? 'Searching for your Character... | Akumanomi'
                    : randomCharacter.englishName !== '???' 
                    ? `Found: ${randomCharacter.englishName} | Akumanomi` 
                    : 'Find Your Character | Akumanomi'
                }
            </title>
            <Navbar />
            
            <main className="flex-grow flex flex-col items-center p-8 text-center">
                <motion.h1 
                    className="text-3xl dark:text-white font-semibold mb-8"
                    animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 0.6, repeat: isAnimating ? Infinity : 0 }}
                >
                    Find Your One Piece Character!
                </motion.h1>

                <div className="mb-8 w-full max-w-xs relative" style={{ perspective: '1500px' }}>
                    <motion.div
                        animate={{
                            x: animationPhase === 'shaking' ? [0, -2, 2, -4, 4, -6, 6, -8, 8, -6, 6, -4, 4, -2, 2, 0] : 0,
                            y: animationPhase === 'shaking' ? [0, -1, 1, -2, 2, -3, 3, -4, 4, -3, 3, -2, 2, -1, 1, 0] : 0,
                            rotate: animationPhase === 'shaking' ? [0, -1, 1, -2, 2, -3, 3, -2, 2, -1, 1, 0] : 0,
                            scale: animationPhase === 'flipping' ? [1, 1.05, 0.3, 0, 0.3, 1.05, 1] : 1,
                            opacity: animationPhase === 'flipping' ? [1, 0.9, 0.5, 0, 0.5, 0.9, 1] : 1,
                        }}
                        transition={{
                            duration: animationPhase === 'shaking' ? 2 : animationPhase === 'flipping' ? 1.2 : 0.3,
                            ease: animationPhase === 'flipping' ? 'easeInOut' : animationPhase === 'shaking' ? 'easeOut' : 'easeOut',
                            times: animationPhase === 'shaking' 
                                ? [0, 0.06, 0.12, 0.18, 0.24, 0.3, 0.36, 0.42, 0.48, 0.6, 0.72, 0.8, 0.88, 0.94, 0.97, 1]
                                : undefined,
                        }}
                        style={{
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        <CharacterCard 
                            character={randomCharacter} 
                            onClick={handleCardClick}
                        />
                    </motion.div>
                    
                    {/* Character-themed animation effects */}
                    {isAnimating && (
                        <>
                            {/* Pulsing ring around the card */}
                            <motion.div
                                className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                                style={{
                                    borderColor: animationPhase === 'flipping' ? '#DC2626' : '#3B82F6',
                                    boxShadow: animationPhase === 'flipping' 
                                        ? '0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(239, 68, 68, 0.2)'
                                        : '0 0 15px rgba(59, 130, 246, 0.3), 0 0 30px rgba(96, 165, 250, 0.2)'
                                }}
                                animate={{ 
                                    scale: animationPhase === 'shaking' ? [1, 1.01, 1] : [1, 1.03, 1],
                                    opacity: [0.2, 0.6, 0.2]
                                }}
                                transition={{ 
                                    duration: animationPhase === 'shaking' ? 0.8 : 1.2, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            {/* Light particles effect */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-0.5 h-0.5 rounded-full"
                                        style={{
                                            backgroundColor: animationPhase === 'flipping' ? '#DC2626' : '#3B82F6',
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            opacity: [0, 0.8, 0],
                                            y: [0, -20, -35],
                                        }}
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            delay: i * 0.3,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Intense glow only during flip */}
                            {animationPhase === 'flipping' && (
                                <>
                                    <motion.div
                                        className="absolute inset-0 rounded-lg pointer-events-none"
                                        style={{
                                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.15) 30%, rgba(220, 38, 38, 0.1) 60%, transparent 80%)',
                                        }}
                                        animate={{
                                            scale: [1, 1.8, 2.5, 1.8, 1],
                                            opacity: [0, 0.6, 0.4, 0.6, 0]
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    
                                    {/* Teleport particle explosion */}
                                    {[...Array(12)].map((_, i) => (
                                        <motion.div
                                            key={`particle-${i}`}
                                            className="absolute w-1 h-1 rounded-full pointer-events-none"
                                            style={{
                                                backgroundColor: ['#3B82F6', '#60A5FA', '#DC2626', '#EF4444'][Math.floor(Math.random() * 4)],
                                                left: '50%',
                                                top: '50%',
                                            }}
                                            animate={{
                                                scale: [0, 1.2, 0],
                                                opacity: [0, 0.9, 0],
                                                x: [0, (Math.random() - 0.5) * 150],
                                                y: [0, (Math.random() - 0.5) * 150],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                delay: i * 0.05,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                    
                                    {/* Magic spiral */}
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={`spiral-${i}`}
                                            className="absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none"
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                                boxShadow: '0 0 4px rgba(59, 130, 246, 0.6)'
                                            }}
                                            animate={{
                                                scale: [0, 1.5, 0],
                                                opacity: [0, 0.8, 0],
                                                x: [0, Math.cos(i * 1.05) * 60],
                                                y: [0, Math.sin(i * 1.05) * 60],
                                                rotate: [0, 180]
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                delay: i * 0.15,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}
                                    
                                    {/* Central energy burst */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full pointer-events-none"
                                        style={{
                                            boxShadow: '0 0 12px rgba(59, 130, 246, 0.7), 0 0 24px rgba(96, 165, 250, 0.4)'
                                        }}
                                        animate={{
                                            scale: [0, 2.5, 5, 0],
                                            opacity: [0, 0.8, 0.2, 0],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>

                <motion.button
                    onClick={findRandomCharacter}
                    disabled={isAnimating}
                    className={`px-6 py-3 rounded-lg text-lg font-bold transform transition-all duration-200 ${
                        isAnimating 
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed scale-95' 
                            : 'bg-blue-600 text-white hover:scale-105 hover:bg-blue-700 cursor-pointer'
                    }`}
                    whileHover={!isAnimating ? { scale: 1.05 } : {}}
                    whileTap={!isAnimating ? { scale: 0.95 } : {}}
                    animate={isAnimating ? { 
                        backgroundColor: ['#2563EB', '#3B82F6', '#DC2626', '#2563EB'],
                        boxShadow: [
                            '0 4px 6px rgba(0,0,0,0.1)',
                            '0 8px 15px rgba(59,130,246,0.3)',
                            '0 8px 15px rgba(220,38,38,0.3)',
                            '0 4px 6px rgba(0,0,0,0.1)'
                        ]
                    } : {}}
                    transition={{ duration: 0.6, repeat: isAnimating ? Infinity : 0 }}
                >
                    {isAnimating ? '...' : 'FIND CHARACTER'}
                </motion.button>
            </main>
            
            <CharacterDetailModal character={selectedCharacter} onClose={handleCloseModal} />
        </div>
    )
}
