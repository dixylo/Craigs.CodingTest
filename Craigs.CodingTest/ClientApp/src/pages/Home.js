import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <div className='asteroid'></div>
        <div className='text'>
          <p className='title'>Finding Neo</p>
          <div className='intro'>
            <p>Everyday, Earth has some buddies around...</p>
            <p>They are called Near-Earth Objects, or NEOs.</p>
            <br />
            <Link to='/neos'>
              <button className='checkout'>Check out</button>
            </Link>
            &nbsp;who's hanging out with Earth today!
          </div>          
        </div>
      </div>
    );
  }
}

export default Home;