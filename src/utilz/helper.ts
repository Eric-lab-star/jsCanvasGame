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

export function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function moduloGenerator(animationTick: number, max: number) {
  const intValue = Math.floor(animationTick / max);
  // 0 <= sprites[animation].length < i
  const modulo = animationTick - max * intValue;
  return modulo;
}

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
