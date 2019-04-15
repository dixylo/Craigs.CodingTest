import React from 'react';
import './Arrow.css';

export const Arrow = ({ direction, onClick }) => (
  <div
    className={`arrow ${direction}`}
    onClick={() => { onClick(direction); }}
  >
    {direction === 'left' ? <span>&#10094;</span> : <span>&#10095;</span>}
  </div>
);