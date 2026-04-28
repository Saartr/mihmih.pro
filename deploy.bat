@echo off
chcp 65001 > nul

echo.
echo === Push local changes to GitHub ===
echo.

git add .
git commit -m "Update portfolio"
git push

echo.
echo === Deploy from GitHub to VPS ===
echo.

ssh root@95.140.153.48 "cd /var/www/mihmih.pro && git pull && nginx -t && systemctl reload nginx"

echo.
echo === Done ===
pause