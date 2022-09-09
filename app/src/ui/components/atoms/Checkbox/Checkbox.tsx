import React, { useState } from 'react';
import './Checkbox.scss';

type CheckboxProps = {
  readonly name?: string;
  readonly dataTestId?: string;
  readonly checked?: boolean;
  readonly value: string;
  readonly onCheck?: (selected: boolean) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ name, dataTestId, checked = false, value, onCheck }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleOnclick = () => {
    onCheck && onCheck(!isChecked);
    setIsChecked(!isChecked);
  };

  const handleOnChange = () => {};

  return (
    <div className="chk-container" onClick={handleOnclick} data-testid={dataTestId}>
      <input type="checkbox" name={name} checked={isChecked} value={value} onChange={handleOnChange} />
      <label htmlFor={value}>{name}</label>
    </div>
  );
};

export { Checkbox };
