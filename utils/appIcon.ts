const DEFAULT_ICON = '/favicon.svg';

let currentManifestUrl: string | null = null;

function createManifest(iconPath: string): string {
  const manifest = {
    name: 'mgame-v1',
    short_name: 'mgame',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: iconPath, sizes: '192x192', type: 'image/png' },
      { src: iconPath, sizes: '512x512', type: 'image/png' },
    ],
  };

  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}

function updateLink(rel: string, href: string, type?: string): void {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }

  if (type) link.type = type;
  link.href = href;
}

export function applyAppIcon(iconPath: string | null): void {
  const path = iconPath || DEFAULT_ICON;
  const isSvg = path.endsWith('.svg');

  updateLink('icon', path, isSvg ? 'image/svg+xml' : 'image/png');
  updateLink('apple-touch-icon', path);

  const manifestLink = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
  if (manifestLink) {
    if (currentManifestUrl) {
      URL.revokeObjectURL(currentManifestUrl);
    }
    currentManifestUrl = createManifest(path);
    manifestLink.href = currentManifestUrl;
  }
}

export function getSavedAppIcon(): string | null {
  return localStorage.getItem('appIcon');
}
