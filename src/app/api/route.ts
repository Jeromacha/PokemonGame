import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon');
    }

    const pokemon = await response.json();
    
    const simplifiedData = {
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        front_default: pokemon.sprites.front_default || null,
        other: {
          'official-artwork': {
            front_default: pokemon.sprites.other?.['official-artwork']?.front_default || null
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
        latest: pokemon.cries?.latest || null
      }
    };

    return NextResponse.json(simplifiedData);
    
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Pokémon',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
