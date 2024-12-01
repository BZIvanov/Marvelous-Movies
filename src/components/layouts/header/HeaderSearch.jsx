import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import { useSelector, useDispatch } from '@/providers/store/store';
import {
  selectTextFilter,
  changeFilter,
} from '@/providers/store/features/productsFilters/productsFiltersSlice';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
    },
  },
}));

const HeaderSearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const text = useSelector(selectTextFilter);

  const handleSearchChange = (e) => {
    dispatch(changeFilter({ text: e.target.value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/shop');
  };

  return (
    <StyledPaper component='form' onSubmit={handleSearchSubmit}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledInputBase
          placeholder='Search for products'
          value={text}
          onChange={handleSearchChange}
        />
        <IconButton type='submit' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
    </StyledPaper>
  );
};

export default HeaderSearch;
