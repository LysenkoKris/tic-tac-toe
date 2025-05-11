import styles from './SymbolSelector.module.css';

interface SymbolSelectorProps {
  playerSymbol: 'X' | 'O';
  onSymbolChange: (symbol: 'X' | 'O') => void;
}
  
export const SymbolSelector: React.FC<SymbolSelectorProps> = ({
  playerSymbol,
  onSymbolChange
}) => (
  <div className={styles.symbolSelector}>
    <button
      onClick={() => onSymbolChange('X')}
      disabled={playerSymbol === 'X'}
    >
      Играть за X
    </button>
    <button
      onClick={() => onSymbolChange('O')}
      disabled={playerSymbol === 'O'}
    >
      Играть за O
    </button>
  </div>
);
  