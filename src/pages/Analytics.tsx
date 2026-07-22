import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Percent,
  Calendar,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Globe
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
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
import { Button } from '@/components/ui/button';
import {
  MOCK_REVENUE_HISTORY,
  MOCK_CATEGORY_SHARE,
  MOCK_DAILY_SALES
} from '@/data/mockData';

const COLORS = ['#00B207', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'];

export function Analytics() {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AnalyticsSkeleton />;
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
            Business Analytics & Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Deep dive into revenue trends, order flows, site traffic, and product categories share
          </p>
        </div>

        {/* Time range toggler */}
        <div className="flex items-center gap-1.5 border border-border/60 bg-white dark:border-border/10 dark:bg-zinc-900 p-1 rounded-lg shrink-0 w-fit text-xs self-start sm:self-auto">
          {['7d', '30d', '12m'].map((range) => (
            <button
              key={range}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 300);
                setTimeRange(range);
              }}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '12 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* ================= STATS SUMMARY CARDS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Sales Card */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Average Order Value</span>
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xl md:text-2xl font-black text-foreground mt-3">$84.50</p>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+4.2% vs last week</span>
            </div>
          </CardContent>
        </Card>

        {/* Conversion rate */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Conversion Rate</span>
              <Percent className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xl md:text-2xl font-black text-foreground mt-3">3.42%</p>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+0.8% organic lift</span>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sessions */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Session Duration</span>
              <Users className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-xl md:text-2xl font-black text-foreground mt-3">4m 32s</p>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+12s view depth</span>
            </div>
          </CardContent>
        </Card>

        {/* Bounce rate */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Bounce Rate</span>
              <Globe className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-xl md:text-2xl font-black text-foreground mt-3">41.2%</p>
            <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>-1.5% engagement</span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= VISUALIZATIONS GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. Monthly Revenue Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Gross Revenue Trends</CardTitle>
            <CardDescription>Monthly growth and income flow indicators</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00B207" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00B207" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40 dark:stroke-border/10" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                <Area name="Revenue ($)" type="monotone" dataKey="revenue" stroke="#00B207" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 2. Order Progression Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Total Orders Trend</CardTitle>
            <CardDescription>Shopping cart transaction volumes per month</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_REVENUE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40 dark:stroke-border/10" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                <Line name="Orders placed" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3. Visitors Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Acquisition & Flow</CardTitle>
            <CardDescription>Unique customer accounts viewing listings monthly</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_REVENUE_HISTORY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/40 dark:stroke-border/10" />
                <XAxis dataKey="name" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                <Bar name="Site Visitors" dataKey="visitors" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 4. Product Category Market Share */}
        <Card>
          <CardHeader>
            <CardTitle>Category Sales Allocation</CardTitle>
            <CardDescription>Aggregate share of product items ordered</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-between">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_CATEGORY_SHARE}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {MOCK_CATEGORY_SHARE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Breakdowns list */}
            <div className="w-1/2 space-y-3 px-4 max-h-60 overflow-y-auto text-xs">
              {MOCK_CATEGORY_SHARE.map((entry, idx) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="font-semibold text-foreground truncate max-w-[100px]">{entry.name}</span>
                  </div>
                  <span className="font-black text-foreground">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function AnalyticsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-36" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
