@echo off
cd /d "%~dp0"
echo ===================================================
echo   Deploying NAVEEN-ELECTRONICS to Vercel
echo ===================================================
echo.
echo Building production assets...
call npx.cmd vite build
echo.
echo Launching Vercel deployment...
call npx.cmd vercel --prod
pause
