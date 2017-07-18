import React, { Component } from 'react';
import { logout } from '../../login/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';

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
          <span style={{
            color: '#f1f1f1',
            fontSize: '24px',
            display: 'inline-block',
            backgroundColor: '#505050',
            width: '200px',
            textAlign: 'center'
          }}>
            42cloud
          </span>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ float: 'right', lineHeight: '64px' }}
          >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">
            <div onClick={this.handleLogout}>
              Logout
            </div>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default connect(null, null)(TopNav);
