$optimizedHeader = Get-Content -Path "optimize-index.html" -Raw
$originalContent = Get-Content -Path "index.html" -Raw

# Extract the body content from the original file
$bodyContent = $originalContent -replace '(?s)^.*<body>\s*', ''
$bodyContent = $bodyContent -replace '(?s)</body>.*$', ''

# Fix the closing body tag
$bodyContent = $bodyContent + "`n</body>`n`n</html>"

# Combine the optimized header with the body content
$finalContent = $optimizedHeader -replace '<!-- Rest of the HTML content will be copied here -->', $bodyContent

# Save the final content
$finalContent | Set-Content -Path "index.html"
Write-Host "Optimized header merged with body content successfully!"
