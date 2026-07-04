import type { Game } from '../utils/layoutGenerator';

export interface GameProvider {
  getGames(params: {
    cursor?: string;
    limit: number;
  }): Promise<{
    data: Game[];
    nextCursor: string | null;
  }>;
}