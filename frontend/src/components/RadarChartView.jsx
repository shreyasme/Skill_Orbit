import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

const RadarChartView = ({ data }) => {
  const theme = useTheme();

  // Transform data if needed
  const chartData = Array.isArray(data) ? data : [];

  if (chartData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No data available for visualization
        </Typography>
      </Box>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={chartData}>
        <PolarGrid stroke={theme.palette.divider} />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: theme.palette.text.primary, fontSize: 12 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={{ fill: theme.palette.text.secondary }}
        />
        <Radar
          name="Your Level"
          dataKey="studentLevel"
          stroke={theme.palette.primary.main}
          fill={theme.palette.primary.main}
          fillOpacity={0.6}
        />
        <Radar
          name="Required Level"
          dataKey="requiredLevel"
          stroke={theme.palette.secondary.main}
          fill={theme.palette.secondary.main}
          fillOpacity={0.6}
        />
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarChartView;
