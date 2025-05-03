import React, { createContext, useContext, ReactNode } from 'react';
import { useDevilFruitsQuery, Fruit } from '../api/fetchDevilFruits';

interface DevilFruitsContextValue {
  fruits: Fruit[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

const DevilFruitsContext = createContext<DevilFruitsContextValue>({
  fruits: undefined,
  isLoading: false,
  error: null,
});

export const useDevilFruitsContext = () => useContext(DevilFruitsContext);

export const DevilFruitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: fruits, isLoading, error } = useDevilFruitsQuery();
  return (
    <DevilFruitsContext.Provider value={{ fruits, isLoading, error }}>
      {children}
    </DevilFruitsContext.Provider>
  );
};