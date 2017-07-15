import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';

import { connect } from 'react-redux';

import { logout } from '../../features/login/actions';

import styles from './HomeHeader.css';

const { Header } = Layout;

class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
  }

  render() {
    return (
      <v className={styles.header}>
        <Header>
          <span className={styles.logo}>42cloud</span>
          { this.props.isLogged ? (
            <Button className={styles.login} onClick={this.handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button type="primary" size="large" className={styles.login}>
                Login
              </Button>
            </Link>
          )}
        </Header>
      </v>
    )
  }
}


const mapStateToProps = (state) => ({
  isLogged: state.auth.isLogged
})

export default connect(mapStateToProps, null)(HomeHeader);