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
    <Box sx={{ width: { xs: '90%', sm: '290px' } }}>
      <FormProvider onSubmit={handleUpdateAvatarSubmit} methods={form}>
        <ImagesFieldAdapter name='avatarImage' maxFiles={1} />

        <Stack
          sx={{ marginTop: 3 }}
          spacing={2}
          direction='row'
          justifyContent='center'
        >
          {selectedFormImage.map((formImage) => {
            return (
              <PreviewImageAvatar key={formImage.path} image={formImage} />
            );
          })}
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            marginTop: '20px',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={resetForm}
            disabled={form.formState.isSubmitting || isLoading}
          >
            Reset Form
          </Button>
          <Button
            variant='contained'
            type='submit'
            disabled={form.formState.isSubmitting || isLoading}
          >
            Update Avatar
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

AvatarUpdateForm.propTypes = {
  form: PropTypes.object,
  resetForm: PropTypes.func,
  updateAvatar: PropTypes.func,
};

export default AvatarUpdateForm;
