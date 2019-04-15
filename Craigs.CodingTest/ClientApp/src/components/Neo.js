import React from 'react';
import asteroid from '../assets/asteroid.png';
import './Neo.css';

export const Neo = ({ data }) => {
  const { name } = data;

  return (
    <div className='neo'>
      <img className='neoImg' alt={name} src={asteroid} />
      <p>Name: {name}</p>
    </div>
  );
}