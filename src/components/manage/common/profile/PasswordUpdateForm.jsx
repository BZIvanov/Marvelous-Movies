import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormProvider from '@/providers/form/FormProvider';
import PasswordTextFieldAdapter from '@/providers/form/formFields/PasswordTextFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';

const PasswordUpdateForm = ({ form, resetForm, updatePassword }) => {
  const isLoading = useIsApiRequestPending();

  const handleUpdatePasswordSubmit = (values) => {
    updatePassword(values);
  };

  return (
    <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
      <FormProvider onSubmit={handleUpdatePasswordSubmit} methods={form}>
        <PasswordTextFieldAdapter name='oldPassword' label='Old Password' />

        <PasswordTextFieldAdapter name='newPassword' label='New Password' />

        <PasswordTextFieldAdapter
          name='confirmNewPassword'
          label='Confirm New Password'
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '20px',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={resetForm}
            disabled={form.formState.isSubmitting || isLoading}
          >
            Reset Form
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={form.formState.isSubmitting || isLoading}
          >
            Update Password
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

PasswordUpdateForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  updatePassword: PropTypes.func,
};

export default PasswordUpdateForm;
