import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTokenData } from '../../features/login/actions'

import Home from '../../features/home/Home';
import Login from '../../features/login/Login';
import Overview from '../../features/overview/Overview';

class App extends Component { 
  constructor(props) {
    super(props);
  }

  render() {
    let isLogged, payload, scopedToken;

    if (this.props.isLogged) {
      isLogged = true;
    } else {
      scopedToken = localStorage.getItem('scopedToken'); 
      if (scopedToken) {
        isLogged = true;
        this.props.dispatch(loadTokenData(scopedToken));
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
    isLogged: state.auth.isLogged
  }
}
export default connect(mapStateToProps, null)(App)