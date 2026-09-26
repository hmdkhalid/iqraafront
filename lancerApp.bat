@echo off
title 🚀 Lancement Application HMD
cd C:\Users\khalid\Desktop\HMDG24\sakai-ng-master
start cmd /k "node server.js"
timeout /t 5 >nul
start http://localhost:4200
exit
