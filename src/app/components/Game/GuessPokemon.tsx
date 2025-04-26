"use client";
import { useState, useEffect } from "react";

type GuessFormProps = {
  guess: string;
  setGuess: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  attemptsLeft?: number;
};

export default function GuessForm({
  guess,
  setGuess,
  onSubmit,
  disabled,
  attemptsLeft
}: GuessFormProps) {
  const [shake, setShake] = useState(false);
  const [localDisabled, setLocalDisabled] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (guess.trim() === "") {
      triggerShake();
      return;
    }
    
    onSubmit();
    setLocalDisabled(true);
    setTimeout(() => setLocalDisabled(false), 500);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  useEffect(() => {
    setLocalDisabled(false);
  }, [disabled]);

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`mt-6 space-y-4 bg-gray-800/75 p-4 rounded-lg transition-all ${
        shake ? "animate-shake" : ""
      }`}
    >
      <div className="relative">
        <input
          type="text"
          value={guess}
          onChange={(e) => !disabled && setGuess(e.target.value)}
          placeholder={
            disabled 
              ? "Juego terminado" 
              : attemptsLeft !== undefined 
                ? `Adivina el Pokémon (${attemptsLeft} ${attemptsLeft === 1 ? 'intento restante' : 'intentos restantes'})`
                : "Escribe el nombre del Pokémon..."
          }
          className={`w-full px-4 py-3 border-2 ${
            disabled ? "border-gray-600 bg-gray-700/50" : "border-yellow-400 bg-gray-700/90"
          } rounded-lg focus:ring-2 focus:ring-yellow-300 focus:outline-none text-white transition-all`}
          readOnly={disabled}
          autoFocus={!disabled}
          aria-label="Input para adivinar el Pokémon"
        />
      </div>

      <button
        type="submit"
        disabled={disabled || localDisabled || guess.trim() === ""}
        className={`w-full py-3 px-4 rounded-lg font-bold text-lg transition-all ${
          disabled || localDisabled
            ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
            : "bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow-lg hover:shadow-yellow-500/30"
        }`}
      >
        {disabled ? "Ronda terminada" : localDisabled ? "Verificando..." : "¡Adivinar!"}
      </button>

      {attemptsLeft !== undefined && attemptsLeft <= 2 && !disabled && (
        <p className="text-yellow-300 text-sm text-center">
          {attemptsLeft === 1 
            ? "¡Último intento! Piensa bien." 
            : `¡Cuidado! Solo ${attemptsLeft} intentos restantes`}
        </p>
      )}
    </form>
  );
}
