import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useLoginMutation } from '@/providers/store/services/users';

import ForgotPasswordDialogForm from './ForgotPasswordDialogForm';
import LoginForm from './LoginForm';

const UserLogin = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const loginUser = (values) => {
    login(values);
  };

  const handleShowForgotModal = (shouldShow) => {
    setShowForgotPasswordModal(shouldShow);
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
        Welcome Back
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
        <LoginForm loginUser={loginUser} isSubmitting={isLoading} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='body2'>
            Don&apos;t have an account?{' '}
            <Typography variant='body2' component='span' color='primary'>
              <Link to='/auth/register' style={{ color: 'inherit' }}>
                Register
              </Link>
            </Typography>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'right' }}>
          <Button
            color='secondary'
            size='small'
            onClick={() => handleShowForgotModal(true)}
          >
            Forgot Password?
          </Button>
        </Box>

        <ForgotPasswordDialogForm
          showForgotPasswordModal={showForgotPasswordModal}
          handleShowForgotModal={handleShowForgotModal}
        />
      </Box>
    </Box>
  );
};

export default UserLogin;
