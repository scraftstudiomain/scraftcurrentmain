$htmlFiles = Get-ChildItem -Path "*.html"

foreach ($file in $htmlFiles) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Remove the logo and random text from the footer
    $oldFooterWidget = '<div class="footer__widget">\s*<img class="footer__logo" src="assets/imgs/logo/logo-horizontal.png" alt="Footer Logo">\s*<p>When do they work well, and when do they on us and finally, when do we actually need how can we\s*avoid\s*them.</p>'
    $newFooterWidget = '<div class="footer__widget">'
    
    # Replace the content
    $content = $content -replace $oldFooterWidget, $newFooterWidget
    
    # Remove the commented out time and day lines
    $content = $content -replace '<!--<h3 class="contact-time">09 : 00 AM - 10 : 30 PM</h3>-->\s*<!--<h4 class="contact-day">Saturday - Thursday</h4>-->', ''
    
    # Save the updated content
    $content | Set-Content -Path $file.FullName
    
    Write-Host "Updated $($file.Name)"
}

Write-Host "All HTML files have been updated!"
