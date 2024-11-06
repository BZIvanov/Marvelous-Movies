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
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h5'>Avatar Update Form</Typography>

      <AvatarUpdateForm
        form={form}
        resetForm={resetForm}
        updateAvatar={handleUpdateAvatar}
      />
    </Box>
  );
};

export default AvatarUpdate;
