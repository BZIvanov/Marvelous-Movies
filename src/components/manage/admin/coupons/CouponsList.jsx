import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useConfirmDialog } from '@/contexts/useConfirmDialogContext';
import { DeleteIcon } from '@/components/mui/Icons';
import { dateFormatter } from '@/utils/formatting';

const CouponsList = ({ coupons = [], deleteCoupon, paginationComponent }) => {
  const { openDialog, closeDialog } = useConfirmDialog();

  const handleDeleteCoupon = (couponId) => () => {
    closeDialog();

    deleteCoupon(couponId);
  };

  return (
    <Box>
      <Typography variant='h5'>Coupons List</Typography>

      <Paper sx={{ margin: 1 }}>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Name</TableCell>
                <TableCell align='center'>Discount</TableCell>
                <TableCell align='center'>Expiration Date</TableCell>
                <TableCell align='center'>Created At</TableCell>
                <TableCell align='center'>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map(
                ({ _id, name, discount, expirationDate, createdAt }) => {
                  return (
                    <TableRow key={_id}>
                      <TableCell align='center'>{name}</TableCell>
                      <TableCell align='center'>
                        - {discount.toFixed(2)} %
                      </TableCell>
                      <TableCell align='center'>
                        {dateFormatter(expirationDate, {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell align='center'>
                        {dateFormatter(createdAt, {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton
                          size='small'
                          onClick={() => {
                            openDialog({
                              text: 'Are you sure you want to delete this coupon?',
                              onConfirm: handleDeleteCoupon(_id),
                            });
                          }}
                        >
                          <DeleteIcon fontSize='inherit' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {paginationComponent}
      </Paper>
    </Box>
  );
};

CouponsList.propTypes = {
  coupons: PropTypes.array,
  deleteCoupon: PropTypes.func,
  paginationComponent: PropTypes.node,
};

export default CouponsList;
