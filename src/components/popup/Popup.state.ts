export type PopupProps = {
  handlePopupButtonClick: (arg: boolean) => void;
  message: string;
  buttonName: string;
};

const usePopupState = ({ handlePopupButtonClick }) => {
  const handleBtnClick = () => {
    handlePopupButtonClick(false);
  };

  return {
    handleBtnClick,
  };
};

export default usePopupState;
