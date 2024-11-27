import { useRouteError } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='100vh'
      bgcolor='grey.100'
      px={4}
      py={8}
    >
      <Typography variant='h5' component='h5' color='error' gutterBottom={true}>
        Oops! Something went wrong
      </Typography>
      <Typography variant='body1' color='textSecondary' paragraph>
        {error?.data ||
          error?.error?.message ||
          error?.message ||
          'An unexpected error occurred.'}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => window.location.reload()}
      >
        Reload Page
      </Button>
    </Box>
  );
};

export default ErrorBoundary;
