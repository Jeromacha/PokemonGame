import { POKEMON_GENERATIONS } from "./constantes";
import type { Pokemon } from "../Interfaces/PokeInterfaz";

export const getRandomPokemonId = (): number => {
    const min = 1; // First Pokémon ID in Gen 1
    const max = 1010; // Last Pokémon ID in Gen 9 (update this if new generations are added)
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


export const filterByType = (pokemonList: Pokemon[], type: string): Pokemon[] => {
  return pokemonList.filter((p) => 
    p.types.some((t) => t.type.name === type)
  );
};


export const formatPokemonName = (name: string): string => {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};