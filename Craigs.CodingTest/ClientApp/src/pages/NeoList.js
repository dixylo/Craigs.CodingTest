import React, { Component } from 'react';
import earth from '../assets/earth.png';
import { Neo } from '../components/Neo';
import './NeoList.css';
import {neos} from '../mock/neos';

class NeoList extends Component {
  state = {
    data: null,
    date: '',
    diameter_range: [],
  };

  componentDidMount () {
    // fetch('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY')
    //   .then(response => response.json())
    //   .then(data => {
    //     const date = Object.keys(data.near_earth_objects)[0];
    //     let diameter_min = 1000;
    //     let diameter_max = 0;
    //     data.near_earth_objects[date].forEach(neo => {
    //       const {
    //         estimated_diameter: {
    //           meters: {
    //             estimated_diameter_min, estimated_diameter_max
    //           }
    //         }
    //       } = neo;
    //       const diameter = Math.round((estimated_diameter_min + estimated_diameter_max) / 2);
    //       if (diameter_min > diameter ) diameter_min = diameter;
    //       if (diameter_max < diameter ) diameter_max = diameter;
    //     });
    //     this.setState({
    //       data,
    //       date,
    //       diameter_range: [diameter_min, diameter_max],
    //     });
    //   })
    //   .catch(err => console.log(err.message));

    const date = Object.keys(neos.near_earth_objects)[0];
    let diameter_min = 1000;
    let diameter_max = 0;
    neos.near_earth_objects[date].forEach(neo => {
      const {
        estimated_diameter: {
          meters: {
            estimated_diameter_min, estimated_diameter_max
          }
        }
      } = neo;
      const diameter = Math.round((estimated_diameter_min + estimated_diameter_max) / 2);
      if (diameter_min > diameter ) diameter_min = diameter;
      if (diameter_max < diameter ) diameter_max = diameter;
    });
    this.setState({
      data: neos,
      date: Object.keys(neos.near_earth_objects)[0],
      diameter_range: [diameter_min, diameter_max]
    });
  }

  render () {
    return (
      <div className='container'>
        <p className='date'>Date: {this.state.date}</p>
        {this.state.data
          && this.state.data.near_earth_objects[this.state.date]
          .map((neo, i) => {
            return (
              <Neo key={i} index={i} data={neo} diameterRange={this.state.diameter_range} />
            );
          }
        )}
        <div className='earth'><img className='earthImg' alt='earch' src={earth} /></div>
      </div>
    );
  }
}

export default NeoList;