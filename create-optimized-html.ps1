$content = Get-Content -Path "index.html" -Raw

# Remove the duplicate script
$content = $content -replace '<body>\s+\s+<script src="https://app.boei.help/embed/k/8ccd044b-175b-4586-a785-921f3dfe35c2"\s+async></script>', '<body>'

# Save the optimized file
$content | Set-Content -Path "index-optimized.html"
Write-Host "Created optimized HTML file!"
