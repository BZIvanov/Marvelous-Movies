import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useGetCategoriesQuery } from '@/providers/store/services/categories';
import { useForm } from '@/providers/form/hooks/useForm';
import CategoryForm from './CategoryForm';
import CategoriesList from './CategoriesList';
import { formConfig } from './categoryForm.schema';

const ManageCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleSelectCategory = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  const { data } = useGetCategoriesQuery();

  const form = useForm(formConfig);

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Categories</Typography>

      <CategoryForm
        form={form}
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
      />

      <Divider style={{ margin: '20px 0' }} />

      <CategoriesList
        form={form}
        categories={data?.categories}
        handleSelectCategory={handleSelectCategory}
      />
    </Box>
  );
};

export default ManageCategory;
