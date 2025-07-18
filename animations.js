// Advanced Animation System
document.addEventListener('DOMContentLoaded', function() {
    let animationFrameId;
    let stars = [];
    let particles = [];
    let canvas, ctx;
    
    // Initialize star field animation
    function initializeStarField() {
        canvas = document.getElementById('starField');
        if (!canvas) return;
        
        ctx = canvas.getContext('2d');
        
        // Set canvas size
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createStars(); // Recreate stars when canvas resizes
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create stars
        function createStars() {
            stars = [];
            const starCount = Math.floor((canvas.width * canvas.height) / 8000); // Responsive star count
            
            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 0.5 + 0.1,
                    brightness: Math.random() * 0.8 + 0.2,
                    twinkleSpeed: Math.random() * 0.02 + 0.01,
                    color: getStarColor()
                });
            }
        }
        
        function getStarColor() {
            const colors = ['#ffffff', '#ffffcc', '#ccccff', '#ffcccc'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        createStars();
        
        // Animate stars
        function animateStars() {
            if (!ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                // Update star position
                star.y += star.speed;
                
                // Reset star if it goes off screen
                if (star.y > canvas.height + 5) {
                    star.y = -5;
                    star.x = Math.random() * canvas.width;
                }
                
                // Update brightness for twinkling effect
                star.brightness += Math.sin(Date.now() * star.twinkleSpeed) * 0.005;
                star.brightness = Math.max(0.1, Math.min(1, star.brightness));
                
                // Draw star
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.brightness;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw particles
            drawParticles();
            
            // Create shooting stars occasionally
            if (Math.random() < 0.0005) {
                createShootingStar();
            }
            
            ctx.globalAlpha = 1; // Reset alpha
            animationFrameId = requestAnimationFrame(animateStars);
        }
        
        animateStars();
    }
    
    // Shooting star effect
    function createShootingStar() {
        if (!canvas || !ctx) return;
        
        const shootingStar = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.3,
            speed: 6 + Math.random() * 4,
            length: 40 + Math.random() * 30,
            opacity: 1,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.5
        };
        
        function animateShootingStar() {
            if (shootingStar.opacity <= 0 || !ctx) return;
            
            ctx.save();
            ctx.globalAlpha = shootingStar.opacity;
            
            // Draw shooting star trail
            const gradient = ctx.createLinearGradient(
                shootingStar.x,
                shootingStar.y,
                shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
                shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
            );
            
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(
                shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length,
                shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length
            );
            ctx.stroke();
            
            // Draw bright head
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.beginPath();
            ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
            
            // Update position
            shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
            shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
            shootingStar.opacity -= 0.015;
            
            if (shootingStar.opacity > 0 && 
                shootingStar.x < canvas.width + 100 && 
                shootingStar.y < canvas.height + 100) {
                requestAnimationFrame(animateShootingStar);
            }
        }
        
        animateShootingStar();
    }
    
    // Particle system
    function createParticle(x, y, color = '#00d4ff', velocity = null) {
        return {
            x: x,
            y: y,
            vx: velocity ? velocity.x : (Math.random() - 0.5) * 4,
            vy: velocity ? velocity.y : (Math.random() - 0.5) * 4,
            life: 1,
            decay: 0.02,
            size: Math.random() * 3 + 1,
            color: color,
            gravity: 0.1
        };
    }
    
    function updateParticles() {
        particles = particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.life -= particle.decay;
            particle.size *= 0.98;
            
            return particle.life > 0 && particle.size > 0.1;
        });
    }
    
    function drawParticles() {
        if (!ctx) return;
        
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    // Enhanced hover effects
    function initializeHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            '.nav-btn, .cta-btn, .project-card, .achievement-card, .contact-card, .skill-item'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function(event) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Create hover particles
                for (let i = 0; i < 3; i++) {
                    const angle = (i / 3) * Math.PI * 2;
                    const distance = 20;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    
                    const particle = createParticle(x, y, '#4ecdc4');
                    if (particle) {
                        particles.push(particle);
                    }
                }
                
                // Add glow effect
                this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
            
            element.addEventListener('click', function(event) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Create click explosion
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const velocity = {
                        x: Math.cos(angle) * 3,
                        y: Math.sin(angle) * 3
                    };
                    const particle = createParticle(centerX, centerY, '#00d4ff', velocity);
                    if (particle) {
                        particles.push(particle);
                    }
                }
            });
        });
    }
    
    // Scroll-triggered animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('skill-item')) {
                        animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('achievement-card')) {
                        animateAchievement(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const animateElements = document.querySelectorAll(
            '.project-card, .achievement-card, .timeline-item, .skill-item, .contact-card'
        );
        animateElements.forEach(el => observer.observe(el));
    }
    
    // Skill bar animation
    function animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar) {
            const targetWidth = progressBar.dataset.width;
            progressBar.style.width = '0%';
            
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 300);
        }
    }
    
    // Achievement animation
    function animateAchievement(achievementCard) {
        const glow = achievementCard.querySelector('.achievement-glow');
        if (glow) {
            glow.style.animation = 'glowPulse 1s ease-in-out';
            setTimeout(() => {
                glow.style.animation = 'glowPulse 3s infinite';
            }, 1000);
        }
    }
    
    // Typing animation
    function createTypingAnimation(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid #00d4ff';
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }
    
    // Floating elements animation
    function initializeFloatingElements() {
        const floatingElements = document.querySelectorAll(
            '.floating-satellite, .floating-planet, .floating-asteroid'
        );
        
        floatingElements.forEach((element, index) => {
            // Randomize animation properties
            element.style.animationDelay = `${index * 3}s`;
            element.style.animationDuration = `${20 + index * 5}s`;
            
            // Add mouse interaction
            element.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.2)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Performance optimization
    function optimizeAnimations() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            } else {
                if (canvas && ctx) {
                    animateStars();
                }
            }
        });
        
        // Reduce particle count on mobile
        if (window.innerWidth < 768) {
            const originalCreateParticle = createParticle;
            createParticle = function(...args) {
                if (Math.random() < 0.5) { // 50% chance to create particle on mobile
                    return originalCreateParticle(...args);
                }
                return null;
            };
        }
    }
    
    // Main animation loop
    function mainAnimationLoop() {
        updateParticles();
        requestAnimationFrame(mainAnimationLoop);
    }
    
    // Initialize all animations
    function initializeAnimations() {
        initializeStarField();
        initializeHoverEffects();
        initializeScrollAnimations();
        initializeFloatingElements();
        optimizeAnimations();
        
        // Start main animation loop
        mainAnimationLoop();
        
        // Add custom CSS animations
        addCustomAnimations();
    }
    
    // Add custom CSS animations
    function addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes animate-in {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes glowPulse {
                0%, 100% {
                    opacity: 0.3;
                    transform: scale(0.8);
                }
                50% {
                    opacity: 0.8;
                    transform: scale(1.2);
                }
            }
            
            @keyframes floatAround {
                0% { transform: translate(0, 0) rotate(0deg); }
                25% { transform: translate(20px, -20px) rotate(90deg); }
                50% { transform: translate(0, -40px) rotate(180deg); }
                75% { transform: translate(-20px, -20px) rotate(270deg); }
                100% { transform: translate(0, 0) rotate(360deg); }
            }
            
            @keyframes rotateRing {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes statusPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes loadingProgress {
                0% { width: 0%; }
                100% { width: 100%; }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 100%; }
            }
            
            @keyframes blink-caret {
                from, to { border-color: transparent; }
                50% { border-color: #00d4ff; }
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            @keyframes statusBlink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes hintPulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
            
            .animate-in {
                animation: animate-in 0.6s ease-out;
            }
            
            /* Smooth transitions for all interactive elements */
            .nav-btn, .cta-btn, .project-card, .achievement-card, 
            .contact-card, .skill-item, .timeline-content {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Enhanced hover states */
            .project-card:hover {
                transform: translateY(-10px) scale(1.02);
            }
            
            .achievement-card:hover {
                transform: translateY(-10px);
            }
            
            .contact-card:hover {
                transform: translateY(-5px);
            }
            
            .skill-item:hover {
                transform: translateY(-5px);
            }
            
            .timeline-content:hover {
                transform: translateX(10px);
            }
            
            /* Loading screen animations */
            .loading-progress {
                animation: loadingProgress 3s ease-in-out;
            }
            
            .astronaut-helmet {
                animation: float 3s ease-in-out infinite;
            }
            
            .loading-status {
                animation: pulse 2s infinite;
            }
            
            /* Hero section animations */
            .avatar-ring {
                animation: rotateRing 20s linear infinite;
            }
            
            .status-indicator {
                animation: statusPulse 2s infinite;
            }
            
            .astronaut-icon {
                animation: rotate 10s linear infinite;
            }
            
            /* Floating elements */
            .floating-satellite,
            .floating-planet,
            .floating-asteroid {
                animation: floatAround 20s linear infinite;
            }
            
            /* Terminal hint */
            .terminal-hint {
                animation: hintPulse 3s infinite;
            }
            
            /* Achievement glow */
            .achievement-glow {
                animation: glowPulse 3s infinite;
            }
            
            /* Status indicators */
            .project-status.completed,
            .project-status.active {
                animation: statusBlink 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Export functions for external use
    window.initializeAnimations = initializeAnimations;
    window.createTypingAnimation = createTypingAnimation;
    window.createParticle = createParticle;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAnimations);
    } else {
        initializeAnimations();
    }
});