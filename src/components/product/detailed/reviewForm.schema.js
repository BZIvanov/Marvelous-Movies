import * as yup from 'yup';

const schema = yup
  .object({
    rating: yup.number().min(0).max(5).required('Rating is required'),
    comment: yup.string().min(1).max(1000),
  })
  .required();

const defaultValues = { rating: 0, comment: '' };

export const formConfig = { schema, defaultValues };
