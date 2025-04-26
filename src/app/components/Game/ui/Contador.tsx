import { FaStar, FaFire } from "react-icons/fa";
import { GiLaurelsTrophy } from "react-icons/gi";

type ScoreCounterProps = {
  score: number;
  streak?: number;
  difficulty?: "easy" | "medium" | "hard";
  showLabels?: boolean;
};

export default function ScoreCounter({ 
  score, 
  streak = 0, 
  difficulty = "easy",
  showLabels = true
}: ScoreCounterProps) {
  const difficultyColors = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500"
  };

  const streakLevel = streak > 5 ? "text-yellow-300 animate-pulse" : 
                     streak > 2 ? "text-orange-400" : "text-red-400";

  return (
    <div className="flex items-center justify-between gap-4 mb-6 px-4">
      <div className={`${difficultyColors[difficulty]} px-4 py-2 rounded-lg flex items-center gap-3 shadow-md`}>
        {showLabels && (
          <span className="text-white font-medium hidden sm:inline">Puntos:</span>
        )}
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-300 text-lg" />
          <span className="font-bold text-white text-xl">
            {score.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-gray-800/90 px-3 py-1 rounded-full">
        <GiLaurelsTrophy className="text-purple-300" />
        <span className="text-xs font-bold text-white uppercase">
          {difficulty === "easy" ? "Fácil" : difficulty === "medium" ? "Medio" : "Difícil"}
        </span>
      </div>

      {streak > 0 && (
        <div className={`flex items-center gap-2 bg-gray-800/90 px-3 py-1 rounded-full ${streakLevel}`}>
          <FaFire className="text-current" />
          <span className="font-bold text-sm">
            {streak} {streak > 1 ? "Aciertos" : "Acierto"}
          </span>
        </div>
      )}
    </div>
  );
}
