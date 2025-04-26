"use client";
import Image from "next/image";
import Pokeball from "../../../img/NicePng_pokeball-png_1602460.png";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function Header({
  subtitle = "Adivina el Pokémon oculto"
}: HeaderProps) {
  return (
    <header className="text-center mb-8">
      <div className="flex justify-center items-center gap-2">
        <Image 
          src={Pokeball} 
          alt="Pokeball" 
          width={60} 
          height={60}
          className="animate-spin-slow"
        />
      </div>
      <p className="text-white mt-2 text-lg">{subtitle}</p>
    </header>
  );
}