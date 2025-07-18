// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainDashboard = document.getElementById('mainDashboard');
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');
    const ctaButtons = document.querySelectorAll('.cta-btn');
    const contactForm = document.getElementById('contactForm');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Loading sequence
    function startLoadingSequence() {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                mainDashboard.classList.remove('hidden');
                initializeAnimations();
                animateSkillBars();
            }, 500);
        }, 3000);
    }
    
    // Navigation functionality
    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Add active class to corresponding nav button
            const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Animate skill bars if skills section
            if (sectionId === 'skills') {
                setTimeout(animateSkillBars, 300);
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
    
    // Navigation event listeners
    navButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            showSection(section);
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // CTA button functionality
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.dataset.section;
            if (section) {
                showSection(section);
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.dataset.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
    }
    
    // Contact form handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalHTML = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span>Transmitting...</span><span class="btn-icon">📡</span>';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Message Sent!</span><span class="btn-icon">✅</span>';
                    submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #4ecdc4)';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalHTML;
                        submitBtn.disabled = false;
                        submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #00d4ff)';
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Smooth scrolling for internal links
    document.addEventListener('click', function(event) {
        if (event.target.matches('a[href^="#"]')) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .achievement-card, .timeline-item, .skill-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Particle effect for interactions
    function createParticle(x, y, color = '#00d4ff') {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.animation = 'particleFloat 2s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
    
    // Add particle effects to buttons
    document.addEventListener('click', function(event) {
        if (event.target.matches('.cta-btn, .nav-btn, .project-link')) {
            const rect = event.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createParticle(
                        x + (Math.random() - 0.5) * 30,
                        y + (Math.random() - 0.5) * 30,
                        '#4ecdc4'
                    );
                }, i * 50);
            }
        }
    });
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
            }
        }
        
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
        
        .animate-in {
            animation: animate-in 0.6s ease-out;
        }
        
        @media (max-width: 768px) {
            .main-nav.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(16, 33, 62, 0.98);
                flex-direction: column;
                padding: 20px;
                border-top: 1px solid rgba(0, 212, 255, 0.2);
                backdrop-filter: blur(10px);
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect
    setTimeout(() => {
        const heroTitle = document.querySelector('.typing-text');
        if (heroTitle) {
            const text = heroTitle.textContent;
            typeWriter(heroTitle, text, 80);
        }
    }, 3500);
    
    // Floating elements animation
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-satellite, .floating-planet, .floating-asteroid');
        
        floatingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 2}s`;
            element.style.animationDuration = `${15 + index * 5}s`;
        });
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Initialize everything
    startLoadingSequence();
    animateFloatingElements();
    
    // Add hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add glow effect to achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.achievement-glow');
            if (glow) {
                glow.style.animationDuration = '1s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.achievement-glow');
            if (glow) {
                glow.style.animationDuration = '3s';
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Close mobile menu
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
        
        // Number key navigation
        const keyMap = {
            '1': 'home',
            '2': 'about',
            '3': 'projects',
            '4': 'experience',
            '5': 'skills',
            '6': 'achievements',
            '7': 'contact'
        };
        
        if (keyMap[event.key] && !event.ctrlKey && !event.altKey) {
            showSection(keyMap[event.key]);
        }
    });
    
    // Add loading animation to project links
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (!link.classList.contains('current')) {
            link.addEventListener('click', function(event) {
                const originalText = this.innerHTML;
                this.innerHTML = '<span class="link-icon">⏳</span><span>Loading...</span>';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1000);
            });
        }
    });
    
    // Performance optimization: Lazy load animations
    const lazyAnimations = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    });
    
    // Apply lazy loading to animated elements
    const animatedElements = document.querySelectorAll('[class*="animation"], .floating-satellite, .floating-planet, .floating-asteroid');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        lazyAnimations.observe(el);
    });
});