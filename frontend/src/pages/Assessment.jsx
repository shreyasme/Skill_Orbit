import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  LinearProgress,
  Chip,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Alert,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Quiz,
  CheckCircle,
  Cancel,
  Timer,
  EmojiEvents,
  TrendingUp,
  School,
} from '@mui/icons-material';

const Assessment = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  // Mock assessment data
  const assessments = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Test your React, JavaScript, and CSS knowledge',
      duration: '30 min',
      questions: 15,
      difficulty: 'Intermediate',
      icon: '⚛️',
      color: '#61DAFB',
    },
    {
      id: 2,
      title: 'Backend Development',
      description: 'Evaluate your Node.js, APIs, and Database skills',
      duration: '45 min',
      questions: 20,
      difficulty: 'Advanced',
      icon: '🚀',
      color: '#68A063',
    },
    {
      id: 3,
      title: 'Full Stack Development',
      description: 'Comprehensive test covering frontend and backend',
      duration: '60 min',
      questions: 30,
      difficulty: 'Expert',
      icon: '💻',
      color: '#FF6B6B',
    },
    {
      id: 4,
      title: 'DevOps & Cloud',
      description: 'Test your Docker, Kubernetes, and AWS knowledge',
      duration: '40 min',
      questions: 18,
      difficulty: 'Advanced',
      icon: '☁️',
      color: '#4A90E2',
    },
  ];

  // Mock questions
  const mockQuestions = [
    {
      id: 1,
      question: 'What is the virtual DOM in React?',
      options: [
        'A copy of the real DOM kept in memory',
        'A database for storing component state',
        'A CSS framework for styling',
        'A testing library',
      ],
      correct: 0,
    },
    {
      id: 2,
      question: 'Which hook is used for side effects in React?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correct: 1,
    },
    {
      id: 3,
      question: 'What does JSX stand for?',
      options: [
        'JavaScript XML',
        'Java Syntax Extension',
        'JSON XML',
        'JavaScript Extension',
      ],
      correct: 0,
    },
    {
      id: 4,
      question: 'What is the purpose of React keys?',
      options: [
        'To encrypt data',
        'To identify elements in lists',
        'To style components',
        'To handle events',
      ],
      correct: 1,
    },
    {
      id: 5,
      question: 'Which method is used to update state in class components?',
      options: ['updateState()', 'setState()', 'changeState()', 'modifyState()'],
      correct: 1,
    },
  ];

  const handleStartTest = (assessment) => {
    setSelectedTest(assessment);
    setTestStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correct++;
      }
    });
    return {
      correct,
      total: mockQuestions.length,
      percentage: Math.round((correct / mockQuestions.length) * 100),
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'info';
      case 'Advanced':
        return 'warning';
      case 'Expert':
        return 'error';
      default:
        return 'default';
    }
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <EmojiEvents sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Assessment Complete!
          </Typography>
          <Typography variant="h1" sx={{ my: 4, fontWeight: 800 }}>
            {score.percentage}%
          </Typography>
          <Typography variant="h5" gutterBottom>
            You got {score.correct} out of {score.total} questions correct
          </Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                setTestStarted(false);
                setShowResults(false);
                setSelectedTest(null);
              }}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              Back to Assessments
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => handleStartTest(selectedTest)}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Retake Test
            </Button>
          </Box>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Review Answers
          </Typography>
          {mockQuestions.map((q, index) => (
            <Card key={q.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {answers[q.id] === q.correct ? (
                    <CheckCircle color="success" sx={{ mr: 1 }} />
                  ) : (
                    <Cancel color="error" sx={{ mr: 1 }} />
                  )}
                  <Typography variant="h6" fontWeight={600}>
                    Question {index + 1}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {q.question}
                </Typography>
                {q.options.map((option, optIndex) => (
                  <Box
                    key={optIndex}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor:
                        optIndex === q.correct
                          ? 'success.light'
                          : answers[q.id] === optIndex
                          ? 'error.light'
                          : 'grey.100',
                      border: '2px solid',
                      borderColor:
                        optIndex === q.correct
                          ? 'success.main'
                          : answers[q.id] === optIndex
                          ? 'error.main'
                          : 'transparent',
                    }}
                  >
                    <Typography>
                      {option}
                      {optIndex === q.correct && ' ✓ (Correct Answer)'}
                      {answers[q.id] === optIndex && optIndex !== q.correct && ' ✗ (Your Answer)'}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    );
  }

  if (testStarted && selectedTest) {
    const question = mockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" fontWeight={700}>
                {selectedTest.title}
              </Typography>
              <Chip
                icon={<Timer />}
                label={selectedTest.duration}
                color="primary"
                variant="outlined"
              />
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Question {currentQuestion + 1} of {mockQuestions.length}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
            {question.question}
          </Typography>

          <FormControl component="fieldset" fullWidth>
            <RadioGroup
              value={answers[question.id] !== undefined ? answers[question.id] : ''}
              onChange={(e) => handleAnswerSelect(question.id, parseInt(e.target.value))}
            >
              {question.options.map((option, index) => (
                <Paper
                  key={index}
                  elevation={answers[question.id] === index ? 3 : 0}
                  sx={{
                    p: 2,
                    mb: 2,
                    border: '2px solid',
                    borderColor: answers[question.id] === index ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => handleAnswerSelect(question.id, index)}
                >
                  <FormControlLabel
                    value={index}
                    control={<Radio />}
                    label={option}
                    sx={{ width: '100%', m: 0 }}
                  />
                </Paper>
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              size="large"
            >
              Previous
            </Button>
            {currentQuestion === mockQuestions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== mockQuestions.length}
                size="large"
              >
                Submit Test
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext} size="large">
                Next
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              mr: 2,
            }}
          >
            <Quiz sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Skill Assessments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Test your knowledge and validate your skills with our comprehensive assessments
            </Typography>
          </Box>
        </Box>
      </Box>

      <Alert severity="info" sx={{ mb: 4, borderRadius: 2 }}>
        <Typography variant="body2">
          <strong>Pro Tip:</strong> Complete assessments to get personalized learning recommendations and
          track your progress over time.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {assessments.map((assessment) => (
          <Grid item xs={12} md={6} key={assessment.id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: assessment.color + '20',
                      fontSize: '2rem',
                      mr: 2,
                    }}
                  >
                    {assessment.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {assessment.title}
                    </Typography>
                    <Chip
                      label={assessment.difficulty}
                      size="small"
                      color={getDifficultyColor(assessment.difficulty)}
                    />
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {assessment.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <Chip icon={<Timer />} label={assessment.duration} variant="outlined" />
                  <Chip icon={<School />} label={`${assessment.questions} Questions`} variant="outlined" />
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => handleStartTest(assessment)}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${assessment.color} 0%, ${assessment.color}CC 100%)`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${assessment.color}DD 0%, ${assessment.color}AA 100%)`,
                    },
                  }}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Why Take Assessments?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Track Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monitor your skill development and see how you improve over time
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <EmojiEvents sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Earn Badges
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Unlock achievements and showcase your validated skills
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <School sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Get Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Receive personalized learning paths based on your results
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Assessment;
