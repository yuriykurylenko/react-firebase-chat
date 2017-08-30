import React, { Component } from 'react';
import { isEmpty } from 'lodash';

import FirebaseMiddleware from '../../middleware/firebaseMiddleware';
import LocalstorageMiddleware from '../../middleware/localstorageMiddleware';

import * as selectors from './selectors';

import { Button, Row, Col } from 'react-materialize';
import Header from '../header/header';
import ChatsList from '../chatsList/chatsList';
import ChatWindow from '../chatWindow/chatWindow';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.fm = new FirebaseMiddleware();
  }

  initialLoad = (userData) => {
    this.setUserData(userData);
    this.fetchUsers();
    this.fetchChats(userData);
  }

  componentWillMount = () => {
    const userData = LocalstorageMiddleware.getUserData();
    if (!isEmpty(userData)) {
      this.initialLoad(userData);
    }
  }

  setUserData = userData => {
    this.fm.fetchOrAddUser(userData, user => this.setState({ user }));
  }

  fetchUsers = () => {
    this.fm.fetchUsers(users => this.setState({ users }));
  }

  fetchChats = userData => {
    this.fm.fetchChats(userData.uid, chats => this.setState({ chats }));
  }

  fetchOrAddChat = chatUser => {
    const currentUserUid = selectors.currentUserUidSelector(this.state);
    this.fm.fetchOrAddChat(currentUserUid, chatUser.uid, () => {
      this.setState({ currentChatUid: chatUser.uid });
    });
  }

  sendMessage = text => {
    const { currentUserUid, currentChatUserUid } = selectors.rootSelector(this.state);
    this.fm.sendMessage(currentUserUid, currentChatUserUid, text);
  }

  logIn = () => {
    this.fm.logIn().then(result => this.initialLoad(result.user));
  }

  logOut = () => {
    LocalstorageMiddleware.deleteUserData();
    this.setState({ user: null });
  }

  render = () => {
    const {
      users,
      currentUser,
      currentUserUid,
      chats,
      messages,
      currentChatUser,
      currentUserName,
      currentUserPhotoUrl,
      currentChatUserUid,
      currentChatUserName,
      currentChatUserPhotoUrl
    } = selectors.rootSelector(this.state || {});

    return (
      <div className="App full-screen">
        { !isEmpty(currentUser) ? (
          <Row className="full-height">
            <Col s={ 3 } className="full-height bg-white no-padding">
              <div className="sidebar bg-white full-height">
                <ChatsList
                  chats={ chats }
                  currentChatUserUid={ currentChatUserUid }
                  handleCardClick={ this.fetchOrAddChat }
                />

                <p><b>Our users</b></p>

                <div className="users-list">
                  { !isEmpty(users) && users.map(user => {
                    return (
                      <img className="btn-floating btn-large with-margin"
                         key={ user.uid }
                         src={ user.photoURL }
                         alt={ user.name }
                         onClick={ () => { this.fetchOrAddChat(user) } } />
                    )
                  }) }
                </div>
              </div>
            </Col>
            <Col s={ 9 } className="no-padding">
              <Header
                currentChatUserName={ currentChatUserName }
                currentChatUserPhotoUrl={ currentChatUserPhotoUrl }
                userName={ currentUserName }
                userPhotoUrl={ currentUserPhotoUrl }
                logOut = { this.logOut }
              />

              { !isEmpty(currentChatUser) && (
                  <ChatWindow
                    messages={ messages }
                    sendMessage={ this.sendMessage }
                    currentUserUid={ currentUserUid }
                  />
                ) }
            </Col>
          </Row>
        ) : (
          <Button
            large
            className="btn-center"
            onClick={ this.logIn } >
              Log in with Facebook
          </Button>
        ) }
      </div>
    );
  }
}

export default App;
