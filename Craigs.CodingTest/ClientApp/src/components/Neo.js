import React from 'react';
import { Link } from 'react-router-dom';
import asteroid from '../assets/asteroid.png';
import './Neo.css';

const DIAMETER_SCALE_RANGE = [2, 5];
const DISTANCE_SCALE_RANGE = [20, 40];

function handleScale (original_value, original_range, scale_range) {
  const omin = original_range[0];
  const omax = original_range[1];
  const smin = scale_range[0];
  const smax = scale_range[1];
  return smin + (original_value - omin) * (smax - smin) / (omax - omin);
};

export const Neo = ({ index, data, count, diameterRange, distanceRange }) => {
  const {
    id,
    name,
    estimated_diameter: {
      meters: {
        estimated_diameter_min, estimated_diameter_max
      }
    },
    close_approach_data
  } = data;

  const diameter = (estimated_diameter_min + estimated_diameter_max) / 2;
  const scaled_diameter = handleScale(diameter, diameterRange, DIAMETER_SCALE_RANGE);

  const distance = close_approach_data[0].miss_distance.kilometers;
  const scaled_distance = handleScale(distance, distanceRange, DISTANCE_SCALE_RANGE);
  const x = scaled_distance * Math.cos(2 * Math.PI / count * index) + 50;
  const y = scaled_distance * Math.sin(2 * Math.PI / count * index) + 50;
  
  return (
    <div
      className='neo'
      style={{
        width: `${scaled_diameter}vw`,
        height: `${scaled_diameter}vw`,
        left: `${x}vw`,
        top: `${y}vh`
      }}
    >
      <Link to={`/neo/${id}`}>
        <img className='neoImg' alt={name} src={asteroid} />
      </Link>
      <div className={y > 50 ? 'tip above' : 'tip'}>
        <p>Name: {name}</p>
        <p>Diameter: ~{Math.round(diameter)} m</p>
        <p>Distance: {(distance / 1000000).toFixed(1)} Mkm</p>
      </div>
    </div>
  );
}