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
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <Button
          variant='outlined'
          color='secondary'
          type='button'
          onClick={resetForm}
          disabled={isLoading}
          sx={{
            width: '40%',
            backgroundColor: 'grey.100',
            color: 'secondary.main',
            '&:hover': {
              backgroundColor: 'grey.300',
              color: 'secondary.dark',
            },
          }}
        >
          Reset
        </Button>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          disabled={isLoading}
          sx={{
            width: '50%',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Update Password
        </Button>
      </Box>
    </FormProvider>
  );
};

PasswordUpdateForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  updatePassword: PropTypes.func,
};

export default PasswordUpdateForm;
