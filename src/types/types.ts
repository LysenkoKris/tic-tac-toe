export type Player = 'X' | 'O' | null;

export interface WinnerResult {
  winner: Player;
  a: number;
  b: number;
  c: number;
}

export type GameMode = 'human-vs-human' | 'human-vs-ai';
export type PlayerSymbol = 'X' | 'O' | null;