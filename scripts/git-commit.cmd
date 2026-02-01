@echo off
cd /d "%~dp0\.."
timeout /t 5 /nobreak >nul
git add -A
if %errorlevel% equ 0 (
    git commit -m "✅ SUCCESS: Add WhomIfastfor prayer journal page with QR code"
    if %errorlevel% equ 0 (
        git push origin master
    )
)
