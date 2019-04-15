import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import asteroid from '../assets/asteroid.png';
import skytower from '../assets/skytower.png';
import { neo } from '../mock/neo';
import './NeoDetail.css';

const SKY_TOWER_HEIGHT = 328;
const MAX_HEIGHT_SCALED = 80;

class NeoDetail extends Component {
  state = {
    data: null
  };

  componentDidMount () {
    if (this.props.match) {
      const { id } = this.props.match.params;
      fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`)
        .then(response => response.json())
        .then(data => this.setState({ data }))
        .catch(err => {
          console.log(err.message);
          this.setState({ data: neo });
        });
    }
  }

  handleScale = () => {
    if (!this.state.data || !this.state.data.estimated_diameter) return { neoStyle: {}, towerStyle: {} };
    const {
      estimated_diameter: {
        meters: {
          estimated_diameter_min, estimated_diameter_max
        }
      }
    } = this.state.data;
    const diameter = Math.round((estimated_diameter_min + estimated_diameter_max) / 2);

    let neoStyle;
    let towerStyle;
    if (diameter > SKY_TOWER_HEIGHT) {
      neoStyle = { width: `${MAX_HEIGHT_SCALED}vh`, height: `${MAX_HEIGHT_SCALED}vh` };
      towerStyle = { height: `${MAX_HEIGHT_SCALED * SKY_TOWER_HEIGHT / diameter}vh` };
    } else {
      neoStyle = {
        width: `${MAX_HEIGHT_SCALED * diameter / SKY_TOWER_HEIGHT}vh`,
        height: `${MAX_HEIGHT_SCALED * diameter / SKY_TOWER_HEIGHT}vh`
      };
      towerStyle = { height: `${MAX_HEIGHT_SCALED}vh` };
    }

    return { neoStyle, towerStyle };
  };

  render () {
    return (
      <div className='detail-container'>
        <div className='img-container'>
          <img 
            className='towerImg'
            alt='sky tower'
            src={skytower}
            style={this.handleScale().towerStyle}
          />
          <img
            className='asteroidImg'
            alt='asteroid'
            src={asteroid}
            style={this.handleScale().neoStyle}
          />
        </div>
        <div className='details'>
          <p>Did you know?</p>
          <p>
            Our Neo is called&nbsp;
            {this.state.data && this.state.data.name}.
          </p>
          <p>
            He is&nbsp;
            {this.state.data && Math.round(
              this.state.data.estimated_diameter.meters.estimated_diameter_min
            )}~
            {this.state.data && Math.round(
              this.state.data.estimated_diameter.meters.estimated_diameter_max
            )} meters big,
            while our sky tower is 328 meters tall.
          </p>
          <p>
            He is flying by at a speed of&nbsp;
            {this.state.data && Math.round(
              this.state.data.close_approach_data[0].relative_velocity.kilometers_per_second
            )} km/s,
          </p>
          <p>
            but is&nbsp;
            {this.state.data &&
              (this.state.data.close_approach_data[0].miss_distance.kilometers / 1000000).toFixed(1)
            } Mkm away from us,
          </p>
          <p>
            and as dim as a candle&nbsp;
            {/* definitely not a correct mapping relation, just to show an analogy */}
            {this.state.data && this.state.data.absolute_magnitude_h} km away,
          </p>
          <p>
            so no worries about this little buddy.
          </p>
          <Link to='/neos'>
            <button className='checkout'>Return</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NeoDetail;