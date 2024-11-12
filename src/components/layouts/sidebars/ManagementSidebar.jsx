import MenuList from '@mui/material/MenuList';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import {
  AutoAwesomeMosaicIcon,
  CategoryIcon,
  DashboardIcon,
  DiscountIcon,
  GradientIcon,
  ListAltIcon,
  PasswordIcon,
  PhoneAndroidIcon,
} from '@/components/mui/Icons';
import ManagementSidebarLink from './ManagementSidebarLink';

const adminLinks = [
  {
    toLink: 'orders',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Manage Orders',
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
    toLink: 'coupon',
    icon: <DiscountIcon fontSize='small' />,
    linkText: 'Manage Coupons',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Update Profile',
  },
];

const sellerLinks = [
  {
    toLink: 'orders',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'wishlist',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Wishlist',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Update Profile',
  },
];

const buyerLinks = [
  {
    toLink: 'orders',
    icon: <DashboardIcon fontSize='small' />,
    linkText: 'Orders',
  },
  {
    toLink: 'wishlist',
    icon: <ListAltIcon fontSize='small' />,
    linkText: 'Wishlist',
  },
  {
    toLink: 'profile',
    icon: <PasswordIcon fontSize='small' />,
    linkText: 'Update Profile',
  },
];

const roleLinks = {
  admin: adminLinks,
  seller: sellerLinks,
  buyer: buyerLinks,
};

const ManagementSidebar = () => {
  const user = useSelector(selectUser);
  const userRole = user?.role || 'buyer';

  const links = roleLinks[userRole];

  return (
    <MenuList sx={{ width: 240, maxWidth: '100%', marginRight: 1 }}>
      {links.map((link) => {
        return <ManagementSidebarLink key={link.toLink} {...link} />;
      })}
    </MenuList>
  );
};

export default ManagementSidebar;
