# Pruebas rápidas de la API (correr con el servidor levantado: npm run dev)
# Uso: cd Backend  →  .\probar-api.ps1

$baseUrl = "http://localhost:3000"
$adminEmail = "admin2@test.com"
$clienteEmail = "cliente@test.com"
$password = "123"

function Login-Usuario($email) {
    $body = "{`"email`":`"$email`",`"password`":`"$password`"}"
    $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
    $response = Invoke-WebRequest -Uri "$baseUrl/users/login" -Method POST -Body $body -ContentType "application/json" -WebSession $session -UseBasicParsing
    $token = $session.Cookies.GetCookies($baseUrl)["payload"].Value
    return @{ Headers = @{ Authorization = "Bearer $token" }; Content = $response.Content }
}

Write-Host "`n=== POST /users (admin, si no existe) ===" -ForegroundColor Cyan
try {
    $body = @{ nombre = "Admin"; apellido = "Lavadero"; email = $adminEmail; password = $password; roleId = 1 } | ConvertTo-Json
    Invoke-RestMethod -Uri "$baseUrl/users" -Method POST -Body $body -ContentType "application/json"
} catch {
    Write-Host $_.ErrorDetails.Message -ForegroundColor Yellow
}

Write-Host "`n=== Login admin ===" -ForegroundColor Cyan
$admin = Login-Usuario $adminEmail
Write-Host $admin.Content

Write-Host "`n=== GET /users/me ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$baseUrl/users/me" -Headers $admin.Headers

Write-Host "`n=== GET /users (solo admin) ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$baseUrl/users" -Headers $admin.Headers

Write-Host "`n=== GET /roles (solo admin) ===" -ForegroundColor Cyan
Invoke-RestMethod -Uri "$baseUrl/roles" -Headers $admin.Headers

Write-Host "`n=== GET /users con cliente (debe dar 403) ===" -ForegroundColor Cyan
try {
    $cliente = Login-Usuario $clienteEmail
    Invoke-RestMethod -Uri "$baseUrl/users" -Headers $cliente.Headers
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Green
}

Write-Host "`n=== GET /reservas/max ===" -ForegroundColor Cyan
try {
    Invoke-RestMethod -Uri "$baseUrl/reservas/max" -Headers $admin.Headers
} catch {
    Write-Host $_.ErrorDetails.Message -ForegroundColor Yellow
}

Write-Host "`nListo.`n" -ForegroundColor Green
