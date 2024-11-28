import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormProvider from '@/providers/form/FormProvider';
import { useForm } from '@/providers/form/hooks/useForm';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import PasswordTextFieldAdapter from '@/providers/form/formFields/PasswordTextFieldAdapter';
import CheckboxAdapter from '@/providers/form/formFields/CheckboxAdapter';
import { EmailIcon, FaceIcon } from '@/components/mui/Icons';
import { formConfig } from './registerForm.schema';

const RegisterForm = ({ registerUser, isSubmitting }) => {
  const form = useForm(formConfig);

  const onSubmit = (values) => {
    registerUser(values);
  };

  return (
    <FormProvider onSubmit={onSubmit} methods={form}>
      <TextFieldAdapter name='username' label='Username' icon={<FaceIcon />} />

      <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />

      <PasswordTextFieldAdapter name='password' label='Password' />

      <PasswordTextFieldAdapter
        name='confirmPassword'
        label='Confirm Password'
      />

      <CheckboxAdapter name='isSeller' label='Register as a seller?' />

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
          onClick={() => form.reset()}
          disabled={isSubmitting}
          sx={{
            width: '45%',
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
          color='primary'
          type='submit'
          disabled={isSubmitting}
          sx={{
            width: '45%',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Register
        </Button>
      </Box>
    </FormProvider>
  );
};

RegisterForm.propTypes = {
  registerUser: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default RegisterForm;
