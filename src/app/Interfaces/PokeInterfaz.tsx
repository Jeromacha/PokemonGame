export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      "official-artwork"?: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: PokemonType;
      url: string;
    };
  }[];
  cries?: {
    latest?: string;
  };
  stats?: PokemonStat[];
  species?: {
    name: string;
    url: string;
  };
  height?: number;
  weight?: number;
  abilities?: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

export type PokemonType = 
  | "normal" | "fire" | "water" | "electric" | "grass"
  | "ice" | "fighting" | "poison" | "ground" | "flying"
  | "psychic" | "bug" | "rock" | "ghost" | "dragon"
  | "dark" | "steel" | "fairy";

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface GameState {
  currentPokemon: Pokemon | null;
  guessedPokemon: Pokemon[]; 
  score: number;
  streak: number;
  hintsUsed: number;
  attemptsLeft: number;
  difficulty: "easy" | "medium" | "hard";
  currentGeneration?: [number, number];
  lastGuess?: string;
  gameStartTime?: Date;
}

export interface GuessResult {
  isCorrect: boolean;
  message: string;
  correctAnswer: string;
  hintsUsed: number;
  scoreEarned: number;
  attemptsLeft: number;
  streakBonus?: number;
}

export type GameAction =
  | { type: "SET_POKEMON"; payload: Pokemon }
  | { type: "CORRECT_GUESS"; payload: { pokemon: Pokemon; hintsUsed: number; scoreEarned: number } }
  | { type: "INCORRECT_GUESS"; payload: { attemptsLeft: number } }
  | { type: "USE_HINT" }
  | { type: "RESET_STREAK" }
  | { type: "CHANGE_DIFFICULTY"; payload: "easy" | "medium" | "hard" }
  | { type: "CHANGE_GENERATION"; payload: [number, number] }
  | { type: "RESET_GAME" };

export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
  timestamp?: Date;
}

export interface HintSystemProps {
  pokemonType: PokemonType;
  firstLetter: string;
  hintsUsed: number;
  maxHints: number;
  attemptsLeft: number;
  onUseHint: () => void;
  onReveal: () => void;
}

export interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  loadNewPokemon: () => Promise<void>;
  formatName: (name: string) => string;
}
