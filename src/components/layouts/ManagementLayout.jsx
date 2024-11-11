import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import ManagementSidebar from './sidebars/ManagementSidebar';

const ManagementLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <ManagementSidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default ManagementLayout;
