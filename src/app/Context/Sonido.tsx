"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

type SoundContextType = {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: (url: string) => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(true);

  const toggleSound = () => {
    setIsSoundOn(!isSoundOn);
  };

  const playSound = (url: string) => {
    if (!isSoundOn) return;
    const audio = new Audio(url);
    audio.play().catch(e => console.error("Error playing sound:", e));
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}