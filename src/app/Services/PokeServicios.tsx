type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: { front_default: string };
    };
  };
  types: {
    type: {
      url: string; name: string 
};
  }[];
  cries?: { latest?: string };
};

const generationRanges: Record<number, [number, number]> = {
  1: [1, 151],   // Kanto
  2: [152, 251], // Johto
  3: [252, 386], // Hoenn
  4: [387, 493], // Sinnoh
  5: [494, 649], // Unova
  6: [650, 721], // Kalos
  7: [722, 809], // Alola
  8: [810, 898], // Galar
  9: [899, 1010], // Paldea
};

export async function fetchRandomPokemonFromRange(
  generationStart: number,
  generationEnd: number
): Promise<Pokemon> {
  
  if (generationStart > generationEnd) {
    throw new Error('La generación inicial no puede ser mayor que la final');
  }

  if (!generationRanges[generationStart] || !generationRanges[generationEnd]) {
    throw new Error('Generación no válida');
  }

  const minId = generationRanges[generationStart][0];
  const maxId = generationRanges[generationEnd][1];

  const randomId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
    if (!response.ok) {
      throw new Error(`Error al cargar Pokémon: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.id || !data.name || !data.sprites) {
      throw new Error('Datos de Pokémon incompletos');
    }

    return data;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    // Reintento con un ID diferente
    const fallbackId = Math.floor(Math.random() * (maxId - minId + 1)) + minId;
    const fallbackResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${fallbackId}`);
    return fallbackResponse.json();
  }
}

export async function getPokemonByIdOrName(
  identifier: string | number
): Promise<Pokemon> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${identifier}`
  );
  return response.json();
}