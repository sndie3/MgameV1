import type { GameProvider } from './GameProvider';
import type { Game } from '../utils/layoutGenerator';

export class ApiGameProvider implements GameProvider {
  async getGames({ cursor, limit }: { cursor?: string; limit: number }): Promise<{ data: Game[]; nextCursor: string | null }> {
    const url = new URL('/api/games', window.location.origin);
    
    if (cursor) {
      url.searchParams.append('cursor', cursor);
    }
    url.searchParams.append('limit', limit.toString());

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }
    
    return response.json();
  }
}