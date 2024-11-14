import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';

const ShopInfoForm = ({ form, resetForm, updateShopInfo }) => {
  const isLoading = useIsApiRequestPending();

  const handleUpdateShopInfoSubmit = (values) => {
    updateShopInfo(values);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormProvider onSubmit={handleUpdateShopInfoSubmit} methods={form}>
        <Box my={1}>
          <TextFieldAdapter name='shopName' label='Shop name' />
        </Box>

        <Box my={1}>
          <TextFieldAdapter name='country' label='Country' />
        </Box>

        <Box my={1}>
          <TextFieldAdapter name='city' label='City' />
        </Box>

        <CardActions sx={{ mt: 2 }}>
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={resetForm}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isLoading}
          >
            Update Shop Info
          </Button>
        </CardActions>
      </FormProvider>
    </Box>
  );
};

ShopInfoForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  updateShopInfo: PropTypes.func,
};

export default ShopInfoForm;
