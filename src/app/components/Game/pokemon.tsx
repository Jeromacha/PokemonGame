"use client";

import { Pokemon } from "@/app/Interfaces/PokeInterfaz";

type PokemonCardProps = {
  pokemon: Pokemon; 
  imageUrl: string;
  name: string;
  isRevealed: boolean;
  opacity?: number;
  onLoad?: () => void;
};

export default function PokemonCard({
  imageUrl,
  name,
  isRevealed,
  onLoad,
}: PokemonCardProps) {
  return (
  <div className="relative bg-gray-800 rounded-xl p-6 w-64 h-64 mx-auto flex items-center justify-center shadow-lg">
    <img
    src={imageUrl}
    alt={isRevealed ? name : "Pokémon silhouette"}
    className={`w-full h-full object-contain transition-all duration-500 ${
      !isRevealed ? "filter brightness-0 contrast-0" : "scale-110"
    }`}
    onLoad={onLoad}
    />
    {isRevealed && (
    <div className="absolute inset-0 bg-yellow-400 opacity-0 animate-ping rounded-xl" />
    )}
  </div>
  );
}
