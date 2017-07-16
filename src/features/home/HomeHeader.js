import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../features/login/actions';
import styles from './HomeHeader.css';
import { Layout, Button, Menu } from 'antd';

const { Header } = Layout;

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      current: 'mail'
    }
  }

  handleLogout() {
    const scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
    this.props.history.push('/login');
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }


  render() {
    return (
      <div className={styles.container}>
        <Header className={styles.header}>
          <span className={styles.logo}>42cloud</span>
          <Menu
            className={styles.menu}
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="about">关于42cloud</Menu.Item>
            <Menu.Item key="console">控制台</Menu.Item>
          {
            this.props.isLogged ?
              <Menu.Item key="logout">
              <div onClick={this.handleLogout}>
                Logout
              </div>
              </Menu.Item>:

              <Menu.Item key="login">

              <Link to="/login">
                  Login
              </Link>
              </Menu.Item>
          }
        </Menu>
        </Header>
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