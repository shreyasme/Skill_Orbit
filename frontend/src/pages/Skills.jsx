import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import SkillAutocomplete from '../components/SkillAutocomplete.jsx';

const Skills = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    id: null,
    skillId: null,
    skillName: '',
    proficiency: 50,
  });

  useEffect(() => {
    fetchStudentSkills();
  }, []);

  const fetchStudentSkills = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/students/${user.id}/skills`);
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (skill = null) => {
    if (skill) {
      setEditMode(true);
      setCurrentSkill({
        id: skill.id,
        skillId: skill.skillId,
        skillName: skill.skillName,
        proficiency: skill.proficiency,
      });
    } else {
      setEditMode(false);
      setCurrentSkill({
        id: null,
        skillId: null,
        skillName: '',
        proficiency: 50,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentSkill({
      id: null,
      skillId: null,
      skillName: '',
      proficiency: 50,
    });
  };

  const handleSkillSelect = (skill) => {
    setCurrentSkill((prev) => ({
      ...prev,
      skillId: skill.id,
      skillName: skill.name,
    }));
  };

  const handleProficiencyChange = (event, newValue) => {
    setCurrentSkill((prev) => ({
      ...prev,
      proficiency: newValue,
    }));
  };

  const handleSaveSkill = async () => {
    if (!currentSkill.skillId) {
      toast.error('Please select a skill');
      return;
    }

    try {
      if (editMode) {
        // Update existing skill
        await axiosInstance.put(`/students/${user.id}/skills/${currentSkill.id}`, {
          proficiency: currentSkill.proficiency,
        });
        toast.success('Skill updated successfully');
      } else {
        // Add new skill
        await axiosInstance.post(`/students/${user.id}/skills`, {
          skillId: currentSkill.skillId,
          proficiency: currentSkill.proficiency,
        });
        toast.success('Skill added successfully');
      }
      fetchStudentSkills();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/students/${user.id}/skills/${skillId}`);
      toast.success('Skill deleted successfully');
      fetchStudentSkills();
    } catch (error) {
      console.error('Error deleting skill:', error);
      toast.error('Failed to delete skill');
    }
  };

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 80) return 'success';
    if (proficiency >= 50) return 'warning';
    return 'error';
  };

  const getProficiencyLabel = (proficiency) => {
    if (proficiency >= 80) return 'Expert';
    if (proficiency >= 60) return 'Advanced';
    if (proficiency >= 40) return 'Intermediate';
    return 'Beginner';
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">My Skills</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Skill Name</strong></TableCell>
              <TableCell align="center"><strong>Proficiency</strong></TableCell>
              <TableCell align="center"><strong>Level</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No skills added yet. Click "Add Skill" to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill) => (
                <TableRow key={skill.id} hover>
                  <TableCell>{skill.skillName}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
                        <Slider
                          value={skill.proficiency}
                          disabled
                          color={getProficiencyColor(skill.proficiency)}
                        />
                      </Box>
                      <Typography variant="body2">{skill.proficiency}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getProficiencyLabel(skill.proficiency)}
                      color={getProficiencyColor(skill.proficiency)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(skill)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteSkill(skill.id)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Skill Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {!editMode && (
              <SkillAutocomplete
                onSkillSelect={handleSkillSelect}
                selectedSkill={currentSkill.skillName}
              />
            )}
            {editMode && (
              <Typography variant="h6" sx={{ mb: 2 }}>
                {currentSkill.skillName}
              </Typography>
            )}

            <Typography gutterBottom sx={{ mt: 3 }}>
              Proficiency Level: {currentSkill.proficiency}%
            </Typography>
            <Slider
              value={currentSkill.proficiency}
              onChange={handleProficiencyChange}
              valueLabelDisplay="auto"
              step={5}
              marks
              min={0}
              max={100}
              color={getProficiencyColor(currentSkill.proficiency)}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Beginner
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Expert
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveSkill}
            variant="contained"
            disabled={!currentSkill.skillId}
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Skills;
