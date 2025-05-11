import React from 'react';
import Lottie from 'lottie-react';
import ovalAnimation from '../../assets/animations/oval.json';
import crossAnimation from '../../assets/animations/cross.json';
import type { Player, WinnerResult } from '../../types/types';
import styles from './Square.module.css';

interface SquareProps {
  value: Player;
  onClick: () => void;
  id: number;
  win: boolean;
  res?: WinnerResult | null;
  isDraw: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, id, win, res, isDraw }) => {
  const isWinning = win && res && (id === res.a || id === res.b || id === res.c);
  const className = [
    styles.square,
    isWinning && styles.smoothExit,
    win && styles.exit,
    isDraw && styles.smoothExit,
  ].filter(Boolean).join(' ');

  return (
    <button onClick={onClick} id={id.toString()} className={className}>
      {value === 'X' && (
        <Lottie animationData={crossAnimation} loop={false} autoplay style={{ height: '60%', width: '60%' }} />
      )}
      {value === 'O' && (
        <Lottie animationData={ovalAnimation} loop={false} autoplay style={{ height: '60%', width: '60%' }} />
      )}
    </button>
  );
};
