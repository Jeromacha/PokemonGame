import { useEffect } from "react";

export default function GenerationRangeSelector({
  start,
  end,
  setStart,
  setEnd,
  difficulty,
  setDifficulty,
  onApplyChanges,
}: {
  start: number;
  end: number;
  setStart: (gen: number) => void;
  setEnd: (gen: number) => void;
  difficulty: 'easy' | 'medium' | 'hard';
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onApplyChanges: () => void;
}) {
  const generations = Array.from({ length: 9 }, (_, i) => i + 1);

  useEffect(() => {
    if (start > end) {
      setEnd(start);
    }
  }, [start, end, setEnd]);

  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStart(Number(e.target.value));
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnd(Number(e.target.value));
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as 'easy' | 'medium' | 'hard');
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-900/80 rounded-lg shadow-lg border border-gray-700 w-full max-w-xs">
      <h2 className="text-xl font-bold text-white mb-2">Configuración</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Desde:</label>
        <select
          value={start}
          onChange={handleStartChange}
          className="px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {generations.map((gen) => (
            <option 
              key={`start-${gen}`} 
              value={gen}
              className="bg-gray-800 text-white"
            >
              Generación {gen}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Hasta:</label>
        <select
          value={end}
          onChange={handleEndChange}
          className="px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={start === 9}
        >
          {generations
            .filter(gen => gen >= start)
            .map((gen) => (
              <option 
                key={`end-${gen}`} 
                value={gen}
                className="bg-gray-800 text-white"
              >
                Generación {gen}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-300">Dificultad:</label>
        <select 
          value={difficulty}
          onChange={handleDifficultyChange}
          className="px-3 py-2 rounded-md bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="easy" className="bg-gray-800 text-white">Fácil</option>
          <option value="medium" className="bg-gray-800 text-white">Normal</option>
          <option value="hard" className="bg-gray-800 text-white">Difícil</option>
        </select>
      </div>

      <button
        onClick={onApplyChanges}
        className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-colors shadow-md hover:shadow-blue-500/20"
      >
        Aplicar Cambios
      </button>
    </div>
  );
}