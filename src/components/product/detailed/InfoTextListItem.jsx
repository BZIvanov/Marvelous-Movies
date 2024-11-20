import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InfoTextListItem = ({ itemKey, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
        alignItems: 'center',
      }}
    >
      <Typography variant='body1'>{itemKey}:</Typography>
      {children}
    </Box>
  );
};

InfoTextListItem.propTypes = {
  itemKey: PropTypes.string,
  children: PropTypes.node,
};

export default InfoTextListItem;
