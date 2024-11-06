import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useDispatch } from '@/providers/store/store';
import { useGetCategoriesQuery } from '@/providers/store/services/categories';
import {
  useGetGroupedSubcategoriesQuery,
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
  useDeleteSubcategoryMutation,
} from '@/providers/store/services/subcategories';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import SubcategoryForm from './SubcategoryForm';
import SubcategoriesList from './SubcategoriesList';
import { formConfig } from './subcategoryForm.schema';

const ManageSubcategory = () => {
  const dispatch = useDispatch();

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const handleSelectSubcategory = (selectedValue) => {
    setSelectedSubcategory(selectedValue);
  };

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: groupedSubcategoriesData } = useGetGroupedSubcategoriesQuery();
  const [createSubcategory] = useCreateSubcategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubcategoryMutation();

  const form = useForm(formConfig);

  const resetForm = () => {
    setSelectedSubcategory(null);
    form.reset(formConfig.defaultValues);
  };

  useEffect(() => {
    if (selectedSubcategory) {
      form.reset({
        categoryId: selectedSubcategory.categoryId,
        subcategoryName: selectedSubcategory.name,
      });
    }
  }, [form, selectedSubcategory]);

  const handleCreateSubcategory = async (values) => {
    let result;
    if (selectedSubcategory) {
      result = await updateSubcategory({
        id: selectedSubcategory._id,
        name: values.subcategoryName,
        categoryId: values.categoryId,
      });
    } else {
      result = await createSubcategory({
        name: values.subcategoryName,
        categoryId: values.categoryId,
      });
    }

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Subcategory ${
            selectedSubcategory ? 'updated' : 'created'
          } successfully`,
        })
      );

      resetForm();
    }
  };

  const handleDeleteSubcategory = (subcategoryId) => {
    deleteSubcategory(subcategoryId);
    resetForm();
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Subcategories</Typography>

      <SubcategoryForm
        form={form}
        categories={categoriesData?.categories}
        resetForm={resetForm}
        createSubcategory={handleCreateSubcategory}
        buttonLabel={
          selectedSubcategory ? 'Update subcategory' : 'Create subcategory'
        }
      />

      <Divider style={{ margin: '20px 0' }} />

      <SubcategoriesList
        groupedSubcategories={groupedSubcategoriesData?.subcategories}
        handleSelectSubcategory={handleSelectSubcategory}
        deleteSubcategory={handleDeleteSubcategory}
      />
    </Box>
  );
};

export default ManageSubcategory;
