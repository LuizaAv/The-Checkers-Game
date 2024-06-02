import { FigureProps } from "../figure/Figure.state";

export type BoardState = FigureProps[][];

export const LETTERS_TO_NUMBERS: { [key: string]: number } = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
};

export const LETTERS = ["a", "b", "c", "d", "e", "f", "g", "h"];

