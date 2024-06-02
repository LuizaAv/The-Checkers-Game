import { Position } from "../figure/Figure.state";

export type ButtonType = {
  name: string;
  clickFn?: () => void;
  clickFnArg?: (arg: string) => void;
};
