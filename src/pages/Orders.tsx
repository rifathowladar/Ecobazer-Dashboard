import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Eye,
  CreditCard,
  AlertCircle,
  Calendar,
  MoreVertical,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_ORDERS, Order } from '@/data/mockData';

export function Orders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('admin-orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('admin-orders', JSON.stringify(updated));
  };

  // Modify Order Status
  const handleUpdateStatus = (id: string, status: Order['status']) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        return { ...o, status };
      }
      return o;
    });
    saveOrders(updated);
    setActiveMenuId(null);
  };

  // Modify Payment Status
  const handleUpdatePayment = (id: string, paymentStatus: Order['paymentStatus']) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        return { ...o, paymentStatus };
      }
      return o;
    });
    saveOrders(updated);
    setActiveMenuId(null);
  };

  // Process filters
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesPayment = paymentFilter === 'All' || o.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Pagination calculations
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <OrdersSkeleton />;
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
      <div>
        <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
          Sales & Orders Queue
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Process, ship, cancel, and audit client payments and delivery logistics
        </p>
      </div>

      {/* ================= FILTERS & CONTROLS ================= */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search by Order ID, name, or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border bg-muted/40 text-foreground border-border/60 focus:bg-white dark:focus:bg-zinc-800 transition-all outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-border/15"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            
            {/* Order Status selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold">Order:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-card border border-border/60 dark:border-border/10 rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-semibold"
              >
                <option value="All">All Deliveries</option>
                <option value="Delivered">Delivered</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Payment Status selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => {
                  setPaymentFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-card border border-border/60 dark:border-border/10 rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-semibold"
              >
                <option value="All">All Payments</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* ================= ORDERS TABLE ================= */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-xs text-muted-foreground uppercase border-b border-border/60 dark:border-border/10">
                <tr>
                  <th className="px-6 py-4 font-bold">Order ID</th>
                  <th className="px-6 py-4 font-bold">Customer</th>
                  <th className="px-6 py-4 font-bold">Date</th>
                  <th className="px-6 py-4 font-bold">Order Status</th>
                  <th className="px-6 py-4 font-bold">Payment Status</th>
                  <th className="px-6 py-4 font-bold text-right">Total Amount</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 dark:divide-border/10">
                {paginatedOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Clock className="h-10 w-10 stroke-zinc-400" />
                        <p className="font-semibold text-sm text-foreground">No orders found</p>
                        <p className="text-xs">Adjust your search or filter requirements</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4 font-black text-xs text-primary">
                        {o.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="min-w-[150px]">
                          <p className="font-bold text-xs md:text-sm text-foreground">{o.customerName}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{o.customerEmail}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{o.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            o.status === 'Delivered'
                              ? 'success'
                              : o.status === 'Processing'
                              ? 'info'
                              : o.status === 'Shipped'
                              ? 'warning'
                              : 'destructive'
                          }
                        >
                          {o.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            o.paymentStatus === 'Paid'
                              ? 'success'
                              : o.paymentStatus === 'Pending'
                              ? 'warning'
                              : 'destructive'
                          }
                        >
                          {o.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-foreground">
                        ${o.amount.toFixed(2)}
                        <div className="text-[10px] text-muted-foreground font-semibold mt-0.5">{o.items} items</div>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === o.id ? null : o.id)}
                          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <MoreVertical className="h-4.5 w-4.5" />
                        </button>

                        {/* Order Management Actions Popup */}
                        {activeMenuId === o.id && (
                          <div className="absolute right-6 top-12 w-48 bg-white dark:bg-zinc-900 border border-border/60 dark:border-border/15 rounded-xl shadow-xl z-50 py-1 text-left text-xs animate-in fade-in-50 slide-in-from-top-1">
                            <div className="px-3.5 py-1 text-[10px] uppercase font-semibold text-muted-foreground border-b border-border/40 dark:border-border/10 mb-1">
                              Update Logistics
                            </div>
                            {o.status === 'Processing' && (
                              <button
                                onClick={() => handleUpdateStatus(o.id, 'Shipped')}
                                className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-muted text-foreground transition-colors"
                              >
                                <Truck className="h-3.5 w-3.5 text-amber-500" />
                                <span>Mark as Shipped</span>
                              </button>
                            )}
                            {o.status !== 'Delivered' && (
                              <button
                                onClick={() => handleUpdateStatus(o.id, 'Delivered')}
                                className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-muted text-foreground transition-colors"
                              >
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Mark as Delivered</span>
                              </button>
                            )}
                            {o.paymentStatus !== 'Paid' && (
                              <button
                                onClick={() => handleUpdatePayment(o.id, 'Paid')}
                                className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-muted text-foreground transition-colors"
                              >
                                <CreditCard className="h-3.5 w-3.5 text-emerald-500" />
                                <span>Confirm Payment</span>
                              </button>
                            )}
                            {o.status !== 'Cancelled' && o.status !== 'Delivered' && (
                              <button
                                onClick={() => handleUpdateStatus(o.id, 'Cancelled')}
                                className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-rose-500/10 text-rose-500 transition-colors"
                              >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>Cancel Order</span>
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION BAR ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border/40 dark:border-border/10 bg-muted/10 text-xs">
              <span className="text-muted-foreground">
                Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-foreground">
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{' '}
                of <span className="font-bold text-foreground">{totalItems}</span> orders
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="xs"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                    size="xs"
                    className="h-6 w-6 p-0"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="xs"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

        </CardContent>
      </Card>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function OrdersSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
      <div className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
      <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
    </div>
  );
}
