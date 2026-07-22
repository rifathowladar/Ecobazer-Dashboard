import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  ShoppingBag,
  Users,
  Percent,
  Calendar,
  Activity,
  Plus,
  Eye,
  ArrowRight,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MOCK_PRODUCTS,
  MOCK_ORDERS,
  MOCK_CUSTOMERS,
  MOCK_REVENUE_HISTORY,
  MOCK_DAILY_SALES,
  MOCK_CATEGORY_SHARE,
  MOCK_TRAFFIC_SOURCES,
  MOCK_RECENT_ACTIVITIES
} from '@/data/mockData';

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Trigger loading state for 800ms to show the beautiful skeleton state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // Calculate high-level summary metrics
  const totalRevenue = MOCK_REVENUE_HISTORY.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = MOCK_ORDERS.length;
  const totalCustomers = MOCK_CUSTOMERS.length;
  const totalProducts = MOCK_PRODUCTS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* ================= WELCOME HERO BANNER ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-emerald-950 p-6 md:p-8 text-white shadow-lg border border-emerald-500/10">
        <div className="absolute right-0 top-0 h-48 w-48 bg-primary/20 blur-3xl rounded-full translate-x-12 -translate-y-12" />
        <div className="absolute left-1/3 bottom-0 h-32 w-32 bg-emerald-500/10 blur-2xl rounded-full translate-y-12" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider bg-emerald-500/10 w-fit px-3 py-1 rounded-full border border-emerald-500/20">
              <Zap className="h-3.5 w-3.5 fill-emerald-400" />
              <span>Live Store Statistics</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                Welcome back, Rifat! 👋
              </h1>
            <p className="text-sm text-zinc-300 max-w-xl">
              Your store performance is up by <span className="text-emerald-400 font-semibold">+18.4%</span> compared to last week. Let's see what is happening today in your organic produce and electronics empire.
            </p>
          </div>
          
          {/* Today Summary Capsule */}
          <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div>
              <p className="text-xs text-zinc-400">Today's Sales</p>
              <p className="text-lg font-bold text-emerald-400">$2,488.99</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-xs text-zinc-400">Active Visitors</p>
              <p className="text-lg font-bold text-white">432 Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PERFORMANCE KPI CARDS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Card 1: Revenue */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Revenue</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-primary flex items-center justify-center">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-2xl font-black tracking-tight">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+12.5% vs last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Orders */}
        <Card className="col-span-1">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Orders</span>
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShoppingCart className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-2xl font-black tracking-tight">{totalOrders}</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+8% today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Products */}
        <Card className="col-span-1">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Products</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShoppingBag className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-2xl font-black tracking-tight">{totalProducts}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
                <span>12 Active Categories</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Customers */}
        <Card className="col-span-1">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Customers</span>
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Users className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-2xl font-black tracking-tight">{totalCustomers}</p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+15.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 5: Profit */}
        <Card className="col-span-1">
          <CardContent className="p-5 flex flex-col justify-between h-full">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase">Profit</span>
              <div className="h-8 w-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Percent className="h-4.5 w-4.5" />
              </div>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-2xl font-black tracking-tight">64.5%</p>
              <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold">
                <TrendingDown className="h-3.5 w-3.5" />
                <span>-0.4% margin shift</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= STATISTICS & CHARTS ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Sales & Visitors Overview</CardTitle>
              <CardDescription>Visual stats for monthly revenue progression</CardDescription>
            </div>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground border border-border/40 bg-muted/20 px-2.5 py-1 rounded-md font-semibold">
                Monthly View
              </span>
            </div>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B207" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00B207" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40 dark:stroke-border/10" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                <Legend verticalAlign="top" height={36} iconType="circle" />
                <Area name="Revenue ($)" type="monotone" dataKey="revenue" stroke="#00B207" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area name="Visitors" type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources / Categories Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Traffic Distribution</CardTitle>
            <CardDescription>Primary acquisition channels this month</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex flex-col justify-between">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_TRAFFIC_SOURCES}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {MOCK_TRAFFIC_SOURCES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legend with percent breakdowns */}
            <div className="space-y-2 mt-4 flex-1 overflow-y-auto">
              {MOCK_TRAFFIC_SOURCES.map((source) => (
                <div key={source.source} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="font-medium text-foreground">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{source.value} clicks</span>
                    <span className="font-bold text-foreground">{source.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= BENTO GRID LOWER SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Latest Orders List */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Latest Orders</CardTitle>
              <CardDescription>Real-time order intake stream</CardDescription>
            </div>
            <Link to="/orders" className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline">
              <span>All Orders</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/30 text-xs text-muted-foreground uppercase">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Order</th>
                    <th className="px-5 py-3 font-semibold">Customer</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40 dark:divide-border/10">
                  {MOCK_ORDERS.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-3 font-bold text-xs text-primary">
                        {order.id}
                      </td>
                      <td className="px-5 py-3">
                        <div className="font-medium text-foreground">{order.customerName}</div>
                        <div className="text-[10px] text-muted-foreground">{order.customerEmail}</div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge
                          variant={
                            order.status === 'Delivered'
                              ? 'success'
                              : order.status === 'Processing'
                              ? 'info'
                              : order.status === 'Shipped'
                              ? 'warning'
                              : 'destructive'
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-right font-black text-foreground">
                        ${order.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="col-span-1 flex flex-col h-full">
          <CardHeader>
            <CardTitle>Quick Administrative Controls</CardTitle>
            <CardDescription>Frequent system tasks and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5 flex-1">
            <Link
              to="/products"
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/10 hover:border-primary/50 hover:bg-primary/5 dark:border-border/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                  <Plus className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Add New Product</h4>
                  <p className="text-[10px] text-muted-foreground">List stock, prices, SKUs</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/analytics"
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/10 hover:border-primary/50 hover:bg-primary/5 dark:border-border/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Full Business Analytics</h4>
                  <p className="text-[10px] text-muted-foreground">Detailed revenue, lines, visitor flows</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/settings"
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 bg-muted/10 hover:border-primary/50 hover:bg-primary/5 dark:border-border/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                  <Plus className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Configure Store Alerts</h4>
                  <p className="text-[10px] text-muted-foreground">Manage order and stock emails</p>
                </div>
              </div>
              <ArrowUpRight className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Performance Mini Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/5 to-primary/10 border border-primary/20 mt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary">
                <Sparkles className="h-4 w-4 animate-bounce" />
                <span>Hosting Performance Status</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                All cloud systems operational. Server response rate is 24ms. Production cache hits at 99.4%.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= RECENT CUSTOMERS & ACTIVITY ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Customers */}
        <Card>
          <CardHeader>
            <CardTitle>New Customer Registration</CardTitle>
            <CardDescription>Most recently onboarded buyers</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border/40 dark:divide-border/10">
            {MOCK_CUSTOMERS.slice(0, 4).map((cust) => (
              <div key={cust.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={cust.avatar} alt={cust.name} />
                    <AvatarFallback>{cust.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{cust.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{cust.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground">{cust.ordersCount} orders</p>
                  <p className="text-[10px] text-primary font-bold">${cust.totalSpent.toFixed(2)} spent</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle>System Activity Feed</CardTitle>
            <CardDescription>Live events and administrator logs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/20 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">
                    <span className="font-bold">{act.user}</span> {act.action}{' '}
                    <span className="font-semibold text-primary">{act.item}</span>
                  </p>
                  <span className="text-[10px] text-muted-foreground font-semibold mt-1 block">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Welcome banner skeleton */}
      <div className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />

      {/* KPI grid skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>

      {/* Charts row skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl col-span-2" />
        <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>

      {/* Table grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl col-span-2" />
        <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}
