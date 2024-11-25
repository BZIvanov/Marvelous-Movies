import PropTypes from 'prop-types';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { VisibilityIcon, VisibilityOffIcon } from '@/components/mui/Icons';
import { useFormContext } from '../hooks/useFormContext';

const PasswordTextFieldAdapter = ({ name, label, styles }) => {
  const { control } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%', marginBlock: 1, ...styles }}>
            <TextField
              slotProps={{
                htmlInput: { ...field },
                input: {
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              type={showPassword ? 'text' : 'password'}
              label={label}
              variant='standard'
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
            />
          </FormControl>
        );
      }}
    />
  );
};

PasswordTextFieldAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  styles: PropTypes.object,
};

export default PasswordTextFieldAdapter;
