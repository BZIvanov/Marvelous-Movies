import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import DatePickerFieldAdapter from '@/providers/form/formFields/DatePickerFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';

const CouponForm = ({ form, createCoupon }) => {
  const isApiLoading = useIsApiRequestPending();

  const handleSubmitCoupon = (values) => {
    createCoupon(values);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant='h5'>Coupon Form</Typography>

      <FormProvider onSubmit={handleSubmitCoupon} methods={form}>
        <Box my={1}>
          <TextFieldAdapter name='name' label='Coupon Name' />
        </Box>

        <Box my={1}>
          <TextFieldAdapter name='discount' label='Discount %' type='number' />
        </Box>

        <Box my={1}>
          <DatePickerFieldAdapter
            name='expirationDate'
            label='Expiration Date'
            disablePast={true}
          />
        </Box>

        <Button variant='contained' type='submit' disabled={isApiLoading}>
          Create Coupon
        </Button>
      </FormProvider>
    </Box>
  );
};

CouponForm.propTypes = {
  form: PropTypes.object,
  createCoupon: PropTypes.func,
};

export default CouponForm;
