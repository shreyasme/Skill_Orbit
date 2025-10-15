# Skill Matrix & Gap Analysis Web Portal - Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Material-UI](https://img.shields.io/badge/Material--UI-5.14-007FFF?logo=mui)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

**A modern, feature-rich React application for tracking student skills, analyzing career readiness, and generating personalized learning paths.**

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Demo](#-screenshots)

</div>

---

## 📖 Overview

The **Skill Matrix & Gap Analysis Portal** is a comprehensive web application designed to help students:
- 📊 Track and manage their technical skills
- 🎯 Analyze readiness for specific job roles
- 📚 Receive personalized learning recommendations
- 📈 Monitor skill development progress
- 📄 Generate professional readiness reports

Built with **React 18**, **Material-UI**, and modern web technologies, this application provides an intuitive, responsive interface for career development and skill management.

---

## ⚡ Quick Start

```bash
# 1. Navigate to project directory
cd C:\Users\thanu\CascadeProjects\skill-matrix-portal

# 2. Navigate to frontend directory
cd frontend

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open browser at http://localhost:3000
```

**📚 For detailed setup instructions, see [QUICKSTART.md](QUICKSTART.md)**

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with secure token storage
- Protected routes with role-based access control
- Auto-logout on session expiry
- Password visibility toggle

### 📊 Dashboard
- Real-time readiness score visualization
- Skill statistics (Total, Mastered, In Progress)
- Quick navigation cards
- Gradient progress indicators

### 🎓 Skills Management
- Add, edit, and delete skills
- Proficiency slider (0-100%)
- Autocomplete skill search
- Visual proficiency indicators
- Level badges (Beginner → Expert)

### 💼 Roles Management (Admin)
- CRUD operations for job roles
- Assign skills with weights
- Core vs Secondary skill classification
- Skill requirement configuration

### 📈 Gap Analysis
- Interactive radar chart visualization
- Missing skills identification
- Priority-based recommendations
- Readiness score calculation
- PDF report generation

### 📚 Learning Path
- Personalized resource recommendations
- Grouped by skill gaps
- Difficulty level indicators
- Direct resource links
- Expandable skill sections

### 📊 Progress Tracking
- Skill status management (Not Started, In Progress, Mastered)
- Achievement badges (🥉 Bronze, 🥈 Silver, 🥇 Gold)
- Overall progress visualization
- Status update tracking

### 📄 Reports
- Download PDF readiness reports
- Email report delivery
- Comprehensive skill analysis
- Timestamped documentation

### 🎨 UI/UX Excellence
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- 🎯 Material-UI components
- 🔔 Toast notifications
- ⚡ Loading states
- 🎨 Smooth animations

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2 |
| **Material-UI** | Component Library | 5.14 |
| **React Router** | Client-side Routing | 6.20 |
| **Axios** | HTTP Client | 1.6 |
| **Recharts** | Data Visualization | 2.10 |
| **React Toastify** | Notifications | 9.1 |
| **Vite** | Build Tool | 5.0 |

---

## 📁 Project Structure

```
skill-matrix-portal/
├── frontend/                     # Frontend application
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js              # Axios config with JWT interceptors
│   │   ├── components/
│   │   │   ├── Navbar.js             # Top navigation bar
│   │   │   ├── Sidebar.js            # Side navigation menu
│   │   │   ├── ThemeToggle.js        # Dark/Light mode toggle
│   │   │   ├── SkillAutocomplete.js  # Skill search component
│   │   │   ├── RadarChartView.js     # Radar chart visualization
│   │   │   └── ProgressBadge.js      # Achievement badges
│   │   ├── pages/
│   │   │   ├── Login.js              # Authentication page
│   │   │   ├── Register.js           # User registration
│   │   │   ├── Dashboard.js          # Main dashboard
│   │   │   ├── Skills.js             # Skills management
│   │   │   ├── Roles.js              # Roles management (Admin)
│   │   │   ├── Analysis.js           # Gap analysis
│   │   │   ├── LearningPath.js       # Learning recommendations
│   │   │   ├── Progress.js           # Progress tracking
│   │   │   └── Reports.js            # Report generation
│   │   ├── context/
│   │   │   └── AuthContext.js        # Authentication context
│   │   ├── App.js                    # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── package.json                  # Dependencies
│   ├── vite.config.js               # Vite configuration
│   └── .eslintrc.cjs                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── README.md                     # This file
├── QUICKSTART.md                 # Quick start guide
├── SETUP.md                      # Detailed setup guide
├── FEATURES.md                   # Feature documentation
├── API_DOCUMENTATION.md          # API reference
└── DEPLOYMENT.md                 # Deployment guide
```

---

## 🎯 Key Pages

| Route | Page | Description | Access |
|-------|------|-------------|--------|
| `/login` | Login | User authentication | Public |
| `/register` | Register | New user registration | Public |
| `/dashboard` | Dashboard | Overview & statistics | Protected |
| `/skills` | Skills | Manage student skills | Protected |
| `/roles` | Roles | Job role management | Admin Only |
| `/analysis` | Analysis | Gap analysis with charts | Protected |
| `/learning-path` | Learning Path | Personalized recommendations | Protected |
| `/progress` | Progress | Track skill development | Protected |
| `/reports` | Reports | Generate PDF reports | Protected |

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

### Backend Requirements

This frontend expects a Spring Boot REST API backend with the following endpoints:

- **Authentication**: `/auth/login`, `/auth/register`
- **Students**: `/students/{id}/skills`, `/students/{id}/dashboard`
- **Skills**: `/skills`
- **Roles**: `/roles`, `/roles/{id}/skills`
- **Analysis**: `/analysis/run`, `/learning-path`
- **Reports**: `/reports/pdf`, `/notifications/email`

**📚 For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)**

---

## 📦 Available Scripts

All commands should be run from the `frontend` directory:

```bash
# Navigate to frontend
cd frontend

# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Create optimized production build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](QUICKSTART.md) | Get started in 5 minutes |
| [SETUP.md](SETUP.md) | Detailed installation guide |
| [FEATURES.md](FEATURES.md) | Complete feature documentation |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Backend API reference |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production deployment guide |

---

## 🎨 Screenshots

### Dashboard
![Dashboard with readiness score, statistics, and quick action cards]

### Gap Analysis
![Radar chart comparing student skills vs role requirements]

### Skills Management
![Skills table with proficiency sliders and level indicators]

### Learning Path
![Personalized resource recommendations grouped by skill]

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- **Docker**
- **Traditional Web Servers** (Apache/Nginx)

**📚 For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

---

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Secure token storage
- ✅ Auto-logout on session expiry
- ✅ Protected routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ XSS protection
- ✅ HTTPS ready

---

## 🎓 Use Cases

- **Students**: Track skills and career readiness
- **Educators**: Monitor student progress
- **Career Counselors**: Provide personalized guidance
- **HR Professionals**: Assess candidate readiness
- **Training Programs**: Measure learning outcomes

---

## 🤝 Contributing

This is a student project for skill gap analysis and learning path generation. Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- [Recharts](https://recharts.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## 📞 Support

For issues or questions:
1. Check the [QUICKSTART.md](QUICKSTART.md) guide
2. Review [FEATURES.md](FEATURES.md) documentation
3. Verify backend API connectivity
4. Check browser console for errors

---

<div align="center">

**Made with ❤️ for students to accelerate their career growth**

⭐ Star this repo if you find it helpful!

</div>
