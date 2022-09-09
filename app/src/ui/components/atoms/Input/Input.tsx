import React from 'react';
import './Input.scss';

type InputProps = {
  readonly placeHolder?: string;
  readonly value?: string;
  readonly disabled?: boolean;
  readonly style?: React.CSSProperties;
  readonly dataTestId?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  placeHolder,
  value,
  disabled = false,
  style,
  dataTestId,
  onChange,
}: InputProps) => {
  return (
    <div className="input-container" style={style}>
      <input
        type="text"
        placeholder={placeHolder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        data-testid={dataTestId}
      ></input>
    </div>
  );
};

export { Input };
