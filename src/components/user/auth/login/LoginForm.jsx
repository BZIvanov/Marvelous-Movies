import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import { useForm } from '@/providers/form/hooks/useForm';
import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import PasswordTextFieldAdapter from '@/providers/form/formFields/PasswordTextFieldAdapter';
import { EmailIcon } from '@/components/mui/Icons';
import { formConfig } from './loginForm.schema';

const LoginForm = ({ loginUser, isSubmitting }) => {
  const form = useForm(formConfig);

  const onSubmit = (values) => {
    loginUser(values);
  };

  return (
    <FormProvider onSubmit={onSubmit} methods={form}>
      <TextFieldAdapter name='email' label='Email' icon={<EmailIcon />} />

      <PasswordTextFieldAdapter name='password' label='Password' />

      <Button
        variant='contained'
        type='submit'
        disabled={isSubmitting}
        fullWidth={true}
        sx={{ marginTop: '20px' }}
      >
        Login
      </Button>
    </FormProvider>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default LoginForm;
