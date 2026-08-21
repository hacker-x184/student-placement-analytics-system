import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { PasswordInput } from '../../components/common/PasswordInput';
import { Alert } from '../../components/common/Alert';
import { GraduationCap, ArrowRight, Mail, CheckCircle2, Shield, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authService } from '../../services/authService';
import { isValidEmail, isNotEmpty } from '../../utils/validation';

export interface LoginPageProps {
  onNavigate?: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const { success: showToastSuccess, error: showToastError } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'company' | 'admin'>('student');

  // Form UX and validation states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!isNotEmpty(email)) {
      newErrors.email = 'Institutional email is required.';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address (e.g. name@college.edu).';
    }

    if (!isNotEmpty(password)) {
      newErrors.password = 'Password is required.';
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
      const response = await authService.login({
        email: email.trim(),
        password,
        role,
      });

      setStatus('success');
      showToastSuccess('Authentication successful. Redirecting...', 'Welcome to CareerLens');

      // Update AuthContext state with user
      login(response.user);

      // Navigate to target route after brief transition based strictly on authenticated user role
      setTimeout(() => {
        if (onNavigate) {
          const target =
            response.user.role === 'admin'
              ? '/admin'
              : response.user.role === 'company'
              ? '/company'
              : '/dashboard';
          onNavigate(target);
        }
      }, 400);
    } catch (err: any) {
      setStatus('error');
      const msg =
        err?.message ||
        'Authentication failed. Please verify your credentials and password.';
      setApiError(msg);
      showToastError(msg, 'Sign In Error');
    }
  };

  const handleFillDemo = (type: 'student' | 'company' | 'admin' | 'invalid') => {
    setApiError(null);
    setErrors({});
    if (type === 'student') {
      setEmail('student@college.edu');
      setPassword('studentPass123');
      setRole('student');
    } else if (type === 'company') {
      setEmail('recruiter@technova.com');
      setPassword('recruiterPass123');
      setRole('company');
    } else if (type === 'admin') {
      setEmail('admin@college.edu');
      setPassword('adminPass123');
      setRole('admin');
    } else {
      setEmail('student@college.edu');
      setPassword('wrongpassword');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full py-6 sm:py-10">
      <Card id="login-card" variant="default" className="p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-[6px] bg-[#0A66C2] text-white flex items-center justify-center mx-auto shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h1 id="login-title" className="text-[22px] font-bold text-[#1D2226] tracking-tight">
            Sign In to CareerLens
          </h1>
          <p className="text-[13px] text-[#5E6670]">
            Access your placement &amp; recruitment workspace with verified credentials
          </p>
        </div>

        {/* API Error Notification */}
        {apiError && (
          <Alert
            variant="danger"
            title="Authentication Failed"
            onClose={() => setApiError(null)}
          >
            {apiError}
          </Alert>
        )}

        {/* Success Banner */}
        {status === 'success' && (
          <Alert variant="success" title="Authenticated">
            Credentials verified. Preparing your CareerLens workspace...
          </Alert>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-labelledby="login-title">
          {/* Email Input */}
          <Input
            id="login-email"
            label="Account Email"
            type="email"
            autoComplete="email"
            placeholder="student@college.edu, recruiter@company.com, or admin@college.edu"
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

          {/* Password Input */}
          <PasswordInput
            id="login-password"
            label="Password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              if (apiError) setApiError(null);
            }}
            error={errors.password}
            required
            disabled={status === 'loading' || status === 'success'}
          />

          {/* Submit Action */}
          <div className="pt-2">
            <Button
              id="login-submit-btn"
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              loading={status === 'loading'}
              disabled={status === 'loading' || status === 'success'}
              rightIcon={status !== 'loading' ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              {status === 'loading' ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        {/* Demo Quick-Fill Assistants */}
        <div className="pt-3 border-t border-[#D9DEE3] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A828A]">
              Quick Demo Accounts
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              id="demo-student-fill-btn"
              onClick={() => handleFillDemo('student')}
              disabled={status === 'loading'}
              className="px-2.5 py-2 text-[12px] font-medium bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[6px] hover:bg-[#d6eaff] transition-colors text-center flex flex-col items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0A66C2]" />
              <span className="truncate text-[11px] font-semibold">Student</span>
            </button>

            <button
              type="button"
              id="demo-company-fill-btn"
              onClick={() => handleFillDemo('company')}
              disabled={status === 'loading'}
              className="px-2.5 py-2 text-[12px] font-medium bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[6px] hover:bg-[#d6eaff] transition-colors text-center flex flex-col items-center gap-1 cursor-pointer"
            >
              <Building2 className="w-4 h-4 shrink-0 text-[#0A66C2]" />
              <span className="truncate text-[11px] font-semibold">Recruiter</span>
            </button>

            <button
              type="button"
              id="demo-admin-fill-btn"
              onClick={() => handleFillDemo('admin')}
              disabled={status === 'loading'}
              className="px-2.5 py-2 text-[12px] font-medium bg-[#E8F3FF] text-[#0A66C2] border border-[#B3D7FF] rounded-[6px] hover:bg-[#d6eaff] transition-colors text-center flex flex-col items-center gap-1 cursor-pointer"
            >
              <Shield className="w-4 h-4 shrink-0 text-[#0A66C2]" />
              <span className="truncate text-[11px] font-semibold">TPO Admin</span>
            </button>
          </div>
        </div>

        {/* Navigation to Register */}
        <div className="text-center text-[12px] text-[#5E6670] pt-2 border-t border-[#D9DEE3]">
          <span>Don&apos;t have an account yet? </span>
          <button
            type="button"
            id="login-to-register-link"
            onClick={() => onNavigate?.('/register')}
            className="font-semibold text-[#0A66C2] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20 rounded-[4px] cursor-pointer"
          >
            Register here
          </button>
        </div>
      </Card>
    </div>
  );
};
