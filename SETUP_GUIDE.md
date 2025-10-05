# Smart Event Planner - Setup Guide

## Complete SQLite Backend Integration

This project now includes a fully functional SQLite backend server that automatically creates all required database tables and provides RESTful APIs for managing events, budgets, tasks, and more.

## Backend Structure

```
server/
├── server.js              # Main entry point - Start the server with this file
├── database.js            # SQLite connection and automatic table creation
├── models/                # Database models (Data layer)
│   ├── userModel.js
│   ├── eventModel.js
│   ├── budgetModel.js
│   └── taskModel.js
├── controllers/           # Business logic (Application layer)
│   ├── userController.js
│   ├── eventController.js
│   ├── budgetController.js
│   └── taskController.js
└── routes/               # API endpoints (Presentation layer)
    ├── userRoutes.js
    ├── eventRoutes.js
    ├── budgetRoutes.js
    └── taskRoutes.js
```

## Getting Started

### 1. Install Dependencies

All dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Start the Backend Server

To start only the backend server:

```bash
npm run server
```

The server will:
- Connect to SQLite database at `server/eventplanner.db`
- Automatically create all required tables if they don't exist
- Start listening on port 5000

You should see output like:

```
========================================
  Smart Event Planner Backend Server
========================================

Initializing database...
✓ Connected to SQLite database
✓ Users table ready
✓ Events table ready
✓ Budgets table ready
✓ Tasks table ready
✓ Marketing Materials table ready
✓ Timeline Activities table ready

✓ Database initialization complete!

========================================
✓ Server running on port 5000
✓ API available at: http://localhost:5000
========================================
```

### 3. Start the Frontend

In a separate terminal, start the React frontend:

```bash
npm start
```

The frontend will run on port 5173 (default Vite port).

### 4. Start Both Together (Optional)

To start both frontend and backend simultaneously (requires concurrently package):

```bash
npm install -g concurrently
npm run dev:all
```

## Database Tables

The backend automatically creates these tables:

### 1. users
- Stores user accounts and profiles
- Fields: id, username, email, password, full_name, phone, created_at, updated_at

### 2. events
- Stores event details and planning information
- Fields: id, user_id, event_name, event_type, description, date, time, location, city, venue_type, audience_size, duration, status, created_at, updated_at

### 3. budgets
- Stores budget breakdowns and cost estimates (in INR)
- Fields: id, event_id, venue_total, catering_total, services_total, miscellaneous_total, grand_total, budget_data, created_at, updated_at

### 4. tasks
- Stores task management and tracking
- Fields: id, event_id, title, description, status, priority, assigned_to, due_date, completed_at, created_at, updated_at

### 5. marketing_materials
- Stores marketing content and assets
- Fields: id, event_id, material_type, title, content, file_path, created_at, updated_at

### 6. timeline_activities
- Stores event timeline and schedules
- Fields: id, event_id, title, activity_type, start_time, duration, location, attendees, description, resources, assigned_to, notes, created_at, updated_at

## API Endpoints

### Base URL
```
http://localhost:5000
```

### Health Check
```
GET /api/health
```

### Users API
```
GET    /api/users           - Get all users
GET    /api/users/:id       - Get user by ID
POST   /api/users           - Create new user
PUT    /api/users/:id       - Update user
DELETE /api/users/:id       - Delete user
```

### Events API
```
GET    /api/events                  - Get all events
GET    /api/events/:id              - Get event by ID
GET    /api/events/:id/details      - Get event with full details (budget, tasks, timeline)
GET    /api/events/user/:userId     - Get events by user
POST   /api/events                  - Create new event
PUT    /api/events/:id              - Update event
DELETE /api/events/:id              - Delete event
```

### Budgets API
```
GET    /api/budgets                 - Get all budgets
GET    /api/budgets/:id             - Get budget by ID
GET    /api/budgets/event/:eventId  - Get budget by event
POST   /api/budgets                 - Create new budget
PUT    /api/budgets/:id             - Update budget
DELETE /api/budgets/:id             - Delete budget
```

### Tasks API
```
GET    /api/tasks                              - Get all tasks
GET    /api/tasks/:id                          - Get task by ID
GET    /api/tasks/event/:eventId               - Get tasks by event
GET    /api/tasks/event/:eventId/status/:status - Get tasks by status
POST   /api/tasks                              - Create new task
PUT    /api/tasks/:id                          - Update task
PATCH  /api/tasks/:id/status                   - Update task status only
DELETE /api/tasks/:id                          - Delete task
```

## Example API Usage

### Create an Event
```javascript
fetch('http://localhost:5000/api/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event_name: 'Tech Conference 2025',
    event_type: 'Corporate Conference',
    description: 'Annual technology conference',
    date: '2025-03-15',
    time: '09:00',
    location: 'Convention Center',
    city: 'Mumbai',
    venue_type: 'conference-center',
    audience_size: 500,
    duration: 8,
    status: 'planning'
  })
})
```

### Create a Budget (in INR)
```javascript
fetch('http://localhost:5000/api/budgets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event_id: 1,
    venue_total: 415000,
    catering_total: 664000,
    services_total: 249000,
    miscellaneous_total: 124500,
    grand_total: 1452500,
    budget_data: {
      venue: { items: [...] },
      catering: { items: [...] },
      // Additional breakdown data
    }
  })
})
```

## Viewing the Database

You can view and manage the SQLite database using **DB Browser for SQLite**:

1. Download DB Browser for SQLite from: https://sqlitebrowser.org/
2. Open the database file: `server/eventplanner.db`
3. Browse tables, view data, and run custom SQL queries

## Frontend Fixes Applied

### 1. Header Tooltip Issue - FIXED
- Previously, tooltips would disappear when hovering over the Dashboard section
- Fixed by wrapping each navigation item in a container div with proper pointer-events
- Tooltips now remain visible when hovering

### 2. Event Plan Messages - FIXED
- Fixed repeating notification messages issue
- Added cleanup function in useEffect to prevent memory leaks
- Messages now appear only once

### 3. Currency System - UPDATED TO INR
- All currency formatting now uses Indian Rupees (₹)
- Updated formatCurrency functions across all components:
  - BudgetBreakdown component
  - BudgetComparison component
  - Dashboard mock data
- Currency format: `en-IN` locale with `INR` currency code

## Currency Display

All amounts throughout the application are now displayed in Indian Rupees:
- Symbol: ₹
- Format: ₹4,15,000 (Indian numbering system with commas)
- Locale: en-IN

## Testing the Setup

1. **Start the backend server**:
   ```bash
   npm run server
   ```

2. **Verify tables are created**:
   - Check that the database file exists at `server/eventplanner.db`
   - Open with DB Browser for SQLite
   - Verify all 6 tables are present

3. **Test API endpoints**:
   ```bash
   curl http://localhost:5000/api/health
   ```

4. **Start the frontend**:
   ```bash
   npm start
   ```

5. **Test the application**:
   - Navigate to Dashboard (should load without issues)
   - Create an event plan
   - Check budget calculations (should show INR)
   - Hover over navigation items (tooltips should stay visible)

## Troubleshooting

### Server won't start
- Check if port 5000 is already in use
- Run: `lsof -i :5000` to find processes using the port
- Kill existing processes or change the port in `server/server.js`

### Database errors
- Delete `server/eventplanner.db` to recreate from scratch
- Restart the server - tables will be automatically recreated

### Frontend connection issues
- Ensure backend is running on port 5000
- Check CORS settings in `server/server.js`
- Verify API URLs in frontend code point to `http://localhost:5000`

## Production Deployment

For production deployment:

1. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   ```

2. Update CORS settings in `server/server.js` to allow only your frontend domain

3. Consider using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server/server.js --name event-planner-api
   ```

## Summary

You now have a complete, working backend with:
- ✓ SQLite database with automatic table creation
- ✓ RESTful API for all entities
- ✓ Organized folder structure (models, controllers, routes)
- ✓ Fixed header tooltips
- ✓ Fixed repeating notification messages
- ✓ Currency set to INR throughout the system
- ✓ Ready for development and testing

Simply run `npm run server` to start the backend, and all tables will be created automatically!
