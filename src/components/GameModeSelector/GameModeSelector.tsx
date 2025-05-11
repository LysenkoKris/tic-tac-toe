import type { GameMode } from '../../types/types';
import styles from './GameModeSelector.module.css'

interface GameModeSelectorProps {
  gameMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

export const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  gameMode, 
  onModeChange 
}) => (
  <div className={styles.modeSelector}>
    <button
      onClick={() => onModeChange('human-vs-human')}
      disabled={gameMode === 'human-vs-human'}
    >
      Человек vs Человек
    </button>
    <button
      onClick={() => onModeChange('human-vs-ai')}
      disabled={gameMode === 'human-vs-ai'}
    >
      Человек vs Компьютер
    </button>
  </div>
);
