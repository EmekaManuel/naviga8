// px.ts
export const px = (value: number, baseSize: number = 16): string => {
  return `${value / baseSize}rem`;
};
