import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Box from '@mui/material/Box';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import {
  useGetChatsQuery,
  useGetChatQuery,
  useCreateChatMutation,
} from '@/providers/store/services/chat';
import UsersChatList from '@/components/manage/common/chat/UsersChatList';
import ChatHeader from '@/components/manage/common/chat/ChatHeader';
import ChatMessages from '@/components/manage/common/chat/ChatMessages';
import ChatForm from '@/components/manage/common/chat/ChatForm';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminSellerChat = () => {
  const user = useSelector(selectUser);

  const { receiverId } = useParams();

  const [socket, setSocket] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});

  const { data: chatsData } = useGetChatsQuery();
  const { data: chatData } = useGetChatQuery(
    { receiverId },
    { skip: !receiverId }
  );
  const chatId = useMemo(() => chatData?.chat._id, [chatData]);

  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    // if not chat was found and receiver/user id was provided, create the chat
    if (chatData && !chatData.chat && receiverId) {
      createChat({ receiverId: receiverId });
    }
  }, [createChat, chatData, receiverId]);

  useEffect(() => {
    let newSocket;

    if (user) {
      newSocket = io(backendUrl, {
        query: { userId: user._id },
      });
      setSocket(newSocket);

      newSocket.on('activeUsers', (activeUsersList) => {
        const activeUsersListStatuses = activeUsersList.reduce((acc, curr) => {
          return { ...acc, [curr]: 'online' };
        }, {});

        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          ...activeUsersListStatuses,
        }));
      });

      newSocket.on('userStatus', ({ userId, status }) => {
        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          [userId]: status,
        }));
      });
    }

    return () => {
      if (newSocket) {
        newSocket.off('userStatus');
        return newSocket.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('joinChat', { chatId });
    }
  }, [socket, chatId]);

  return (
    <Box sx={{ margin: 1 }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <UsersChatList
          chats={chatsData?.chats}
          userStatuses={userStatuses}
          title='Sellers'
        />

        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <ChatHeader
              chat={chatData?.chat}
              receiverId={receiverId}
              userStatuses={userStatuses}
            />

            <ChatMessages socket={socket} chatId={chatId} />

            <ChatForm socket={socket} chatId={chatId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSellerChat;
