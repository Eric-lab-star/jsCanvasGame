export function getURL(name: string) {
  return new URL(name, import.meta.url).href;
}
