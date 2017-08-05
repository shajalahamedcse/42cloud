import React, { Component } from 'react';
import { logout } from 'features/login/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './style/TopNav.css';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    let scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
    localStorage.removeItem('scopedToken');
  }

  render() {
    return (
      <div>
        <Link to='/'>
          <span className={styles.logo}>
            42cloud
          </span>
        </Link>
        <span className={styles.logout} onClick={this.handleLogout}>
          登出
        </span>
      </div>
    )
  }
}

export default connect(null, null)(TopNav);
