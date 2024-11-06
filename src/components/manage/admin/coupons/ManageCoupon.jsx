import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useForm } from '@/providers/form/hooks/useForm';
import {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} from '@/providers/store/services/coupons';
import { formConfig } from './couponForm.schema';
import CouponForm from './CouponForm';
import CouponsList from './CouponsList';
import CouponsPagination from './CouponsPagination';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const ManageCoupon = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const { data } = useGetCouponsQuery({ page, perPage: rowsPerPage });
  const [createCoupon] = useCreateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const form = useForm(formConfig);

  const handleCreateCoupon = (values) => {
    createCoupon(values);
    form.reset();
  };

  const handleDeleteCoupon = (couponId) => {
    deleteCoupon(couponId);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Coupons</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <CouponForm form={form} createCoupon={handleCreateCoupon} />

      <Divider sx={{ marginBlock: 2 }} />

      <CouponsList
        coupons={data?.coupons}
        deleteCoupon={handleDeleteCoupon}
        paginationComponent={
          <CouponsPagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            totalCount={data?.totalCount}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        }
      />
    </Box>
  );
};

export default ManageCoupon;
