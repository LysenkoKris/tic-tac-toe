import React from 'react';
import Lottie from 'lottie-react';
import gridAnimation from '../../assets/animations/grid.json';
import { Square } from '../Square/Square';
import type { Player, GameMode, PlayerSymbol } from '../../types/types';
import { calculateWinner } from '../../utils/utils';
import styles from './Board.module.css';

interface BoardProps {
  xIsNext: boolean;
  squares: Player[];
  onPlay: (squares: Player[]) => void;
  isAITurn: boolean;
  gameMode: GameMode;
  playerSymbol: PlayerSymbol;
}

export const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay, isAITurn, gameMode, playerSymbol }) => {
  const res = calculateWinner(squares);
  const isWin = !!res;
  const isDraw = !res && squares.every(Boolean); 

  const getStatus = () => {
    if (res) return `Победитель: ${res.winner}`;
    if (isDraw) return 'Ничья!';
    
    if (gameMode === 'human-vs-ai') {
      if (isAITurn) return 'Ход компьютера...';
      return `Ваш ход (${playerSymbol})`;
    }
    
    return `Следующий ход: ${xIsNext ? 'X' : 'O'}`;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i] || isAITurn) return;
    
    const nextSquares = [...squares];
    nextSquares[i] = gameMode === 'human-vs-ai' 
      ? playerSymbol 
      : xIsNext ? 'X' : 'O';
    
    onPlay(nextSquares);
  };

  const renderSquare = (i: number) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      id={i}
      win={isWin}
      res={res}
      isDraw={isDraw}
    />
  );

  return (
    <>
      <div className={styles.status}>{getStatus()}</div>
      <div className={styles.container}>
        <div style={{ position: 'relative', height: 'fit-content', width: 'fit-content' }}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          >
            <Lottie animationData={gridAnimation} loop={false} autoplay />
          </div>
          <div className={styles.board}>
            {[0, 3, 6].map((row) => (
              <div className={styles.boardRow} key={row} style={{ padding: row === 0 ? '10px 10px 0' : row === 6 ? '0 10px 10px' : '0 10px' }}>
                {renderSquare(row)}
                {renderSquare(row + 1)}
                {renderSquare(row + 2)}
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </>
  );
};
