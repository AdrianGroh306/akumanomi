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

// Fetches a single page of devil fruits using page as a direct argument
const fetchDevilFruitsPage = async (page: number = 1): Promise<ApiPageResponse> => {
  try {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetDevilFruitsPage($page: Int) { # Define page variable
            devilFruits(page: $page) { # Use page as a direct argument
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
          page: page // Pass the page number
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

// Fetches all devil fruits by handling pagination using page numbers and sorts them by ID
const fetchAllDevilFruits = async (): Promise<Fruit[]> => {
  let allApiFruits: ApiDevilFruit[] = [];
  let totalPages = 1;

  try {
    // Fetch the first page to get the total number of pages
    const firstPageResponse = await fetchDevilFruitsPage(1);
    totalPages = firstPageResponse.data?.devilFruits?.info.pages ?? 1;
    allApiFruits = firstPageResponse.data?.devilFruits?.results ?? [];

    if (totalPages <= 1 || allApiFruits.length === 0) {
       // If only one page or first page failed, sort and return what we have
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

    // Create promises for the remaining pages (from 2 to totalPages)
    const pagePromises: Promise<ApiPageResponse>[] = [];
    for (let page = 2; page <= totalPages; page++) {
      pagePromises.push(fetchDevilFruitsPage(page));
    }

    // Fetch remaining pages in parallel
    const remainingPageResponses = await Promise.all(pagePromises);

    // Collect results from remaining pages
    remainingPageResponses.forEach(response => {
      const results = response.data?.devilFruits?.results;
      if (results) {
        allApiFruits.push(...results);
      }
    });

    // Map ApiDevilFruit to Fruit interface
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