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
  TextField,
  CircularProgress,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { Add, Edit, Delete, Settings } from '@mui/icons-material';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import SkillAutocomplete from '../components/SkillAutocomplete.jsx';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [skillDialogOpen, setSkillDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    id: null,
    name: '',
    coreWeight: 70,
    secondaryWeight: 30,
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [roleSkills, setRoleSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    skillId: null,
    skillName: '',
    weight: 50,
    type: 'core',
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleSkills = async (roleId) => {
    try {
      const response = await axiosInstance.get(`/roles/${roleId}/skills`);
      setRoleSkills(response.data);
    } catch (error) {
      console.error('Error fetching role skills:', error);
      toast.error('Failed to load role skills');
    }
  };

  const handleOpenDialog = (role = null) => {
    if (role) {
      setEditMode(true);
      setCurrentRole(role);
    } else {
      setEditMode(false);
      setCurrentRole({
        id: null,
        name: '',
        coreWeight: 70,
        secondaryWeight: 30,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSaveRole = async () => {
    if (!currentRole.name) {
      toast.error('Please enter a role name');
      return;
    }

    try {
      if (editMode) {
        await axiosInstance.put(`/roles/${currentRole.id}`, currentRole);
        toast.success('Role updated successfully');
      } else {
        await axiosInstance.post('/roles', currentRole);
        toast.success('Role created successfully');
      }
      fetchRoles();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving role:', error);
      toast.error('Failed to save role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!window.confirm('Are you sure you want to delete this role?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/roles/${roleId}`);
      toast.success('Role deleted successfully');
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
      toast.error('Failed to delete role');
    }
  };

  const handleManageSkills = (role) => {
    setSelectedRole(role);
    fetchRoleSkills(role.id);
    setSkillDialogOpen(true);
  };

  const handleAddSkillToRole = async () => {
    if (!newSkill.skillId) {
      toast.error('Please select a skill');
      return;
    }

    try {
      await axiosInstance.post(`/roles/${selectedRole.id}/skills`, {
        skillId: newSkill.skillId,
        weight: newSkill.weight,
        type: newSkill.type,
      });
      toast.success('Skill added to role');
      fetchRoleSkills(selectedRole.id);
      setNewSkill({
        skillId: null,
        skillName: '',
        weight: 50,
        type: 'core',
      });
    } catch (error) {
      console.error('Error adding skill to role:', error);
      toast.error('Failed to add skill');
    }
  };

  const handleRemoveSkillFromRole = async (skillId) => {
    try {
      await axiosInstance.delete(`/roles/${selectedRole.id}/skills/${skillId}`);
      toast.success('Skill removed from role');
      fetchRoleSkills(selectedRole.id);
    } catch (error) {
      console.error('Error removing skill:', error);
      toast.error('Failed to remove skill');
    }
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
        <Typography variant="h4">Job Roles Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Role
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Role Name</strong></TableCell>
              <TableCell align="center"><strong>Core Weight</strong></TableCell>
              <TableCell align="center"><strong>Secondary Weight</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 4 }}>
                    No roles defined yet. Click "Add Role" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              roles.map((role) => (
                <TableRow key={role.id} hover>
                  <TableCell>{role.name}</TableCell>
                  <TableCell align="center">{role.coreWeight}%</TableCell>
                  <TableCell align="center">{role.secondaryWeight}%</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="info"
                      onClick={() => handleManageSkills(role)}
                      size="small"
                      title="Manage Skills"
                    >
                      <Settings />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(role)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRole(role.id)}
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

      {/* Add/Edit Role Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Role' : 'Add New Role'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Role Name"
              value={currentRole.name}
              onChange={(e) =>
                setCurrentRole({ ...currentRole, name: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Core Weight (%)"
              type="number"
              value={currentRole.coreWeight}
              onChange={(e) =>
                setCurrentRole({ ...currentRole, coreWeight: parseInt(e.target.value) || 0 })
              }
              margin="normal"
              inputProps={{ min: 0, max: 100 }}
            />
            <TextField
              fullWidth
              label="Secondary Weight (%)"
              type="number"
              value={currentRole.secondaryWeight}
              onChange={(e) =>
                setCurrentRole({ ...currentRole, secondaryWeight: parseInt(e.target.value) || 0 })
              }
              margin="normal"
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveRole} variant="contained">
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Role Skills Dialog */}
      <Dialog
        open={skillDialogOpen}
        onClose={() => setSkillDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Manage Skills for {selectedRole?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {/* Add Skill Section */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>
                Add New Skill
              </Typography>
              <SkillAutocomplete
                onSkillSelect={(skill) =>
                  setNewSkill({ ...newSkill, skillId: skill.id, skillName: skill.name })
                }
                selectedSkill={newSkill.skillName}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  label="Weight"
                  type="number"
                  value={newSkill.weight}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, weight: parseInt(e.target.value) || 0 })
                  }
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  select
                  label="Type"
                  value={newSkill.type}
                  onChange={(e) => setNewSkill({ ...newSkill, type: e.target.value })}
                  SelectProps={{ native: true }}
                  sx={{ flex: 1 }}
                >
                  <option value="core">Core</option>
                  <option value="secondary">Secondary</option>
                </TextField>
                <Button
                  variant="contained"
                  onClick={handleAddSkillToRole}
                  disabled={!newSkill.skillId}
                >
                  Add
                </Button>
              </Box>
            </Paper>

            {/* Skills List */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Skill</strong></TableCell>
                    <TableCell align="center"><strong>Type</strong></TableCell>
                    <TableCell align="center"><strong>Weight</strong></TableCell>
                    <TableCell align="right"><strong>Action</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roleSkills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No skills assigned yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    roleSkills.map((skill) => (
                      <TableRow key={skill.id}>
                        <TableCell>{skill.skillName}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={skill.type}
                            color={skill.type === 'core' ? 'primary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">{skill.weight}%</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => handleRemoveSkillFromRole(skill.id)}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSkillDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Roles;
