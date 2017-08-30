import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';

import SpeechBubble from '../speechBubble/speechBubble';
import MessageInput from '../messageInput/messageInput';

import './chatWindow.css';

class ChatWindow extends PureComponent {
  static propTypes = {
    currentUserUid: PropTypes.string,
    messages: PropTypes.array,
    sendMessage: PropTypes.func
  };

  scrollToBottom = () => {
    Scroll.animateScroll.scrollToBottom({ containerId: 'messages' });
  }

  componentDidMount = () => {
    this.scrollToBottom();
  }

  componentWillReceiveProps = () => {
    this.scrollToBottom();
  }

  render = () => {
    const { currentUserUid, messages, sendMessage } = this.props;

    return (
      <div>
        <div id="messages" className="messages">
          { messages.map(message => (
            <div key={ message.sentAt }>
              <SpeechBubble
                isFromCurrentUser={ currentUserUid === message.authorUid }
                messageText={ message.text }
              />
              <div className="clearfix" />
            </div>
          )) }
        </div>
        <MessageInput handleKeyPress={ sendMessage } />
      </div>
    );
  }
}

export default ChatWindow;
