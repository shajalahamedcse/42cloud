import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadTokenData } from '../../features/login/actions'
import Home from '../../features/home/Home';
import Login from '../../features/login/Login';
import Console from '../../features/console/Console';

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
    let isLogged, scopedToken;

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
export default connect(mapStateToProps, null)(App)