import React from "react";
import Button from "../button/Button";

import usePopupState, { PopupProps } from "./Popup.state";

const Popup: React.FC<PopupProps> = ({
  handlePopupButtonClick,
  message,
  buttonName,
}) => {
  const {handleBtnClick} = usePopupState({
    handlePopupButtonClick
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col text-center bg-slate-100 border-2 border-amber-950 max-w-lg p-8 md:p-10 lg:p-12 rounded-lg">
        <h1 className="text-xl md:text-xl lg:text-2xl font-bold mb-4 text-amber-950 text-center">
          {message}
        </h1>
        <div className="flex m-auto mt-10">
          <Button name={buttonName} clickFn={handleBtnClick} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
