'use client';
import { useState, useEffect } from 'react';
import { fetchRandomPokemonFromRange } from './Services/PokeServicios';
import { GameState, GuessResult, Pokemon } from './Interfaces/PokeInterfaz';
import { DIFFICULTY_LEVELS } from './lib/constantes';
import { calculateScore, checkGuess } from './lib/GameUtils';
import Header from './components/Game/ui/header';
import PokemonCard from './components/Game/pokemon';
import GuessForm from './components/Game/GuessPokemon';
import HintSystem from './components/Game/Pistas';
import GameControls from './components/Game/Controles';
import ScoreCounter from './components/Game/ui/Contador';
import LoadingSpinner from './components/Game/ui/Carga';
import { useSound } from './Context/Sonido';
import GenerationRangeSelector from './components/Game/ui/Configuracion';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>({
    currentPokemon: null,
    guessedPokemon: [],
    score: 0,
    streak: 0,
    hintsUsed: 0,
    attemptsLeft: DIFFICULTY_LEVELS.easy.attempts,
    difficulty: 'easy',
  });

  const [guess, setGuess] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<GuessResult | null>(null);
  const { playSound } = useSound();
  const [genStart, setGenStart] = useState(1);
  const [genEnd, setGenEnd] = useState(9);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  useEffect(() => {
    loadNewPokemon();
  }, [genStart, genEnd]);

  const applyChanges = () => {
    setGameState(prev => ({
      ...prev,
      difficulty: difficulty,
      attemptsLeft: DIFFICULTY_LEVELS[difficulty].attempts,
      hintsUsed: 0
    }));
  };

  const loadNewPokemon = async () => {
    setIsLoading(true);
    setGuess('');
    setResult(null);
    setIsRevealed(false);

    try {
      const pokemon = await fetchRandomPokemonFromRange(genStart, genEnd);

      const safePokemon: Pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        sprites: {
          front_default: pokemon.sprites.front_default || '',
          other: {
            'official-artwork': {
              front_default: pokemon.sprites.other?.['official-artwork']?.front_default || ''
            }
          }
        },
        types: pokemon.types.map((t: any) => ({
          slot: t.slot,
          type: {
            name: t.type.name,
            url: t.type.url
          }
        })),
        cries: {
          latest: pokemon.cries?.latest || ''
        }
      };

      setGameState(prev => ({
        ...prev,
        currentPokemon: safePokemon,
        hintsUsed: 0,
        attemptsLeft: DIFFICULTY_LEVELS[prev.difficulty].attempts
      }));

      if (safePokemon.cries?.latest) {
        playSound(safePokemon.cries.latest);
      }

    } catch (error) {
      console.error('Error loading Pokémon:', error);
      setResult({
        isCorrect: false,
        message: 'Error al cargar el Pokémon. Intenta de nuevo.',
        correctAnswer: '',
        hintsUsed: 0,
        scoreEarned: 0,
        attemptsLeft: gameState.attemptsLeft,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = () => {
    if (!gameState.currentPokemon || gameState.attemptsLeft <= 0) return;

    const isCorrect = checkGuess(guess, gameState.currentPokemon.name);
    const newStreak = isCorrect ? gameState.streak + 1 : 0;
    const attemptsUsed = DIFFICULTY_LEVELS[gameState.difficulty].attempts - gameState.attemptsLeft;
    const pointsEarned = isCorrect 
      ? calculateScore(gameState.difficulty, gameState.hintsUsed, attemptsUsed) 
      : 0;

    const newAttemptsLeft = gameState.attemptsLeft - 1;

    setResult({
      isCorrect,
      message: isCorrect 
        ? '¡Correcto!' 
        : newAttemptsLeft > 0 
          ? `¡Incorrecto! Te quedan ${newAttemptsLeft} intentos` 
          : `¡Oops! Era ${formatName(gameState.currentPokemon.name)}`,
      correctAnswer: gameState.currentPokemon.name,
      hintsUsed: gameState.hintsUsed,
      scoreEarned: pointsEarned,
      attemptsLeft: newAttemptsLeft
    });

    setGameState(prev => ({
      ...prev,
      score: prev.score + pointsEarned,
      streak: newStreak,
      attemptsLeft: newAttemptsLeft,
      guessedPokemon: isCorrect 
        ? [...prev.guessedPokemon, gameState.currentPokemon!]
        : prev.guessedPokemon,
    }));

    if (isCorrect) {
      playSound('/sounds/Correcto.mp3');
      setIsRevealed(true);
    } else {
      playSound('/sounds/Incorrecto.mp3');
      if (newAttemptsLeft <= 0) {
        setIsRevealed(true);
      }
    }
  };

  const useHint = () => {
    if (gameState.hintsUsed >= DIFFICULTY_LEVELS[gameState.difficulty].hints) return;
    setGameState(prev => ({ 
      ...prev, 
      hintsUsed: prev.hintsUsed + 1 
    }));
    playSound('/sounds/hint.mp3');
  };

  const formatName = (name: string) => {
    return name.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex gap-12 p-3">
      <div className="w-80">
        <GenerationRangeSelector
          start={genStart}
          end={genEnd}
          setStart={setGenStart}
          setEnd={setGenEnd}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onApplyChanges={applyChanges}
        />
      </div>

      <div className="flex-1 max-w mx-auto p-2 mt-0 bg-black/60 shadow-lg backdrop-blur">
        <Header 
          title="¿Quién es ese Pokémon?" 
          subtitle="Adivina el Pokémon oculto"
        />

        <ScoreCounter 
          score={gameState.score} 
          streak={gameState.streak} 
          difficulty={gameState.difficulty}
        />

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {gameState.currentPokemon && (
              <PokemonCard
                imageUrl={gameState.currentPokemon.sprites.front_default}
                name={gameState.currentPokemon.name}
                isRevealed={isRevealed}
                opacity={DIFFICULTY_LEVELS[gameState.difficulty].silhouetteOpacity} 
                pokemon={gameState.currentPokemon}
              />
            )}

            <div className="my-6" />

            {result ? (
              <div className={`text-center p-4 mb-6 rounded-lg ${
                result.isCorrect ? 'bg-green-800' : 'bg-red-800'
              }`}>
                <p className="text-xl font-bold">{result.message}</p>
                {!result.isCorrect && result.attemptsLeft <= 0 && (
                  <p className="mt-2">Mejor intento la próxima</p>
                )}
                <p className="text-sm mt-1">
                  Puntos obtenidos: {result.isCorrect ? `+${result.scoreEarned}` : '0'}
                </p>
              </div>
            ) : null}

            <GuessForm
              guess={guess}
              setGuess={setGuess}
              onSubmit={handleGuess}
              disabled={isRevealed}
              attemptsLeft={gameState.attemptsLeft}
            />

            {!isRevealed && gameState.currentPokemon && (
              <HintSystem
                pokemonType={gameState.currentPokemon.types[0].type.name}
                firstLetter={gameState.currentPokemon.name.charAt(0).toUpperCase()}
                hintsUsed={gameState.hintsUsed}
                maxHints={DIFFICULTY_LEVELS[gameState.difficulty].hints}
                attemptsLeft={gameState.attemptsLeft}
                onUseHint={useHint}
                onReveal={() => {
                  setIsRevealed(true);
                  playSound('/sounds/reveal.mp3');
                }}
              />
            )}

            <GameControls
              onNext={loadNewPokemon}
              onReplay={() =>
                gameState.currentPokemon?.cries?.latest &&
                playSound(gameState.currentPokemon.cries.latest)
              }
              disabled={!isRevealed}
              score={gameState.score}
              difficulty={gameState.difficulty}
              streak={gameState.streak}
            />
          </>
        )}
      </div>
    </div>
  );
}