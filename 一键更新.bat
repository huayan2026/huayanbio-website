@echo off
cd /d "D:\华研生物\官网"

echo.
echo ===================================
echo   HuayanBio - Website Updater
echo ===================================
echo.

git add -A
if %errorlevel% neq 0 goto :fail

echo [1/3] Checking changes...
git diff --cached --stat

echo.
set /p MSG="Update message (press Enter for default): "
if "%MSG%"=="" set MSG=Update website

git commit -m "%MSG%"
if %errorlevel% neq 0 (
    echo No changes to commit.
    pause
    exit /b 0
)

echo.
echo [2/3] Committed: %MSG%
echo.
echo [3/3] Pushing to GitHub...
git push

if %errorlevel% equ 0 (
    echo.
    echo ==========================================
    echo   SUCCESS! Cloudflare will auto-deploy.
    echo ==========================================
) else (
    goto :fail
)

echo.
pause
exit /b 0

:fail
echo.
echo [ERROR] Push failed! Check your network.
pause
exit /b 1