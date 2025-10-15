import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from '@mui/material';
import {
  PictureAsPdf,
  Email,
  Assessment,
  Download,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const Reports = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get('/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to load roles');
    }
  };

  const handleDownloadPDF = async () => {
    if (!selectedRole) {
      toast.error('Please select a job role');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/reports/pdf?studentId=${user.id}&roleId=${selectedRole}`,
        {
          responseType: 'blob',
        }
      );

      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const roleName = roles.find(r => r.id === selectedRole)?.name || 'report';
      link.setAttribute(
        'download',
        `${roleName.replace(/\s+/g, '-')}-readiness-report-${Date.now()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download report');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!selectedRole) {
      toast.error('Please select a job role');
      return;
    }

    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/notifications/email', {
        studentId: user.id,
        roleId: selectedRole,
        email: email,
      });
      toast.success(`Report sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send report via email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Generate and download your skill readiness reports
      </Typography>

      {/* Report Configuration */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Typography variant="h6" gutterBottom>
          Report Configuration
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Job Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                label="Select Job Role"
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Report Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '12px',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <PictureAsPdf
                  sx={{ fontSize: 60, color: 'error.main', mb: 2 }}
                />
                <Typography variant="h6" gutterBottom>
                  Download PDF Report
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Generate a comprehensive readiness report with skill analysis,
                  gap identification, and recommendations
                </Typography>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                  onClick={handleDownloadPDF}
                  disabled={!selectedRole || loading}
                  fullWidth
                >
                  {loading ? 'Generating...' : 'Download PDF'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '12px',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Email sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Send via Email
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Receive your readiness report directly in your inbox. Perfect
                  for sharing with mentors or keeping records
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={loading ? <CircularProgress size={20} /> : <Email />}
                  onClick={handleSendEmail}
                  disabled={!selectedRole || !email || loading}
                  fullWidth
                >
                  {loading ? 'Sending...' : 'Send Email'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Report Info */}
      <Paper sx={{ p: 3, mt: 4, borderRadius: '12px', bgcolor: 'info.light' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Assessment sx={{ color: 'info.dark' }} />
          <Box>
            <Typography variant="h6" color="info.dark" gutterBottom>
              What's included in the report?
            </Typography>
            <Typography variant="body2" color="info.dark">
              • Overall readiness score for the selected role
              <br />
              • Detailed skill-by-skill comparison
              <br />
              • Identified skill gaps with priority levels
              <br />
              • Personalized learning recommendations
              <br />
              • Visual charts and progress indicators
              <br />• Timestamp and student information
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Reports;
