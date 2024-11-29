import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import FormProvider from '@/providers/form/FormProvider';
import ImagesFieldAdapter from '@/providers/form/formFields/ImagesFieldAdapter';
import PreviewImageAvatar from '@/components/common/imagePreview/PreviewImageAvatar';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import { resizeImage } from '@/utils/resizeImage';

const AvatarUpdateForm = ({ form, resetForm, updateAvatar }) => {
  const selectedFormImage = form.watch('avatarImage');

  const isLoading = useIsApiRequestPending();

  const handleUpdateAvatarSubmit = async (values) => {
    const formData = new FormData();

    const resizedImage = await resizeImage(values.avatarImage[0], {
      maxWidth: 300,
      maxHeight: 300,
      compressFormat: 'png',
      outputType: 'file',
    });

    formData.append('avatarImage', resizedImage);

    updateAvatar(formData);
  };

  return (
    <FormProvider onSubmit={handleUpdateAvatarSubmit} methods={form}>
      <ImagesFieldAdapter name='avatarImage' maxFiles={1} />

      <Stack
        sx={{ marginTop: 3 }}
        spacing={2}
        direction='row'
        justifyContent='center'
      >
        {selectedFormImage.map((formImage) => {
          return <PreviewImageAvatar key={formImage.path} image={formImage} />;
        })}
      </Stack>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
        }}
      >
        <Button
          variant='outlined'
          color='secondary'
          type='button'
          onClick={resetForm}
          disabled={isLoading}
          sx={{
            width: '40%',
            backgroundColor: 'grey.100',
            color: 'secondary.main',
            '&:hover': {
              backgroundColor: 'grey.300',
              color: 'secondary.dark',
            },
          }}
        >
          Reset Form
        </Button>
        <Button
          variant='contained'
          type='submit'
          color='primary'
          disabled={isLoading}
          sx={{
            width: '50%',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Update Avatar
        </Button>
      </Box>
    </FormProvider>
  );
};

AvatarUpdateForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  updateAvatar: PropTypes.func,
};

export default AvatarUpdateForm;
