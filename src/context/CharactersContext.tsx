import React, { createContext, useContext, ReactNode } from 'react';
import { useCharactersQuery, Character } from '../api/fetchCharacters';

interface CharactersContextValue {
  characters: Character[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const CharactersContext = createContext<CharactersContextValue>({
  characters: undefined,
  isLoading: false,
  error: null,
});

export const useCharactersContext = () => useContext(CharactersContext);

export const CharactersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: characters, isLoading, error } = useCharactersQuery();
  return (
    <CharactersContext.Provider value={{ characters, isLoading, error }}>
      {children}
    </CharactersContext.Provider>
  );
};
