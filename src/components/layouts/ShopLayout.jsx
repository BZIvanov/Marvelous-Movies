import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import CartDrawer from '@/components/cart/CartDrawer';

const ShopLayout = () => {
  return (
    <Box>
      <Outlet />

      <CartDrawer />
    </Box>
  );
};

export default ShopLayout;
