# Image Optimization Guide

To optimize the images on your website, follow these steps:

## 1. Install Image Optimization Tools

```bash
# For Windows, install ImageMagick
# Download from: https://imagemagick.org/script/download.php#windows

# For compression tools, consider using:
# - TinyPNG (https://tinypng.com/)
# - Squoosh (https://squoosh.app/)
# - ImageOptim (Mac only: https://imageoptim.com/)
```

## 2. Batch Optimize Images

### Using ImageMagick:

```bash
# Resize and optimize JPG images
magick mogrify -resize 1200x> -quality 80 -strip -format jpg *.jpg

# Resize and optimize PNG images
magick mogrify -resize 1200x> -quality 80 -strip *.png

# Convert large PNGs to WebP format
magick mogrify -format webp -quality 80 *.png
```

### Using TinyPNG API:

If you have many images, consider using the TinyPNG API with a script to batch process them.

## 3. Replace Large Images

The following images are particularly large and should be optimized:

1. bg-axtra.png (1.7MB) - Resize and compress to under 300KB
2. design.png (937KB) - Resize and compress to under 200KB
3. 2.png (871KB) - Resize and compress to under 200KB
4. 1-bg.png (832KB) - Resize and compress to under 200KB
5. 3.png (579KB) - Resize and compress to under 150KB

## 4. Use Responsive Images

Update your HTML to use responsive images with the `srcset` attribute:

```html
<img src="small-image.jpg" 
     srcset="small-image.jpg 400w, 
             medium-image.jpg 800w, 
             large-image.jpg 1200w"
     sizes="(max-width: 600px) 400px, 
            (max-width: 1200px) 800px, 
            1200px"
     alt="Description">
```

## 5. Implement Lazy Loading

Add the `loading="lazy"` attribute to images that are below the fold:

```html
<img src="image.jpg" loading="lazy" alt="Description">
```

By following these steps, you can significantly reduce the page load time and improve the overall performance of your website.
