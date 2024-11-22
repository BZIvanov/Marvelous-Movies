import PropTypes from 'prop-types';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { format, parseISO } from 'date-fns';
import { PDFDownloadLink } from '@react-pdf/renderer';

import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  DownloadIcon,
  DownloadingIcon,
} from '@/components/mui/Icons';
import { currencyFormatter } from '@/utils/formatting';
import PdfCell from './PdfCell';

const BuyerOrderTableRow = ({ order, isAdminCell }) => {
  const [isRowExpanded, setIsRowExpanded] = useState(false);

  const {
    _id,
    createdAt,
    buyer: { username },
    totalPrice,
    deliveryAddress,
    deliveryStatus,
    coupon,
    products,
  } = order;
  const { name: couponName } = coupon || {};

  return (
    <>
      <TableRow>
        <TableCell align='center'>
          <IconButton
            size='small'
            onClick={() => setIsRowExpanded((prevValue) => !prevValue)}
          >
            {isRowExpanded ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell align='center'>{_id}</TableCell>
        <TableCell align='center'>
          {format(parseISO(createdAt), 'dd-MMM-yyyy')}
        </TableCell>
        {isAdminCell && <TableCell align='center'>{username}</TableCell>}
        <TableCell align='center'>{currencyFormatter(totalPrice)}</TableCell>
        <TableCell align='center'>{deliveryAddress}</TableCell>
        <TableCell align='center'>{couponName || '-'}</TableCell>
        <TableCell align='center'>{deliveryStatus}</TableCell>
        <TableCell align='center'>
          <PDFDownloadLink
            document={<PdfCell order={order} />}
            fileName='Orders.pdf'
          >
            {({ loading }) => {
              return (
                <IconButton disabled={loading}>
                  {loading ? <DownloadingIcon /> : <DownloadIcon />}
                </IconButton>
              );
            }}
          </PDFDownloadLink>
        </TableCell>
      </TableRow>

      <TableRow sx={{ '& > *': { borderBottom: 'unset', borderTop: 'unset' } }}>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={isAdminCell ? 9 : 8}
        >
          <Collapse in={isRowExpanded} timeout='auto' unmountOnExit={true}>
            <Box sx={{ margin: 1 }}>
              <Typography variant='body1' gutterBottom={true}>
                Products
              </Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Product Name</TableCell>
                    <TableCell align='center'>Price</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='center'>Total Price</TableCell>
                    <TableCell align='center'>Shop</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    // remove the broders from the last row
                    '& > tr:last-child td': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  {products.map((orderProduct) => {
                    const { product, count, shop } = orderProduct;

                    if (!product) {
                      return (
                        <TableRow key={orderProduct._id}>
                          <TableCell colSpan={4} align='center'>
                            <em>No longer available product</em>
                          </TableCell>
                        </TableRow>
                      );
                    }

                    return (
                      <TableRow key={product._id}>
                        <TableCell align='center'>{product.title}</TableCell>
                        <TableCell align='center'>
                          {currencyFormatter(product.price)}
                        </TableCell>
                        <TableCell align='center'>{count}</TableCell>
                        <TableCell align='center'>
                          {currencyFormatter(product.price * count)}
                        </TableCell>
                        <TableCell align='center'>
                          {shop.shopInfo.name}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

BuyerOrderTableRow.propTypes = {
  order: PropTypes.object,
  isAdminCell: PropTypes.bool,
};

export default BuyerOrderTableRow;
