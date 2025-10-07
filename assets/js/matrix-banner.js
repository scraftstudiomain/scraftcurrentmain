// Matrix Code Rain Banner Effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up matrix banner...');
    
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
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
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
    
    // Matrix code characters
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    
    // Column properties
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // Function to draw the matrix effect
    function drawMatrix() {
        // Semi-transparent black background to create trail effect
        ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text properties
        ctx.font = fontSize + 'px monospace';
        
        // Draw each column
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Gradient color from top to bottom
            const gradient = ctx.createLinearGradient(0, drops[i] - fontSize * 5, 0, drops[i]);
            gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
            gradient.addColorStop(0.8, 'rgba(0, 255, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');
            
            ctx.fillStyle = gradient;
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i]);
            
            // Reset drop position if it's at the bottom or randomly
            if (drops[i] > canvas.height || Math.random() > 0.99) {
                drops[i] = Math.random() * -100;
            }
            
            // Move the drop down
            drops[i] += fontSize * 0.5;
        }
    }
    
    // Animation loop
    function animate() {
        drawMatrix();
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    console.log('Matrix banner initialized successfully');
});
