import { ButtonType } from "./Button.state";

const Button = (button: ButtonType) => {
  return (
    <button
      className="flex justify-center items-center outline-none rounded-xl font-medium bg-fuchsia-50 border-amber-900 text-amber-900 border-4 p-8 h-10 w-50 text-center"
      onClick={button.clickFn}
    >
      {button.name}
    </button>
  );
};

export default Button;
