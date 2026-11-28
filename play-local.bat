@echo off
setlocal EnableExtensions
cd /d "%~dp0"

echo.
echo  Bush Pilot VR  -  local play
echo  http://localhost:8000/index.html
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo Git is not on the PATH - using the files in this folder.
) else (
  echo Checking for updates...
  git pull --ff-only
  if errorlevel 1 (
    echo.
    echo Could not update ^(offline, or GitHub sign-in needed^). Playing the copy in this folder.
    echo.
  )
)

echo Starting a local server on port 8000.
echo Leave this window open while you play. Close it, or press Ctrl+C, when you are done.
echo.
rem Open the game once the server has had a moment to bind.
start "" cmd /c "timeout /t 1 /nobreak >nul & start "" http://localhost:8000/index.html"

where py >nul 2>&1
if not errorlevel 1 (
  py -m http.server 8000
  goto :eof
)
where python >nul 2>&1
if not errorlevel 1 (
  python -m http.server 8000
  goto :eof
)

echo Python not found - using the built-in PowerShell server.
powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((Get-Content -LiteralPath '%~f0' -Raw) -replace '(?s)^.*# === PS ===\r?\n','')"
goto :eof

# === PS ===
$root = [IO.Path]::GetFullPath((Get-Location).Path).TrimEnd('\') + '\'
$listen = New-Object System.Net.HttpListener
$listen.Prefixes.Add('http://localhost:8000/')
try { $listen.Start() } catch { Write-Host $_; exit 1 }
$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.js'   = 'text/javascript'
  '.mjs'  = 'text/javascript'
  '.json' = 'application/json'
  '.glb'  = 'model/gltf-binary'
  '.gltf' = 'model/gltf+json'
  '.bin'  = 'application/octet-stream'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.ktx2' = 'image/ktx2'
  '.wasm' = 'application/wasm'
  '.ogg'  = 'audio/ogg'
  '.mp3'  = 'audio/mpeg'
  '.wav'  = 'audio/wav'
}
Write-Host "Serving $root on http://localhost:8000/  (Ctrl+C to stop)"
while ($listen.IsListening) {
  $ctx = $null
  try {
    $ctx = $listen.GetContext()
    $rel = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
    if ($rel -eq '/' -or $rel -eq '') { $rel = '/index.html' }
    $full = [IO.Path]::GetFullPath((Join-Path $root ($rel.TrimStart('/') -replace '/','\')))
    $res = $ctx.Response
    if (-not $full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) { $res.StatusCode = 400; $res.Close(); continue }
    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) { $res.StatusCode = 404; $res.Close(); continue }
    $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
    $type = $mime[$ext]; if (-not $type) { $type = 'application/octet-stream' }
    $bytes = [IO.File]::ReadAllBytes($full)
    $res.ContentType = $type
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
    $res.Close()
  } catch {
    Write-Host $_
    if ($ctx -and $ctx.Response) { try { $ctx.Response.StatusCode = 500; $ctx.Response.Close() } catch {} }
  }
}
