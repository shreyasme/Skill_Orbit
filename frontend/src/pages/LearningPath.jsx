import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Chip,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore,
  School,
  Link as LinkIcon,
  TrendingUp,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const LearningPath = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [learningPath, setLearningPath] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      fetchLearningPath();
    }
  }, [selectedRole]);

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
    }
  };

  const fetchLearningPath = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/learning-path?studentId=${user.id}&roleId=${selectedRole}`
      );
      setLearningPath(response.data);
    } catch (error) {
      console.error('Error fetching learning path:', error);
      toast.error('Failed to load learning path');
      setLearningPath([]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Learning Path
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Get personalized resource recommendations based on your skill gaps
      </Typography>

      {/* Role Selection */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <FormControl fullWidth>
          <InputLabel>Select Target Job Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select Target Job Role"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Learning Path Results */}
      {!loading && selectedRole && learningPath.length > 0 && (
        <Box>
          <Card sx={{ mb: 3, borderRadius: '12px', bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp sx={{ fontSize: 40 }} />
                <Box>
                  <Typography variant="h6">
                    Personalized Learning Recommendations
                  </Typography>
                  <Typography variant="body2">
                    {learningPath.length} skill{learningPath.length !== 1 ? 's' : ''} to improve
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {learningPath.map((skillGroup, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                borderRadius: '12px',
                '&:before': { display: 'none' },
                boxShadow: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  borderRadius: '12px',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <School color="primary" />
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {skillGroup.skillName}
                  </Typography>
                  <Chip
                    label={`${skillGroup.resources?.length || 0} resources`}
                    color="primary"
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {skillGroup.resources && skillGroup.resources.length > 0 ? (
                  <List>
                    {skillGroup.resources.map((resource, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: '8px',
                          mb: 1,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <ListItemIcon>
                          <LinkIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Link
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ fontWeight: 500 }}
                              >
                                {resource.name}
                              </Link>
                              <Chip
                                label={resource.difficulty || 'Intermediate'}
                                color={getDifficultyColor(resource.difficulty)}
                                size="small"
                              />
                            </Box>
                          }
                          secondary={resource.description || 'Recommended learning resource'}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No resources available for this skill yet.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!loading && selectedRole && learningPath.length === 0 && (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px' }}>
          <School sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Learning Path Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            You're already proficient in all required skills for this role, or no skill gaps were detected.
          </Typography>
        </Paper>
      )}

      {/* No Role Selected */}
      {!selectedRole && (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px' }}>
          <Typography variant="h6" color="text.secondary">
            Select a job role to view your personalized learning path
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default LearningPath;
