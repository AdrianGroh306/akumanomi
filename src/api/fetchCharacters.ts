import { useQuery } from '@tanstack/react-query';

export interface Character {
  id: number;
  englishName: string;
  japaneseName?: string;
  age?: string;
  affiliations?: string;
  birthday?: string;
  bloodType?: string;
  bounty?: string;
  debut?: string;
  description: string;
  devilFruitName?: string;
  origin?: string;
  avatarSrc?: string;
}

interface ApiCharacter {
  id: number;
  englishName: string;
  japaneseName?: string;
  age?: string;
  affiliations?: string;
  birthday?: string;
  bloodType?: string;
  bounty?: string;
  debut?: string;
  description: string;
  devilFruitName?: string;
  origin?: string;
  avatarSrc?: string;
}

interface ApiInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface ApiPageResponse {
  data?: {
    characters?: {
      info: ApiInfo;
      results: ApiCharacter[];
    };
  };
  errors?: Array<{ message: string; locations?: any }>;
}

const fetchCharactersPage = async (page: number = 1): Promise<ApiPageResponse> => {
  try {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetCharactersPage($page: Int) {
            characters(page: $page) {
              info {
                count
                pages
                next
                prev
              }
              results {
                id
                englishName
                japaneseName
                age
                affiliations
                birthday
                bloodType
                bounty
                debut
                description
                devilFruitName
                origin
                avatarSrc
              }
            }
          }
        `,
        variables: {
          page: page
        }
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json: ApiPageResponse = await res.json();

    if (json.errors) {
      const errorMessages = json.errors.map((e) => e.message).join(', ');
      throw new Error(`GraphQL error: ${errorMessages}`);
    }

    if (!json.data?.characters?.results || !json.data?.characters?.info) {
      console.error('Invalid data structure received:', json);
      throw new Error('Invalid data structure received from API.');
    }

    return json;
  } catch (error) {
    console.error(`Error fetching characters page ${page}:`, error);
    throw error;
  }
};

const fetchAllCharacters = async (): Promise<Character[]> => {
  let allApiCharacters: ApiCharacter[] = [];
  let totalPages = 1;

  try {
    const firstPageResponse = await fetchCharactersPage(1);
    totalPages = firstPageResponse.data?.characters?.info.pages ?? 1;
    allApiCharacters = firstPageResponse.data?.characters?.results ?? [];

    if (totalPages <= 1 || allApiCharacters.length === 0) {
      const characters: Character[] = allApiCharacters.map((char) => ({
        id: char.id,
        englishName: char.englishName,
        japaneseName: char.japaneseName,
        age: char.age,
        affiliations: char.affiliations,
        birthday: char.birthday,
        bloodType: char.bloodType,
        bounty: char.bounty,
        debut: char.debut,
        description: char.description,
        devilFruitName: char.devilFruitName,
        origin: char.origin,
        avatarSrc: char.avatarSrc,
      }));
      characters.sort((a, b) => a.id - b.id);
      console.log(`Fetched ${characters.length} characters from ${totalPages} page(s).`);
      return characters;
    }

    const pagePromises: Promise<ApiPageResponse>[] = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(fetchCharactersPage(page));
    }

    const remainingPageResponses = await Promise.all(pagePromises);

    remainingPageResponses.forEach(response => {
      const results = response.data?.characters?.results;
      if (results) {
        allApiCharacters.push(...results);
      }
    });

    const allCharacters: Character[] = allApiCharacters.map((char) => ({
      id: char.id,
      englishName: char.englishName,
      japaneseName: char.japaneseName,
      age: char.age,
      affiliations: char.affiliations,
      birthday: char.birthday,
      bloodType: char.bloodType,
      bounty: char.bounty,
      debut: char.debut,
      description: char.description,
      devilFruitName: char.devilFruitName,
      origin: char.origin,
      avatarSrc: char.avatarSrc,
    }));

    allCharacters.sort((a, b) => a.id - b.id);

    console.log(`Fetched ${allCharacters.length} characters from ${totalPages} pages.`);
    return allCharacters;

  } catch (error) {
    console.error('Error fetching all characters:', error);
    throw error;
  }
};

export const useCharactersQuery = () => {
  return useQuery<Character[], Error>({ 
    queryKey: ['characters', 'all'],
    queryFn: fetchAllCharacters,
    staleTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};