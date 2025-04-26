export const POKEMON_GENERATIONS = {
  kanto: [1, 151],
  johto: [152, 251],
  hoenn: [252, 386],
  sinnoh: [387, 493],
  unova: [494, 649],
  kalos: [650, 721],
  alola: [722, 809],
  galar: [810, 898],
  paldea: [899, 1010],
} as const;

export const DIFFICULTY_LEVELS = {
  easy: {
    hints: 3,
    attempts: 3,
    silhouetteOpacity: 0.2,
    basePoints: 10,
    hintPenalty: 2,
    attemptPenalty: 1
  },
  medium: {
    hints: 2,
    attempts: 2,
    silhouetteOpacity: 0.5,
    basePoints: 20,
    hintPenalty: 3,
    attemptPenalty: 2
  },
  hard: {
    hints: 0,
    attempts: 1,
    silhouetteOpacity: 0.8,
    basePoints: 50,
    hintPenalty: 5,
    attemptPenalty: 3
  }
} as const;

export const TYPE_TRANSLATIONS: Record<string, string> = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada"
};

export const GAME_CONFIG = {
  maxStreakBonus: 5,
  streakMultiplier: 0.1,
  timeBonus: {
    easy: 30,
    medium: 20,
    hard: 10
  }
} as const;
