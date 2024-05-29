export function getURL(name: string) {
  return new URL(name, import.meta.url).href;
}

export function getModulofromAnimation(
  animationTick: number,
  animationArray: ImageBitmap[][],
  state: number,
) {
  const intValue = Math.floor(animationTick / animationArray[state].length);

  // 0 <= sprites[animation].length < i
  const modulo = animationTick - animationArray[state].length * intValue;
  return modulo;
}
