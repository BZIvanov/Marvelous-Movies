import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import Box from '@mui/material/Box';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import { useGetChatsQuery } from '@/providers/store/services/chat';
import ChatHeader from '@/components/manage/common/chat/ChatHeader';
import ChatMessages from '@/components/manage/common/chat/ChatMessages';
import ChatForm from '@/components/manage/common/chat/ChatForm';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminSellerChat = () => {
  const user = useSelector(selectUser);

  const [socket, setSocket] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});

  const { data: chatsData } = useGetChatsQuery();
  const chatData = useMemo(
    () => chatsData?.chats.find((chat) => chat.chatType === 'seller-admin'),
    [chatsData]
  );
  const chatId = useMemo(() => chatData?._id, [chatData]);

  const receiverId = useMemo(() => {
    if (chatData) {
      return chatData.participants.find(
        (participant) => participant.user._id !== user?._id
      )?.user?._id;
    }
    return null;
  }, [user, chatData]);

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
        <Box sx={{ flexGrow: 1 }}>
          <Box>
            <ChatHeader
              chat={chatData}
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
