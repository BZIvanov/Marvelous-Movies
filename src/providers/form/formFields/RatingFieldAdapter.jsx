import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext } from '../hooks/useFormContext';

const RatingFieldAdapter = ({ name, label, precision = 1, size = 'large' }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <>
            {label && (
              <Typography
                component='legend'
                variant='caption'
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {label}
              </Typography>
            )}
            <Rating
              name={field.name}
              value={field.value}
              onChange={(event, newValue) => {
                field.onChange(newValue);
              }}
              precision={precision}
              size={size}
            />

            {fieldState.error && (
              <FormHelperText error={Boolean(fieldState.error)}>
                {fieldState.error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
};

RatingFieldAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  precision: PropTypes.number,
  size: PropTypes.string,
};

export default RatingFieldAdapter;
