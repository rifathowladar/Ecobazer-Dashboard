import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Login() {
  const navigate = useNavigate();
  
  // Form states
  const [email, setEmail] = useState('rifath@greenadmin.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // If already logged in, skip to dashboard
  useEffect(() => {
    const loggedIn = localStorage.getItem('admin-logged-in');
    if (loggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both administrative credentials.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate login server delay
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('admin-logged-in', 'true');
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-[#fafafa] dark:bg-zinc-950 text-foreground transition-colors duration-500">
      
      {/* ================= LEFT SIDE: FORM BLOCK ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/4 h-64 w-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md space-y-6 relative z-10">
          
          {/* Logo brand title */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-md">
              G
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              GreenAdmin
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Administrative Control Hub
            </h1>
            <p className="text-xs text-muted-foreground">
              Provide secure root credentials to authenticate catalog sessions
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Admin Username or Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@greenadmin.com"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground">Secure Passcode</label>
                <span className="text-[10px] text-primary hover:underline cursor-pointer font-bold">
                  Forgot passcode?
                </span>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Checkbox row */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 rounded border-gray-300 text-primary focus:ring-primary/45 accent-primary"
                />
                <span className="text-muted-foreground font-semibold">Remember this terminal session</span>
              </label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Decrypting Access Keys...</span>
                </>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </Button>

          </form>

          {/* Quick-start helper block */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span>Developer Quick Demo Start</span>
            </div>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              We have pre-filled standard administrative credentials. Simply click the "Authenticate Session" button to log in instantly.
            </p>
          </div>

        </div>

      </div>

      {/* ================= RIGHT SIDE: ILLUSTRATION BLOCK ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 to-emerald-950 items-center justify-center p-12 relative overflow-hidden text-white border-l border-emerald-500/10">
        
        {/* Abstract background design shapes */}
        <div className="absolute top-0 right-0 h-96 w-96 bg-primary/20 blur-3xl rounded-full translate-x-24 -translate-y-24" />
        <div className="absolute bottom-0 left-0 h-96 w-96 bg-emerald-500/15 blur-3xl rounded-full -translate-x-24 translate-y-24" />
        
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/3 h-16 w-16 border border-white/5 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-24 w-24 border border-white/5 rounded-full" />

        <div className="max-w-md space-y-8 relative z-10 text-center lg:text-left">
          
          <div className="space-y-4">
            <div className="h-12 w-12 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg mx-auto lg:mx-0">
              <Cpu className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Enterprise Grade Store Analytics
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Manage inventory levels, sales pipelines, client reviews, categories distribution, and business performance metrics all in a unified modern command room.
            </p>
          </div>

          {/* Graphic data bullet stats */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-zinc-400 font-bold">Cloud Uptime</p>
                <p className="font-black text-white mt-0.5">99.98% Live</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-zinc-400 font-bold">Query Latency</p>
                <p className="font-black text-white mt-0.5">24ms Avg</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
