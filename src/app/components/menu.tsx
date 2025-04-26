"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../img/Logo2.png";

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="top-0 z-10 w-full">
      <div className="w-full bg-black/60 backdrop-blur shadow-md">
        <div className="px-4 py-2 flex justify-center items-center relative">
          <Link href="/" className="mx-auto">
            <Image
              src={Logo}
              alt="Pokémon Logo"
              className="h-52 w-auto object-contain hover:opacity-80 transition-opacity"
              priority
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden absolute right-4 text-white hover:text-yellow-400"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 text-white shadow-md backdrop-blur">
          <div className="px-4 py-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-yellow-400"
            >
              Inicio
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
