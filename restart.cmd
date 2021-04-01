@ECHO OFF
FOR /f "tokens=2" %%a in ('
    tasklist /FI "IMAGENAME eq node.exe" ^| findstr /ic:"node.exe"
') Do SET pid=%%a
START "" node index
taskkill /F /PID %pid%