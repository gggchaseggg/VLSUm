import { FC, PropsWithChildren, SyntheticEvent } from "react";

type ButtonProps = {
  isOrange?: boolean;
  onClick?: (event: SyntheticEvent) => void;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  isOrange,
  onClick,
}) => {
  return (
    <button
      className={`ui_Button ${isOrange && "ui_Button-orange"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
