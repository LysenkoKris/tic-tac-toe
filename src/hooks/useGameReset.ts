import { useEffect } from 'react';
import type { GameMode } from '../types/types';

export const useGameReset = (
  winnerResult: boolean,
  isDraw: boolean,
  gameMode: GameMode,
  playerSymbol: 'X' | 'O',
  onReset: () => void
) => {
  useEffect(() => {
    if (winnerResult || isDraw) {
      const timer = setTimeout(onReset, 6000);
      return () => clearTimeout(timer);
    }
  }, [winnerResult, isDraw, gameMode, playerSymbol, onReset]);
};
