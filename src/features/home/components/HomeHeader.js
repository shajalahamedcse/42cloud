import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../login/actions';
import styles from './style/HomeHeader.css';
import { Menu } from 'antd';


class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
    localStorage.removeItem('scopedToken');
    this.props.history.push('/login');
  }

  render() {
    let isLogged = this.props.isLogged;
    return (
      <div>
          <span className={styles.logo}>42cloud</span>
          <Menu
            className={styles.menu}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            {
              isLogged ?
                <Menu.Item>
                  <Link to="/console/overview">
                    控制台
                  </Link>
                </Menu.Item> :
                <Menu.Item>
                  <Link to="/login">
                    控制台
                  </Link>
                </Menu.Item>
            }
            {
              isLogged ?
                <Menu.Item>
                  <div onClick={this.handleLogout}>
                    Logout
                  </div>
                </Menu.Item> :
                <Menu.Item>
                  <Link to="/login">
                      Login
                  </Link>
                </Menu.Item>
            }
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLogged: state.auth.isLogged
  }
}

export default withRouter(connect(mapStateToProps, null)(HomeHeader));