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
        marginTop: { xs: '10px', sm: '20px', md: '40px' },
      }}
    >
      <Typography variant='h5'>Password Update Form</Typography>

      <PasswordUpdateForm
        form={form}
        resetForm={resetForm}
        updatePassword={handleUpdatePassword}
      />
    </Box>
  );
};

export default PasswordUpdate;
