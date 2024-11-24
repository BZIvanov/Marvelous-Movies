import PropTypes from 'prop-types';
import { Paper, Box, Avatar, Typography, Badge } from '@mui/material';

const ChatHeader = ({ chat = {}, receiverId, userStatuses }) => {
  const receiver = chat?.participants?.find(
    (participant) => participant.user._id === receiverId
  );

  const isOnline = userStatuses[receiverId] === 'online';

  return (
    <Paper sx={{ p: 1 }}>
      {receiverId ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant='dot'
            sx={{
              '& .MuiBadge-dot': {
                backgroundColor: isOnline ? 'green' : 'red',
              },
            }}
          >
            <Avatar src={receiver?.user?.avatar?.imageUrl} alt='User avatar' />
          </Badge>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            {receiver?.user.username}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', height: 45 }}>
          <Typography variant='body1'>Select a user to chat with</Typography>
        </Box>
      )}
    </Paper>
  );
};

ChatHeader.propTypes = {
  chat: PropTypes.object,
  receiverId: PropTypes.string,
  userStatuses: PropTypes.object,
};

export default ChatHeader;
