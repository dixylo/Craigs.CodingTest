import React, { Component } from 'react';
import earth from '../assets/earth.png';
import './NeoList.css';

class NeoList extends Component {
  state = {
    data: null,
    date: '',
  };

  componentDidMount () {
    fetch('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY')
      .then(response => response.json())
      .then(data => {
        const date = Object.keys(data.near_earth_objects)[0];
        this.setState({
          data,
          date
        });
      })
      .catch(err => console.log(err.message));
  }

  render () {
    return (
      <div className='container'>
        <p className='date'>Date: {this.state.date}</p>
        <p className='date'>Count: {this.state.data && this.state.data.element_count}</p>
        <p className='date'>Name #1: {this.state.data && this.state.data.near_earth_objects[this.state.date][0].name}</p>
        <div className='earth'><img className='earthImg' alt='earch' src={earth} /></div>
      </div>
    );
  }
}

export default NeoList;