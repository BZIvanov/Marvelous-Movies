import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import { formConfig } from './chatForm.schema';

const ChatForm = ({ socket, chatId }) => {
  const user = useSelector(selectUser);

  const form = useForm(formConfig);

  const handleSubmitCoupon = (values) => {
    if (socket && chatId) {
      socket.emit('sendMessage', {
        chatId,
        senderId: user._id,
        content: values.message,
      });

      form.reset();
    }
  };

  const isApiLoading = useIsApiRequestPending();

  return (
    <Box sx={{ margin: 1 }}>
      <FormProvider onSubmit={handleSubmitCoupon} methods={form}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextFieldAdapter
            name='message'
            label='Your message'
            disabled={isApiLoading || !chatId}
          />
          <Box>
            <Button
              variant='contained'
              type='submit'
              disabled={isApiLoading || !chatId}
            >
              Send
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
};

ChatForm.propTypes = {
  socket: PropTypes.object,
  chatId: PropTypes.string,
};

export default ChatForm;
