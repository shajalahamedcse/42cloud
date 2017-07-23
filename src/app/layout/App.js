import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import moment from 'moment';
import Home from '../../features/home/components/Home';
import Login from '../../features/login/Login';
import Console from '../../features/console/Console';
import { loadTokenData } from 'features/login/actions';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route {...rest} render={(para) => {
    return (
      authed ?
      <Component {...para} /> :
      <Redirect to={{
        pathname: '/login',
        state: { referrer: para.location.pathname }
      }}/>
    );
  }} />
);

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isLogged = this.props.isLogged;
    if (!isLogged) {
      let scopedToken = localStorage.getItem('scopedToken');
      let expiresAt = localStorage.getItem('expires_at');
      if (scopedToken && (expiresAt > moment.utc().format())) {
        isLogged = true;
        this.props.dispatch(loadTokenData(scopedToken));
      } else {
        isLogged = false;
      }
    }

    return (
      <BrowserRouter>
        <div style={{height: '100%'}}>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />

          <PrivateRoute
            authed={isLogged}
            path='/console/:feature'
            component={Console}
          />
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

export default connect(mapStateToProps, null)(App);