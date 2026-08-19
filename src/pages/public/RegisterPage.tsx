import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { PasswordInput } from '../../components/common/PasswordInput';
import { Alert } from '../../components/common/Alert';
import { GraduationCap, ArrowRight, User, Mail, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { isValidEmail, isNotEmpty, doPasswordsMatch } from '../../utils/validation';

export interface RegisterPageProps {
  onNavigate?: (route: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { success: showToastSuccess, error: showToastError } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Form UX and validation states
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!isNotEmpty(name)) {
      newErrors.name = 'Full legal name is required.';
    }

    if (!isNotEmpty(email)) {
      newErrors.email = 'Institutional email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid institutional email address (e.g. name@college.edu).';
    }

    if (!isNotEmpty(password)) {
      newErrors.password = 'Password is required.';
    }

    if (!isNotEmpty(confirmPassword)) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (password && !doPasswordsMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match. Please ensure both passwords are identical.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate()) {
      return;
    }

    setStatus('loading');

    try {
      const response = await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setStatus('success');
      showToastSuccess(
        'Account registration completed successfully! Redirecting to Sign In...',
        'Registration Complete'
      );

      // Transition to Login screen
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('/login');
        }
      }, 1200);
    } catch (err: any) {
      setStatus('error');
      const msg =
        err?.message ||
        'Registration could not be completed. Please check your details or try again later.';
      setApiError(msg);
      showToastError(msg, 'Registration Error');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full py-6 sm:py-10">
      <Card id="register-card" variant="default" className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-[6px] bg-[#0A66C2] text-white flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h1 id="register-title" className="text-[22px] font-bold text-[#1D2226] tracking-tight">
            Create CareerLens Account
          </h1>
          <p className="text-[13px] text-[#5E6670]">
            Register your student candidate credentials to access placement &amp; recruitment drives
          </p>
        </div>

        {/* API Error Notification */}
        {apiError && (
          <Alert
            variant="danger"
            title="Registration Failed"
            onClose={() => setApiError(null)}
          >
            {apiError}
          </Alert>
        )}

        {/* Success Banner */}
        {status === 'success' && (
          <Alert variant="success" title="Account Created Successfully">
            Your candidate profile is registered. Redirecting to the sign-in screen...
          </Alert>
        )}

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4"
          aria-labelledby="register-title"
        >
          {/* Full Name */}
          <Input
            id="register-name"
            label="Full Legal Name"
            type="text"
            autoComplete="name"
            placeholder="e.g. Lucky Sharma"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              if (apiError) setApiError(null);
            }}
            error={errors.name}
            leftIcon={<User className="w-4 h-4" />}
            required
            disabled={status === 'loading' || status === 'success'}
          />

          {/* Email */}
          <Input
            id="register-email"
            label="Institutional Email"
            type="email"
            autoComplete="email"
            placeholder="lucky@college.edu"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              if (apiError) setApiError(null);
            }}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4" />}
            required
            disabled={status === 'loading' || status === 'success'}
          />

          {/* Password */}
          <PasswordInput
            id="register-password"
            label="Password"
            autoComplete="new-password"
            placeholder="Create password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              if (errors.confirmPassword && confirmPassword) {
                if (e.target.value === confirmPassword) {
                  setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                }
              }
              if (apiError) setApiError(null);
            }}
            error={errors.password}
            required
            disabled={status === 'loading' || status === 'success'}
          />

          {/* Confirm Password */}
          <PasswordInput
            id="register-confirm-password"
            label="Confirm Password"
            autoComplete="new-password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }
              if (apiError) setApiError(null);
            }}
            error={errors.confirmPassword}
            required
            disabled={status === 'loading' || status === 'success'}
          />

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              id="register-submit-btn"
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={status === 'loading'}
              disabled={status === 'loading' || status === 'success'}
              rightIcon={status !== 'loading' ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              {status === 'loading' ? 'Creating Account...' : 'Register Profile'}
            </Button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="text-center text-[12px] text-[#5E6670] pt-2 border-t border-[#D9DEE3]">
          <span>Already registered with CareerLens? </span>
          <button
            type="button"
            id="register-to-login-link"
            onClick={() => onNavigate?.('/login')}
            className="font-semibold text-[#0A66C2] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20 rounded-[4px] cursor-pointer"
          >
            Sign in here
          </button>
        </div>
      </Card>
    </div>
  );
};
