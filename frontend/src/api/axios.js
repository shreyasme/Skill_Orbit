import axios from 'axios';
import { toast } from 'react-toastify';

// MOCK MODE - Set to true to use mock data without backend
const USE_MOCK_DATA = true;

// Mock data
const mockRoles = [
  { id: 1, name: 'Frontend Developer', description: 'Builds user interfaces' },
  { id: 2, name: 'Backend Developer', description: 'Develops server-side logic' },
  { id: 3, name: 'Full Stack Developer', description: 'Works on both frontend and backend' },
];

const mockSkills = [
  { id: 1, skillId: 1, skillName: 'React', proficiency: 80, category: 'Frontend' },
  { id: 2, skillId: 2, skillName: 'Node.js', proficiency: 70, category: 'Backend' },
  { id: 3, skillId: 3, skillName: 'JavaScript', proficiency: 85, category: 'Programming' },
  { id: 4, skillId: 4, skillName: 'Python', proficiency: 75, category: 'Backend' },
  { id: 5, skillId: 5, skillName: 'Docker', proficiency: 60, category: 'DevOps' },
];

const mockAllSkills = [
  { id: 1, name: 'React', category: 'Frontend' },
  { id: 2, name: 'Node.js', category: 'Backend' },
  { id: 3, name: 'JavaScript', category: 'Programming' },
  { id: 4, name: 'Python', category: 'Programming' },
  { id: 5, name: 'Java', category: 'Programming' },
];

const mockDashboardData = {
  readinessScore: 75,
  totalSkills: 15,
  masteredSkills: 8,
  inProgressSkills: 7,
  skillsData: [
    { name: 'React', proficiency: 85, category: 'Frontend' },
    { name: 'Node.js', proficiency: 75, category: 'Backend' },
    { name: 'JavaScript', proficiency: 90, category: 'Frontend' },
    { name: 'Python', proficiency: 70, category: 'Backend' },
    { name: 'Docker', proficiency: 60, category: 'DevOps' },
  ],
  skillsByCategory: [
    { category: 'Frontend', count: 6, avgProficiency: 82 },
    { category: 'Backend', count: 5, avgProficiency: 73 },
    { category: 'DevOps', count: 3, avgProficiency: 65 },
    { category: 'Cloud', count: 1, avgProficiency: 55 },
  ],
  weeklyProgress: [
    { week: 'Week 1', skills: 3 },
    { week: 'Week 2', skills: 5 },
    { week: 'Week 3', skills: 7 },
    { week: 'Week 4', skills: 10 },
  ],
  proficiencyDistribution: [
    { range: 'Beginner (0-40)', count: 2 },
    { range: 'Intermediate (41-70)', count: 5 },
    { range: 'Advanced (71-90)', count: 6 },
    { range: 'Expert (91-100)', count: 2 },
  ],
};

const mockAnalysisResult = {
  readiness: 68,
  chartData: [
    { skill: 'React', required: 85, current: 80 },
    { skill: 'JavaScript', required: 90, current: 85 },
    { skill: 'TypeScript', required: 75, current: 45 },
    { skill: 'Node.js', required: 80, current: 70 },
    { skill: 'Testing', required: 70, current: 30 },
    { skill: 'Docker', required: 60, current: 40 },
  ],
  missingSkills: [
    {
      skillName: 'TypeScript',
      requiredLevel: 75,
      currentLevel: 45,
      gap: 30,
      priority: 'High',
    },
    {
      skillName: 'Testing (Jest/Vitest)',
      requiredLevel: 70,
      currentLevel: 30,
      gap: 40,
      priority: 'High',
    },
    {
      skillName: 'Docker',
      requiredLevel: 60,
      currentLevel: 40,
      gap: 20,
      priority: 'Medium',
    },
    {
      skillName: 'Node.js',
      requiredLevel: 80,
      currentLevel: 70,
      gap: 10,
      priority: 'Low',
    },
  ],
};

const mockLearningPath = [
  {
    skillName: 'TypeScript',
    resources: [
      {
        name: 'TypeScript Official Documentation',
        link: 'https://www.typescriptlang.org/docs/',
        difficulty: 'Beginner',
        description: 'Official TypeScript documentation with comprehensive guides',
      },
      {
        name: 'TypeScript Deep Dive',
        link: 'https://basarat.gitbook.io/typescript/',
        difficulty: 'Intermediate',
        description: 'Free online book covering TypeScript in depth',
      },
      {
        name: 'TypeScript Course - freeCodeCamp',
        link: 'https://www.youtube.com/watch?v=gp5H0Vw39yw',
        difficulty: 'Beginner',
        description: 'Comprehensive TypeScript tutorial for beginners',
      },
    ],
  },
  {
    skillName: 'Testing (Jest/Vitest)',
    resources: [
      {
        name: 'Jest Official Documentation',
        link: 'https://jestjs.io/docs/getting-started',
        difficulty: 'Beginner',
        description: 'Learn Jest testing framework from official docs',
      },
      {
        name: 'Testing JavaScript - Kent C. Dodds',
        link: 'https://testingjavascript.com/',
        difficulty: 'Intermediate',
        description: 'Comprehensive testing course covering all aspects',
      },
      {
        name: 'Vitest Documentation',
        link: 'https://vitest.dev/guide/',
        difficulty: 'Beginner',
        description: 'Modern testing framework powered by Vite',
      },
    ],
  },
  {
    skillName: 'Docker',
    resources: [
      {
        name: 'Docker Official Tutorial',
        link: 'https://docs.docker.com/get-started/',
        difficulty: 'Beginner',
        description: 'Get started with Docker containerization',
      },
      {
        name: 'Docker for Beginners - freeCodeCamp',
        link: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
        difficulty: 'Beginner',
        description: 'Complete Docker tutorial for beginners',
      },
      {
        name: 'Docker Mastery Course',
        link: 'https://www.udemy.com/course/docker-mastery/',
        difficulty: 'Advanced',
        description: 'Advanced Docker concepts and best practices',
      },
    ],
  },
  {
    skillName: 'Node.js',
    resources: [
      {
        name: 'Node.js Official Documentation',
        link: 'https://nodejs.org/en/docs/',
        difficulty: 'Intermediate',
        description: 'Official Node.js documentation and guides',
      },
      {
        name: 'Node.js Complete Course - freeCodeCamp',
        link: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
        difficulty: 'Beginner',
        description: 'Full Node.js course for beginners',
      },
    ],
  },
];

const mockRoleSkills = [
  { id: 1, skillName: 'React', required: true, proficiency: 80 },
  { id: 2, skillName: 'TypeScript', required: true, proficiency: 70 },
  { id: 3, skillName: 'CSS', required: false, proficiency: 75 },
];

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Mock interceptor - Return mock data instead of making real API calls
if (USE_MOCK_DATA) {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const url = config.url;
      const method = config.method.toUpperCase();

      // Mock responses based on URL patterns
      let mockResponse = { data: null };

      // Roles endpoints
      if (url === '/roles' && method === 'GET') {
        mockResponse.data = mockRoles;
      } else if (url.match(/\/roles\/\d+\/skills/) && method === 'GET') {
        mockResponse.data = mockRoleSkills;
      } else if (url.match(/\/roles\/\d+\/skills/) && method === 'POST') {
        mockResponse.data = { success: true };
      } else if (url.match(/\/roles\/\d+\/skills\/\d+/) && method === 'DELETE') {
        mockResponse.data = { success: true };
      } else if (url.match(/\/roles\/\d+/) && method === 'PUT') {
        mockResponse.data = { success: true };
      } else if (url === '/roles' && method === 'POST') {
        mockResponse.data = { success: true };
      } else if (url.match(/\/roles\/\d+/) && method === 'DELETE') {
        mockResponse.data = { success: true };
      }
      // Skills endpoints
      else if (url === '/skills' && method === 'GET') {
        mockResponse.data = mockAllSkills;
      } else if (url.match(/\/students\/\d+\/skills/) && method === 'GET') {
        mockResponse.data = mockSkills;
      } else if (url.match(/\/students\/\d+\/skills/) && method === 'POST') {
        mockResponse.data = { success: true };
      } else if (url.match(/\/students\/\d+\/skills\/\d+/) && method === 'PUT') {
        mockResponse.data = { success: true };
      } else if (url.match(/\/students\/\d+\/skills\/\d+/) && method === 'DELETE') {
        mockResponse.data = { success: true };
      }
      // Dashboard endpoint
      else if (url.match(/\/students\/\d+\/dashboard/) && method === 'GET') {
        mockResponse.data = mockDashboardData;
      }
      // Progress endpoint
      else if (url.match(/\/students\/\d+\/progress/) && method === 'GET') {
        mockResponse.data = mockSkills;
      } else if (url.match(/\/students\/\d+\/progress\/\d+/) && method === 'PUT') {
        mockResponse.data = { success: true };
      }
      // Analysis endpoint
      else if (url === '/analysis/run' && method === 'POST') {
        mockResponse.data = mockAnalysisResult;
      }
      // Learning path endpoint
      else if (url.match(/\/learning-path/) && method === 'GET') {
        mockResponse.data = mockLearningPath;
      }
      // Reports endpoint
      else if (url.match(/\/reports\/pdf/) && method === 'GET') {
        // Return a mock blob for PDF
        mockResponse.data = new Blob(['Mock PDF content'], { type: 'application/pdf' });
      } else if (url === '/notifications/email' && method === 'POST') {
        mockResponse.data = { success: true };
      }

      // Throw a special error with mock data
      const error = new Error('MOCK_RESPONSE');
      error.mockResponse = mockResponse;
      throw error;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Handle the mock response error and return mock data
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.message === 'MOCK_RESPONSE' && error.mockResponse) {
        return Promise.resolve(error.mockResponse);
      }
      return Promise.reject(error);
    }
  );
}

// Request interceptor - Add JWT token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
          break;
        case 403:
          toast.error('Access denied. Insufficient permissions.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error(data?.message || 'An error occurred.');
      }
    } else if (error.request) {
      // Request made but no response received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
