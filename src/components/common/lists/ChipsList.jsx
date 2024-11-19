import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const ChipsList = ({ title, parameter, chipsList = [] }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/${parameter}/${id}`);
  };

  return (
    <Paper sx={{ marginBlock: 3, padding: 2 }}>
      <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>
        {title}
      </Typography>

      {chipsList.map((chipItem) => (
        <Chip
          key={chipItem._id}
          label={chipItem.name}
          variant='outlined'
          avatar={
            chipItem.image && (
              <Avatar alt='Category preview' src={chipItem.image.imageUrl} />
            )
          }
          onClick={() => handleClick(chipItem._id)}
          sx={{ margin: 0.5 }}
        />
      ))}
    </Paper>
  );
};

ChipsList.propTypes = {
  title: PropTypes.string,
  parameter: PropTypes.string,
  chipsList: PropTypes.array,
};

export default ChipsList;
