# Delete a Printful product
# Usage: .\scripts\delete-product.ps1 -ProductId 415695270

param(
    [Parameter(Mandatory=$true)]
    [string]$ProductId
)

$ErrorActionPreference = "Stop"

# Load environment variables
$apiToken = $env:PRINTFUL_API_TOKEN
$storeId = $env:PRINTFUL_STORE_ID

if (-not $apiToken) {
    Write-Host "Error: PRINTFUL_API_TOKEN environment variable not set" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
}

if ($storeId) {
    $headers["X-PF-Store-Id"] = $storeId
}

$uri = "https://api.printful.com/store/products/$ProductId"

Write-Host "Deleting product $ProductId..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri $uri -Method Delete -Headers $headers
    
    Write-Host "✅ Product deleted successfully!" -ForegroundColor Green
    Write-Host "Response: $($response | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "❌ Error deleting product: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    exit 1
}
