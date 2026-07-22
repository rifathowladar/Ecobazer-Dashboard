// Mock data for Ecommerce Admin Dashboard

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  rating: number;
  sales: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  amount: number;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  dateJoined: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  totalProducts: number;
  status: 'Active' | 'Inactive';
  icon: string;
}

export interface Review {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  productName: string;
  status: 'Approved' | 'Pending' | 'Spam';
  reply?: string;
}

// ---------------- MOCK ARRAYS ----------------

export const MOCK_PRODUCTS: Product[] = [
  { id: 'PROD-001', name: 'Premium Wireless Headphones', sku: 'HD-WL-991', category: 'Electronics', price: 129.99, stock: 45, status: 'In Stock', rating: 4.8, sales: 340 },
  { id: 'PROD-002', name: 'Ergonomic Office Chair', sku: 'CH-ER-202', category: 'Furniture', price: 249.50, stock: 12, status: 'In Stock', rating: 4.5, sales: 180 },
  { id: 'PROD-003', name: 'Smart Fitness Watch Pro', sku: 'WT-SM-404', category: 'Electronics', price: 89.99, stock: 8, status: 'Low Stock', rating: 4.2, sales: 520 },
  { id: 'PROD-004', name: 'Stainless Steel Water Bottle', sku: 'BT-SS-703', category: 'Kitchenware', price: 24.99, stock: 120, status: 'In Stock', rating: 4.6, sales: 850 },
  { id: 'PROD-005', name: 'Leather Travel Duffle Bag', sku: 'BG-LT-108', category: 'Fashion', price: 159.00, stock: 0, status: 'Out of Stock', rating: 4.7, sales: 95 },
  { id: 'PROD-006', name: 'Mechanical Gaming Keyboard', sku: 'KB-ME-502', category: 'Electronics', price: 79.99, stock: 28, status: 'In Stock', rating: 4.4, sales: 290 },
  { id: 'PROD-007', name: 'Organic Green Tea Set', sku: 'TE-OR-884', category: 'Groceries', price: 19.99, stock: 150, status: 'In Stock', rating: 4.9, sales: 1200 },
  { id: 'PROD-008', name: 'Ultra HD Dash Camera', sku: 'CM-DH-606', category: 'Electronics', price: 119.00, stock: 5, status: 'Low Stock', rating: 4.1, sales: 150 },
  { id: 'PROD-009', name: 'Memory Foam Sleep Pillow', sku: 'PL-MF-303', category: 'Furniture', price: 45.00, stock: 85, status: 'In Stock', rating: 4.3, sales: 430 },
  { id: 'PROD-010', name: 'Nordic Style Ceramic Vase', sku: 'VS-CE-099', category: 'Home Decor', price: 34.50, stock: 0, status: 'Out of Stock', rating: 4.0, sales: 75 }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-8941', customerName: 'Marcus Aurelius', customerEmail: 'marcus@philosophy.com', date: '2026-07-18', status: 'Delivered', paymentStatus: 'Paid', amount: 379.49, items: 3 },
  { id: 'ORD-8942', customerName: 'Jane Ostin', customerEmail: 'jane.o@novels.net', date: '2026-07-18', status: 'Processing', paymentStatus: 'Paid', amount: 89.99, items: 1 },
  { id: 'ORD-8943', customerName: 'Alan Turing', customerEmail: 'alan@enigma.org', date: '2026-07-17', status: 'Shipped', paymentStatus: 'Paid', amount: 249.50, items: 1 },
  { id: 'ORD-8944', customerName: 'Marie Curie', customerEmail: 'marie.curie@rad.edu', date: '2026-07-17', status: 'Delivered', paymentStatus: 'Paid', amount: 154.98, items: 2 },
  { id: 'ORD-8945', customerName: 'Isaac Newton', customerEmail: 'isaac@gravity.co.uk', date: '2026-07-16', status: 'Cancelled', paymentStatus: 'Failed', amount: 129.99, items: 1 },
  { id: 'ORD-8946', customerName: 'Ada Lovelace', customerEmail: 'ada@computing.io', date: '2026-07-16', status: 'Delivered', paymentStatus: 'Paid', amount: 488.99, items: 4 },
  { id: 'ORD-8947', customerName: 'Nikola Tesla', customerEmail: 'nikola@alternating.net', date: '2026-07-15', status: 'Processing', paymentStatus: 'Pending', amount: 79.99, items: 1 },
  { id: 'ORD-8948', customerName: 'Albert Einstein', customerEmail: 'albert@relativity.org', date: '2026-07-15', status: 'Delivered', paymentStatus: 'Paid', amount: 24.99, items: 1 },
  { id: 'ORD-8949', customerName: 'Charles Darwin', customerEmail: 'charles@evolution.org', date: '2026-07-14', status: 'Shipped', paymentStatus: 'Paid', amount: 179.99, items: 2 },
  { id: 'ORD-8950', customerName: 'Leonardo da Vinci', customerEmail: 'leo@renaissance.it', date: '2026-07-14', status: 'Delivered', paymentStatus: 'Paid', amount: 1120.00, items: 5 }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'CUST-001', name: 'Marcus Aurelius', email: 'marcus@philosophy.com', phone: '+1 (555) 019-2831', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop', ordersCount: 14, totalSpent: 2150.50, status: 'Active', dateJoined: '2025-01-12' },
  { id: 'CUST-002', name: 'Jane Ostin', email: 'jane.o@novels.net', phone: '+1 (555) 014-9988', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop', ordersCount: 3, totalSpent: 289.97, status: 'Active', dateJoined: '2026-03-04' },
  { id: 'CUST-003', name: 'Alan Turing', email: 'alan@enigma.org', phone: '+1 (555) 012-3456', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop', ordersCount: 9, totalSpent: 1420.00, status: 'Active', dateJoined: '2025-06-20' },
  { id: 'CUST-004', name: 'Marie Curie', email: 'marie.curie@rad.edu', phone: '+1 (555) 017-8822', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop', ordersCount: 5, totalSpent: 890.50, status: 'Active', dateJoined: '2025-09-15' },
  { id: 'CUST-005', name: 'Isaac Newton', email: 'isaac@gravity.co.uk', phone: '+1 (555) 011-2233', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop', ordersCount: 1, totalSpent: 129.99, status: 'Inactive', dateJoined: '2026-02-10' },
  { id: 'CUST-006', name: 'Ada Lovelace', email: 'ada@computing.io', phone: '+1 (555) 016-5544', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop', ordersCount: 18, totalSpent: 4320.00, status: 'Active', dateJoined: '2024-11-01' },
  { id: 'CUST-007', name: 'Nikola Tesla', email: 'nikola@alternating.net', phone: '+1 (555) 013-9090', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&fit=crop', ordersCount: 2, totalSpent: 159.98, status: 'Active', dateJoined: '2026-05-18' }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'CAT-1', name: 'Electronics', slug: 'electronics', totalProducts: 120, status: 'Active', icon: 'Laptop' },
  { id: 'CAT-2', name: 'Fashion', slug: 'fashion', totalProducts: 340, status: 'Active', icon: 'Shirt' },
  { id: 'CAT-3', name: 'Home Decor', slug: 'home-decor', totalProducts: 95, status: 'Active', icon: 'Home' },
  { id: 'CAT-4', name: 'Furniture', slug: 'furniture', totalProducts: 45, status: 'Active', icon: 'Armchair' },
  { id: 'CAT-5', name: 'Kitchenware', slug: 'kitchenware', totalProducts: 85, status: 'Active', icon: 'Utensils' },
  { id: 'CAT-6', name: 'Groceries', slug: 'groceries', totalProducts: 210, status: 'Active', icon: 'Apple' },
  { id: 'CAT-7', name: 'Sports & Outdoors', slug: 'sports-outdoors', totalProducts: 65, status: 'Inactive', icon: 'Activity' }
];

export const MOCK_REVIEWS: Review[] = [
  { id: 'REV-001', customerName: 'George Washington', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop', rating: 5, comment: 'This Premium Wireless Headphone exceeded all my expectations. Noise cancelling is incredibly good, and the sound is extremely crisp and rich.', date: '2026-07-18', productName: 'Premium Wireless Headphones', status: 'Approved', reply: 'Thank you for your fantastic feedback, George! Glad you are loving the sound quality!' },
  { id: 'REV-002', customerName: 'Thomas Jefferson', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&fit=crop', rating: 4, comment: 'The Ergonomic Office Chair is highly adjustable and extremely comfortable for long working hours. The assembly took about 30 minutes, which is fine.', date: '2026-07-17', productName: 'Ergonomic Office Chair', status: 'Approved' },
  { id: 'REV-003', customerName: 'John Adams', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop', rating: 2, comment: 'The Smart Fitness Watch frequently disconnects from my phone. The heart rate sensor is nice, but the software syncing is quite buggy.', date: '2026-07-16', productName: 'Smart Fitness Watch Pro', status: 'Pending' },
  { id: 'REV-004', customerName: 'Benjamin Franklin', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop', rating: 5, comment: 'The Stainless Steel Water Bottle keeps my water ice cold even after a hot day outside! Built like a tank. Highly recommend this brand.', date: '2026-07-15', productName: 'Stainless Steel Water Bottle', status: 'Approved', reply: 'Awesome, Benjamin! We are thrilled to hear it is keeping your drinks super cool!' },
  { id: 'REV-005', customerName: 'Alexander Hamilton', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop', rating: 1, comment: 'Buy Bitcoin! This product is completely fake and broke on the first use. Customer support did not reply to my three emails.', date: '2026-07-14', productName: 'Nordic Style Ceramic Vase', status: 'Spam' }
];

// ---------------- CHART DATA ----------------

export const MOCK_REVENUE_HISTORY = [
  { name: 'Jan', revenue: 14200, orders: 180, visitors: 3200 },
  { name: 'Feb', revenue: 19500, orders: 230, visitors: 4500 },
  { name: 'Mar', revenue: 23000, orders: 290, visitors: 5100 },
  { name: 'Apr', revenue: 18000, orders: 210, visitors: 4200 },
  { name: 'May', revenue: 29000, orders: 360, visitors: 6200 },
  { name: 'Jun', revenue: 35000, orders: 420, visitors: 7800 },
  { name: 'Jul', revenue: 42000, orders: 510, visitors: 9100 }
];

export const MOCK_DAILY_SALES = [
  { name: 'Mon', sales: 2400 },
  { name: 'Tue', sales: 1398 },
  { name: 'Wed', sales: 9800 },
  { name: 'Thu', sales: 3908 },
  { name: 'Fri', sales: 4800 },
  { name: 'Sat', sales: 3800 },
  { name: 'Sun', sales: 4300 }
];

export const MOCK_CATEGORY_SHARE = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 25 },
  { name: 'Home Decor', value: 12 },
  { name: 'Furniture', value: 10 },
  { name: 'Groceries', value: 8 }
];

export const MOCK_TRAFFIC_SOURCES = [
  { source: 'Direct', value: 4200, percentage: 42, color: '#00B207' },
  { source: 'Search Engine', value: 3100, percentage: 31, color: '#3b82f6' },
  { source: 'Social Media', value: 1800, percentage: 18, color: '#f59e0b' },
  { source: 'Referrals', value: 900, percentage: 9, color: '#ec4899' }
];

export const MOCK_RECENT_ACTIVITIES = [
  { id: 'ACT-1', user: 'Ada Lovelace', action: 'placed an order', item: 'ORD-8946', time: '10 mins ago', type: 'order' },
  { id: 'ACT-2', user: 'George Washington', action: 'left a 5-star review on', item: 'Wireless Headphones', time: '1 hour ago', type: 'review' },
  { id: 'ACT-3', user: 'Admin (You)', action: 'updated the price of', item: 'Smart Fitness Watch Pro', time: '2 hours ago', type: 'system' },
  { id: 'ACT-4', user: 'Jane Ostin', action: 'signed up as a customer', item: 'jane.o@novels.net', time: '4 hours ago', type: 'customer' },
  { id: 'ACT-5', user: 'System', action: 'restocked', item: 'Ergonomic Office Chair (+10)', time: '1 day ago', type: 'system' }
];
