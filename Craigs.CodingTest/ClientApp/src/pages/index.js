import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import NeoList from './NeoList';

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/neos' component={NeoList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Index;
