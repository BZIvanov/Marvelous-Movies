import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';

import {
  Paper,
  Typography,
  Avatar,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

const UsersChatList = ({ chats = [], userStatuses, title }) => {
  const { receiverId } = useParams();

  const user = useSelector(selectUser);

  return (
    <Paper
      sx={{
        width: 280,
        p: 2,
        pb: 0,
      }}
    >
      <Typography variant='h6' gutterBottom={true}>
        {title}
      </Typography>

      <List>
        {chats.map((chat) => {
          const receiver = chat.participants.find(
            (participant) => participant.user._id !== user._id
          );

          const isOnline = userStatuses[receiver.user._id] === 'online';

          return (
            <ListItem
              key={chat._id}
              component={Link}
              to={`/${user.role}/chat/${receiver.user._id}`}
              sx={{
                mb: 1,
                borderRadius: 1,
                backgroundColor:
                  receiverId === receiver.user._id
                    ? 'lightgrey'
                    : 'transparent',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
                textDecoration: 'none',
              }}
            >
              <ListItemAvatar>
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
                  <Avatar
                    src={receiver.user?.avatar?.imageUrl}
                    alt='User avatar'
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant='body1' fontWeight='bold'>
                    {receiver.user.username}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

UsersChatList.propTypes = {
  chats: PropTypes.array,
  userStatuses: PropTypes.object,
  title: PropTypes.string,
};

export default UsersChatList;
