import React, { useState, useContext } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({type: 'LOGIN', payload: json});
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button type="button" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </Button>
                </div>
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
        {/* Feature showcase content... */}
      </div>
    </div>
  );
}