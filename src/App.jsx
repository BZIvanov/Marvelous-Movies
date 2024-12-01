import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';

import { useGetCurrentUserQuery } from '@/providers/store/services/users';
import Notification from '@/components/common/feedback/Notification';
import ConfirmDialog from '@/components/common/dialogs/ConfirmDialog';

const App = () => {
  // populate current user info in redux on page reload
  useGetCurrentUserQuery();

  return (
    <Container maxWidth='xl'>
      <Outlet />

      <Notification />

      <ConfirmDialog />
    </Container>
  );
};

export default App;
