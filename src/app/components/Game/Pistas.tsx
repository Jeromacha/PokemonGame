"use client";
import { useState } from "react";
import PokemonTypeBadge from "./TipoPokemon";

type HintSystemProps = {
  pokemonType: string;
  firstLetter: string;
  onReveal: () => void;
  hintsUsed: number;
  maxHints: number;
  attemptsLeft: number;
  onUseHint: () => void;
};

export default function HintSystem({
  pokemonType,
  firstLetter,
  onReveal,
  hintsUsed,
  maxHints,
  attemptsLeft,
  onUseHint
}: HintSystemProps) {
  const [hintLevel, setHintLevel] = useState<number>(-1);

  const hints = [
    <div key="type" className="flex items-center gap-2">
      <span>Tipo:</span>
      <PokemonTypeBadge type={pokemonType} />
    </div>,
    <div key="letter" className="flex items-center gap-2">
      <span>Primera letra:</span>
      <span className="font-bold text-lg">{firstLetter}</span>
    </div>,
    <div key="attempts" className="text-yellow-400">
      Intentos restantes: {attemptsLeft}
    </div>
  ];

  const canUseHint = hintsUsed < maxHints;
  const hasMoreHints = hintLevel < hints.length - 1 && canUseHint;

  return (
    <div className="mt-4 text-center bg-gray-800/80 rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300">Pistas usadas: {hintsUsed}/{maxHints}</span>
        <span className="text-gray-300">Intentos: {attemptsLeft}</span>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-3 min-h-16 flex items-center justify-center">
        {hintLevel === -1 ? (
          <span className="text-gray-400 italic">No has usado pistas aún</span>
        ) : (
          hints[Math.min(hintLevel, hints.length - 1)]
        )}
      </div>

      <div className="flex gap-2 justify-center mt-3">
        <button
          onClick={() => {
            if (hasMoreHints) {
              setHintLevel(prev => prev + 1);
              onUseHint();
            }
          }}
          disabled={!hasMoreHints}
          className={`px-3 py-1 rounded text-sm ${
            canUseHint
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          {canUseHint ? "Usar pista" : "Sin pistas"}
        </button>

        <button
          onClick={onReveal}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
        >
          Revelar Pokémon
        </button>
      </div>

      {hintsUsed > 0 && (
        <div className="mt-2 text-xs text-gray-400">
          Cada pista usada reduce tus puntos finales
        </div>
      )}
    </div>
  );
}