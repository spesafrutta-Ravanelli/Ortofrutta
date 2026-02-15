# Script per pulire la cache di Vite
Write-Host "Pulizia cache Vite..." -ForegroundColor Yellow

# Rimuovi cartella cache Vite
if (Test-Path "node_modules\.vite") {
    Remove-Item -Recurse -Force "node_modules\.vite"
    Write-Host "Cache Vite rimossa" -ForegroundColor Green
} else {
    Write-Host "Nessuna cache trovata" -ForegroundColor Cyan
}

# Rimuovi anche dist se esiste
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "Cartella dist rimossa" -ForegroundColor Green
}

Write-Host "Pulizia completata!" -ForegroundColor Green
Write-Host "Ora puoi eseguire: npm run dev" -ForegroundColor Cyan
