import React from 'react';
import asteroid from '../assets/asteroid.png';
import './Neo.css';

const DIAMETER_SCALE_RANGE = [2, 5];

function handleScale (original_value, original_range, scale_range) {
  const omin = original_range[0];
  const omax = original_range[1];
  const smin = scale_range[0];
  const smax = scale_range[1];
  return smin + (original_value - omin) * (smax - smin) / (omax - omin);
};

export const Neo = ({ index, data, diameterRange }) => {
  const {
    name,
    estimated_diameter: {
      meters: {
        estimated_diameter_min, estimated_diameter_max
      }
    }
  } = data;

  const diameter = (estimated_diameter_min + estimated_diameter_max) / 2;
  const scaled_diameter = handleScale(diameter, diameterRange, DIAMETER_SCALE_RANGE);
  // console.log(diameterRange)
  return (
    <div
      className='neo'
      style={{
        width: `${scaled_diameter}vw`,
        height: `${scaled_diameter}vw`,
        top: `${index * 10}vh`,
        left: `${index * 10}vw`
      }}
    >
      <img className='neoImg' alt={name} src={asteroid} />
      <p>Name: {name}</p>
    </div>
  );
}