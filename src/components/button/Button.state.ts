export type ButtonType = {
  name: string;
  clickFn?: () => void;
  clickFnArg?: (arg: string) => void;
};
