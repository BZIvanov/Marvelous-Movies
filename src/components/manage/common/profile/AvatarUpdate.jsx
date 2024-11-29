import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDispatch } from '@/providers/store/store';
import { useUpdateAvatarMutation } from '@/providers/store/services/users';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import { formConfig } from './avatarUpdateForm.schema';
import AvatarUpdateForm from './AvatarUpdateForm';

const AvatarUpdate = () => {
  const dispatch = useDispatch();

  const [updateAvatar] = useUpdateAvatarMutation();

  const form = useForm(formConfig);

  const resetForm = () => {
    form.reset();
  };

  const handleUpdateAvatar = async (formData) => {
    const result = await updateAvatar(formData);

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Avatar updated successfully',
        })
      );
      resetForm();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.paper',
        py: 4,
        px: 2,
      }}
    >
      <Typography
        variant='h4'
        component='h1'
        sx={{
          fontWeight: 'bold',
          mb: 3,
          color: 'primary.main',
        }}
      >
        Update Your Avatar
      </Typography>

      <Box
        sx={{
          width: { xs: '100%', sm: '400px' },
          bgcolor: 'background.default',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <AvatarUpdateForm
          form={form}
          resetForm={resetForm}
          updateAvatar={handleUpdateAvatar}
        />
      </Box>
    </Box>
  );
};

export default AvatarUpdate;
