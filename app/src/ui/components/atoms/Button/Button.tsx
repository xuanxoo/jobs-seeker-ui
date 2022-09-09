import React, { KeyboardEvent } from 'react';
import './Button.scss';

type ButtonProps = {
  readonly children: string;
  readonly color?: 'primary' | 'secondary';
  readonly type?: 'button' | 'submit' | 'reset' | undefined;
  readonly dataTestId?: string;
  readonly onClick?: () => void;
  readonly onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, color = 'primary', type = undefined, dataTestId, onClick, onKeyDown }: ButtonProps, ref) => {
    return (
      <div className="btn-container">
        <button
          ref={ref}
          type={type}
          data-testid={dataTestId}
          className={`btn-container__btn${color === 'primary' ? '--primary' : '--secondary'}`}
          onKeyDown={onKeyDown}
          onClick={onClick}
        >
          {children}
        </button>
      </div>
    );
  }
);

export { Button };
