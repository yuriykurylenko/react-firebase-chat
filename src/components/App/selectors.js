import { createSelector } from 'reselect';
import { values } from 'lodash';
import moment from 'moment';

export const usersSelector = state => {
  return state.users ? values(state.users) : [];
}

export const currentChatUidSelector = state => state.currentChatUid;

export const currentUserSelector = state => state.user || {};
export const currentUserUidSelector = createSelector(
  currentUserSelector,
  user => user.uid
);

export const currentUserNameSelector = createSelector(
  currentUserSelector,
  user => user.name
);

export const currentUserPhotoUrlSelector = createSelector(
  currentUserSelector,
  user => user.photoURL
);

export const chatsSelector = state => state.chats ? values(state.chats) : [];

export const currentChatSelector = createSelector(
  currentChatUidSelector,
  chatsSelector,
  (currentChatUid, chats) => {
    return values(chats).find(chat => {
      return chat.user && (chat.user.uid === currentChatUid);
    });
  }
);

export const currentChatMessagesSelector = createSelector(
  currentChatSelector,
  currentChat => (currentChat && currentChat.messages) ? values(currentChat.messages) : []
);

export const currentChatUserSelector = createSelector(
  currentChatSelector,
  currentChat => currentChat ? currentChat.user : null
);

export const currentChatUserUidSelector = createSelector(
  currentChatUserSelector,
  currentChatUser => currentChatUser ? currentChatUser.uid : null
);

export const currentChatUserNameSelector = createSelector(
  currentChatUserSelector,
  currentChatUser => currentChatUser ? currentChatUser.name : null
);

export const currentChatUserPhotoUrlSelector = createSelector(
  currentChatUserSelector,
  currentChatUser => currentChatUser ? currentChatUser.photoURL : null
);

export const displayChatsSelector = createSelector(
  chatsSelector,
  chats => {
    return chats.map(chat => {
      return {
        ...chat,
        userUid: chat.user && chat.user.uid,
        userPhotoUrl: chat.user && chat.user.photoURL,
        userName: chat.user && chat.user.name,
        lastMessageSentTime: chat.lastMessage ? moment(chat.lastMessage.sentAt).calendar() : null,
        lastMessageText: chat.lastMessage ? chat.lastMessage.text : null
      };
    });
  }
);

export const rootSelector = state => ({
  users: usersSelector(state),
  currentUser: currentUserSelector(state),
  currentUserUid: currentUserUidSelector(state),
  currentUserName: currentUserNameSelector(state),
  currentUserPhotoUrl: currentUserPhotoUrlSelector(state),
  chats: displayChatsSelector(state),
  messages: currentChatMessagesSelector(state),
  currentChatUser: currentChatUserSelector(state),
  currentChatUserUid: currentChatUserUidSelector(state),
  currentChatUserName: currentChatUserNameSelector(state),
  currentChatUserPhotoUrl: currentChatUserPhotoUrlSelector(state)
});
