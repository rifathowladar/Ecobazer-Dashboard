import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  Users,
  Layers,
  Star,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  Search,
  Sun,
  Moon,
  ChevronDown,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MOCK_RECENT_ACTIVITIES } from '@/data/mockData';

export function Layout() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [msgDropdownOpen, setMsgDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for clicking outside dropdowns
  const notifRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setNotifDropdownOpen(false);
    setMsgDropdownOpen(false);
    setProfileDropdownOpen(false);
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  // Handle clicking outside of dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target as Node)) {
        setMsgDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: ShoppingBag },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Categories', path: '/categories', icon: Layers },
    { name: 'Reviews', path: '/reviews', icon: Star },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  // Derive page breadcrumbs
  const getBreadcrumbs = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length === 0) return [{ name: 'Home', path: '/' }, { name: 'Dashboard', path: '/dashboard' }];
    return [
      { name: 'Home', path: '/' },
      ...segments.map((seg, i) => ({
        name: seg.charAt(0).toUpperCase() + seg.slice(1),
        path: '/' + segments.slice(0, i + 1).join('/'),
      })),
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  // Handle Logout
  const handleLogout = () => {
    localStorage.setItem('admin-logged-in', 'false');
    navigate('/login');
  };

  // Mock Notification data
  const notifications = [
    { id: '1', title: 'New Order #1234', desc: 'Rahim Uddin bought Organic Vegetables for ৳850', time: '10m ago', unread: true },
    { id: '2', title: 'Low Stock Alert', desc: 'Fresh Mangoes have only 12 kg left', time: '2h ago', unread: true },
    { id: '3', title: 'New Review', desc: 'A customer left 5-star review for Premium Rice', time: '1d ago', unread: false },
  ];

  // Mock Message data
  const messages = [
    { id: '1', sender: 'Karim Ahmed', text: 'When will fresh dates be available?', time: '30m ago', unread: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop' },
    { id: '2', sender: 'Fatima Begum', text: 'Can you help me track my order #1230?', time: '1h ago', unread: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop' },
    { id: '3', sender: 'Salam Mia', text: 'The spices I ordered are great! Thank you!', time: '1d ago', unread: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop' },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans transition-colors duration-500">
      
      {/* ================= DESKTOP SIDEBAR ================= */}
      <motion.aside
        id="desktop-sidebar"
        className={cn(
          'hidden md:flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800/80 z-30 relative shrink-0',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
        animate={{ width: sidebarCollapsed ? 80 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-zinc-800/80">
          <Link to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
            <div className="h-8 w-8 bg-[#00B207] rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
              E
            </div>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100"
              >
                Ecobazar
              </motion.span>
            )}
          </Link>
          
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex items-center justify-center h-7 w-7 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-all duration-200"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y py-4 px-3 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-[#00B207] dark:text-[#00CC08] font-semibold'
                    : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 hover:text-slate-800 dark:hover:text-zinc-200'
                )}
              >
                <Icon className={cn('h-5 w-5 shrink-0 transition-colors', isActive ? 'text-[#00B207] dark:text-[#00CC08]' : 'text-slate-400 group-hover:text-[#00B207] dark:group-hover:text-[#00CC08]')} />
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
                
                {/* Tooltip on Collapsed */}
                {sidebarCollapsed && (
                  <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs px-2.5 py-1.5 rounded-md pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-zinc-800/80">
          <button
            onClick={handleLogout}
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all duration-200 group relative'
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
            
            {sidebarCollapsed && (
              <div className="absolute left-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-rose-600 text-white text-xs px-2.5 py-1.5 rounded-md pointer-events-none whitespace-nowrap shadow-lg z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ================= MOBILE DRAWER SIDEBAR ================= */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 h-full bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 flex flex-col z-50 shadow-2xl p-4"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-zinc-800">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-[#00B207] rounded-lg flex items-center justify-center text-white font-black text-lg">
                    E
                  </div>
                  <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
                    Ecobazar
                  </span>
                </Link>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 hover:bg-slate-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6 space-y-1.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                        isActive
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-[#00B207] dark:text-[#00CC08] font-semibold'
                          : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/40 hover:text-slate-800 dark:hover:text-zinc-200'
                      )}
                    >
                      <Icon className={cn('h-5 w-5 transition-colors', isActive ? 'text-[#00B207] dark:text-[#00CC08]' : 'text-slate-400')} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3.5 w-full px-3.5 py-3 rounded-lg text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* ================= FLOATING HEADER ================= */}
        <header className="h-16 px-8 flex items-center justify-between border-b border-slate-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 z-20 shrink-0 sticky top-0 transition-colors duration-500">
          
          {/* Menu Button & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-500 hover:bg-slate-50"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Page Title & Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-3">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <div key={crumb.path} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-slate-300 dark:text-zinc-700">/</span>}
                    {isLast ? (
                      <span className="text-base font-semibold text-slate-800 dark:text-slate-100">{crumb.name}</span>
                    ) : (
                      <Link to={crumb.path} className="text-sm text-slate-500 hover:text-[#00B207] dark:text-zinc-400 dark:hover:text-[#00CC08] transition-colors">
                        {crumb.name}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
{/* ============================================================ */}
{/* ============================================================ */}
          {/* Header Action Items */}
          <div className="flex items-center gap-4">
            
            {/* Search Box */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-zinc-800/80 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-[#00B207] dark:focus:ring-[#00CC08] outline-hidden text-slate-800 dark:text-zinc-100 transition-all"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full border border-slate-200 dark:border-zinc-800 transition-colors relative"
              title="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
              )}
            </button>

            {/* Notifications Button & Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setMsgDropdownOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full border border-slate-200 dark:border-zinc-800 transition-colors relative"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900" />
              </button>

              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-xl py-2 overflow-hidden z-50 text-sm"
                  >
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Notifications</span>
                      <span className="text-xs text-[#00B207] font-medium cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800">
                      {notifications.map((n) => (
                        <div key={n.id} className={cn('p-3 hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer', n.unread && 'bg-emerald-500/5')}>
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-xs text-slate-800 dark:text-zinc-200">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-2">{n.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-200 dark:border-zinc-800 text-center bg-slate-50 dark:bg-zinc-800/50">
                      <Link 
                        to="/notifications" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifDropdownOpen(false);
                        }} 
                        className="block w-full text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 font-medium cursor-pointer"
                      >
                        See all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Messages Button & Dropdown */}
            <div className="relative" ref={msgRef}>
              <button
                onClick={() => {
                  setMsgDropdownOpen(!msgDropdownOpen);
                  setNotifDropdownOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full border border-slate-200 dark:border-zinc-800 transition-colors relative"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900" />
              </button>

              <AnimatePresence>
                {msgDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-80 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-xl py-2 overflow-hidden z-50 text-sm"
                  >
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-100">Messages</span>
                      <span className="text-xs text-[#00B207] font-medium cursor-pointer hover:underline">Mark read</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-zinc-800">
                      {messages.map((m) => (
                        <div key={m.id} className={cn('p-3 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer', m.unread && 'bg-[#00B207]/5')}>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={m.avatar} alt={m.sender} />
                            <AvatarFallback>{m.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <span className="font-semibold text-xs text-slate-800 dark:text-zinc-200">{m.sender}</span>
                              <span className="text-[10px] text-slate-400">{m.time}</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 truncate">{m.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-slate-200 dark:border-zinc-800 text-center bg-slate-50 dark:bg-zinc-800/50">
                      <Link 
                        to="/messages" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setMsgDropdownOpen(false);
                        }} 
                        className="block w-full text-xs text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200 font-medium cursor-pointer"
                      >
                        See all messages
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separator */}
            <div className="h-5 w-px bg-slate-200 dark:bg-zinc-800 my-auto" />

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setNotifDropdownOpen(false);
                  setMsgDropdownOpen(false);
                }}
                className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-left transition-colors"
              >
                <div className="flex items-center gap-3 pl-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center font-bold text-[#00B207] dark:text-[#00CC08] text-xs">
                    RH
                  </div>
                  <div className="text-right hidden xl:block">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Rifat Howladar</p>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-400">Administrator</p>
                  </div>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2.5 w-56 bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800/80 shadow-xl py-1 overflow-hidden z-50 text-sm"
                  >
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-zinc-800">
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Rifat Howladar</p>
                      <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">rifat@ecobazar.com</p>
                    </div>
                    
                    <div className="p-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
                      >
                        <User className="h-3.5 w-3.5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-800 dark:hover:text-zinc-200 transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        <span>Settings</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-zinc-800 p-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs text-rose-500 hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* ================= MAIN SCROLL AREA ================= */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-zinc-950/40 p-8 space-y-6">
          
          {/* Quick Refresh indicator */}
          <div className="flex items-center justify-end pb-2">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Dev Preview Mode</span>
            </div>
          </div>

          {/* Render Route Page with Page Transitions */}
          <div className="relative">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
