import * as yup from 'yup';

const schema = yup
  .object({
    message: yup.string().min(1).max(200).required('Message is required'),
  })
  .required();

const defaultValues = { message: '' };

export const formConfig = { schema, defaultValues };
