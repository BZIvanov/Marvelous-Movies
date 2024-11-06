import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import { useConfirmDialog } from '@/contexts/useConfirmDialogContext';
import CategorySearch from './CategorySearch';

const CategoriesList = ({
  categories = [],
  selectCategory,
  deleteCategory,
}) => {
  const [filterCategoryText, setFilterCategoryText] = useState('');
  const handleFilterCategoryText = (filterValue) => {
    setFilterCategoryText(filterValue);
  };

  const { openDialog, closeDialog } = useConfirmDialog();

  const handleCategoryDelete = (categoryId) => () => {
    closeDialog();

    deleteCategory(categoryId);
  };

  return (
    <Box>
      <Typography variant='h5'>Categories List</Typography>

      <CategorySearch
        filterCategoryText={filterCategoryText}
        handleFilterCategoryText={handleFilterCategoryText}
      />

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
                    selectCategory({ _id, name, image });
                  }}
                  onDelete={() => {
                    openDialog({
                      text: 'Are you sure you want to delete this category?',
                      onConfirm: handleCategoryDelete(_id),
                    });
                  }}
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

CategoriesList.propTypes = {
  categories: PropTypes.array,
  selectCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
};

export default CategoriesList;
