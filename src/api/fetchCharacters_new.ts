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

// Character data with working images since API has CORS restrictions
const fallbackCharacters: Character[] = [
  {
    id: 1,
    englishName: "Monkey D. Luffy",
    japaneseName: "モンキー・D・ルフィ",
    age: "19",
    affiliations: "Straw Hat Pirates",
    birthday: "May 5th",
    bloodType: "F",
    bounty: "3,000,000,000",
    debut: "Chapter 1, Episode 1",
    description: "Monkey D. Luffy is the founder and captain of the increasingly infamous and powerful Straw Hat Pirates, as well as the most powerful of its top fighters. He desires to find the legendary treasure left behind by the late Gol D. Roger and thereby become the Pirate King.",
    devilFruitName: "Gomu Gomu no Mi",
    origin: "East Blue"
  },
  {
    id: 2,
    englishName: "Roronoa Zoro",
    japaneseName: "ロロノア・ゾロ",
    age: "21",
    affiliations: "Straw Hat Pirates",
    birthday: "November 11th",
    bloodType: "XF",
    bounty: "1,111,000,000",
    debut: "Chapter 3, Episode 2",
    description: "Roronoa Zoro, also known as 'Pirate Hunter' Zoro, is the combatant of the Straw Hat Pirates, one of their two swordsmen, and one of the Senior Officers of the Straw Hat Grand Fleet.",
    devilFruitName: "N/A",
    origin: "East Blue"
  },
  {
    id: 3,
    englishName: "Nami",
    japaneseName: "ナミ",
    age: "20",
    affiliations: "Straw Hat Pirates",
    birthday: "July 3rd",
    bloodType: "X",
    bounty: "366,000,000",
    debut: "Chapter 8, Episode 1",
    description: "Nami is the navigator of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet. She is the third member of the crew and the second to join.",
    devilFruitName: "N/A",
    origin: "East Blue"
  },
  {
    id: 4,
    englishName: "Usopp",
    japaneseName: "ウソップ",
    age: "19",
    affiliations: "Straw Hat Pirates",
    birthday: "April 1st",
    bloodType: "S",
    bounty: "500,000,000",
    debut: "Chapter 23, Episode 8",
    description: "Usopp is the sniper of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet. He is the fourth member of the crew and the third to join.",
    devilFruitName: "N/A",
    origin: "East Blue"
  },
  {
    id: 5,
    englishName: "Vinsmoke Sanji",
    japaneseName: "ヴィンスモーク・サンジ",
    age: "21",
    affiliations: "Straw Hat Pirates",
    birthday: "March 2nd",
    bloodType: "S RH-",
    bounty: "1,032,000,000",
    debut: "Chapter 43, Episode 20",
    description: "Vinsmoke Sanji, most commonly known by his moniker 'Black Leg' Sanji, is the cook of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet.",
    devilFruitName: "N/A",
    origin: "North Blue"
  },
  {
    id: 6,
    englishName: "Tony Tony Chopper",
    japaneseName: "トニートニー・チョッパー",
    age: "17",
    affiliations: "Straw Hat Pirates",
    birthday: "December 24th",
    bloodType: "X",
    bounty: "1,000",
    debut: "Chapter 134, Episode 81",
    description: "Tony Tony Chopper, also known as 'Cotton Candy Lover' Chopper, is the doctor of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet.",
    devilFruitName: "Hito Hito no Mi",
    origin: "Grand Line"
  },
  {
    id: 7,
    englishName: "Nico Robin",
    japaneseName: "ニコ・ロビン",
    age: "30",
    affiliations: "Straw Hat Pirates",
    birthday: "February 6th",
    bloodType: "S",
    bounty: "930,000,000",
    debut: "Chapter 114, Episode 67",
    description: "Nico Robin, also known by her epithet 'Devil Child' and the 'Light of the Revolution', is the archaeologist of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet.",
    devilFruitName: "Hana Hana no Mi",
    origin: "West Blue"
  },
  {
    id: 8,
    englishName: "Franky",
    japaneseName: "フランキー",
    age: "36",
    affiliations: "Straw Hat Pirates",
    birthday: "March 9th",
    bloodType: "XF",
    bounty: "394,000,000",
    debut: "Chapter 329, Episode 233",
    description: "Franky is the shipwright of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet. He is the crew's eighth member and the seventh to join.",
    devilFruitName: "N/A",
    origin: "South Blue"
  },
  {
    id: 9,
    englishName: "Brook",
    japaneseName: "ブルック",
    age: "90",
    affiliations: "Straw Hat Pirates",
    birthday: "April 3rd",
    bloodType: "X",
    bounty: "383,000,000",
    debut: "Chapter 442, Episode 337",
    description: "Brook, also known as the 'Soul King', is the musician of the Straw Hat Pirates and one of the Senior Officers of the Straw Hat Grand Fleet.",
    devilFruitName: "Yomi Yomi no Mi",
    origin: "West Blue"
  },
  {
    id: 10,
    englishName: "Jinbe",
    japaneseName: "ジンベエ",
    age: "46",
    affiliations: "Straw Hat Pirates",
    birthday: "April 2nd",
    bloodType: "F",
    bounty: "1,100,000,000",
    debut: "Chapter 528, Episode 430",
    description: "Jinbe is a whale shark fish-man and a powerful master of Fish-Man Karate. His dream is to fulfill his former captain Fisher Tiger's dying wish of coexistence and equality between humans and fish-men.",
    devilFruitName: "N/A",
    origin: "Grand Line"
  },
  {
    id: 11,
    englishName: "Portgas D. Ace",
    japaneseName: "ポートガス・D・エース",
    age: "20",
    affiliations: "Whitebeard Pirates",
    birthday: "January 1st",
    bloodType: "S",
    bounty: "550,000,000",
    debut: "Chapter 154, Episode 91",
    description: "Portgas D. Ace, born as Gol D. Ace and nicknamed 'Fire Fist Ace', was the adoptive older brother of Monkey D. Luffy and Sabo, and the son of the late Pirate King Gol D. Roger.",
    devilFruitName: "Mera Mera no Mi",
    origin: "South Blue"
  },
  {
    id: 12,
    englishName: "Sabo",
    japaneseName: "サボ",
    age: "22",
    affiliations: "Revolutionary Army",
    birthday: "March 20th",
    bloodType: "X",
    bounty: "602,000,000",
    debut: "Chapter 583, Episode 494",
    description: "Sabo is the Revolutionary Army's chief of staff, recognized as the No. 2 of the entire organization and outranked only by Supreme Commander Monkey D. Dragon.",
    devilFruitName: "Mera Mera no Mi",
    origin: "Goa Kingdom"
  },
  {
    id: 13,
    englishName: "Shanks",
    japaneseName: "シャンクス",
    age: "39",
    affiliations: "Red Hair Pirates",
    birthday: "March 9th",
    bloodType: "XF",
    bounty: "4,048,900,000",
    debut: "Chapter 1, Episode 4",
    description: "Shanks, also known as 'Red-Haired Shanks', is the chief of the Red Hair Pirates and one of the Four Emperors that rule over the New World.",
    devilFruitName: "N/A",
    origin: "West Blue"
  },
  {
    id: 14,
    englishName: "Edward Newgate",
    japaneseName: "エドワード・ニューゲート",
    age: "72",
    affiliations: "Whitebeard Pirates",
    birthday: "April 6th",
    bloodType: "F",
    bounty: "5,046,000,000",
    debut: "Chapter 234, Episode 151",
    description: "Edward Newgate, more commonly known as 'Whitebeard', was the captain of the Whitebeard Pirates and was widely known as the 'Strongest Man in the World' and the 'Man Closest to One Piece'.",
    devilFruitName: "Gura Gura no Mi",
    origin: "Grand Line"
  },
  {
    id: 15,
    englishName: "Kaido",
    japaneseName: "カイドウ",
    age: "59",
    affiliations: "Beasts Pirates",
    birthday: "May 1st",
    bloodType: "F",
    bounty: "4,611,100,000",
    debut: "Chapter 795, Episode 739",
    description: "Kaido, known as the 'King of the Beasts', is the Governor-General of the Beasts Pirates and was formerly one of the Four Emperors that ruled over the New World.",
    devilFruitName: "Uo Uo no Mi",
    origin: "Grand Line"
  },
  {
    id: 16,
    englishName: "Charlotte Linlin",
    japaneseName: "シャーロット・リンリン",
    age: "68",
    affiliations: "Big Mom Pirates",
    birthday: "February 15th",
    bloodType: "X",
    bounty: "4,388,000,000",
    debut: "Chapter 651, Episode 571",
    description: "Charlotte Linlin, better known as Big Mom, is the captain of the Big Mom Pirates and was formerly one of the Four Emperors ruling over the New World.",
    devilFruitName: "Soru Soru no Mi",
    origin: "Grand Line"
  },
  {
    id: 17,
    englishName: "Marshall D. Teach",
    japaneseName: "マーシャル・D・ティーチ",
    age: "40",
    affiliations: "Blackbeard Pirates",
    birthday: "August 3rd",
    bloodType: "F",
    bounty: "3,996,000,000",
    debut: "Chapter 223, Episode 146",
    description: "Marshall D. Teach, most commonly referred to by his epithet 'Blackbeard', is the captain-turned-admiral of the Blackbeard Pirates, and one of the Four Emperors.",
    devilFruitName: "Yami Yami no Mi",
    origin: "Grand Line"
  },
  {
    id: 18,
    englishName: "Dracule Mihawk",
    japaneseName: "ジュラキュール・ミホーク",
    age: "43",
    affiliations: "Cross Guild",
    birthday: "March 9th",
    bloodType: "S",
    bounty: "3,590,000,000",
    debut: "Chapter 50, Episode 23",
    description: "Dracule Mihawk is a world-famous pirate who holds the title of 'Strongest Swordsman in the World'. He was one of the Seven Warlords of the Sea, the first revealed and formally introduced.",
    devilFruitName: "N/A",
    origin: "Grand Line"
  },
  {
    id: 19,
    englishName: "Trafalgar D. Water Law",
    japaneseName: "トラファルガー・D・ワーテル・ロー",
    age: "26",
    affiliations: "Heart Pirates",
    birthday: "October 6th",
    bloodType: "F",
    bounty: "3,000,000,000",
    debut: "Chapter 498, Episode 392",
    description: "Trafalgar D. Water Law, more commonly known as just Trafalgar Law and by his epithet as the 'Surgeon of Death', is a pirate from North Blue and the captain and doctor of the Heart Pirates.",
    devilFruitName: "Ope Ope no Mi",
    origin: "North Blue"
  },
  {
    id: 20,
    englishName: "Eustass Kid",
    japaneseName: "ユースタス・キッド",
    age: "23",
    affiliations: "Kid Pirates",
    birthday: "January 10th",
    bloodType: "F",
    bounty: "3,000,000,000",
    debut: "Chapter 498, Episode 392",
    description: "Eustass Kid is a notorious pirate from South Blue and the captain of the Kid Pirates. He is one of twelve pirates who are referred to as the 'Worst Generation'.",
    devilFruitName: "Jiki Jiki no Mi",
    origin: "South Blue"
  }
];

const fetchAllCharacters = async (): Promise<Character[]> => {
  // Note: The GraphQL API has CORS restrictions that prevent direct browser access
  // In a production environment, you would need a backend proxy to access the API
  console.log('Using fallback character data due to CORS restrictions');
  
  // Simulate loading time for better UX
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return fallback data with random ordering for variety
  const shuffled = [...fallbackCharacters].sort(() => Math.random() - 0.5);
  return shuffled;
};

export const useCharactersQuery = () => {
  return useQuery<Character[], Error>({ 
    queryKey: ['characters', 'all'],
    queryFn: fetchAllCharacters,
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
