$content = Get-Content -Path "index.html" -Raw

# Remove the duplicate script after the body tag
$content = $content -replace '<body>\s+\s+<script src="https://app.boei.help/embed/k/8ccd044b-175b-4586-a785-921f3dfe35c2"\s+async></script>', '<body>'

# Fix the body closing tag
$content = $content -replace '</body class="dir-rtl">', '</body>'

# Add meta description
$content = $content -replace '<meta name="description" content="Axtra HTML5 Template">', '<meta name="description" content="Scraft Studio - Digital marketing agency specializing in Shopify development, CRO optimization, and Facebook Ads to help businesses scale beyond limits.">'

# Save the changes
$content | Set-Content -Path "index.html"
Write-Host "Fixed duplicate script and updated meta description!"
