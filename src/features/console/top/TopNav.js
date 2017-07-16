import React, { Component } from 'react';
import { logout } from '../../login/actions';
import { connect } from 'react-redux';
import { Button } from 'antd';

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    let scopedToken = localStorage.getItem('scopedToken');
    this.props.dispatch(logout(scopedToken));
  }

  render() {
    return (
        <Button onClick={this.handleLogout}>
          Logout
        </Button>
    )
  }
}

export default connect(null, null)(TopNav);
