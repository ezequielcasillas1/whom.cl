$ErrorActionPreference = "Stop"

function Require-Env($name) {
  $val = [Environment]::GetEnvironmentVariable($name)
  if ([string]::IsNullOrWhiteSpace($val)) {
    throw "Missing environment variable: $name"
  }
  return $val
}

function Upload-PrintfulFile([string]$token, [string]$filePath, [string]$title) {
  if (!(Test-Path -LiteralPath $filePath)) {
    throw "File not found: $filePath"
  }

  $headers = @{
    Authorization = "Bearer $token"
  }

  $form = @{
    file  = Get-Item -LiteralPath $filePath
    title = $title
    type  = "default"
  }

  $res = Invoke-RestMethod -Method Post `
    -Uri "https://api.printful.com/files" `
    -Headers $headers `
    -Form $form

  return $res
}

$token = Require-Env "PRINTFUL_API_TOKEN"

# Default files (override by passing -Files)
param(
  [string[]]$Files = @(
    "C:\Dev\Whom.Clothing\WHM-ASSETS\whm-john8DARKLINEAR2.png",
    "C:\Dev\Whom.Clothing\WHM-ASSETS\whm-john8NONLINEAR2.png"
  )
)

Write-Host "Uploading to Printful file library..."
Write-Host ("Files: " + ($Files -join ", "))

foreach ($f in $Files) {
  $name = [System.IO.Path]::GetFileNameWithoutExtension($f)
  $title = $name
  $out = Upload-PrintfulFile -token $token -filePath $f -title $title
  $id = $out?.result?.id
  $url = $out?.result?.url
  Write-Host ("OK: " + $f)
  Write-Host ("  file_id: " + $id)
  if ($url) { Write-Host ("  url: " + $url) }
}

Write-Host "Done."

