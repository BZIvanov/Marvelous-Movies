import * as yup from 'yup';

import {
  usernameSchema,
  emailSchema,
  passwordSchema,
  confirmPasswordSchema,
  isSellerSchema,
} from '../auth-fields.schema';

const schema = yup
  .object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    isSeller: isSellerSchema,
  })
  .required();

const defaultValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  isSeller: false,
};

export const formConfig = { schema, defaultValues };
