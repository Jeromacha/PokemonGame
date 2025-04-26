import type { GameState, PokemonType } from "../Interfaces/PokeInterfaz";
import { fetchRandomPokemonFromRange } from "../Services/PokeServicios";
import { DIFFICULTY_LEVELS } from "./constantes";


const getBasePokemonName = (name: string): string => {
  const specialForms = [
    'deoxys', 'wormadam', 'shaymin', 'giratina', 'basculin',
    'darmanitan', 'tornadus', 'thundurus', 'landorus',
    'keldeo', 'meloetta', 'meowstic', 'aegislash',
    'pumpkaboo', 'gourgeist', 'zygarde', 'lycanroc',
    'wishiwashi', 'minior', 'mimikyu', 'toxtricity',
    'eiscue', 'indeedee', 'morpeko', 'urshifu'
  ];

  const lowerName = name.toLowerCase();
  let baseName = name.split('(')[0].trim();
  baseName = baseName.split('-')[0].trim();
  
  const isSpecialForm = specialForms.some(form => 
    lowerName.includes(form) && (lowerName !== form)
  );

  return isSpecialForm ? baseName.split(' ')[0].trim().toLowerCase() : baseName.toLowerCase();
};

export const formatPokemonName = (name: string): string => {
  const baseName = getBasePokemonName(name);
  return baseName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const checkGuess = (guess: string, pokemonName: string): boolean => {
  return normalizeString(guess) === getBasePokemonName(pokemonName);
};

export const calculateScore = (
  difficulty: keyof typeof DIFFICULTY_LEVELS,
  hintsUsed: number,
  attemptsUsed: number
): number => {
  const { basePoints, hintPenalty, attemptPenalty } = DIFFICULTY_LEVELS[difficulty];
  
 
  let score = basePoints - (hintsUsed * hintPenalty) - (attemptsUsed * attemptPenalty);
  
 
  return Math.max(0, Math.round(score));
};


export const calculateStreakBonus = (streak: number): number => {
  const maxBonus = 5; 
  const bonus = Math.min(streak * 0.5, maxBonus);
  return Math.round(bonus * 10) / 10; 
};


export const getNextPokemon = async (
  currentState: GameState,
  genStart: number,
  genEnd: number
): Promise<GameState> => {
  try {
    const pokemon = await fetchRandomPokemonFromRange(genStart, genEnd);
    return {
      ...currentState,
      currentPokemon: {
        ...pokemon,
        types: pokemon.types.map((type, index) => ({
          slot: index + 1,
          type: {
            name: type.type.name as PokemonType,
            url: type.type.url || ""
          }
        }))
      },
      hintsUsed: 0,
      attemptsLeft: DIFFICULTY_LEVELS[currentState.difficulty].attempts
    };
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return currentState;
  }
};

export const getGenerationFromId = (id: number): number => {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 898) return 8;
  return 9;
};