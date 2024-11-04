import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';

import { useFormContext } from '../hooks/useFormContext';
import { CloudUploadIcon } from '../../../components/mui/Icons';

const ImagesFieldAdapter = ({ name, maxFiles = 0 }) => {
  const { control, setError, clearErrors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, onChange, onBlur }, fieldState }) => {
        const onChangeDroppedImages = (files) => {
          clearErrors(name);
          onChange(files);
        };

        const onErrorDroppedImages = (rejectedFiles) => {
          if (rejectedFiles.length > 1) {
            const errorMessage = rejectedFiles[0].errors[0].message;
            setError(name, { type: 'custom', message: errorMessage });
          }
        };

        return (
          <FormControl sx={{ width: '100%' }}>
            <Dropzone
              onDrop={onChangeDroppedImages}
              onDropRejected={onErrorDroppedImages}
              maxFiles={maxFiles}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <Paper
                    variant='outlined'
                    sx={{
                      backgroundColor: (theme) => theme.palette.grey[200],
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: (theme) => theme.palette.text.secondary,
                      padding: (theme) => theme.spacing(1),
                    }}
                    {...getRootProps()}
                  >
                    <CloudUploadIcon
                      sx={{ color: (theme) => theme.palette.text.secondary }}
                      fontSize='large'
                    />
                    <input
                      data-testid='input-file'
                      {...getInputProps()}
                      name={name}
                      onBlur={onBlur}
                      accept='image/*'
                    />
                    <Typography variant='body2'>
                      Drag and drop images here, or click to select
                    </Typography>
                  </Paper>
                );
              }}
            </Dropzone>

            {fieldState.error && (
              <FormHelperText
                sx={{ margin: 0 }}
                error={Boolean(fieldState.error)}
              >
                {fieldState.error.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

ImagesFieldAdapter.propTypes = {
  name: PropTypes.string,
  maxFiles: PropTypes.number,
};

export default ImagesFieldAdapter;
