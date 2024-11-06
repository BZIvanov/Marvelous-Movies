import * as yup from 'yup';

const schema = yup
  .object({
    avatarImage: yup
      .array()
      .of(yup.mixed())
      .min(1, 'An image is required')
      .max(1, 'Only one image can be uploaded'),
  })
  .required();

const defaultValues = {
  avatarImage: [],
};

export const formConfig = { schema, defaultValues };
