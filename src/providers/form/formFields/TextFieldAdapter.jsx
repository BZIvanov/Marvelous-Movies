import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { useFormContext } from '../hooks/useFormContext';

const TextFieldAdapter = ({
  name,
  label,
  type = 'text',
  multiline = false,
  minRows,
  maxRows,
  placeholder,
  icon,
  styles = {},
  disabled = false,
}) => {
  // After we provided the form methods to the FormProvider, we can now get them from the context
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ width: '100%', marginBlock: 1, ...styles }}>
            <TextField
              slotProps={{
                htmlInput: { ...field, type },
                input: icon
                  ? {
                      endAdornment: (
                        <InputAdornment position='end' sx={{ padding: '8px' }}>
                          {icon}
                        </InputAdornment>
                      ),
                    }
                  : {},
              }}
              variant='standard'
              label={label}
              error={fieldState.isTouched && Boolean(fieldState.error)}
              helperText={fieldState.isTouched && fieldState.error?.message}
              multiline={multiline} // textarea type
              minRows={multiline && minRows ? minRows : undefined}
              maxRows={multiline && maxRows ? maxRows : undefined}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
        );
      }}
    />
  );
};

TextFieldAdapter.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
};

export default TextFieldAdapter;
