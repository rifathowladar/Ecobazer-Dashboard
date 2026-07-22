import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Star,
  MessageSquare,
  CheckCircle,
  AlertOctagon,
  Trash2,
  CornerDownRight,
  Send,
  Search,
  Check,
  ShieldAlert
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { MOCK_REVIEWS, Review } from '@/data/mockData';

export function Reviews() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('admin-reviews');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Reply Modal Dialog State
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const saveReviews = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem('admin-reviews', JSON.stringify(updated));
  };

  // Submit reply
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReplyId || !replyText) return;

    const updated = reviews.map((rev) => {
      if (rev.id === activeReplyId) {
        return { ...rev, reply: replyText, status: 'Approved' as const };
      }
      return rev;
    });

    saveReviews(updated);
    setReplyText('');
    setActiveReplyId(null);
  };

  // Approve Review
  const handleApproveReview = (id: string) => {
    const updated = reviews.map((rev) => {
      if (rev.id === id) {
        return { ...rev, status: 'Approved' as const };
      }
      return rev;
    });
    saveReviews(updated);
  };

  // Mark as Spam
  const handleMarkSpam = (id: string) => {
    const updated = reviews.map((rev) => {
      if (rev.id === id) {
        return { ...rev, status: 'Spam' as const };
      }
      return rev;
    });
    saveReviews(updated);
  };

  // Delete Review
  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  const filteredReviews = reviews.filter((rev) => {
    const matchesSearch =
      rev.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || rev.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const replyTargetReview = reviews.find(r => r.id === activeReplyId);

  if (loading) {
    return <ReviewsSkeleton />;
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
          Product Reviews & Feedback
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Audit customer product ratings, approve listings feedback, mark spam, and send reply responses
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
              placeholder="Search by customer, comment, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border bg-muted/40 text-foreground border-border/60 focus:bg-white dark:focus:bg-zinc-800 transition-all outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/40 dark:border-border/15"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1.5 text-xs w-full md:w-auto">
            <span className="text-muted-foreground font-semibold">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-card border border-border/60 dark:border-border/10 rounded-lg px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-semibold"
            >
              <option value="All">All Reviews</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Spam">Spam</option>
            </select>
          </div>

        </CardContent>
      </Card>

      {/* ================= REVIEWS FEED ================= */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <div className="flex flex-col items-center justify-center space-y-2">
                <MessageSquare className="h-10 w-10 stroke-zinc-400" />
                <p className="font-semibold text-sm text-foreground">No reviews found</p>
                <p className="text-xs">Adjust your search or filter requirements</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((rev) => (
            <Card key={rev.id} className="relative overflow-hidden group">
              
              {/* Highlight bar for pending reviews */}
              {rev.status === 'Pending' && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500" />
              )}
              {rev.status === 'Spam' && (
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-rose-500" />
              )}

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  {/* Left: Review Info */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={rev.avatar} alt={rev.customerName} />
                      <AvatarFallback>{rev.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-xs md:text-sm text-foreground">{rev.customerName}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">{rev.date}</span>
                        <Badge
                          variant={
                            rev.status === 'Approved'
                              ? 'success'
                              : rev.status === 'Pending'
                              ? 'warning'
                              : 'destructive'
                          }
                        >
                          {rev.status}
                        </Badge>
                      </div>

                      {/* Product Name reference */}
                      <p className="text-[10px] text-primary font-bold">
                        Product: <span className="underline">{rev.productName}</span>
                      </p>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-0.5 pt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-zinc-300 dark:text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Comment */}
                      <p className="text-xs text-foreground font-medium pt-2 max-w-2xl leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1.5 self-end md:self-start shrink-0">
                    {rev.status !== 'Approved' && (
                      <Button
                        onClick={() => handleApproveReview(rev.id)}
                        variant="outline"
                        size="xs"
                        className="text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-700"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </Button>
                    )}
                    {rev.status !== 'Spam' && (
                      <Button
                        onClick={() => handleMarkSpam(rev.id)}
                        variant="outline"
                        size="xs"
                        className="text-amber-600 border-amber-500/20 hover:bg-amber-500/10 hover:text-amber-700"
                      >
                        <ShieldAlert className="h-3.5 w-3.5" />
                        <span>Flag Spam</span>
                      </Button>
                    )}
                    
                    <Button onClick={() => setActiveReplyId(rev.id)} variant="outline" size="xs">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{rev.reply ? 'Edit Reply' : 'Reply'}</span>
                    </Button>

                    <Button
                      onClick={() => handleDeleteReview(rev.id)}
                      variant="destructive"
                      size="xs"
                      className="p-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                </div>

                {/* Render Admin Reply block if exists */}
                {rev.reply && (
                  <div className="mt-4 p-4 rounded-lg bg-muted/40 border border-border/40 dark:border-border/10 flex items-start gap-3">
                    <CornerDownRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-foreground">Admin Response</span>
                        <span className="inline-flex items-center bg-primary/10 text-primary text-[9px] font-black px-1.5 py-0.5 rounded-sm">
                          OFFICIAL
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground italic">"{rev.reply}"</p>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* ================= REPLY MODAL DIALOG ================= */}
      {activeReplyId && replyTargetReview && (
        <Dialog open={!!activeReplyId} onOpenChange={() => setActiveReplyId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Reply to Feedback</DialogTitle>
              <DialogDescription>
                Responding to <span className="font-bold text-foreground">{replyTargetReview.customerName}</span>'s review.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddReply} className="space-y-4">
              <div className="p-3 bg-muted/35 rounded-lg text-xs italic text-muted-foreground mb-2">
                "{replyTargetReview.comment}"
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Your Response Message *</label>
                <textarea
                  required
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Thank you for sharing your feedback! We are thrilled..."
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-card border-border/60 text-foreground outline-hidden focus:border-primary resize-none"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setActiveReplyId(null)} className="h-8">
                  Cancel
                </Button>
                <Button type="submit" className="h-8 flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Response</span>
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
function ReviewsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48" />
      <div className="h-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-44 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
        ))}
      </div>
    </div>
  );
}
