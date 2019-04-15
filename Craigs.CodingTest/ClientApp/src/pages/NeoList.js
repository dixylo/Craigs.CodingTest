import React, { Component } from 'react';
import earth from '../assets/earth.png';
import './NeoList.css';

class NeoList extends Component {
  render () {
    return (
      <div className='container'>
        <p className='date'>2019-04-15</p>
        <div className='earth'><img className='earthImg' alt='earch' src={earth} /></div>
      </div>
    );
  }
}

export default NeoList;