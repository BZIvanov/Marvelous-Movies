import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

import { useGetSellerOrdersQuery } from '@/providers/store/services/orders';
import SellerOrderTableRow from './SellerOrderTableRow';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const SellerOrdersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[1]);

  const { data } = useGetSellerOrdersQuery({
    page,
    perPage: rowsPerPage,
  });
  const { orders = [], totalCount = 0 } = data || {};

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Orders</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <Paper sx={{ margin: 1 }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell align='center'>Order ID</TableCell>
                  <TableCell align='center'>Created At</TableCell>
                  <TableCell align='center'>Total Price</TableCell>
                  <TableCell align='center'>Delivery Address</TableCell>
                  <TableCell align='center'>Coupon</TableCell>
                  <TableCell align='center'>Delivery Status</TableCell>
                  <TableCell align='center'>Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  // make every two rows with different color (1 and 2, then 5 and 6)
                  // should be every two, because of the additional expandable row
                  '& > tr:nth-of-type(4n-2), & > tr:nth-of-type(4n-3)': {
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align='center'>
                      <Typography variant='body2'>
                        <strong>No orders found</strong>
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}

                {orders.map((order) => {
                  return <SellerOrderTableRow key={order._id} order={order} />;
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component='div'
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default SellerOrdersList;
