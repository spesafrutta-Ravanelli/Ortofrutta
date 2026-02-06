# Script per risolvere problema EPERM e riparare il build

Write-Host "🔧 Fixing Build Issues..." -ForegroundColor Green

# Step 1: Termina processi node
Write-Host "`n1️⃣ Terminando processi Node.js..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Step 2: Pulisci cartelle cache
Write-Host "`n2️⃣ Pulendo cache..." -ForegroundColor Yellow
if (Test-Path "node_modules\.vite") {
    Remove-Item -Path "node_modules\.vite" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ Cache Vite rimossa" -ForegroundColor Green
}

if (Test-Path "dist") {
    Remove-Item -Path "dist" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "   ✓ Cartella dist rimossa" -ForegroundColor Green
}

# Step 3: Usa config semplificata temporaneamente
Write-Host "`n3️⃣ Usando configurazione semplificata..." -ForegroundColor Yellow
if (Test-Path "vite.config.js") {
    Copy-Item "vite.config.js" "vite.config.backup.js" -Force
    Write-Host "   ✓ Backup vite.config.js creato" -ForegroundColor Green
}

if (Test-Path "vite.config.simple.js") {
    Copy-Item "vite.config.simple.js" "vite.config.js" -Force
    Write-Host "   ✓ Config semplificata attivata" -ForegroundColor Green
}

# Step 4: Prova build
Write-Host "`n4️⃣ Tentando build..." -ForegroundColor Yellow
npm run build 2>&1 | Out-String | Write-Host

# Step 5: Ripristina config originale
Write-Host "`n5️⃣ Ripristinando configurazione..." -ForegroundColor Yellow
if (Test-Path "vite.config.backup.js") {
    Copy-Item "vite.config.backup.js" "vite.config.js" -Force
    Remove-Item "vite.config.backup.js" -ErrorAction SilentlyContinue
    Write-Host "   ✓ Config originale ripristinata" -ForegroundColor Green
}

Write-Host "`n✅ Script completato!" -ForegroundColor Green
Write-Host "`nSe il build ha ancora problemi, esegui:" -ForegroundColor Cyan
Write-Host "  npm run build:simple" -ForegroundColor White
