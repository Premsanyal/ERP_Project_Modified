import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button, Input, Label, Checkbox, Badge } from '../ui.js';
import { University, Eye, EyeOff, Shield, Lock, User, Globe, Zap, BookOpen, Users, BarChart3, HelpCircle } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await response.json();
      setIsLoading(false);

      if (!response.ok) {
        setError(json.error || 'Login failed. Please try again.');
        return;
      }
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#111827] font-sans text-white">
      {/* Left Column: Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <University className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-muted-foreground mt-2">Sign in to access the Research Portal</p>
            </div>
          </div>

          <div className="bg-[#1c2436] p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@university.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-xs">Remember me</Label>
                </div>
                <a href="#" className="text-xs text-primary hover:underline flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" /> Forgot password?
                </a>
              </div>
              <Button type="submit" className="w-full !py-3 !text-base" disabled={isLoading}>
                {isLoading ? 'Signing in...' : <><Shield className="mr-2 h-5 w-5" /> Sign In</>}
              </Button>
              {error && <div className="text-red-500 text-sm text-center pt-2">{error}</div>}
            </form>
          </div>
        </div>
      </div>

      {/* Right Column: Feature Showcase */}
      <div className="hidden lg:flex items-center justify-center p-8 space-bg glow relative">
        <div className="max-w-md w-full space-y-8 bg-white/5 rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Track Publications</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Collaborate with Peers</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Analyze Research Impact</span>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Global Research Community</span>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary/20 text-primary border-primary/30 flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              AIML & Data Science
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}