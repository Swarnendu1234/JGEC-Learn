# JGEC Learn - Auth System Quick Start
# PowerShell Version

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  JGEC Learn Authentication Setup       ║" -ForegroundColor Cyan
Write-Host "║  Quick Start Script                    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Node.js is installed" -ForegroundColor Green
Write-Host $nodeVersion -ForegroundColor Green
Write-Host ""

# Change to server directory
Set-Location -Path "$PSScriptRoot\server"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  Installing Dependencies...            ║" -ForegroundColor Cyan
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
    Write-Host ""
    
    npm install
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Starting Server...                    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Server starting at http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "✓ Open in browser:" -ForegroundColor Green
Write-Host "  http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ API Base:" -ForegroundColor Green
Write-Host "  http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "✓ Press Ctrl+C to stop the server" -ForegroundColor Green
Write-Host ""

Start-Sleep -Seconds 2

# Start the server
npm start
