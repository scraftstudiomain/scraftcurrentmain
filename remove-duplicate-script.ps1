$lines = Get-Content -Path "index.html"
$newLines = @()
$skipNextLine = $false

for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '<body>') {
        $newLines += $lines[$i]
        $skipNextLine = $true
    } elseif ($skipNextLine -and $lines[$i] -match '<script src="https://app.boei.help/embed/k/8ccd044b-175b-4586-a785-921f3dfe35c2"') {
        # Skip this line (the duplicate script)
        $skipNextLine = $false
    } else {
        $newLines += $lines[$i]
        $skipNextLine = $false
    }
}

$newLines | Set-Content -Path "index.html"
Write-Host "Removed duplicate script!"
