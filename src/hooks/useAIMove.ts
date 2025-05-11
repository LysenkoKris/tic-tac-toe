import { useEffect } from 'react';
import type { Player } from '../types/types';

export const useAIMove = (
  isAITurn: boolean,
  squares: Player[],
  playerSymbol: 'X' | 'O',
  gameMode: 'human-vs-ai' | 'human-vs-human',
  onMove: (index: number) => void
) => {
  useEffect(() => {
    if (gameMode === 'human-vs-ai' && isAITurn) {
      const makeAIMove = () => {
        const emptySquares = squares
          .map((val, idx) => (val === null ? idx : null))
          .filter((val): val is number => val !== null);

        if (emptySquares.length > 0) {
          const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
          onMove(randomIndex);
        }
      };

      const timer = setTimeout(makeAIMove, 500);
      return () => clearTimeout(timer);
    }
  }, [isAITurn, squares, playerSymbol, gameMode, onMove]);
};
