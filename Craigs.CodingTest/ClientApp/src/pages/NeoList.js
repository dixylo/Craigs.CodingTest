import React, { Component } from 'react';
import earth from '../assets/earth.png';
import { Neo } from '../components/Neo';
import { Arrow } from '../components/Arrow';
import './NeoList.css';
import {neos} from '../mock/neos';

class NeoList extends Component {
  state = {
    data: null,
    date: '',
    count: 0,
    diameter_range: [],
    distance_range: []
  };

  componentDidMount () {
    this.fetchData('https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY');
  }

  fetchData (link) {
    fetch(link)
      .then(response => response.json())
      .then(data => this.init(data))
      .catch(err => {
        console.log(err.message);
        this.init(neos); // use mock data
      }); 
  }

  init = (data) => {
    const date = Object.keys(data.near_earth_objects)[0];
    const count = data.element_count;
    let diameter_min = 1000;
    let diameter_max = 0;
    let distance_min = 100000000;
    let distance_max = 0;
    data.near_earth_objects[date].forEach(neo => {
      const {
        estimated_diameter: {
          meters: {
            estimated_diameter_min, estimated_diameter_max
          }
        },
        close_approach_data
      } = neo;
      const diameter = Math.round((estimated_diameter_min + estimated_diameter_max) / 2);
      const distance = Math.round(close_approach_data[0].miss_distance.kilometers);
      if (diameter_min > diameter ) diameter_min = diameter;
      if (diameter_max < diameter ) diameter_max = diameter;
      if (distance_min > distance ) distance_min = distance;
      if (distance_max < distance ) distance_max = distance;
    });
    this.setState({
      data,
      date,
      count,
      diameter_range: [diameter_min, diameter_max],
      distance_range: [distance_min, distance_max]
    });
  };

  showAnotherDay = (direction) => {
    const { links: { prev, next } } = this.state.data;
    const link = direction === 'left' ? prev : next;
    this.fetchData(link);    
  };

  render () {
    return (
      <div className='container'>
        <p className='date'>Date: {this.state.date}</p>
        {this.state.data
          && this.state.data.near_earth_objects[this.state.date]
          .map((neo, i) => {
            const { count, diameter_range, distance_range } = this.state;
            return (
              <Neo
                key={i}
                index={i}
                data={neo}
                count={count}
                diameterRange={diameter_range}
                distanceRange={distance_range}
              />
            );
          }
        )}
        <div className='earth'><img className='earthImg' alt='earch' src={earth} /></div>
        <Arrow
          direction="left"
          onClick={this.showAnotherDay}
        />
        <Arrow
          direction="right"
          onClick={this.showAnotherDay}
        />
      </div>
    );
  }
}

export default NeoList;