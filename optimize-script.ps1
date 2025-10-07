$content = Get-Content -Path "index.html" -Raw
$content = $content -replace '<body>\s+\s+<script src="https://app.boei.help/embed/k/8ccd044b-175b-4586-a785-921f3dfe35c2"\s+async></script>', '<body>'
$content = $content -replace '</body class="dir-rtl">', '</body>'
$content | Set-Content -Path "index.html"
Write-Host "HTML fixes applied successfully!"
