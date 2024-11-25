import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import { ChatIcon } from '@/components/mui/Icons';

const ChatWithSeller = ({ productId, shopSellerId }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  return (
    <Button
      onClick={() => {
        if (!user) {
          navigate('/auth/login', {
            state: {
              customNavigateTo: `/product/${productId}`,
            },
          });
        } else {
          navigate(`/buyer/chat/${shopSellerId}`);
        }
      }}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <ChatIcon />
      <Typography variant='caption'>Chat with Seller</Typography>
    </Button>
  );
};

ChatWithSeller.propTypes = {
  productId: PropTypes.string.isRequired,
  shopSellerId: PropTypes.string.isRequired,
};

export default ChatWithSeller;
