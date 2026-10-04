import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Lock, Mail } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('morgan.vance@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    login(email);
  };

  return (
    <div className="py-12 px-4 max-w-md mx-auto">
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg mx-auto mb-3 shadow-2xs">
            G
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Sign in to GOVMATCH</h1>
          <p className="text-xs text-stone-600 mt-1">
            Access your federal career evidence vault and job analyses.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-stone-800">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset instructions will be sent to your registered email.')}
                className="text-[11px] text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-600">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
        <span>Evidence-grounded federal matching workspace</span>
      </div>
    </div>
  );
};
