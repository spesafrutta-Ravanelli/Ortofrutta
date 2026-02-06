@echo off
echo ========================================
echo   FIX E BUILD SITO ORTOFRUTTA
echo ========================================
echo.

echo [1/4] Terminando processi Node.js...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/4] Pulendo cache...
if exist "node_modules\.vite" rd /s /q "node_modules\.vite" >nul 2>&1
if exist "dist" rd /s /q "dist" >nul 2>&1

echo [3/4] Tentando build semplificato...
echo.
call npm run build:simple

echo.
echo [4/4] Completato!
echo.
echo ========================================
echo Se il build ha avuto successo, i file
echo sono nella cartella 'dist'
echo ========================================
echo.
pause
