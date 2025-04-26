const typeStyles: Record<string, { bg: string; text: string }> = {
  normal: { bg: "bg-gray-400", text: "text-gray-800" },
  fire: { bg: "bg-red-500", text: "text-white" },
  water: { bg: "bg-blue-500", text: "text-white" },
  electric: { bg: "bg-yellow-400", text: "text-gray-800" },
  grass: { bg: "bg-green-500", text: "text-white" },
  ice: { bg: "bg-cyan-300", text: "text-gray-800" },
  fighting: { bg: "bg-red-700", text: "text-white" },
  poison: { bg: "bg-purple-500", text: "text-white" },
  ground: { bg: "bg-yellow-600", text: "text-gray-800" },
  flying: { bg: "bg-indigo-300", text: "text-white" },
  psychic: { bg: "bg-pink-500", text: "text-white" },
  bug: { bg: "bg-lime-500", text: "text-gray-800" },
  rock: { bg: "bg-yellow-700", text: "text-white" },
  ghost: { bg: "bg-indigo-700", text: "text-white" },
  dragon: { bg: "bg-purple-700", text: "text-white" },
  dark: { bg: "bg-gray-800", text: "text-white" },
  steel: { bg: "bg-gray-500", text: "text-white" },
  fairy: { bg: "bg-pink-300", text: "text-gray-800" },
};

const typeTranslations: Record<string, string> = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada"
};

type PokemonTypeBadgeProps = {
  type: string;
  small?: boolean;
};

export default function PokemonTypeBadge({ type, small = false }: PokemonTypeBadgeProps) {
  const style = typeStyles[type] || { bg: "bg-gray-500", text: "text-white" };
  const translatedType = typeTranslations[type] || type;

  return (
    <span
      className={`${style.bg} ${style.text} ${
        small ? "text-xs px-2 py-0.5" : "text-sm px-3 py-1"
      } font-bold rounded-full uppercase shadow-md flex items-center justify-center`}
    >
      {translatedType}
    </span>
  );
}