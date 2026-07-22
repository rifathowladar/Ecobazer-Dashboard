import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Building,
  Bell,
  Lock,
  Palette,
  Save,
  Check,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';

export function Settings() {
  const [loading, setLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  
  // Tab control
  const [activeTab, setActiveTab] = useState<'profile' | 'store' | 'notifications' | 'security' | 'appearance'>('profile');
  
  // Save feedback state
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [profileName, setProfileName] = useState('Rifath Howladar');
  const [profileEmail, setProfileEmail] = useState('rifath@greenadmin.com');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 019-2831');
  const [profileBio, setProfileBio] = useState('Senior Full Stack Developer & Store Administrator');

  const [storeName, setStoreName] = useState('GreenAdmin Organics');
  const [storeEmail, setStoreEmail] = useState('sales@greenadmin.com');
  const [storeCurrency, setStoreCurrency] = useState('USD');
  const [storeCountry, setStoreCountry] = useState('United States');

  const [notifEmails, setNotifEmails] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifDigest, setNotifDigest] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    // Mimic API post delay
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'store', label: 'Store Front', icon: Building },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Auth', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* ================= PAGE HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
            System & Store Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure system configurations, security passwords, layout designs, and notification alerts
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Left Side: Navigation Vertical Tabs */}
        <Card className="w-full lg:w-64 p-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSaveSuccess(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Right Side: Tab Form Panel */}
        <Card className="flex-1 w-full overflow-hidden">
          <form onSubmit={handleSaveSettings}>
            
            <CardHeader className="border-b border-border/40 dark:border-border/10">
              <CardTitle>
                {tabs.find((t) => t.id === activeTab)?.label} Settings
              </CardTitle>
              <CardDescription>
                Customize configuration values and save them to active variables.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              
              {/* Profile Panel */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Full Name</label>
                      <input
                        type="text"
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Email Address</label>
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Phone Number</label>
                    <input
                      type="text"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Biography Profile</label>
                    <textarea
                      rows={3}
                      value={profileBio}
                      onChange={(e) => setProfileBio(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Store Panel */}
              {activeTab === 'store' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Store Name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Sales Support Email</label>
                      <input
                        type="email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Store Currency</label>
                      <select
                        value={storeCurrency}
                        onChange={(e) => setStoreCurrency(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      >
                        <option value="USD">USD ($ - United States Dollar)</option>
                        <option value="EUR">EUR (€ - Euro)</option>
                        <option value="GBP">GBP (£ - Great Britain Pound)</option>
                        <option value="BDT">BDT (৳ - Bangladeshi Taka)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Region Country</label>
                      <input
                        type="text"
                        value={storeCountry}
                        onChange={(e) => setStoreCountry(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Panel */}
              {activeTab === 'notifications' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-2 border-b border-border/30 dark:border-border/10">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Order Dispatch Emails</h4>
                      <p className="text-[10px] text-muted-foreground">Receive copy alerts when a customer places an order</p>
                    </div>
                    <Switch checked={notifEmails} onCheckedChange={setNotifEmails} />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border/30 dark:border-border/10">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">SMS Transaction Alerts</h4>
                      <p className="text-[10px] text-muted-foreground">Enable global Twilio SMS alerts for premium dispatch speeds</p>
                    </div>
                    <Switch checked={notifSms} onCheckedChange={setNotifSms} />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border/30 dark:border-border/10">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Low Stock Notifications</h4>
                      <p className="text-[10px] text-muted-foreground">Alert administrators immediately when product levels drop below 10 units</p>
                    </div>
                    <Switch checked={notifLowStock} onCheckedChange={setNotifLowStock} />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Weekly Performance Digest</h4>
                      <p className="text-[10px] text-muted-foreground">Auto-generate and email a weekly executive PDF summary</p>
                    </div>
                    <Switch checked={notifDigest} onCheckedChange={setNotifDigest} />
                  </div>
                </div>
              )}

              {/* Security Panel */}
              {activeTab === 'security' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground">Current Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground">Verify New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-400">Two-Factor Authenticator (2FA)</h4>
                      <p className="text-emerald-600 dark:text-emerald-500 mt-0.5">Highly recommended. Keep your admin accounts safe.</p>
                    </div>
                    <Button type="button" size="xs">Configure 2FA</Button>
                  </div>
                </div>
              )}

              {/* Appearance Panel */}
              {activeTab === 'appearance' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Theme Presets</h4>
                      <p className="text-[10px] text-muted-foreground">Switch the layout visual color palettes</p>
                    </div>
                    <Button type="button" variant="outline" size="xs" onClick={toggleTheme}>
                      Toggle Theme ({theme === 'light' ? 'Light' : 'Dark'})
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/40 border border-border/40 dark:border-border/10 text-xs space-y-1">
                    <h4 className="font-bold text-foreground">Visual Mode details</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Theme state is managed through React state variables which synchronized immediately to the document header root classes. Custom theme values use premium Tailwind CSS variable tokens.
                    </p>
                  </div>
                </div>
              )}

            </CardContent>

            <div className="p-4 bg-muted/30 border-t border-border/40 dark:border-border/10 flex items-center justify-end gap-3">
              {saveSuccess && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  <span>Settings saved successfully!</span>
                </span>
              )}
              
              <Button type="submit" disabled={saving} className="h-8 flex items-center gap-1.5">
                {saving ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Config</span>
                  </>
                )}
              </Button>
            </div>

          </form>
        </Card>

      </div>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function SettingsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="h-56 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full lg:w-64" />
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl flex-1" />
      </div>
    </div>
  );
}
