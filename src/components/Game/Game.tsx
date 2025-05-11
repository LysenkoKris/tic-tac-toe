import React from 'react';
import { Board } from '../Board/Board';
import { GameModeSelector } from '../GameModeSelector/GameModeSelector';
import { SymbolSelector } from '../SymbolSelector/SymbolSelector';
import { useGameState } from '../../hooks/useGameState';
import { useAIMove } from '../../hooks/useAIMove';
import { useGameReset } from '../../hooks/useGameReset';
import { calculateWinner } from '../../utils/utils';
import type { Player, GameMode } from '../../types/types';

export const Game: React.FC = () => {
  const {
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
  } = useGameState();

  const winnerResult = calculateWinner(squares);
  const isDraw = !winnerResult && squares.every(Boolean);

  // Обработчик хода ИИ
  const handleAIMove = (index: number) => {
    const nextSquares = [...squares];
    nextSquares[index] = playerSymbol === 'X' ? 'O' : 'X';
    setSquares(nextSquares);
    setXIsNext(playerSymbol === 'X');
    setIsAITurn(false);
  };

  // Использование хуков
  useAIMove(isAITurn, squares, playerSymbol, gameMode, handleAIMove);
  useGameReset(!!winnerResult, isDraw, gameMode, playerSymbol, () => {
    setSquares(Array(9).fill(null));
    setXIsNext(gameMode === 'human-vs-ai' ? playerSymbol === 'X' : true);
    setIsAITurn(gameMode === 'human-vs-ai' && playerSymbol === 'O');
  });

  const handlePlay = (nextSquares: Player[]) => {
    setSquares(nextSquares);
    if (gameMode === 'human-vs-ai') {
      setXIsNext(playerSymbol === 'O');
      setIsAITurn(true);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    setSquares(Array(9).fill(null));
    setXIsNext(mode === 'human-vs-ai' ? playerSymbol === 'X' : true);
    setIsAITurn(mode === 'human-vs-ai' && playerSymbol === 'O');
  };

  const handleSymbolChange = (symbol: 'X' | 'O') => {
    setPlayerSymbol(symbol);
    setSquares(Array(9).fill(null));
    setIsAITurn(symbol === 'O');
    setXIsNext(symbol === 'X');
  };

  return (
    <div>
      <GameModeSelector 
        gameMode={gameMode} 
        onModeChange={handleModeChange} 
      />
      
      {gameMode === 'human-vs-ai' && (
        <SymbolSelector 
          playerSymbol={playerSymbol}
          onSymbolChange={handleSymbolChange}
        />
      )}

      <Board 
        xIsNext={xIsNext} 
        squares={squares} 
        onPlay={handlePlay}
        isAITurn={isAITurn}
        gameMode={gameMode}
        playerSymbol={playerSymbol}
      />
    </div>
  );
};
