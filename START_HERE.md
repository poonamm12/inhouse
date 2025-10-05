# Quick Start Guide

## 🚀 Starting the Application

### Method 1: Start Backend Only

Open a terminal and run:

```bash
npm run server
```

This will:
- ✓ Connect to SQLite database
- ✓ Automatically create all tables if they don't exist
- ✓ Start the API server on http://localhost:5000

### Method 2: Start Frontend Only

Open a terminal and run:

```bash
npm start
```

The frontend will start on http://localhost:5173

### Method 3: Start Both Together

If you have `concurrently` installed globally:

```bash
npm run dev:all
```

Or manually in two separate terminals:

**Terminal 1 (Backend):**
```bash
npm run server
```

**Terminal 2 (Frontend):**
```bash
npm start
```

## 📁 What's Included

### Backend (SQLite)
- **Location**: `server/` folder
- **Database**: `server/eventplanner.db` (created automatically)
- **Entry Point**: `server/server.js`
- **Port**: 5000

### API Endpoints
All available at `http://localhost:5000/api/`
- `/users` - User management
- `/events` - Event management
- `/budgets` - Budget calculations
- `/tasks` - Task tracking

### Database Tables (Auto-created)
1. **users** - User accounts
2. **events** - Event details
3. **budgets** - Budget information (in INR ₹)
4. **tasks** - Task management
5. **marketing_materials** - Marketing assets
6. **timeline_activities** - Event schedules

## 🔍 Viewing the Database

Use **DB Browser for SQLite** to view and manage data:

1. Download from: https://sqlitebrowser.org/
2. Open file: `server/eventplanner.db`
3. Browse all tables and data

## ✅ Frontend Improvements

### Fixed Issues:
1. **Header Tooltips** - No longer disappear when hovering over Dashboard
2. **Event Plan Messages** - Fixed repeating notification messages
3. **Currency** - All amounts now display in Indian Rupees (₹)

### Currency Format
- All budget calculations use INR
- Format: ₹4,15,000 (Indian numbering system)
- Consistent across all pages

## 🎯 Testing the Setup

1. **Start the backend**:
   ```bash
   npm run server
   ```

   You should see:
   ```
   ✓ Connected to SQLite database
   ✓ Users table ready
   ✓ Events table ready
   ✓ Server running on port 5000
   ```

2. **Test API** (in browser or curl):
   ```
   http://localhost:5000/api/health
   ```

3. **Start frontend**:
   ```bash
   npm start
   ```

4. **Open browser**:
   ```
   http://localhost:5173
   ```

## 📖 Full Documentation

For complete API documentation and detailed setup instructions, see:
- `SETUP_GUIDE.md` - Complete setup guide
- `server/README.md` - Backend documentation

## 🛠️ Folder Structure

```
project/
├── server/                    # Backend (SQLite + Express)
│   ├── server.js             # Main entry point
│   ├── database.js           # Database connection
│   ├── eventplanner.db       # SQLite database file
│   ├── models/               # Data models
│   ├── controllers/          # Business logic
│   └── routes/               # API routes
├── src/                      # Frontend (React)
│   ├── pages/                # Page components
│   ├── components/           # Reusable components
│   └── services/             # API services
├── package.json              # Dependencies & scripts
├── START_HERE.md            # This file
└── SETUP_GUIDE.md           # Detailed documentation
```

## 🎉 You're All Set!

Run `npm run server` and start planning amazing events!

All database tables will be created automatically - no manual setup required!
