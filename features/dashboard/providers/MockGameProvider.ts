//provider
import type { GameProvider } from './GameProvider';
import type { Game } from '../utils/layoutGenerator';

const TOTAL_GAMES = 100; // Used for cyclic title generation

export class MockGameProvider implements GameProvider {
  async getGames({ cursor, limit }: { cursor?: string; limit: number }): Promise<{ data: Game[]; nextCursor: string | null }> {
    return new Promise((resolve) => {
      const startIdx = cursor ? parseInt(cursor, 10) : 0;
      
      // Simulate network latency (800ms) only for the first 100 games. 
      // Instant load (0ms) for recycled games to avoid redundant loading screens.
      const delay = startIdx >= TOTAL_GAMES ? 0 : 800;

      setTimeout(() => {
        const data: Game[] = [];

        for (let i = 0; i < limit; i++) {
          const currentIndex = startIdx + i;
          const cyclicNumber = (currentIndex % TOTAL_GAMES) + 1;
          
          data.push({
            id: currentIndex + 1, // Unique ID for React keys to avoid duplicates
            title: `Game ${cyclicNumber}`,
            image: "" // Placeholder
          });
        }

        resolve({
          data,
          // Always return a nextCursor so the infinite scroll never stops
          nextCursor: (startIdx + limit).toString()
        });
      }, delay);
    });
  }
}