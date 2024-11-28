import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useResetPasswordMutation } from '@/providers/store/services/users';
import FormProvider from '@/providers/form/FormProvider';
import { useForm } from '@/providers/form/hooks/useForm';
import PasswordTextFieldAdapter from '@/providers/form/formFields/PasswordTextFieldAdapter';
import { formConfig } from './passwordResetForm.schema';

const PasswordResetForm = () => {
  const navigate = useNavigate();

  const { token } = useParams();

  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  const handleFormSubmit = (values) => {
    resetPassword({ password: values.password, token });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login');
    }
  }, [isSuccess, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h5'>Password Reset Form</Typography>

      <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
        <FormProvider onSubmit={handleFormSubmit} methods={formMethods}>
          <PasswordTextFieldAdapter name='password' label='New Password' />

          <PasswordTextFieldAdapter
            name='confirmPassword'
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
              onClick={() => reset()}
              disabled={formState.isSubmitting || isLoading}
            >
              Reset Form
            </Button>
            <Button
              variant='contained'
              type='submit'
              disabled={formState.isSubmitting || isLoading}
            >
              Reset Password
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default PasswordResetForm;
