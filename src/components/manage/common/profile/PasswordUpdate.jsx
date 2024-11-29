import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useDispatch } from '@/providers/store/store';
import { useUpdatePasswordMutation } from '@/providers/store/services/users';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import { formConfig } from './passwordUpdateForm.schema';
import PasswordUpdateForm from './PasswordUpdateForm';

const PasswordUpdate = () => {
  const dispatch = useDispatch();

  const [updatePassword] = useUpdatePasswordMutation();

  const form = useForm(formConfig);

  const resetForm = () => {
    form.reset();
  };

  const handleUpdatePassword = async (values) => {
    const { newPassword, oldPassword } = values;
    const result = await updatePassword({ newPassword, oldPassword });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Password updated successfully',
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
        Update Your Password
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
        <PasswordUpdateForm
          form={form}
          resetForm={resetForm}
          updatePassword={handleUpdatePassword}
        />
      </Box>
    </Box>
  );
};

export default PasswordUpdate;
