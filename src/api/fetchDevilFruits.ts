import { useQuery } from '@tanstack/react-query';

interface Fruit {
  id: number;
  name: string;
  type: string;
  description: string;
  user: string;
  avatarSrc?: string;
  meaning?: string;
  previousOwner?: string;
}

interface ApiDevilFruit {
  id: number;
  englishName: string;
  type: string;
  description: string;
  currentOwner: string;
  avatarSrc?: string;
  meaning?: string;
  previousOwner?: string;
}

interface ApiInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface ApiPageResponse {
  data?: {
    devilFruits?: {
      info: ApiInfo;
      results: ApiDevilFruit[];
    };
  };
  errors?: Array<{ message: string; locations?: any }>;
}

const fetchDevilFruitsPage = async (page: number = 1): Promise<ApiPageResponse> => {
  try {
    const res = await fetch('/graphql', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetDevilFruitsPage($page: Int) { 
            devilFruits(page: $page) { 
              info { 
                count
                pages
                next
                prev
              }
              results {
                id
                englishName
                type
                description
                currentOwner
                avatarSrc
                meaning
                previousOwner
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

    if (!json.data?.devilFruits?.results || !json.data?.devilFruits?.info) {
      console.error('Invalid data structure received:', json);
      throw new Error('Invalid data structure received from API.');
    }

    return json;
  } catch (error) {
    console.error(`Error fetching devil fruits page ${page}:`, error);
    throw error;
  }
};

const fetchAllDevilFruits = async (): Promise<Fruit[]> => {
  let allApiFruits: ApiDevilFruit[] = [];
  let totalPages = 1;

  try {
    const firstPageResponse = await fetchDevilFruitsPage(1);
    totalPages = firstPageResponse.data?.devilFruits?.info.pages ?? 1;
    allApiFruits = firstPageResponse.data?.devilFruits?.results ?? [];

    if (totalPages <= 1 || allApiFruits.length === 0) {
       const fruits: Fruit[] = allApiFruits.map((df) => ({
         id: df.id,
         name: df.englishName,
         type: df.type,
         description: df.description,
         user: df.currentOwner,
         avatarSrc: df.avatarSrc,
         meaning: df.meaning,
         previousOwner: df.previousOwner,
       }));
       fruits.sort((a, b) => a.id - b.id);
       console.log(`Fetched ${fruits.length} fruits from ${totalPages} page(s).`);
       return fruits;
    }

    const pagePromises: Promise<ApiPageResponse>[] = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(fetchDevilFruitsPage(page));
    }

    const remainingPageResponses = await Promise.all(pagePromises);

    remainingPageResponses.forEach(response => {
      const results = response.data?.devilFruits?.results;
      if (results) {
        allApiFruits.push(...results);
      }
    });

    const allFruits: Fruit[] = allApiFruits.map((df) => ({
      id: df.id,
      name: df.englishName,
      type: df.type,
      description: df.description,
      user: df.currentOwner,
      avatarSrc: df.avatarSrc,
      meaning: df.meaning,
      previousOwner: df.previousOwner,
    })); 

    allFruits.sort((a, b) => a.id - b.id);

    console.log(`Fetched ${allFruits.length} fruits from ${totalPages} pages.`);
    return allFruits;

  } catch (error) {
    console.error('Error fetching all devil fruits:', error);
    throw error;
  }
};


export const useDevilFruitsQuery = () => {
  return useQuery<Fruit[], Error>({ 
    queryKey: ['devilFruits', 'all'],
    queryFn: fetchAllDevilFruits,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
