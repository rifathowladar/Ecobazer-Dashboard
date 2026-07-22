import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Laptop,
  Shirt,
  Home,
  Armchair,
  Utensils,
  Apple,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  MoreVertical,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { MOCK_CATEGORIES, Category } from '@/data/mockData';

// Map icon names to Lucide icons
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Laptop: Laptop,
  Shirt: Shirt,
  Home: Home,
  Armchair: Armchair,
  Utensils: Utensils,
  Apple: Apple,
  Activity: Activity,
};

export function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('admin-categories');
    return saved ? JSON.parse(saved) : MOCK_CATEGORIES;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Laptop');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const saveCategories = (updated: Category[]) => {
    setCategories(updated);
    localStorage.setItem('admin-categories', JSON.stringify(updated));
  };

  // Toggle category status
  const handleToggleStatus = (id: string) => {
    const updated = categories.map((cat) => {
      if (cat.id === id) {
        return { ...cat, status: cat.status === 'Active' ? 'Inactive' : 'Active' as const };
      }
      return cat;
    });
    saveCategories(updated);
  };

  // Add category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat: Category = {
      id: `CAT-${categories.length + 1}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      totalProducts: 0,
      status: 'Active',
      icon: newCatIcon
    };

    const updated = [...categories, newCat];
    saveCategories(updated);

    setNewCatName('');
    setNewCatIcon('Laptop');
    setDialogOpen(false);
  };

  if (loading) {
    return <CategoriesSkeleton />;
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
            Product Categories
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Organize catalog listings, total item statistics, and inventory routing channels
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-1.5 h-9">
          <Plus className="h-4 w-4" />
          <span>New Category</span>
        </Button>
      </div>

      {/* ================= CATEGORIES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Layers;
          return (
            <Card key={cat.id} className="group relative overflow-hidden flex flex-col justify-between h-52">
              
              {/* Background gradient blur decoration */}
              <div className="absolute right-0 bottom-0 h-24 w-24 bg-primary/5 blur-xl rounded-full group-hover:bg-primary/10 transition-all duration-300 translate-x-4 translate-y-4" />
              
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110">
                  <IconComponent className="h-6 w-6 stroke-2" />
                </div>
                
                <button
                  onClick={() => handleToggleStatus(cat.id)}
                  className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                  title="Toggle status"
                >
                  {cat.status === 'Active' ? (
                    <ToggleRight className="h-6 w-6 text-primary" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-zinc-400" />
                  )}
                </button>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-end space-y-1 mt-4">
                <Badge variant={cat.status === 'Active' ? 'success' : 'destructive'} className="w-fit">
                  {cat.status}
                </Badge>
                
                <h3 className="font-bold text-base text-foreground mt-2">{cat.name}</h3>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1.5 border-t border-border/30 dark:border-border/10">
                  <span>{cat.totalProducts} active products</span>
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>

            </Card>
          );
        })}
      </div>

      {/* ================= ADD CATEGORY MODAL ================= */}
      {dialogOpen && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>Define a new segment for categorizing and listing products.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddCategory} className="space-y-4">
              
              {/* Category Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Category Name *</label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Sports & Recreation"
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                />
              </div>

              {/* Icon Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Visual Icon *</label>
                <select
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary"
                >
                  <option value="Laptop">Laptop (Electronics)</option>
                  <option value="Shirt">Shirt (Fashion)</option>
                  <option value="Home">Home (Decor)</option>
                  <option value="Armchair">Armchair (Furniture)</option>
                  <option value="Utensils">Utensils (Kitchen)</option>
                  <option value="Apple">Apple (Groceries)</option>
                  <option value="Activity">Activity (Sports)</option>
                </select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} className="h-8">
                  Cancel
                </Button>
                <Button type="submit" className="h-8">
                  Create Category
                </Button>
              </DialogFooter>

            </form>
          </DialogContent>
        </Dialog>
      )}

    </motion.div>
  );
}

// ================= LOADING SKELETON SUB-COMPONENT =================
function CategoriesSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-52 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
