//utils

export interface Game {
  id: number;
  title: string;
  image: string;
  [key: string]: unknown;
}

export type LayoutPattern = 'pattern1' | 'pattern2' | 'pattern3';

export interface LayoutGroup {
  layout: LayoutPattern;
  games: Game[];
}

export function generateGameLayouts(games: Game[], initialLastLayout: LayoutPattern | null = null): LayoutGroup[] {
  const groups: LayoutGroup[] = [];
  const chunkSize = 3;
  let lastLayout: LayoutPattern | null = initialLastLayout;
  const patterns: LayoutPattern[] = ['pattern1', 'pattern2', 'pattern3'];

  for (let i = 0; i < games.length; i += chunkSize) {
    const chunk = games.slice(i, i + chunkSize);
    
    // Select random layout that isn't the same as lastLayout
    let availablePatterns = patterns;
    if (lastLayout) {
      availablePatterns = patterns.filter(p => p !== lastLayout);
    }
    
    const randomPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)];
    lastLayout = randomPattern;

    groups.push({
      layout: randomPattern,
      games: chunk
    });
  }

  return groups;
}
