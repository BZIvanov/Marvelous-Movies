import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const CategorySearch = ({ filterCategoryText, handleFilterCategoryText }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl sx={{ width: '100%' }}>
        <TextField
          label='Search for a category'
          variant='standard'
          value={filterCategoryText}
          onChange={(e) => handleFilterCategoryText(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

CategorySearch.propTypes = {
  filterCategoryText: PropTypes.string,
  handleFilterCategoryText: PropTypes.func,
};

export default CategorySearch;
