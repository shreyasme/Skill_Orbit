import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
} from '@mui/material';
import { PlayArrow, PictureAsPdf } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';
import RadarChartView from '../components/RadarChartView.jsx';

const Analysis = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

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

  const handleRunAnalysis = async () => {
    if (!selectedRole) {
      toast.error('Please select a job role');
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post('/analysis/run', {
        studentId: user.id,
        roleId: selectedRole,
      });
      setAnalysisResult(response.data);
      toast.success('Analysis completed successfully');
    } catch (error) {
      console.error('Error running analysis:', error);
      toast.error('Failed to run analysis');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    try {
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
      link.setAttribute('download', `gap-analysis-report-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report');
    }
  };

  const getReadinessColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getReadinessLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gap Analysis
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Analyze your skill readiness for specific job roles
      </Typography>

      {/* Role Selection */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
        <Grid container spacing={2} alignItems="center">
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
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
              onClick={handleRunAnalysis}
              disabled={!selectedRole || loading}
            >
              {loading ? 'Running Analysis...' : 'Run Gap Analysis'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Analysis Results */}
      {analysisResult && (
        <>
          {/* Readiness Score Card */}
          <Card
            sx={{
              mb: 4,
              borderRadius: '12px',
              bgcolor: 'primary.main',
              color: 'white',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom>
                    Readiness Score
                  </Typography>
                  <Typography variant="h2" fontWeight="bold">
                    {analysisResult.readiness}%
                  </Typography>
                  <Chip
                    label={getReadinessLabel(analysisResult.readiness)}
                    sx={{
                      mt: 2,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    startIcon={<PictureAsPdf />}
                    onClick={handleGeneratePDF}
                    sx={{ bgcolor: 'white', color: 'primary.main' }}
                  >
                    Download PDF Report
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          {analysisResult.chartData && (
            <Paper sx={{ p: 3, mb: 4, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>
                Skill Comparison
              </Typography>
              <RadarChartView data={analysisResult.chartData} />
            </Paper>
          )}

          {/* Missing Skills */}
          {analysisResult.missingSkills && analysisResult.missingSkills.length > 0 && (
            <Paper sx={{ p: 3, borderRadius: '12px' }}>
              <Typography variant="h6" gutterBottom>
                Skills Gap Analysis
              </Typography>
              <Alert severity="info" sx={{ mb: 2 }}>
                The following skills need improvement to meet the role requirements
              </Alert>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Skill</strong></TableCell>
                      <TableCell align="center"><strong>Required Level</strong></TableCell>
                      <TableCell align="center"><strong>Your Level</strong></TableCell>
                      <TableCell align="center"><strong>Gap</strong></TableCell>
                      <TableCell align="center"><strong>Priority</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {analysisResult.missingSkills.map((skill, index) => (
                      <TableRow key={index}>
                        <TableCell>{skill.skillName}</TableCell>
                        <TableCell align="center">{skill.requiredLevel}%</TableCell>
                        <TableCell align="center">{skill.currentLevel || 0}%</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${skill.gap}%`}
                            color={skill.gap > 50 ? 'error' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={skill.priority || (skill.gap > 50 ? 'High' : 'Medium')}
                            color={
                              skill.priority === 'High' || skill.gap > 50
                                ? 'error'
                                : skill.priority === 'Medium' || skill.gap > 30
                                ? 'warning'
                                : 'success'
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {analysisResult.missingSkills && analysisResult.missingSkills.length === 0 && (
            <Alert severity="success" sx={{ borderRadius: '12px' }}>
              <Typography variant="h6">Congratulations! 🎉</Typography>
              <Typography>
                You meet all the skill requirements for this role. Keep up the great work!
              </Typography>
            </Alert>
          )}
        </>
      )}

      {!analysisResult && (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '12px' }}>
          <Typography variant="h6" color="text.secondary">
            Select a job role and click "Run Gap Analysis" to see your readiness score
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Analysis;
