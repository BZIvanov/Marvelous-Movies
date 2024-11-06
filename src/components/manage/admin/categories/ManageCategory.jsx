import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useDispatch } from '@/providers/store/store';
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '@/providers/store/services/categories';
import { useForm } from '@/providers/form/hooks/useForm';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import CategoryForm from './CategoryForm';
import CategoriesList from './CategoriesList';
import { formConfig } from './categoryForm.schema';

const ManageCategory = () => {
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelectCategory = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  const { data } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const form = useForm(formConfig);

  const resetForm = () => {
    setSelectedCategory(null);
    form.reset(formConfig.defaultValues);
  };

  useEffect(() => {
    if (selectedCategory) {
      form.reset({
        categoryName: selectedCategory.name,
        categoryImage: [selectedCategory.image],
      });
    }
  }, [form, selectedCategory]);

  const handleCreateCategory = async (formData) => {
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

      resetForm();
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
    resetForm();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Categories</Typography>

      <CategoryForm
        form={form}
        resetForm={resetForm}
        createCategory={handleCreateCategory}
        buttonLabel={selectedCategory ? 'Update category' : 'Create category'}
      />

      <Divider style={{ margin: '20px 0' }} />

      <CategoriesList
        categories={data?.categories}
        selectCategory={handleSelectCategory}
        deleteCategory={handleDeleteCategory}
      />
    </Box>
  );
};

export default ManageCategory;
