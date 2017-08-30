import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class MessageInput extends PureComponent {
  static propTypes = {
    handleKeyPress: PropTypes.func
  }

  handleKeyPress = (e) => {
    const { handleKeyPress } = this.props;

    if (e.key === 'Enter') {
      handleKeyPress(this.refs.message.value);
      this.refs.message.value = '';
    }
  }

  render = () => {
    return (
      <div className="footer z-depth-1">
        <div className="input-field">
          <input type="text" ref="message" onKeyPress={ this.handleKeyPress } />
          <label>Type a message</label>
        </div>
      </div>
    );
  }
}

export default MessageInput;
