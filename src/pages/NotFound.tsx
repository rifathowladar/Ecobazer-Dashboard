import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center space-y-6">
      
      {/* 404 icon banner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="h-24 w-24 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-rose-500 shadow-md"
      >
        <ShieldAlert className="h-12 w-12 stroke-[1.5]" />
      </motion.div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
          Page Not Found (404)
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The administrative route directory you requested does not exist or has been shifted into encrypted records. Please audit the navigation.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button className="flex items-center gap-1.5 h-9">
            <Home className="h-4 w-4" />
            <span>Dashboard Home</span>
          </Button>
        </Link>
      </div>

    </div>
  );
}
