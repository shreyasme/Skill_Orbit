import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Toolbar } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

// Components
import Navbar from './components/Navbar.jsx';

// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Skills from './pages/Skills.jsx';
import Roles from './pages/Roles.jsx';
import Analysis from './pages/Analysis.jsx';
import Assessment from './pages/Assessment.jsx';
import LearningPath from './pages/LearningPath.jsx';
import Progress from './pages/Progress.jsx';
import Reports from './pages/Reports.jsx';

// Protected Route Component - DISABLED FOR DEMO (No login required)
const ProtectedRoute = ({ children }) => {
  // Skip authentication check - allow direct access to all pages
  return children;
};

// Admin Route Component - DISABLED FOR DEMO (No login required)
const AdminRoute = ({ children }) => {
  // Skip authentication and admin check - allow direct access
  return children;
};

// Main Layout Component
const MainLayout = ({ darkMode, toggleTheme, children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

// App Content Component (needs to be inside AuthProvider)
const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: '#1e3a8a', // Professional navy blue
            light: '#3b82f6',
            dark: '#1e40af',
          },
          secondary: {
            main: '#64748b', // Professional slate gray
            light: '#94a3b8',
            dark: '#475569',
          },
          success: {
            main: '#059669', // Professional green
            light: '#10b981',
            dark: '#047857',
          },
          warning: {
            main: '#d97706', // Professional amber
            light: '#f59e0b',
            dark: '#b45309',
          },
          error: {
            main: '#dc2626', // Professional red
            light: '#ef4444',
            dark: '#b91c1c',
          },
          info: {
            main: '#0891b2', // Professional cyan
            light: '#06b6d4',
            dark: '#0e7490',
          },
          background: {
            default: darkMode ? '#0f172a' : '#f8fafc',
            paper: darkMode ? '#1e293b' : '#ffffff',
          },
          text: {
            primary: darkMode ? '#f1f5f9' : '#1e293b',
            secondary: darkMode ? '#94a3b8' : '#64748b',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          h4: { fontWeight: 600 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
                fontWeight: 500,
                padding: '8px 16px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: darkMode 
                  ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)' 
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [darkMode]
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes - Available without layout */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Skills />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/analysis"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Analysis />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Assessment />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning-path"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <LearningPath />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Progress />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Reports />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/roles"
            element={
              <AdminRoute>
                <MainLayout darkMode={darkMode} toggleTheme={toggleTheme}>
                  <Roles />
                </MainLayout>
              </AdminRoute>
            }
          />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </ThemeProvider>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
