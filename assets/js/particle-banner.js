// Particle Network Banner Effect
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, setting up particle banner...');
    
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
        
        // Reinitialize particles when canvas is resized
        if (particles) {
            initParticles();
        }
    }
    
    // Call resize initially
    resizeCanvas();
    
    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);
    
    // Particle properties
    const particleCount = 100;
    const particleColor = 'rgba(255, 255, 255, 0.7)';
    const lineColor = 'rgba(255, 255, 255, 0.2)';
    const particleRadius = 2;
    const lineThickness = 1;
    const maxDistance = 150;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let mouseRadius = 150;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 2 - 1;
            this.radius = Math.random() * particleRadius + 1;
        }
        
        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
            }
            
            // Mouse interaction - particles are attracted to mouse
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouseRadius) {
                const force = mouseRadius / distance;
                this.vx += dx / distance * force * 0.03;
                this.vy += dy / distance * force * 0.03;
            }
            
            // Limit velocity
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 2) {
                this.vx = (this.vx / speed) * 2;
                this.vy = (this.vy / speed) * 2;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
    }
    
    // Array to store particles
    let particles = [];
    
    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw lines between particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = lineThickness;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation function
    function animate() {
        // Clear canvas
        ctx.fillStyle = 'rgba(20, 20, 20, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Draw lines between particles
        drawLines();
        
        // Request next frame
        requestAnimationFrame(animate);
    }
    
    // Initialize particles
    initParticles();
    
    // Start animation
    animate();
    
    console.log('Particle banner initialized successfully');
});
