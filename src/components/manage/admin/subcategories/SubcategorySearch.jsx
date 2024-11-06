import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const SubcategorySearch = ({
  filterCategoryText,
  handleFilterCategoryText,
  filterSubcategoryText,
  handleFilterSubcategoryText,
}) => {
  return (
    <Box
      sx={{
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <FormControl sx={{ flexGrow: 1 }}>
        <TextField
          label='Search for category'
          variant='standard'
          value={filterCategoryText}
          onChange={(e) => handleFilterCategoryText(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ flexGrow: 1 }}>
        <TextField
          label='Search for subcategory'
          variant='standard'
          value={filterSubcategoryText}
          onChange={(e) => handleFilterSubcategoryText(e.target.value)}
        />
      </FormControl>
    </Box>
  );
};

SubcategorySearch.propTypes = {
  filterCategoryText: PropTypes.string,
  handleFilterCategoryText: PropTypes.func,
  filterSubcategoryText: PropTypes.string,
  handleFilterSubcategoryText: PropTypes.func,
};

export default SubcategorySearch;
