import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/providers/store/services/categories';
import { useDispatch } from '@/providers/store/store';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import FormProvider from '@/providers/form/FormProvider';
import { useForm } from '@/providers/form/hooks/useForm';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import ImagesFieldAdapter from '@/providers/form/formFields/ImagesFieldAdapter';
import { useConfirmDialog } from '@/contexts/useConfirmDialogContext';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import PreviewImageAvatar from '@/components/common/imagePreview/PreviewImageAvatar';
import { resizeImage } from '@/utils/resizeImage';
import { formConfig } from './manageCategoryForm.schema';

const ManageCategory = () => {
  const dispatch = useDispatch();

  const { openDialog, closeDialog } = useConfirmDialog();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [filterCategoryText, setFilterCategoryText] = useState('');

  const { data } = useGetCategoriesQuery();
  const categories = data?.categories || [];

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const isLoading = useIsApiRequestPending();

  const formMethods = useForm(formConfig);
  const { formState, reset, setValue, watch } = formMethods;

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

      reset();

      setSelectedCategory(null);
    }
  };

  const handleCategoryDelete = (categoryId) => () => {
    closeDialog();

    deleteCategory(categoryId);

    setSelectedCategory(null);
  };

  const selectedFormImage = watch('categoryImage');
  const removeImage = () => {
    setValue('categoryImage', []);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Categories</Typography>

      <Box>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
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
                setSelectedCategory(null);
                reset();
              }}
              disabled={formState.isSubmitting || isLoading}
            >
              Reset form
            </Button>
            <Button
              sx={{ marginLeft: '5px' }}
              variant='contained'
              type='submit'
              disabled={formState.isSubmitting || isLoading}
            >
              {selectedCategory ? 'Update category' : 'Create category'}
            </Button>
          </Box>
        </FormProvider>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label='Search for a category'
            variant='standard'
            value={filterCategoryText}
            onChange={(e) => setFilterCategoryText(e.target.value)}
          />
        </FormControl>
      </Box>

      <Paper sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
        {categories.length > 0 ? (
          categories
            .filter(({ name }) =>
              name.toLowerCase().includes(filterCategoryText.toLowerCase())
            )
            .map(({ _id, name, image }) => {
              return (
                <Chip
                  key={_id}
                  label={name}
                  avatar={
                    <Avatar alt='Category preview' src={image.imageUrl} />
                  }
                  sx={{ margin: '4px' }}
                  onClick={() => {
                    reset({
                      categoryName: name,
                      categoryImage: [image],
                    });
                    setSelectedCategory({ _id, name });
                  }}
                  onDelete={() =>
                    openDialog({
                      text: 'Are you sure you want to delete this category?',
                      onConfirm: handleCategoryDelete(_id),
                    })
                  }
                />
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No categories. Use the form above to create some.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ManageCategory;
