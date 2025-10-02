// animations.js - Sistema de partículas rosas mejorado

class PortfolioAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.createPinkParticles();
        this.initScrollAnimations();
        this.initTypewriterEffects();
        this.initCounterAnimations();
        this.initInteractiveElements();
    }

    // Sistema de partículas rosas mejorado
    createPinkParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        // Limpiar partículas existentes
        container.innerHTML = '';

        const particleCount = 80; // Más partículas para un efecto más denso
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            
            // Tamaños variados
            const sizes = ['small', 'medium', 'large', 'xlarge'];
            const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
            
            // Posiciones aleatorias
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Retrasos y duraciones variadas
            const delay = Math.random() * 8;
            const duration = 6 + Math.random() * 9; // 6-15 segundos
            
            // Aplicar estilos
            particle.className = `particle ${sizeClass}`;
            
            // Algunas partículas con efectos especiales
            if (Math.random() > 0.7) {
                particle.classList.add('blink');
            }
            if (Math.random() > 0.9) {
                particle.classList.add('dramatic');
            }
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            // Color rosa con variaciones sutiles
            const hueVariation = Math.random() * 20 - 10; // -10 to +10
            const saturation = 80 + Math.random() * 20; // 80-100%
            const lightness = 40 + Math.random() * 20; // 40-60%
            
            particle.style.background = `hsl(${330 + hueVariation}, ${saturation}%, ${lightness}%)`;
            
            container.appendChild(particle);
        }

        // Agregar overlay para mejor contraste
        this.createParticlesOverlay();
    }

    createParticlesOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'particles-overlay';
        document.body.appendChild(overlay);
    }

    // Reiniciar partículas periódicamente para variedad
    startParticleRefresh() {
        setInterval(() => {
            this.refreshSomeParticles();
        }, 10000); // Refrescar algunas partículas cada 10 segundos
    }

    refreshSomeParticles() {
        const particles = document.querySelectorAll('.particle');
        const particlesToRefresh = Math.floor(particles.length * 0.3); // 30% de las partículas
        
        for (let i = 0; i < particlesToRefresh; i++) {
            const randomIndex = Math.floor(Math.random() * particles.length);
            const particle = particles[randomIndex];
            
            // Nueva posición
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            
            // Nuevo retraso
            const delay = Math.random() * 8;
            particle.style.animationDelay = `${delay}s`;
        }
    }

    // Animaciones al hacer scroll
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elementos a observar
        const animatedElements = document.querySelectorAll(
            '.slide-in-left, .slide-in-right, .slide-in-bottom, .stagger-fade-in, .progress-fill'
        );

        animatedElements.forEach(el => observer.observe(el));
    }

    animateOnScroll(element) {
        if (element.classList.contains('progress-fill')) {
            const width = element.getAttribute('data-width') || '100%';
            element.style.width = width;
        }
        
        element.style.animationPlayState = 'running';
    }

    // Efectos de máquina de escribir
    initTypewriterEffects() {
        const typewriterElements = document.querySelectorAll('.typewriter');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Iniciar cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    typeWriter();
                    observer.unobserve(element);
                }
            });
            
            observer.observe(element);
        });
    }

    // Contadores animados
    initCounterAnimations() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    // Elementos interactivos
    initInteractiveElements() {
        // Efecto de onda en botones
        document.querySelectorAll('.wave-button').forEach(button => {
            button.addEventListener('click', function(e) {
                const wave = document.createElement('span');
                wave.className = 'wave';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                wave.style.width = wave.style.height = `${size}px`;
                wave.style.left = `${x}px`;
                wave.style.top = `${y}px`;
                wave.style.background = 'rgba(235, 1, 125, 0.3)';
                
                this.appendChild(wave);
                
                setTimeout(() => wave.remove(), 600);
            });
        });

        // Efecto de tilt en tarjetas
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('mousemove', this.handleTilt);
            card.addEventListener('mouseleave', this.resetTilt);
        });
    }

    handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / cardRect.height) * -10;
        const rotateY = (mouseX / cardRect.width) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    resetTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }

    // Animación de skills con progress bars
    animateSkills() {
        const skills = [
            { name: 'Unity', level: 90 },
            { name: 'C#', level: 85 },
            { name: '3D Modeling', level: 80 },
            { name: 'VFX', level: 75 },
            { name: 'Shader Programming', level: 70 }
        ];

        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return;

        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item mb-4';
            skillElement.innerHTML = `
                <div class="d-flex justify-content-between mb-2">
                    <span class="fs-5">${skill.name}</span>
                    <span class="fs-5">${skill.level}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" data-width="${skill.level}%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillElement);
        });
    }

    // Efecto de confeti rosa al hacer click en CTA
    createConfetti() {
        const confettiCount = 100;
        const pinkColors = [
            '#ff69b4', '#ff1493', '#db7093', '#c71585', 
            '#ffb6c1', '#ffc0cb', '#d87093', '#ff91a4'
        ];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const color = pinkColors[Math.floor(Math.random() * pinkColors.length)];
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const rotation = Math.random() * 360;
            
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${posX}%`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }
    }
}

// CSS adicional para confeti rosa
const confettiStyles = `
.confetti {
    position: fixed;
    top: -10px;
    pointer-events: none;
    z-index: 9999;
    border-radius: 2px;
    opacity: 0.8;
}

@keyframes confettiFall {
    0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}
`;

// Inyectar estilos de confeti
const styleSheet = document.createElement('style');
styleSheet.textContent = confettiStyles;
document.head.appendChild(styleSheet);

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const animations = new PortfolioAnimations();
    animations.animateSkills();
    animations.startParticleRefresh(); // Iniciar refresco de partículas
    
    // Hacer global para el confeti
    window.portfolioAnimations = animations;
});