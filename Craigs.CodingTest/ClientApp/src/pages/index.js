import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import NeoList from './NeoList';
import NeoDetail from './NeoDetail';

class Index extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/neos' component={NeoList} />
          <Route path='/neo/:id' component={NeoDetail} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Index;
