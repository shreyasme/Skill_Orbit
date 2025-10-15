import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  LinearProgress,
  CircularProgress,
  Paper,
  Chip,
} from '@mui/material';
import {
  School,
  Analytics,
  Assessment,
  MenuBook,
  TrendingUp,
  EmojiEvents,
  Timeline,
  Category,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    readinessScore: 0,
    totalSkills: 0,
    masteredSkills: 0,
    inProgressSkills: 0,
    skillsData: [],
    skillsByCategory: [],
    weeklyProgress: [],
    proficiencyDistribution: [],
  });

  // Professional colors for charts
  const COLORS = ['#1e3a8a', '#3b82f6', '#059669', '#d97706', '#dc2626', '#0891b2'];
  const CATEGORY_COLORS = {
    Frontend: '#3b82f6',
    Backend: '#1e3a8a',
    DevOps: '#d97706',
    Cloud: '#059669',
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch student dashboard data
      const response = await axiosInstance.get(`/students/${user.id}/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default values if API fails
      setDashboardData({
        readinessScore: 0,
        totalSkills: 0,
        masteredSkills: 0,
        inProgressSkills: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'My Skills',
      description: 'Manage and update your skills',
      icon: <School sx={{ fontSize: 40 }} />,
      color: '#1e3a8a',
      path: '/skills',
    },
    {
      title: 'Gap Analysis',
      description: 'Analyze readiness for job roles',
      icon: <Analytics sx={{ fontSize: 40 }} />,
      color: '#dc2626',
      path: '/analysis',
    },
    {
      title: 'Learning Path',
      description: 'Get personalized recommendations',
      icon: <MenuBook sx={{ fontSize: 40 }} />,
      color: '#059669',
      path: '/learning-path',
    },
    {
      title: 'Reports',
      description: 'Download readiness reports',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#d97706',
      path: '/reports',
    },
  ];

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
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section with Animation */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
          }}
        >
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Track your skills, analyze gaps, and accelerate your career growth
        </Typography>
      </Box>

      {/* Top Stats Row with Gradient Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Readiness Score - Large Card */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: '12px',
              bgcolor: 'primary.main',
              color: 'white',
              height: '100%',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEvents sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Overall Readiness
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 3 }}>
                <Typography variant="h1" fontWeight="bold" sx={{ mr: 1 }}>
                  {dashboardData.readinessScore}
                </Typography>
                <Typography variant="h4">%</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={dashboardData.readinessScore}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: 'white',
                    borderRadius: 6,
                  },
                }}
              />
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.9 }}>
                Keep learning to reach 100% readiness!
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats Mini Cards */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card 
                sx={{ 
                  borderRadius: '12px',
                  bgcolor: 'info.main',
                  color: 'white',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <School sx={{ fontSize: 36, mb: 1 }} />
                  <Typography variant="h3" fontWeight="bold">
                    {dashboardData.totalSkills}
                  </Typography>
                  <Typography variant="body1">Total Skills</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card 
                sx={{ 
                  borderRadius: '12px',
                  bgcolor: 'success.main',
                  color: 'white',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <TrendingUp sx={{ fontSize: 36, mb: 1 }} />
                  <Typography variant="h3" fontWeight="bold">
                    {dashboardData.masteredSkills}
                  </Typography>
                  <Typography variant="body1">Mastered</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card 
                sx={{ 
                  borderRadius: '12px',
                  bgcolor: 'warning.main',
                  color: 'white',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h3" fontWeight="bold">
                        {dashboardData.inProgressSkills}
                      </Typography>
                      <Typography variant="body1">In Progress</Typography>
                    </Box>
                    <Timeline sx={{ fontSize: 48 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Skills Proficiency Bar Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Skills Proficiency Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="proficiency" fill="#1e3a8a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Proficiency Distribution Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Skill Levels
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.proficiencyDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ level, count }) => `${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {dashboardData.proficiencyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Weekly Progress Line Chart */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Weekly Progress
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dashboardData.weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="skills" 
                    stroke="#1e3a8a" 
                    strokeWidth={3}
                    dot={{ fill: '#1e3a8a', r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills by Category */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ borderRadius: '12px' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Skills by Category
              </Typography>
              <Box sx={{ mt: 2 }}>
                {dashboardData.skillsByCategory.map((cat, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Category sx={{ color: CATEGORY_COLORS[cat.category] || '#666' }} />
                        <Typography variant="body1" fontWeight="600">
                          {cat.category}
                        </Typography>
                        <Chip 
                          label={`${cat.count} skills`} 
                          size="small" 
                          sx={{ bgcolor: `${CATEGORY_COLORS[cat.category]}20` }}
                        />
                      </Box>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        {cat.avgProficiency.toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={cat.avgProficiency}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: CATEGORY_COLORS[cat.category] || '#666',
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              sx={{
                borderRadius: '16px',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardActionArea
                onClick={() => navigate(action.path)}
                sx={{ height: '100%', p: 3 }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${action.color}15`,
                        color: action.color,
                        mb: 2,
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom fontWeight="600">
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
