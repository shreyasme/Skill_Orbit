import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Container,
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Dashboard as DashboardIcon,
  School,
  Work,
  Analytics,
  MenuBook,
  TrendingUp,
  Assessment,
  Quiz,
  EmojiEvents,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import SkillOrbitLogo from './SkillOrbitLogo.jsx';

const Navbar = ({ darkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleDashboard = () => {
    handleClose();
    navigate('/dashboard');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMobileMenuClose();
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Skills', icon: <School />, path: '/skills' },
    { text: 'Analysis', icon: <Analytics />, path: '/analysis' },
    { text: 'Assessment', icon: <Quiz />, path: '/assessment' },
    { text: 'Learning Path', icon: <MenuBook />, path: '/learning-path' },
    { text: 'Progress', icon: <TrendingUp />, path: '/progress' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
  ];

  if (isAdmin && isAdmin()) {
    menuItems.splice(2, 0, { text: 'Roles', icon: <Work />, path: '/roles' });
  }

  return (
    <AppBar 
      position="fixed" 
      elevation={2}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 2,
        borderColor: 'primary.main',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 70, md: 80 }, py: 1 }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleMobileMenuOpen}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                mr: 1.5,
                boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(124, 58, 237, 0.5)',
                },
              }}
            >
              <SkillOrbitLogo size={40} animated={true} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                  fontFamily: '"Poppins", "Segoe UI", sans-serif',
                }}
              >
                SkillOrbit
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                }}
              >
                Master Skills. Shape Future.
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={item.icon}
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  fontSize: '0.95rem',
                  px: 2.5,
                  py: 1.5,
                  borderRadius: '10px',
                  position: 'relative',
                  bgcolor: location.pathname === item.path ? 'primary.main' : 'transparent',
                  color: location.pathname === item.path ? 'white' : 'text.primary',
                  boxShadow: location.pathname === item.path ? '0 4px 12px rgba(30, 58, 138, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(30, 58, 138, 0.2)',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />

            <Tooltip title="Account">
              <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
                <Avatar
                  sx={{ 
                    width: 44, 
                    height: 44, 
                    bgcolor: 'primary.main',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* Account Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleDashboard}>
                <AccountCircle sx={{ mr: 1 }} fontSize="small" />
                Dashboard
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} fontSize="small" />
                Logout
              </MenuItem>
            </Menu>

            {/* Mobile Menu */}
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              sx={{ display: { md: 'none' } }}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.icon}
                    {item.text}
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
