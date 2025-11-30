#!/usr/bin/env pwsh

Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Learning Platform - Complete Setup                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "📦 Setting up dependencies..." -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor Cyan

# Install frontend dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

# Install backend dependencies if needed
if (-not (Test-Path "server\node_modules")) {
    Write-Host "📥 Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location server
    npm install
    Pop-Location
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host "`n" -ForegroundColor Cyan
Write-Host "✅ Dependencies ready!" -ForegroundColor Green
Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Starting Servers                                     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Cyan

# Start backend in new window
Write-Host "🚀 Starting backend server on port 3000..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit -Command `"cd '$PWD\server'; node server.js`"" -WindowStyle Normal

# Wait for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "🚀 Starting frontend server on port 5173..." -ForegroundColor Green
Start-Process pwsh -ArgumentList "-NoExit -Command `"cd '$PWD'; npm run dev`"" -WindowStyle Normal

# Wait for frontend to start
Start-Sleep -Seconds 3

Write-Host "`n" -ForegroundColor Cyan
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   Setup Complete!                                      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Cyan

Write-Host "📍 Frontend:  http://localhost:5173" -ForegroundColor Green
Write-Host "📡 Backend:   http://localhost:3000" -ForegroundColor Green
Write-Host "📊 Admin:     http://localhost:5173/admin" -ForegroundColor Green
Write-Host "`n" -ForegroundColor Cyan

Write-Host "💡 Login credentials:" -ForegroundColor Yellow
Write-Host "   Email: admin@learningplatform.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host "`n" -ForegroundColor Cyan

Write-Host "⚠️  Keep both terminal windows open" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor Cyan
