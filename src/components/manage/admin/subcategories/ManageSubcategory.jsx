import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useGetCategoriesQuery } from '@/providers/store/services/categories';
import { useGetGroupedSubcategoriesQuery } from '@/providers/store/services/subcategories';
import { useForm } from '@/providers/form/hooks/useForm';
import SubcategoryForm from './SubcategoryForm';
import SubcategoriesList from './SubcategoriesList';
import { formConfig } from './subcategoryForm.schema';

const ManageSubcategory = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const handleSelectSubcategory = (selectedValue) => {
    setSelectedSubcategory(selectedValue);
  };

  const { data: categoriesData } = useGetCategoriesQuery();

  const { data: groupedSubcategoriesData } = useGetGroupedSubcategoriesQuery();

  const form = useForm(formConfig);

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Subcategories</Typography>

      <SubcategoryForm
        form={form}
        categories={categoriesData?.categories}
        selectedSubcategory={selectedSubcategory}
        handleSelectSubcategory={handleSelectSubcategory}
      />

      <Divider style={{ margin: '20px 0' }} />

      <SubcategoriesList
        form={form}
        groupedSubcategories={groupedSubcategoriesData?.subcategories}
        handleSelectSubcategory={handleSelectSubcategory}
      />
    </Box>
  );
};

export default ManageSubcategory;
