import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  Chip,
  LinearProgress,
} from '@mui/material';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import ProgressBadge from '../components/ProgressBadge.jsx';

const Progress = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/students/${user.id}/progress`);
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
      // Fallback to skills endpoint if progress endpoint doesn't exist
      try {
        const response = await axiosInstance.get(`/students/${user.id}/skills`);
        setSkills(response.data.map(skill => ({
          ...skill,
          status: skill.proficiency >= 80 ? 'Mastered' : skill.proficiency >= 40 ? 'In Progress' : 'Not Started'
        })));
      } catch (err) {
        toast.error('Failed to load progress data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (skillId, newStatus) => {
    try {
      await axiosInstance.put(`/students/${user.id}/progress/${skillId}`, {
        status: newStatus,
      });
      toast.success('Progress updated successfully');
      fetchProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Mastered':
        return 'success';
      case 'In Progress':
        return 'warning';
      case 'Not Started':
        return 'default';
      default:
        return 'default';
    }
  };

  const getBadgeLevel = (proficiency) => {
    if (proficiency >= 80) return 'gold';
    if (proficiency >= 60) return 'silver';
    if (proficiency >= 40) return 'bronze';
    return null;
  };

  const getOverallProgress = () => {
    if (skills.length === 0) return 0;
    const totalProficiency = skills.reduce((sum, skill) => sum + (skill.proficiency || 0), 0);
    return Math.round(totalProficiency / skills.length);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Progress Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Monitor your skill development journey
      </Typography>

      {/* Overall Progress Card */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom>
          Overall Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress
              variant="determinate"
              value={getOverallProgress()}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            {getOverallProgress()}%
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Chip
            label={`${skills.filter(s => s.status === 'Mastered').length} Mastered`}
            color="success"
          />
          <Chip
            label={`${skills.filter(s => s.status === 'In Progress').length} In Progress`}
            color="warning"
          />
          <Chip
            label={`${skills.filter(s => s.status === 'Not Started').length} Not Started`}
            color="default"
          />
        </Box>
      </Paper>

      {/* Skills Progress Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Skill Name</strong></TableCell>
              <TableCell align="center"><strong>Proficiency</strong></TableCell>
              <TableCell align="center"><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Achievement</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No skills to track yet. Add skills to start tracking your progress.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id} hover>
                  <TableCell>{skill.skillName}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1, maxWidth: 150 }}>
                        <LinearProgress
                          variant="determinate"
                          value={skill.proficiency}
                          color={
                            skill.proficiency >= 80
                              ? 'success'
                              : skill.proficiency >= 50
                              ? 'warning'
                              : 'error'
                          }
                        />
                      </Box>
                      <Typography variant="body2">{skill.proficiency}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <Select
                        value={skill.status || 'Not Started'}
                        onChange={(e) => handleStatusChange(skill.id, e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="Not Started">Not Started</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Mastered">Mastered</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <ProgressBadge level={getBadgeLevel(skill.proficiency)} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Progress;
