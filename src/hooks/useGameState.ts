import { useState } from 'react';
import type { Player, GameMode, PlayerSymbol } from '../types/types';

export const useGameState = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState<GameMode>('human-vs-human');
  const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>('X');
  const [isAITurn, setIsAITurn] = useState(false);

  return {
    squares,
    setSquares,
    xIsNext,
    setXIsNext,
    gameMode,
    setGameMode,
    playerSymbol,
    setPlayerSymbol,
    isAITurn,
    setIsAITurn
  };
};
