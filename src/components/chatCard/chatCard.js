import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Icon } from 'react-materialize';

import './chatCard.css';

class ChatCard extends PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    userPhotoUrl: PropTypes.string,
    lastMessageSentTime: PropTypes.string,
    lastMessageText: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
  };

  render = () => {
    const {
      userName,
      userPhotoUrl,
      lastMessageSentTime,
      lastMessageIncoming,
      lastMessageText,
      isActive,
      onClick
    } = this.props;

    const chatCardClasses = classnames(
      'chat-card',
      {
        'chat-card-active': isActive,
      }
    );

    return (
      <a onClick={ onClick }>
        <div className={ chatCardClasses }>
          <img className="left btn-floating with-margin"
               src={ userPhotoUrl }
               alt={ userName } />
          <span className="user-name">{ userName.split(' ')[0] }</span>
          { lastMessageText ? (
            <span>
              <div className="right time-text with-margin-right line-height-normal">
                <i>{ lastMessageSentTime }</i>
              </div>
              <div className="message-text line-height-normal bottom truncate" >
                <Icon tiny>
                  { lastMessageIncoming ? 'vertical_align_bottom' : 'vertical_align_top' }
                </Icon>
                { lastMessageText }
              </div>
            </span>
          ) : <span className="dummy-text">Your chat starts here...</span> }
        </div>
      </a>
    );
  }
}

export default ChatCard;
