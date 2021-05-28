export interface Point {
  value: number,
  effort: number,
  label: string
}

export const roundPoint = (x: number, y: number, label?: string) => {
  return {
    value: Math.round(x),
    effort: Math.round(y),
    label
  } as Point;
};
