import { FC } from "react";

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

export const Input: FC<InputProps> = ({
  label,
  value,
  onChange,
  isDisabled,
}) => {
  return (
    <label className="ui_input-label">
      <span>{label}</span>
      <input
        className="ui_input-field"
        type="text"
        value={value}
        onChange={onChange}
        disabled={isDisabled}
      />
    </label>
  );
};
