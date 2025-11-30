@echo off
REM JGEC Learn - Auth System Quick Start

echo.
echo ╔════════════════════════════════════════╗
echo ║  JGEC Learn Authentication Setup       ║
echo ║  Quick Start Script                    ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
    echo.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
node --version
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017').then(() => { console.log('✓ MongoDB is running'); mongoose.disconnect(); process.exit(0); }).catch(() => { console.log('❌ MongoDB is not running'); process.exit(1); });" >nul 2>&1

if errorlevel 1 (
    echo.
    echo ⚠️  MongoDB is not running!
    echo.
    echo To start MongoDB:
    echo   1. Download from: https://www.mongodb.com/try/download/community
    echo   2. Run mongod.exe
    echo   3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas
    echo.
    echo Then run this script again.
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════╗
echo ║  Installing Dependencies...            ║
echo ╚════════════════════════════════════════╝
echo.

cd /d "%~dp0server"

REM Check if node_modules exists
if not exist node_modules (
    echo Installing npm packages...
    call npm install
    if errorlevel 1 (
        echo.
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Dependencies already installed
)

echo.
echo ╔════════════════════════════════════════╗
echo ║  Starting Server...                    ║
echo ╚════════════════════════════════════════╝
echo.

echo 🚀 Server starting at http://localhost:5000
echo.
echo ✓ Open in browser:
echo   http://localhost:5000
echo.
echo ✓ API Base:
echo   http://localhost:5000/api
echo.
echo ✓ Press Ctrl+C to stop the server
echo.

timeout /t 2 /nobreak

REM Start the server
call npm start

pause
