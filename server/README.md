# Smart Event Planner Backend

A complete SQLite-based backend server for the Smart Event Planner application.

## Folder Structure

```
server/
├── server.js           # Main entry point
├── database.js         # SQLite connection and initialization
├── routes/             # API route definitions
│   ├── userRoutes.js
│   ├── eventRoutes.js
│   ├── budgetRoutes.js
│   └── taskRoutes.js
├── controllers/        # Business logic
│   ├── userController.js
│   ├── eventController.js
│   ├── budgetController.js
│   └── taskController.js
└── models/            # Database models
    ├── userModel.js
    ├── eventModel.js
    ├── budgetModel.js
    └── taskModel.js
```

## Database Tables

The backend automatically creates the following tables:

1. **users** - User accounts and profiles
2. **events** - Event details and planning information
3. **budgets** - Budget breakdowns and cost estimates
4. **tasks** - Task management and tracking
5. **marketing_materials** - Marketing content and assets
6. **timeline_activities** - Event timeline and schedules

## Starting the Server

Run the server with:

```bash
npm run server
```

Or start both frontend and backend together:

```bash
npm run dev:all
```

The server will:
1. Connect to SQLite database
2. Automatically create all required tables
3. Start the Express server on port 5000

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/:id/details` - Get event with full details
- `GET /api/events/user/:userId` - Get events by user
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Budgets
- `GET /api/budgets` - Get all budgets
- `GET /api/budgets/:id` - Get budget by ID
- `GET /api/budgets/event/:eventId` - Get budget by event
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget
- `DELETE /api/budgets/:id` - Delete budget

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `GET /api/tasks/event/:eventId` - Get tasks by event
- `GET /api/tasks/event/:eventId/status/:status` - Get tasks by status
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task

## Health Check

Check server status at:
```
GET http://localhost:5000/api/health
```

## Database File

The SQLite database file is created at:
```
server/eventplanner.db
```

You can open this file with DB Browser for SQLite to view and manage data.

## Currency

All currency values throughout the system are in Indian Rupees (INR).
