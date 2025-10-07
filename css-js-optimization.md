# CSS and JavaScript Optimization Guide

To optimize the CSS and JavaScript files on your website, follow these steps:

## 1. Minify CSS Files

The following CSS files should be minified:

1. master.css (686KB) - This file is particularly large and should be minified
2. Any custom CSS files that aren't already minified

### Using Online Tools:

- [CSS Minifier](https://cssminifier.com/)
- [CSS Compressor](https://csscompressor.com/)

### Using Node.js:

```bash
# Install clean-css-cli
npm install -g clean-css-cli

# Minify CSS files
cleancss -o assets/css/master.min.css assets/css/master.css
```

## 2. Combine CSS Files

Consider combining multiple CSS files into one to reduce HTTP requests:

```bash
# Combine CSS files
cat assets/css/bootstrap.min.css assets/css/all.min.css assets/css/swiper-bundle.min.css assets/css/progressbar.css assets/css/meanmenu.min.css assets/css/master.min.css > assets/css/combined.min.css
```

Then update your HTML to use the combined file:

```html
<!-- Replace multiple CSS links with one combined file -->
<link rel="stylesheet" href="assets/css/combined.min.css">
```

## 3. Minify JavaScript Files

The following JS files should be minified:

1. main.js (94KB) - This file contains custom code and should be minified

### Using Online Tools:

- [JavaScript Minifier](https://javascript-minifier.com/)
- [UglifyJS Online](https://skalman.github.io/UglifyJS-online/)

### Using Node.js:

```bash
# Install uglify-js
npm install -g uglify-js

# Minify JavaScript files
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

## 4. Combine JavaScript Files

Consider combining JavaScript files that are used on all pages:

```bash
# Combine JS files
cat assets/js/jquery-3.6.0.min.js assets/js/bootstrap.bundle.min.js assets/js/main.min.js > assets/js/combined.min.js
```

Then update your HTML to use the combined file:

```html
<!-- Replace multiple JS links with one combined file -->
<script src="assets/js/combined.min.js" defer></script>
```

## 5. Use Critical CSS

Extract and inline critical CSS for above-the-fold content:

1. Use tools like [Critical](https://github.com/addyosmani/critical) to extract critical CSS
2. Inline the critical CSS in the `<head>` of your HTML
3. Load the rest of your CSS asynchronously

```html
<!-- Inline critical CSS -->
<style>
  /* Critical CSS goes here */
</style>

<!-- Load the rest of CSS asynchronously -->
<link rel="preload" href="assets/css/combined.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="assets/css/combined.min.css"></noscript>
```

By following these steps, you can significantly reduce the page load time and improve the overall performance of your website.
