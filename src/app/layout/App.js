import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from '../../features/login/actions'

import Home from '../../features/home/Home';
import Login from '../../features/login/Login';
import Overview from '../../features/overview/Overview';

class App extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    let isLogged, payload;
    if (this.props.isLogged) {
      isLogged = this.props.isLogged;
    } else {
      isLogged = localStorage.getItem('scopedToken') ? true : false;
      payload = JSON.parse(localStorage.getItem('identityData'));
      if (isLogged && payload) {
        this.props.dispatch(loginSuccess(payload));
      } else {
        isLogged = false;
      }
    }
    return (
      <BrowserRouter>
        <div>
            <Route exact path='/' component={Home} />

             <Route path='/login' render={() => 
              isLogged ? (
                <Redirect to='/overview' />
              ) : (
                <Login />
              )} /> 

            <Route path='/overview' component={Overview} />
        </div>
      </BrowserRouter>
    )
  } 
}

function mapStateToProps(state) {
  return {
    isLogged: state.isLogged
  }
}
export default connect(mapStateToProps, null)(App)