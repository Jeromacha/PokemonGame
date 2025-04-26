"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        {}
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-white animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-red-500 animate-spin-reverse"></div>
        {}
        <div className="absolute inset-4 rounded-full bg-white border-2 border-gray-800"></div>
      </div>
      <p className="mt-4 text-white font-medium">Cargando Pokémon...</p>
    </div>
  );
}