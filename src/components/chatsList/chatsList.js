import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import ChatCard from '../chatCard/chatCard';
import './chatsList.css';

class ChatsList extends PureComponent {
  static propTypes = {
    chats: PropTypes.array,
    currentUserUid: PropTypes.string,
    currentChatUserUid: PropTypes.string,
    handleCardClick: PropTypes.func
  };

  render = () => {
    const { currentUserUid, chats, currentChatUserUid, handleCardClick } = this.props;

    return (
      <div>
        <p><b>Your chats</b></p>

        <div className="chats-list">
          { !isEmpty(chats) &&
            chats.map(chat => {
              const chatUser = chat.user;

              const messages = Object.values(chat.messages);
              const lastMessageAuthorUid = messages[messages.length - 1].authorUid;

              return (
                <ChatCard
                  { ...chat }
                  key={ chatUser.uid }
                  lastMessageIncoming={ lastMessageAuthorUid != currentUserUid }
                  isActive={ chatUser.uid === currentChatUserUid }
                  onClick={ () => handleCardClick(chatUser) }
                />
              )
            }) }
          </div>
      </div>
    );
  }
}

export default ChatsList;
