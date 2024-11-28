import * as yup from 'yup';

const schema = yup
  .object({
    newPassword: yup.string().min(8).required('Password is required'),
    confirmNewPassword: yup
      .string()
      .min(8)
      .required('Confirm Password is required')
      .oneOf([yup.ref('password'), null], 'Passwords should match'),
  })
  .required();

const defaultValues = {
  password: '',
  confirmPassword: '',
};

export const formConfig = { schema, defaultValues };
