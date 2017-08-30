import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './header.css';

class Header extends PureComponent {
  static propTypes = {
    userName: PropTypes.string,
    userPhotoUrl: PropTypes.string,
    currentChatUserName: PropTypes.string,
    currentChatUserPhotoUrl: PropTypes.string,
    logout: PropTypes.func
  }

  render = () => {
    const {
      userName,
      userPhotoUrl,
      currentChatUserName,
      currentChatUserPhotoUrl,
      logOut
    } = this.props;

    const chatTitle = currentChatUserName ? `Chat with ${currentChatUserName.split(' ')[0]}` : '';
    const welcoMemessage = userName ? `Welcome, ${userName.split(' ')[0]}!` : '';

    return (
      <nav className="header">
        <div className="nav-wrapper">
          <ul className="left">
            { currentChatUserPhotoUrl ? (
              <span>
                <li>
                  <img className="btn-floating btn-large with-margin"
                       src={ userPhotoUrl }
                       alt={ userName } />
                  <img className="btn-floating btn-large with-margin chat-partner"
                       src={ currentChatUserPhotoUrl }
                       alt={ currentChatUserName } />
                </li>
                <li className="chat-title">
                  <a>{ chatTitle }</a>
                </li>
              </span>
            ) : (
              <span>
                <li>
                  <img
                    className="btn-floating btn-large with-margin"
                    src={ userPhotoUrl }
                    alt={ userName }
                  />
                </li>
                <li>
                  <a>{ welcoMemessage }</a>
                </li>
              </span>
            ) }
          </ul>
          <ul className="right hide-on-med-and-down">
            <li>
              <a onClick={ logOut }>
                <i className="large material-icons">exit_to_app</i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header;
