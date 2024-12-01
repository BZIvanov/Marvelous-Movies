import {
  ArticleIcon,
  AutoAwesomeMosaicIcon,
  BusinessIcon,
  CategoryIcon,
  ChatIcon,
  DashboardIcon,
  DiscountIcon,
  GradientIcon,
  ListAltIcon,
  PasswordIcon,
  PhoneAndroidIcon,
} from '@/components/mui/Icons';

const adminLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'orders',
    icon: <ArticleIcon fontSize='small' />,
    linkText: 'Manage Orders',
  },
  {
    toLink: 'shops',
    icon: <BusinessIcon fontSize='small' />,
    linkText: 'Manage Shops',
  },
  {
    toLink: 'category',
    icon: <CategoryIcon fontSize='small' />,
    linkText: 'Manage Categories',
  },
  {
    toLink: 'subcategory',
    icon: <AutoAwesomeMosaicIcon fontSize='small' />,
    linkText: 'Manage Subcategories',
  },
  {
    toLink: 'coupon',
    icon: <DiscountIcon fontSize='small' />,
    linkText: 'Manage Coupons',
  },
  {
    toLink: 'chat',
    icon: <ChatIcon fontSize='small' />,
    linkText: 'Sellers Chat',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

const sellerLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'orders',
    icon: <ArticleIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'shop',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Shop',
  },
  {
    toLink: 'product',
    icon: <GradientIcon fontSize='small' />,
    linkText: 'Manage Product',
  },
  {
    toLink: 'products',
    icon: <PhoneAndroidIcon fontSize='small' />,
    linkText: 'Manage Products',
  },
  {
    toLink: 'chat-admin',
    icon: <ChatIcon fontSize='small' />,
    linkText: 'Admin Chat',
  },
  {
    toLink: 'chat',
    icon: <ChatIcon fontSize='small' />,
    linkText: 'Buyers Chat',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

const buyerLinks = [
  {
    toLink: 'dashboard',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Dashboard',
  },
  {
    toLink: 'orders',
    icon: <ArticleIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'wishlist',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Manage Wishlist',
  },
  {
    toLink: 'chat',
    icon: <ChatIcon fontSize='small' />,
    linkText: 'Sellers Chat',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Manage Profile',
  },
];

export const roleLinks = {
  admin: adminLinks,
  seller: sellerLinks,
  buyer: buyerLinks,
};
