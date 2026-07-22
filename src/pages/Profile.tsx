import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  Lock,
  Shield,
  Clock,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Rifat from '../../assets/image/rifat.webp'

export function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password fields
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) return;
    
    setSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  const activities = [
    { id: '1', event: 'Logged in from macOS (Chrome)', time: 'Today, 07:18 AM', ip: '192.168.1.1' },
    { id: '2', event: 'Approved 2 customer product reviews', time: 'Yesterday, 04:32 PM', ip: '192.168.1.1' },
    { id: '3', event: 'Added 4 new items to Inventory', time: '14 Jul 2026, 02:11 PM', ip: '192.168.1.1' },
    { id: '4', event: 'Updated store contact sales email configuration', time: '12 Jul 2026, 11:05 AM', ip: '192.168.1.1' },
  ];

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* ================= PROFILE COVER CARD ================= */}
      <Card className="overflow-hidden border border-border/60 dark:border-border/10 relative">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-emerald-500/20" />
        
        <CardContent className="p-6 relative -mt-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
            <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-zinc-900 shadow-lg">
              <AvatarImage src={Rifat} alt="Admin" />
              <AvatarFallback>RH</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h2 className="text-xl font-black text-foreground">Rifat Howladar</h2>
                <span className="inline-flex items-center bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded-full">
                  OWNER
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-semibold">rifath@ecobazaradmin.com • Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="xs" variant="outline" className="h-8">
              Edit Avatar
            </Button>
            <Button size="xs" className="h-8">
              View Access Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Grid: Contact Information & Change Password */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Specifications</CardTitle>
              <CardDescription>Contact numbers, routing codes, and access directories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs font-semibold text-muted-foreground divide-y divide-border/30 dark:divide-border/10">
              
              <div className="flex items-center justify-between py-2 pt-0">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground">Official Email</span>
                </div>
                <span className="text-foreground">rifat@ecobazaradmin.com</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground">Phone Number</span>
                </div>
                <span className="text-foreground">+1 (555) 019-2831</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground">Region Location</span>
                </div>
                <span className="text-foreground">Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-foreground">Registered Since</span>
                </div>
                <span className="text-foreground">July 19, 2025 (1 year ago)</span>
              </div>

            </CardContent>
          </Card>

          {/* Change Password UI */}
          <Card>
            <CardHeader>
              <CardTitle>Credential Security Reset</CardTitle>
              <CardDescription>Configure security passcode variables for system access control</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground">Current Password</label>
                  <input
                    type="password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  {saveSuccess && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Password changed successfully!</span>
                    </span>
                  )}
                  
                  <Button type="submit" disabled={saving} className="h-8 flex items-center gap-1.5">
                    {saving ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <KeyRound className="h-3.5 w-3.5" />
                        <span>Reset Password</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Grid: System Activity Timeline */}
        <div className="col-span-1">
          
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>System Activity Log</CardTitle>
              <CardDescription>Live auditing tracking codes for admin operations</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 pt-2">
              
              <div className="relative pl-6 border-l border-border/60 dark:border-border/10 space-y-6">
                {activities.map((act) => (
                  <div key={act.id} className="relative text-xs">
                    
                    {/* Circle icon on line */}
                    <span className="absolute -left-[29px] top-0 h-4.5 w-4.5 rounded-full bg-white dark:bg-zinc-900 border border-primary text-primary flex items-center justify-center shadow-xs">
                      <Clock className="h-2.5 w-2.5" />
                    </span>
                    
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-foreground leading-normal">{act.event}</h4>
                      <p className="text-[10px] text-muted-foreground font-semibold flex items-center justify-between">
                        <span>{act.time}</span>
                        <span className="bg-muted px-1.5 py-0.5 rounded-sm select-none">IP: {act.ip}</span>
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* Performance status card */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-primary/10 border border-primary/20 space-y-1.5 mt-8">
                <div className="flex items-center gap-2 text-xs font-bold text-primary">
                  <Shield className="h-4 w-4" />
                  <span>Security Grade: A+</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Your administrator account is protected with strong cipher keys and encrypted communication lines. Keep credentials confidential.
                </p>
              </div>

            </CardContent>
          </Card>

        </div>

      </div>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl col-span-2" />
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}
