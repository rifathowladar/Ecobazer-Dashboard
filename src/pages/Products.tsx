import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  RotateCcw,
  Star,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { MOCK_PRODUCTS, Product } from '@/data/mockData';

export function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('admin-products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  // State managers
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const [sortField, setSortField] = useState<'price' | 'sales' | 'rating' | 'name'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Add Product Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('Electronics');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductStock, setNewProductStock] = useState('');
  const [newProductSku, setNewProductSku] = useState('');

  // Active Action Menu Popup
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Sync to localstorage
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('admin-products', JSON.stringify(updated));
  };

  // Handle Add Product submission
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice || !newProductStock) return;

    const price = parseFloat(newProductPrice);
    const stock = parseInt(newProductStock, 10);
    
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (stock === 0) status = 'Out of Stock';
    else if (stock <= 10) status = 'Low Stock';

    const newProd: Product = {
      id: `PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: newProductName,
      sku: newProductSku || `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      category: newProductCategory,
      price,
      stock,
      status,
      rating: 5.0,
      sales: 0
    };

    const updated = [newProd, ...products];
    saveProducts(updated);
    
    // Reset Form
    setNewProductName('');
    setNewProductPrice('');
    setNewProductStock('');
    setNewProductSku('');
    setNewProductCategory('Electronics');
    setDialogOpen(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    setActiveMenuId(null);
  };

  // Restock action
  const handleRestockProduct = (id: string, count: number) => {
    const updated = products.map(p => {
      if (p.id === id) {
        const newStock = p.stock + count;
        let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
        if (newStock === 0) status = 'Out of Stock';
        else if (newStock <= 10) status = 'Low Stock';
        return { ...p, stock: newStock, status };
      }
      return p;
    });
    saveProducts(updated);
    setActiveMenuId(null);
  };

  // Toggle sort direction or field
  const handleSort = (field: 'price' | 'sales' | 'rating' | 'name') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtering & Sorting Process
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
      
      const matchesStock =
        stockFilter === 'All' ||
        (stockFilter === 'In Stock' && product.status === 'In Stock') ||
        (stockFilter === 'Low Stock' && product.status === 'Low Stock') ||
        (stockFilter === 'Out of Stock' && product.status === 'Out of Stock');

      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      let multiplier = sortOrder === 'asc' ? 1 : -1;
      
      if (sortField === 'name') {
        return a.name.localeCompare(b.name) * multiplier;
      }
      return (a[sortField] - b[sortField]) * multiplier;
    });

  // Pagination calculation
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const categories = ['All', 'Electronics', 'Furniture', 'Kitchenware', 'Fashion', 'Groceries', 'Home Decor'];

  if (loading) {
    return <ProductsSkeleton />;
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
            Inventory & Catalog
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add, update, search, and configure product inventory and stock levels
          </p>
        </div>
        
        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-1.5 h-9">
          <Plus className="h-4 w-4" />
          <span>Add New Product</span>
        </Button>
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
              placeholder="Search by name, SKU, or ID..."
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
            
            {/* Category selection */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-card border border-border/60 dark:border-border/10 rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-semibold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Stock status filtering */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-muted-foreground font-semibold">Stock:</span>
              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-card border border-border/60 dark:border-border/10 rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-semibold"
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* ================= PRODUCTS TABLE ================= */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-xs text-muted-foreground uppercase border-b border-border/60 dark:border-border/10">
                <tr>
                  <th className="px-6 py-4 font-bold">Product Details</th>
                  <th className="px-6 py-4 font-bold">SKU / ID</th>
                  <th className="px-6 py-4 font-bold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('price')}>
                    <div className="flex items-center gap-1">
                      <span>Price</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-bold">Stock</th>
                  <th className="px-6 py-4 font-bold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('sales')}>
                    <div className="flex items-center gap-1">
                      <span>Sales</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-bold cursor-pointer hover:text-foreground transition-colors" onClick={() => handleSort('rating')}>
                    <div className="flex items-center gap-1">
                      <span>Rating</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 dark:divide-border/10">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-10 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Package className="h-10 w-10 stroke-zinc-400" />
                        <p className="font-semibold text-sm text-foreground">No products found</p>
                        <p className="text-xs">Try adjusting your filters or add a new product</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                            {p.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-xs md:text-sm text-foreground truncate">{p.name}</p>
                            <span className="inline-flex items-center text-[10px] bg-secondary text-secondary-foreground font-semibold px-2 py-0.5 rounded-full mt-1 border border-border/40">
                              {p.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-muted-foreground">
                        <div>ID: <span className="text-foreground font-bold">{p.id}</span></div>
                        <div className="mt-0.5">SKU: <span className="font-mono">{p.sku}</span></div>
                      </td>
                      <td className="px-6 py-4 font-black text-foreground">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {p.status === 'In Stock' ? (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            ) : p.status === 'Low Stock' ? (
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                            ) : (
                              <XCircle className="h-3.5 w-3.5 text-rose-500" />
                            )}
                            <span className="text-xs font-semibold text-foreground">{p.stock} units</span>
                          </div>
                          <Badge
                            variant={
                              p.status === 'In Stock'
                                ? 'success'
                                : p.status === 'Low Stock'
                                ? 'warning'
                                : 'destructive'
                            }
                          >
                            {p.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-foreground">
                        {p.sales} orders
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          <span>{p.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === p.id ? null : p.id)}
                          className="p-1 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <MoreVertical className="h-4.5 w-4.5" />
                        </button>

                        {/* Action Dropdown Popup */}
                        {activeMenuId === p.id && (
                          <div className="absolute right-6 top-12 w-40 bg-white dark:bg-zinc-900 border border-border/60 dark:border-border/15 rounded-xl shadow-xl z-50 py-1 text-left text-xs animate-in fade-in-50 slide-in-from-top-1">
                            <button
                              onClick={() => handleRestockProduct(p.id, 10)}
                              className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-muted text-foreground transition-colors"
                            >
                              <RotateCcw className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Restock (+10)</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="flex items-center gap-2 px-3.5 py-2 w-full hover:bg-rose-500/10 text-rose-500 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete Product</span>
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

          {/* ================= PAGINATION BAR ================= */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-border/40 dark:border-border/10 bg-muted/10 text-xs">
              <span className="text-muted-foreground">
                Showing <span className="font-bold text-foreground">{startIndex + 1}</span> to{' '}
                <span className="font-bold text-foreground">
                  {Math.min(startIndex + itemsPerPage, totalItems)}
                </span>{' '}
                of <span className="font-bold text-foreground">{totalItems}</span> products
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

      {/* ================= ADD PRODUCT MODAL DIALOG ================= */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>Create a new catalog item listing to your store database.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddProduct} className="space-y-4">
            
            {/* Product Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Product Name *</label>
              <input
                type="text"
                required
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="e.g. Ergonomic Leather Couch"
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              />
            </div>

            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Category *</label>
              <select
                value={newProductCategory}
                onChange={(e) => setNewProductCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Pricing & Stock Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Price */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  placeholder="249.99"
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                />
              </div>

              {/* Stock */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Initial Stock *</label>
                <input
                  type="number"
                  required
                  value={newProductStock}
                  onChange={(e) => setNewProductStock(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                />
              </div>
            </div>

            {/* SKU */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">SKU Number (Optional)</label>
              <input
                type="text"
                value={newProductSku}
                onChange={(e) => setNewProductSku(e.target.value)}
                placeholder="e.g. CO-CH-3419"
                className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="h-8">
                Cancel
              </Button>
              <Button type="submit" className="h-8">
                Save Product
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function ProductsSkeleton() {
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
