import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Mail,
  Phone,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  UserCheck,
  UserX,
  Plus,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { MOCK_CUSTOMERS, Customer } from '@/data/mockData';

export function Customers() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('admin-customers');
    return saved ? JSON.parse(saved) : MOCK_CUSTOMERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // New Customer Modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustEmail, setNewCustEmail] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const saveCustomers = (updated: Customer[]) => {
    setCustomers(updated);
    localStorage.setItem('admin-customers', JSON.stringify(updated));
  };

  // Toggle Customer Active Status
  const handleToggleStatus = (id: string) => {
    const updated = customers.map((c) => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' as const };
      }
      return c;
    });
    saveCustomers(updated);
    setActiveMenuId(null);
  };

  // Delete Customer
  const handleDeleteCustomer = (id: string) => {
    const updated = customers.filter(c => c.id !== id);
    saveCustomers(updated);
    setActiveMenuId(null);
  };

  // Create Customer
  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustEmail) return;

    const newCust: Customer = {
      id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
      name: newCustName,
      email: newCustEmail,
      phone: newCustPhone || '+1 (555) 012-3456',
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=100&fit=crop`,
      ordersCount: 0,
      totalSpent: 0,
      status: 'Active',
      dateJoined: new Date().toISOString().split('T')[0]
    };

    const updated = [newCust, ...customers];
    saveCustomers(updated);

    setNewCustName('');
    setNewCustEmail('');
    setNewCustPhone('');
    setDialogOpen(false);
  };

  // Filter customers by search
  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <CustomersSkeleton />;
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
            Customer Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit register records, total spent accounts, purchase frequencies, and status toggles
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-1.5 h-9">
          <Plus className="h-4 w-4" />
          <span>Add Customer</span>
        </Button>
      </div>

      {/* ================= FILTERS & CONTROLS ================= */}
      <Card>
        <CardContent className="p-4">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border bg-muted/40 text-foreground border-border/60 focus:bg-white dark:focus:bg-zinc-800 transition-all outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-border/15"
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= CUSTOMERS LIST/GRID ================= */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-xs text-muted-foreground uppercase border-b border-border/60 dark:border-border/10">
                <tr>
                  <th className="px-6 py-4 font-bold">Customer Profiles</th>
                  <th className="px-6 py-4 font-bold">Contact Details</th>
                  <th className="px-6 py-4 font-bold">Registered</th>
                  <th className="px-6 py-4 font-bold text-center">Orders Count</th>
                  <th className="px-6 py-4 font-bold">Total Spent</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 dark:divide-border/10">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="h-10 w-10 stroke-zinc-400" />
                        <p className="font-semibold text-sm text-foreground">No customers found</p>
                        <p className="text-xs">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={cust.avatar} alt={cust.name} />
                            <AvatarFallback>{cust.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-xs md:text-sm text-foreground">{cust.name}</p>
                            <span className="text-[10px] text-muted-foreground font-semibold">ID: {cust.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <div className="flex flex-col space-y-1 text-muted-foreground font-semibold">
                          <div className="flex items-center gap-1.5 text-foreground">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{cust.email}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{cust.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-muted-foreground font-semibold">
                        {cust.dateJoined}
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-foreground text-xs md:text-sm">
                        {cust.ordersCount}
                      </td>
                      <td className="px-6 py-4 font-black text-emerald-600 dark:text-emerald-400">
                        ${cust.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={cust.status === 'Active' ? 'success' : 'destructive'}>
                          {cust.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === cust.id ? null : cust.id)}
                          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <MoreVertical className="h-4.5 w-4.5" />
                        </button>

                        {/* Customer Action Dropdown Menu */}
                        {activeMenuId === cust.id && (
                          <div className="absolute right-6 top-12 w-48 bg-white dark:bg-zinc-900 border border-border/60 dark:border-border/15 rounded-xl shadow-xl z-50 py-1 text-left text-xs animate-in fade-in-50 slide-in-from-top-1">
                            <button
                              onClick={() => handleToggleStatus(cust.id)}
                              className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-muted text-foreground transition-colors"
                            >
                              {cust.status === 'Active' ? (
                                <>
                                  <UserX className="h-3.5 w-3.5 text-rose-500" />
                                  <span>Deactivate Account</span>
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-3.5 w-3.5 text-emerald-500" />
                                  <span>Activate Account</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(cust.id)}
                              className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-rose-500/10 text-rose-500 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Remove Customer</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ================= ADD CUSTOMER DIALOG ================= */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Register Customer</DialogTitle>
            <DialogDescription>Manually create a new customer account in the system.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddCustomer} className="space-y-4">
            
            {/* Customer Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Customer Name *</label>
              <input
                type="text"
                required
                value={newCustName}
                onChange={(e) => setNewCustName(e.target.value)}
                placeholder="e.g. Marie Antoinette"
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              />
            </div>

            {/* Customer Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Email Address *</label>
              <input
                type="email"
                required
                value={newCustEmail}
                onChange={(e) => setNewCustEmail(e.target.value)}
                placeholder="e.g. marie@france.net"
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              />
            </div>

            {/* Customer Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Phone Number</label>
              <input
                type="text"
                value={newCustPhone}
                onChange={(e) => setNewCustPhone(e.target.value)}
                placeholder="e.g. +1 (555) 012-3456"
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="h-8">
                Cancel
              </Button>
              <Button type="submit" className="h-8">
                Add Customer
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function CustomersSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-36" />
      </div>
      <div className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
      <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
    </div>
  );
}
