import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input, InputProps } from './Input';

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, leftIcon = <Lock className="w-4 h-4" />, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        {...props}
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        leftIcon={leftIcon}
        rightIcon={
          showToggle ? (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="text-[#737686] hover:text-[#0b1c30] p-1 focus:outline-none"
              tabIndex={-1}
              aria-label={isVisible ? 'Hide password' : 'Show password'}
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : undefined
        }
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';
