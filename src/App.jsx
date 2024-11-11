import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import Header from '@/components/header/Header';
import { useGetCurrentUserQuery } from '@/providers/store/services/users';
import CartDrawer from '@/components/cart/CartDrawer';
import Notification from '@/components/common/feedback/Notification';
import ConfirmDialog from '@/components/common/dialogs/ConfirmDialog';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <Container maxWidth='xl'>
      <Header />

      <Outlet />

      <CartDrawer />

      <Notification />

      <ConfirmDialog />
    </Container>
  );
};

export default App;
