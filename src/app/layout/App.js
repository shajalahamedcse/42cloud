import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../../features/home/Home';
import Login from '../../features/login/Login';

function App() {
    return (
      <BrowserRouter>
        <div>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} /> 
        </div>
      </BrowserRouter>
    )
}
export default App;