import moment from 'moment';

import * as firebase from 'firebase';
import firebaseConfig from '../config/firebaseConfig';

import FirebaseRef from './firebaseRef';

class FirebaseMiddleware {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.firebaseAuthProvider = new firebase.auth.FacebookAuthProvider();
    this.db = firebase.database();
  }

  usersRef = () => {
    return this.ref('users');
  }

  userRef = userUid => {
    return this.ref(`users/${userUid}`);
  }

  chatsRef = userUid => {
    return this.ref(`chats/${userUid}`);
  }

  chatRef = (user1Uid, user2Uid) => {
    return this.ref(`chats/${user1Uid}/${user2Uid}`);
  }

  chatMessagesRef = (user1Uid, user2Uid) => {
    return this.ref(`chats/${user1Uid}/${user2Uid}/messages`);
  }

  chatLastMessageRef = (user1Uid, user2Uid) => {
    return this.ref(`chats/${user1Uid}/${user2Uid}/lastMessage`);
  }

  chatUserRef = (user1Uid, user2Uid) => {
    return this.ref(`chats/${user1Uid}/${user2Uid}/user`);
  }

  fetchUser = (userUid, callback) => {
    this.userRef(userUid).fetch(callback);
  }

  fetchUsers = (callback) => {
    this.usersRef().fetch(callback);
  }

  fetchChats = (userUid, callback) => {
    this.chatsRef(userUid).fetch(callback);
  }

  fetchChat = (user1Uid, user2Uid, callback) => {
    this.chatRef(user1Uid, user2Uid).fetch(callback);
  }

  addUserIfNotExists = (userData) => {
    this.userRef(userData.uid).setIfNotExists({
      uid: userData.uid,
      name: userData.name,
      photoURL : userData.photoURL
    });
  }

  addChatIfNotExists = (user1Uid, user2Uid) => {
    const user2Ref = this.userRef(user2Uid);
    user2Ref.fetch(user2 => this.chatRef(user1Uid, user2Uid).setIfNotExists({ user: user2 }));
  }

  fetchOrAddUser = (userData, callback) => {
    this.fetchUser(userData.uid, user => callback(user));
    this.addUserIfNotExists(userData);
  }

  fetchOrAddChat = (user1Uid, user2Uid, callback) => {
    this.fetchChat(user1Uid, user2Uid, chat => callback(chat));
    this.addChatIfNotExists(user1Uid, user2Uid);
  }

  sendMessage = (senderUid, recipientUid, text) => {
    const messagesRef = this.chatMessagesRef(senderUid, recipientUid);
    const lastMessageRef = this.chatLastMessageRef(senderUid, recipientUid);

    const messagesCopyRef = this.chatMessagesRef(recipientUid, senderUid);
    const lastMessageCopyRef = this.chatLastMessageRef(recipientUid, senderUid);

    const senderRef = this.userRef(senderUid);
    const chatUserCopyRef = this.chatUserRef(recipientUid, senderUid);

    const messageData = {
      authorUid: senderUid,
      text,
      sentAt: moment().unix() * 1000
    };

    chatUserCopyRef.fetch(() => {
      messagesRef.push(messageData);
      lastMessageRef.set(messageData);

      messagesCopyRef.push(messageData);
      lastMessageCopyRef.set(messageData);
    });

    senderRef.fetch(sender => chatUserCopyRef.setIfNotExists({ ...sender }));
  }

  ref = (path) => {
    return new FirebaseRef(this.db, path);
  }

  logIn = () => {
    return firebase.auth().signInWithPopup(this.firebaseAuthProvider);
  }
}

export default FirebaseMiddleware;
