import type { Game } from '../utils/layoutGenerator';

const TOTAL_GAMES = 100;

export const fetchMockGames = async (page: number, limit: number): Promise<{ data: Game[], hasMore: boolean }> => {
  return new Promise((resolve) => {
    // Simulate network latency (800ms)
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, TOTAL_GAMES);
      const data: Game[] = [];

      if (start < TOTAL_GAMES) {
        for (let i = start; i < end; i++) {
          data.push({
            id: i + 1,
            title: `Game ${i + 1}`,
            image: "" // Placeholder, can be replaced by real image URLs
          });
        }
      }

      resolve({
        data,
        hasMore: end < TOTAL_GAMES
      });
    }, 800);
  });
};
