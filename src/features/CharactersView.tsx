import { useState } from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterDetailModal } from '../components/CharacterDetailModal';
import { useCharactersContext } from '../context/CharactersContext';
import { Character } from '../api/fetchCharacters';
import { Navbar } from '../components/Navbar';

export const CharactersView = () => {
  const { characters, isLoading, error } = useCharactersContext();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const filteredCharacters = characters?.filter((character: Character) => {
    const matchesSearch = character.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.affiliations?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.devilFruitName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.origin?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         character.affiliations?.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesStatus;
  }) || [];

  const statusOptions = [
    { value: 'all', label: 'All Affiliations' },
    { value: 'straw hat', label: 'Straw Hat Pirates' },
    { value: 'marines', label: 'Marines' },
    { value: 'revolutionary', label: 'Revolutionary Army' },
    { value: 'world government', label: 'World Government' }
  ];

  if (error) {
    return (
      <div className="flex flex-col bg-white dark:bg-neutral-900 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Characters</h2>
          <p className="text-gray-600 dark:text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white dark:bg-neutral-900 min-h-screen">
      <title>One Piece Characters | Akumanomi</title>
      <Navbar />
      
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            One Piece Characters
          </h1>
          
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search characters by name, crew, devil fruit, or race..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading One Piece characters...' : `${filteredCharacters.length} characters found`}
            </div>
          </div>
          
          {/* Characters Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg aspect-[3/4] animate-pulse"></div>
              ))}
            </div>
          ) : filteredCharacters.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredCharacters.map((character: Character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={handleCharacterClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No characters found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </main>
      
      <CharacterDetailModal 
        character={selectedCharacter} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};
