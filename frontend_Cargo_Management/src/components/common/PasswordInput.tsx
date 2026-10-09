import React, { useState } from 'react';
import { Input } from './Input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends Omit<React.ComponentProps<typeof Input>, 'type' | 'rightElement'> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...props}
      type={showPassword ? 'text' : 'password'}
      rightElement={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="p-1 hover:text-text-primary focus:outline-none focus:text-primary transition-colors"
          title={showPassword ? 'Hide password' : 'Show password'}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  );
};
