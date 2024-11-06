import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import ImagesFieldAdapter from '@/providers/form/formFields/ImagesFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import PreviewImageAvatar from '@/components/common/imagePreview/PreviewImageAvatar';
import { resizeImage } from '@/utils/resizeImage';

const CategoryForm = ({ form, resetForm, createCategory, buttonLabel }) => {
  const selectedFormImage = form.watch('categoryImage');

  const removeImage = () => {
    form.setValue('categoryImage', []);
  };

  const isLoading = useIsApiRequestPending();

  const handleCategorySubmit = async (values) => {
    const formData = new FormData();
    formData.append('categoryName', values.categoryName);

    if (values.categoryImage[0] instanceof File) {
      const resizedImage = await resizeImage(values.categoryImage[0], {
        maxWidth: 300,
        maxHeight: 300,
        compressFormat: 'png',
        outputType: 'file',
      });

      formData.append('categoryImage', resizedImage);
    }

    createCategory(formData);
  };

  return (
    <Box>
      <FormProvider onSubmit={handleCategorySubmit} methods={form}>
        <Box my={1}>
          <TextFieldAdapter name='categoryName' label='Category Name' />

          <ImagesFieldAdapter name='categoryImage' maxFiles={1} />

          <Stack sx={{ marginTop: 3 }} spacing={2} direction='row'>
            {selectedFormImage.map((formImage) => {
              return (
                <PreviewImageAvatar
                  // for exisiting images we will have publicId, for newly uploaded files, we will use the path
                  key={formImage.publicId || formImage.path}
                  image={formImage}
                  removeImage={removeImage}
                />
              );
            })}
          </Stack>
        </Box>

        <Box mt={2} ml={1}>
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={resetForm}
            disabled={form.formState.isSubmitting || isLoading}
          >
            Reset form
          </Button>
          <Button
            sx={{ marginLeft: '5px' }}
            variant='contained'
            type='submit'
            disabled={form.formState.isSubmitting || isLoading}
          >
            {buttonLabel}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

CategoryForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  createCategory: PropTypes.func,
  buttonLabel: PropTypes.string,
};

export default CategoryForm;
