@echo off
REM Start both frontend and backend servers

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Learning Platform - Complete Setup                  ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found
    echo Please run this script from the project root directory
    pause
    exit /b 1
)

echo 📦 Setting up dependencies...
echo.

REM Install frontend dependencies if needed
if not exist "node_modules" (
    echo 📥 Installing frontend dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

REM Install backend dependencies if needed
if not exist "server\node_modules" (
    echo 📥 Installing backend dependencies...
    cd server
    call npm install
    cd ..
    if errorlevel 1 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
)

echo.
echo ✅ Dependencies ready!
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Starting Servers                                     ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Start backend in new window
echo 🚀 Starting backend server on port 3000...
start "Backend Server" cmd /k "cd server && node server.js"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start frontend in new window
echo 🚀 Starting frontend server on port 5173...
start "Frontend Server" cmd /k "npm run dev"

REM Wait a moment for frontend to start
timeout /t 3 /nobreak

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║   Setup Complete!                                      ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 📍 Frontend:  http://localhost:5173
echo 📡 Backend:   http://localhost:3000
echo 📊 Admin:     http://localhost:5173/admin
echo.
echo 💡 Login credentials:
echo    Email: admin@learningplatform.com
echo    Password: admin123
echo.
echo ⚠️  Keep both terminal windows open
echo.
pause
