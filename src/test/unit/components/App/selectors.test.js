import * as selectors from '../../../../components/App/selectors';
import { values } from 'lodash';
import moment from 'moment';

describe('App Selectors', () => {
  const user1 = {
    name: 'Lars Larsen',
    photoURL: 'https://scontent.xx.fbcdn.net/photoURL1',
    uid: 'rAnDoMuId'
  };

  const user2 = {
    name: 'Random Guy',
    photoURL: 'https://scontent.xx.fbcdn.net/photoURL2',
    uid: 'mOrERanDomUid'
  };

  const message1 = {
    authorUid: 'mOrERanDomUid',
    sentAt: 1503850406000,
    text: 'hello there'
  };

  const message2 = {
    authorUid: 'rAnDoMuId',
    sentAt: 1503850448000,
    text: 'very niiiice'
  };

  const messages = {
    '-KsZT0t_pmoZ8aDST41U': message1,
    '-KsZTBPbMR5-CSiWy2zw': message2
  };

  const chats = [{
    lastMessage: message2,
    messages: messages,
    user: user2
  }];

  const initialState = {
    user: user1,
    users: {
      'rAnDoMuId': user1,
      'mOrERanDomUid': user2
    },
    chats: {
      'mOrERanDomUid': chats[0]
    },
    currentChatUid: 'mOrERanDomUid'
  }

  describe('usersSelector', () => {
    test('it selects the array of users', () => {
      expect(selectors.usersSelector(initialState)).toEqual([ user1, user2 ]);
    });
  });

  describe('usersSelector', () => {
    test('it selects the array of users', () => {
      expect(selectors.currentChatUidSelector(initialState)).toEqual('mOrERanDomUid');
    });
  });

  describe('currentUserSelector', () => {
    test('it selects current user', () => {
      expect(selectors.currentUserSelector(initialState)).toEqual(user1);
    });
  });

  describe('currentUserUidSelector', () => {
    test("it selects current user's uid", () => {
      expect(selectors.currentUserUidSelector(initialState)).toEqual(user1.uid);
    });
  });

  describe('currentUserNameSelector', () => {
    test("it selects current user's name", () => {
      expect(selectors.currentUserNameSelector(initialState)).toEqual(user1.name);
    });
  });

  describe('currentUserPhotoUrlSelector', () => {
    test("it selects current user's photo url", () => {
      expect(selectors.currentUserPhotoUrlSelector(initialState)).toEqual(user1.photoURL);
    });
  });

  describe('chatsSelector', () => {
    test("it selects current user's chats", () => {
      expect(selectors.chatsSelector(initialState)).toEqual(chats);
    });
  });

  describe('currentChatSelector', () => {
    test('it selects current open chat', () => {
      expect(selectors.currentChatSelector(initialState)).toEqual(chats[0]);
    });
  });

  describe('currentChatMessagesSelector', () => {
    test('it selects messages from current open chat', () => {
      const expected = values(messages);
      expect(selectors.currentChatMessagesSelector(initialState)).toEqual(expected);
    });
  });

  describe('currentChatUserSelector', () => {
    test('it selects the user, whom current user is speaking to', () => {
      expect(selectors.currentChatUserSelector(initialState)).toEqual(user2);
    });
  });

  describe('currentChatUserUidSelector', () => {
    test('it selects uid of the user, whom current user is speaking to', () => {
      expect(selectors.currentChatUserUidSelector(initialState)).toEqual(user2.uid);
    });
  });

  describe('currentChatUserNameSelector', () => {
    test('it selects name of the user, whom current user is speaking to', () => {
      expect(selectors.currentChatUserNameSelector(initialState)).toEqual(user2.name);
    });
  });

  describe('currentChatUserPhotoUrlSelector', () => {
    test('it selects photo url of the user, whom current user is speaking to', () => {
      expect(selectors.currentChatUserPhotoUrlSelector(initialState)).toEqual(user2.photoURL);
    });
  });

  describe('displayChatsSelector', () => {
    test('it selects the list of chats of current user in component-friendly format', () => {
      const expected = [{
        lastMessage: message2,
        messages: messages,
        user: user2,
        userUid: user2.uid,
        userPhotoUrl: user2.photoURL,
        userName: user2.name,
        lastMessageSentTime: moment(message2.sentAt).calendar(),
        lastMessageText: message2.text
      }];
      expect(selectors.displayChatsSelector(initialState)).toEqual(expected);
    });
  });

  describe('rootSelector', () => {
    test('it selects the values from application state in component-friendly format', () => {
      const result = selectors.rootSelector(initialState);

      expect(result.users).toBeDefined();
      expect(result.currentUser).toBeDefined();
      expect(result.currentUserUid).toBeDefined();
      expect(result.currentUserName).toBeDefined();
      expect(result.currentUserPhotoUrl).toBeDefined();
      expect(result.chats).toBeDefined();
      expect(result.messages).toBeDefined();
      expect(result.currentChatUser).toBeDefined();
      expect(result.currentChatUserUid).toBeDefined();
      expect(result.currentChatUserName).toBeDefined();
      expect(result.currentChatUserPhotoUrl).toBeDefined();
    });
  });
});
