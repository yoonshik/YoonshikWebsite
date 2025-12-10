'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PlaygroundDrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const PlaygroundDrawerContext = createContext<PlaygroundDrawerContextType | undefined>(undefined);

export function PlaygroundDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <PlaygroundDrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, toggleDrawer }}>
      {children}
    </PlaygroundDrawerContext.Provider>
  );
}

export function usePlaygroundDrawer() {
  const context = useContext(PlaygroundDrawerContext);
  if (context === undefined) {
    throw new Error('usePlaygroundDrawer must be used within a PlaygroundDrawerProvider');
  }
  return context;
}
