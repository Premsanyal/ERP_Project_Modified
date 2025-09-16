import React, { useState } from 'react';
import { Button, Input, Label, Checkbox } from '../ui.js';
import { University, Eye, EyeOff, ArrowLeft, Shield, Lock, User } from 'lucide-react';

export function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin({ email, password });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c111d] p-4 font-sans text-white">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <University className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to access the Research Portal</p>
          </div>
        </div>

        <div className="bg-[#171e2c] p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Faculty & Staff Login</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your university credentials to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input id="email" type="email" placeholder="rvnwesn@trkeg.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="font-normal !text-muted-foreground">Remember me</Label>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary">Forgot password?</Button>
            </div>
            <Button type="submit" className="w-full !py-3 !text-base" disabled={isLoading}>
              {isLoading ? 'Signing in...' : <><Shield className="mr-2 h-5 w-5" /> Sign In</>}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}