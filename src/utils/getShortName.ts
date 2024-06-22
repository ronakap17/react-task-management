export const getShortName = (name: string): string =>
  (name || '').substr(0, 2).toUpperCase();
