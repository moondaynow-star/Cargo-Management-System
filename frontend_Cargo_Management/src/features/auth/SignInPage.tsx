import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input';
import { PasswordInput } from '@/components/common/PasswordInput';
import { Select } from '@/components/common/Select';
import { Button } from '@/components/common/Button';
import { USER_ROLES } from '@/features/master/user/types';

export const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const roleOptions = USER_ROLES.map((r) => ({ value: r, label: r }));

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = 'Email ID is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email format';
    
    if (!password) newErrors.password = 'Password is required';
    if (!role) newErrors.role = 'Role is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!validate()) return;
    
    setIsLoading(true);
    // Simulate API call for frontend demonstration
    setTimeout(() => {
      setIsLoading(false);
      setFeedback('Sign in successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Cargo Management</h1>
          <p className="text-text-secondary">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSignIn} className="space-y-5">
          <Input
            label="Email ID"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            error={errors.email}
            required
          />
          
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            required
          />

          <Select
            label="Role"
            placeholder="Select your role"
            options={roleOptions}
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setErrors((prev) => ({ ...prev, role: '' }));
            }}
            error={errors.role}
            required
          />

          {feedback && (
            <div className="p-3 bg-success-light text-emerald-800 rounded text-sm border border-success/20 text-center">
              {feedback}
            </div>
          )}

          <Button type="submit" className="w-full mt-6" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};
