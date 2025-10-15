import React from 'react';
import { Box } from '@mui/material';

const SkillOrbitLogo = ({ size = 48, animated = false }) => {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
    >
      <img
        src={`/skillorbit-logo.png?v=${Date.now()}`}
        alt="SkillOrbit Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </Box>
  );
};

export default SkillOrbitLogo;
