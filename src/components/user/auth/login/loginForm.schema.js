import * as yup from 'yup';

import { emailSchema, passwordSchema } from '../auth-fields.schema';

const schema = yup
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
};

export const formConfig = { schema, defaultValues };
