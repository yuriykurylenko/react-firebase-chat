import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './speechBubble.css';

class SpeechBubble extends PureComponent {
  static propTypes = {
    handleKeyPress: PropTypes.func
  }

  render = () => {
    const { messageText, isFromCurrentUser } = this.props;

    const speechBubbleClasses = classnames(
      'speech-bubble',
      'with-padding',
      {
        'right with-margin-right speech-bubble-right': isFromCurrentUser,
        'left with-margin-left speech-bubble-left': !isFromCurrentUser,
      }
    );

    return (
      <p className={ speechBubbleClasses }>
        { messageText } { isFromCurrentUser }
      </p>
    );
  }
}

export default SpeechBubble;
