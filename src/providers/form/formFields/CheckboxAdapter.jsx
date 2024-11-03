import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext } from '../hooks/useFormContext';

const CheckboxAdapter = ({ name, label, styles = {} }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            sx={{ width: '100%', marginBlock: 1, ...styles }}
            error={Boolean(fieldState.error)}
          >
            <FormControlLabel
              control={<Checkbox {...field} checked={field.value || false} />}
              label={label}
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: (theme) => theme.typography.caption,
                },
              }}
            />

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

CheckboxAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  styles: PropTypes.object,
};

export default CheckboxAdapter;
