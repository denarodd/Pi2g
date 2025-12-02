param(
  [string]$FilePath
)

if (-not (Test-Path $FilePath)) {
  Write-Output "[]"
  exit 0
}

Get-Content -Path $FilePath -Raw
