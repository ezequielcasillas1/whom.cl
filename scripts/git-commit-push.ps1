# Git commit and push script with lock handling
$maxRetries = 10
$retryDelay = 2
$repoPath = Split-Path -Parent $PSScriptRoot

Set-Location $repoPath

Write-Host "Attempting to commit and push changes..." -ForegroundColor Yellow

for ($i = 1; $i -le $maxRetries; $i++) {
    Write-Host "Attempt $i of $maxRetries..." -ForegroundColor Gray
    
    # Try to remove lock file
    if (Test-Path ".git/index.lock") {
        try {
            Remove-Item -Force ".git/index.lock" -ErrorAction Stop
            Start-Sleep -Milliseconds 500
        } catch {
            Write-Host "Lock file exists, waiting..." -ForegroundColor Yellow
            Start-Sleep -Seconds $retryDelay
            continue
        }
    }
    
    # Try to add files
    $addResult = git add -A 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Files staged successfully" -ForegroundColor Green
        
        # Try to commit
        $commitResult = git commit -m "✅ SUCCESS: Add WhomIfastfor prayer journal page with QR code" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Committed successfully" -ForegroundColor Green
            Write-Host $commitResult
            
            # Try to push
            $pushResult = git push origin master 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "Pushed successfully!" -ForegroundColor Green
                Write-Host $pushResult
                exit 0
            } else {
                Write-Host "Push failed:" -ForegroundColor Red
                Write-Host $pushResult
                exit 1
            }
        } else {
            Write-Host "Commit failed:" -ForegroundColor Red
            Write-Host $commitResult
            if ($commitResult -match "nothing to commit") {
                Write-Host "No changes to commit" -ForegroundColor Yellow
                exit 0
            }
            Start-Sleep -Seconds $retryDelay
            continue
        }
    } else {
        Write-Host "Add failed, retrying..." -ForegroundColor Yellow
        Write-Host $addResult
        Start-Sleep -Seconds $retryDelay
        continue
    }
}

Write-Host "Failed after $maxRetries attempts. Please close Cursor/VS Code and try again manually." -ForegroundColor Red
exit 1
