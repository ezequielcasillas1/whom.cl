# Git Commit Instructions

## Issue
Cursor's git integration is holding an exclusive lock on `.git/index.lock`, preventing terminal git commands.

## Solution Options

### Option 1: Use Cursor's Source Control Panel (Recommended)
1. Open Source Control panel in Cursor (Ctrl+Shift+G)
2. Stage all changes (+ button or "Stage All Changes")
3. Enter commit message: `✅ SUCCESS: Add WhomIfastfor prayer journal page with QR code`
4. Click Commit
5. Click Sync/Push button

### Option 2: Run Script After Closing Cursor
1. Close Cursor completely
2. Run: `powershell -ExecutionPolicy Bypass -File scripts\git-commit-push.ps1`
3. Reopen Cursor

### Option 3: Manual Terminal Commands (After Closing Cursor)
```bash
git add -A
git commit -m "✅ SUCCESS: Add WhomIfastfor prayer journal page with QR code"
git push origin master
```

## Files to Commit
- `src/views/WhomIfastforView.vue` (new)
- `src/router/index.js` (modified)
- `public/qr-whom-ifastfor.png` (new)
- `scripts/generate-qr-api.js` (new)
- `scripts/generate-qr.js` (new)
- Plus other modified files from previous work
