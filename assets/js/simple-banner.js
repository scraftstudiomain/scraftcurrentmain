// Simple Banner Effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up simple banner...');

    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Get the hero area
    const heroArea = document.querySelector('.hero__area');
    if (!heroArea) {
        console.error('Hero area not found');
        return;
    }

    // Create or get banner container
    let bannerContainer = document.querySelector('.code-banner');
    if (!bannerContainer) {
        bannerContainer = document.createElement('div');
        bannerContainer.className = 'code-banner';
        heroArea.prepend(bannerContainer);
    }

    // Add canvas to banner container
    bannerContainer.appendChild(canvas);

    // Set canvas size
    function resizeCanvas() {
        canvas.width = bannerContainer.offsetWidth;
        canvas.height = bannerContainer.offsetHeight;
    }

    // Call resize initially
    resizeCanvas();

    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);

    // Grid properties
    const gridSize = 30;
    const lineWidth = 0.5;
    const lineColor = 'rgba(255, 255, 255, 0.2)';
    const backgroundColor = '#141414';

    // Animation properties
    let time = 0;
    const speed = 0.01;

    // Mouse position for interaction
    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    // Animation function
    function animate() {
        // Clear canvas
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update time
        time += speed;

        // Calculate grid offset based on time and mouse position
        const offsetX = Math.sin(time) * 5 + mouseX * 10;
        const offsetY = Math.cos(time) * 5 + mouseY * 10;

        // Draw vertical lines
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.moveTo(x + offsetX, 0);
            ctx.lineTo(x + offsetX, canvas.height);
        }

        // Draw horizontal lines
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.moveTo(0, y + offsetY);
            ctx.lineTo(canvas.width, y + offsetY);
        }

        // Style and stroke the lines
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Add some random dots for effect
        for (let i = 0; i < 50; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 2;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(x, y, size, size);
        }

        // Request next frame
        requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    console.log('Simple banner initialized successfully');
});
