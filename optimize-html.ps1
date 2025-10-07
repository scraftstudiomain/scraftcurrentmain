$content = Get-Content -Path "index.html" -Raw
$content = $content -replace '<body>\s+\s+<script src="https://app.boei.help/embed/k/8ccd044b-175b-4586-a785-921f3dfe35c2"\s+async></script>', '<body>'
$content = $content -replace '</body class="dir-rtl">', '</body>'

# Add preload for critical resources
$preloadTags = @"
  <!-- Preload critical resources -->
  <link rel="preload" href="assets/css/bootstrap.min.css" as="style">
  <link rel="preload" href="assets/css/master.css" as="style">
  <link rel="preload" href="assets/js/jquery-3.6.0.min.js" as="script">
  <link rel="preload" href="assets/js/bootstrap.bundle.min.js" as="script">

"@

$content = $content -replace '</title>\s+\s+<!-- Fav Icon -->', "</title>`n`n  $preloadTags`n  <!-- Fav Icon -->"

# Add meta description for SEO
$metaTags = @"
  <meta name="description" content="Scraft Studio - Digital marketing agency specializing in Shopify development, CRO optimization, and Facebook Ads to help businesses scale beyond limits.">
  <meta name="keywords" content="Scraft Studio, digital marketing, Shopify development, CRO optimization, Facebook Ads">
"@

$content = $content -replace '<meta name="description" content="Axtra HTML5 Template">', $metaTags

# Output the optimized HTML
$content | Set-Content -Path "index.html"
Write-Host "HTML optimizations applied successfully!"
