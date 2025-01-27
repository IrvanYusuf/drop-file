import { Stack } from '@mui/material';
import React from 'react';
import SelectedCircle from './SelectedCirle';

export function TeethDisplay({ selected, onSelect }) {
  const handleClick = (position) => onSelect(position);

  const circles = [
    { x: 36, y: 190, size: 12, position: 18 },
    { x: 38, y: 159, size: 12, position: 17 },
    { x: 42, y: 120, size: 12, position: 16 },
    { x: 47, y: 90, size: 12, position: 15 },
    { x: 55, y: 67, size: 11, position: 14 },
    { x: 63, y: 45, size: 11, position: 13 },
    { x: 84, y: 32, size: 11, position: 12 },
    { x: 110, y: 27, size: 11, position: 11 },
    { x: 141, y: 27, size: 11, position: 21 },
    { x: 167, y: 32, size: 11, position: 22 },
    { x: 188, y: 45, size: 11, position: 23 },
    { x: 196, y: 67, size: 11, position: 24 },
    { x: 204, y: 90, size: 11, position: 25 },
    { x: 209, y: 120, size: 12, position: 26 },
    { x: 213, y: 159, size: 12, position: 27 },
    { x: 215, y: 190, size: 12, position: 28 },
    { x: 36, y: 255, size: 12, position: 48 },
    { x: 37, y: 286, size: 12, position: 47 },
    { x: 47, y: 325, size: 11, position: 46 },
    { x: 56, y: 355, size: 11, position: 45 },
    { x: 65, y: 380, size: 11, position: 44 },
    { x: 72, y: 400, size: 9, position: 43 },
    { x: 92, y: 407, size: 9, position: 42 },
    { x: 113, y: 409, size: 9, position: 41 },
    { x: 137, y: 409, size: 9, position: 31 },
    { x: 158, y: 407, size: 9, position: 32 },
    { x: 178, y: 400, size: 9, position: 33 },
    { x: 185, y: 380, size: 11, position: 34 },
    { x: 194, y: 355, size: 11, position: 35 },
    { x: 203, y: 325, size: 11, position: 36 },
    { x: 213, y: 286, size: 12, position: 37 },
    { x: 214, y: 255, size: 12, position: 38 },
  ];

  return (
    <Stack justifyContent="center" alignItems="center">
      <svg
        style={{ backgroundImage: 'url(/assets/images/teeth-set.png)', height: 432, width: 250 }}
      >
        {circles.map(({ x, y, size, position }) => (
          <SelectedCircle
            key={position}
            x={x}
            y={y}
            size={size}
            position={position}
            selected={selected}
            onClick={handleClick}
          />
        ))}
      </svg>
    </Stack>
  );
}
