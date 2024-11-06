import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '@/providers/store/services/categories';
import { useDispatch } from '@/providers/store/store';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import ImagesFieldAdapter from '@/providers/form/formFields/ImagesFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import PreviewImageAvatar from '@/components/common/imagePreview/PreviewImageAvatar';
import { resizeImage } from '@/utils/resizeImage';
import { formConfig } from './categoryForm.schema';

const CategoryForm = ({ form, selectedCategory, handleSelectCategory }) => {
  const dispatch = useDispatch();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        categoryName: selectedCategory.name,
        categoryImage: [selectedCategory.image],
      });
    }
  }, [form, selectedCategory]);

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

    let result;
    if (selectedCategory) {
      result = await updateCategory({
        id: selectedCategory._id,
        formData,
      });
    } else {
      result = await createCategory(formData);
    }

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Category ${
            selectedCategory ? 'updated' : 'created'
          } successfully`,
        })
      );

      handleSelectCategory(null);

      form.reset(formConfig.defaultValues);
    }
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
                  handleRemoveImage={removeImage}
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
            onClick={() => {
              handleSelectCategory(null);
              form.reset(formConfig.defaultValues);
            }}
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
            {selectedCategory ? 'Update category' : 'Create category'}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

CategoryForm.propTypes = {
  form: PropTypes.object,
  selectedCategory: PropTypes.object,
  handleSelectCategory: PropTypes.func,
};

export default CategoryForm;
