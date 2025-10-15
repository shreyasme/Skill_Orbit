# Project Structure

This project has been reorganized with the following structure:

```
skill-matrix-portal/
├── frontend/           # React frontend application
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── vite.config.js # Vite configuration
├── .gitignore         # Git ignore rules
└── README.md          # Project documentation
```

## Getting Started

To run the frontend application:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Future Structure

This structure allows for easy addition of:
- **backend/** - Spring Boot backend application
- **database/** - Database scripts and migrations
- **docs/** - Additional documentation
- **docker/** - Docker configuration files

## Notes

- All frontend-related files are now in the `frontend/` directory
- The root directory is reserved for project-wide configuration and documentation
- This structure supports a monorepo approach for full-stack development
