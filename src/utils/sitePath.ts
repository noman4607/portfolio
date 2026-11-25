const base = import.meta.env?.BASE_URL ?? '/';

export function sitePath(path: string): string {
  return `${base}${path.replace(/^\//, '')}`;
}
