import React from 'react';
import { Box, Tooltip } from '@mui/material';

const ProgressBadge = ({ level }) => {
  const badges = {
    bronze: {
      emoji: '🥉',
      label: 'Bronze - Good Start',
      color: '#CD7F32',
    },
    silver: {
      emoji: '🥈',
      label: 'Silver - Well Done',
      color: '#C0C0C0',
    },
    gold: {
      emoji: '🥇',
      label: 'Gold - Excellent',
      color: '#FFD700',
    },
  };

  if (!level || !badges[level]) {
    return (
      <Box sx={{ fontSize: 24, opacity: 0.3 }}>
        -
      </Box>
    );
  }

  const badge = badges[level];

  return (
    <Tooltip title={badge.label}>
      <Box
        sx={{
          fontSize: 32,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'scale(1.2)',
          },
        }}
      >
        {badge.emoji}
      </Box>
    </Tooltip>
  );
};

export default ProgressBadge;
