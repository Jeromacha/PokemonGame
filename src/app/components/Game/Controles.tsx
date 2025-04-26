"use client";

type GameControlsProps = {
  onNext: () => void;
  onReplay?: () => void;
  score: number;
  disabled?: boolean;
  difficulty?: "easy" | "medium" | "hard";
  streak?: number;
};

export default function GameControls({
  onNext,
  onReplay,
  score,
  disabled,
  difficulty = "easy",
  streak = 0
}: GameControlsProps) {
  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <div className="w-full flex justify-between items-center mb-2">
        
        

        
      </div>

      <div className="flex space-x-4 w-full">
        <button
          onClick={onNext}
          disabled={disabled}
          className={`flex-1 py-3 rounded-lg font-bold transition-all ${
            disabled
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/30"
          }`}
        >
          Siguiente Pokémon
        </button>
        
        {onReplay && (
          <button
            onClick={onReplay}
            disabled={disabled}
            className={`px-4 py-3 rounded-lg font-bold transition-all ${
              disabled
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg hover:shadow-purple-500/30"
            }`}
            aria-label="Repetir sonido del Pokémon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}