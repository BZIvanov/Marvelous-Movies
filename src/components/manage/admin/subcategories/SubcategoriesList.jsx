import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import { useConfirmDialog } from '@/contexts/useConfirmDialogContext';
import SubcategorySearch from './SubcategorySearch';

const SubcategoriesList = ({
  groupedSubcategories = [],
  handleSelectSubcategory,
  deleteSubcategory,
}) => {
  const [filterCategoryText, setFilterCategoryText] = useState('');
  const handleFilterCategoryText = (filterValue) => {
    setFilterCategoryText(filterValue);
  };

  const [filterSubcategoryText, setFilterSubcategoryText] = useState('');
  const handleFilterSubcategoryText = (filterValue) => {
    setFilterSubcategoryText(filterValue);
  };

  const { openDialog, closeDialog } = useConfirmDialog();

  const handleSubcategoryDelete = (subcategoryId) => () => {
    closeDialog();

    deleteSubcategory(subcategoryId);
  };

  return (
    <Box>
      <Typography variant='h5'>Subcategories List</Typography>

      <SubcategorySearch
        filterCategoryText={filterCategoryText}
        handleFilterCategoryText={handleFilterCategoryText}
        filterSubcategoryText={filterSubcategoryText}
        handleFilterSubcategoryText={handleFilterSubcategoryText}
      />

      {groupedSubcategories.length > 0 ? (
        groupedSubcategories
          .filter(({ categoryName }) =>
            categoryName
              .toLowerCase()
              .includes(filterCategoryText.toLowerCase())
          )
          .map((categoryGroup) => {
            const {
              _id: groupCategoryId,
              categoryName,
              subcategories,
            } = categoryGroup;

            return (
              <Paper key={groupCategoryId} sx={{ margin: 0.5, padding: 1 }}>
                <Typography variant='body1'>{categoryName}</Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', padding: 1 }}>
                  {subcategories
                    .filter(({ name }) =>
                      name
                        .toLowerCase()
                        .includes(filterSubcategoryText.toLowerCase())
                    )
                    .map(({ _id: subcategoryId, name, categoryId }) => {
                      return (
                        <Chip
                          key={subcategoryId}
                          label={name}
                          sx={{ margin: '4px' }}
                          onClick={() => {
                            handleSelectSubcategory({
                              _id: subcategoryId,
                              name,
                              categoryId,
                            });
                          }}
                          onDelete={() =>
                            openDialog({
                              text: 'Are you sure you want to delete this subcategory?',
                              onConfirm: handleSubcategoryDelete(subcategoryId),
                            })
                          }
                        />
                      );
                    })}
                </Box>
              </Paper>
            );
          })
      ) : (
        <Typography variant='subtitle2'>
          No subcategories. Use the form above to create some.
        </Typography>
      )}
    </Box>
  );
};

SubcategoriesList.propTypes = {
  groupedSubcategories: PropTypes.array,
  handleSelectSubcategory: PropTypes.func,
  deleteSubcategory: PropTypes.func,
};

export default SubcategoriesList;
