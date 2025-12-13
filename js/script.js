// ============================================
// Portfolio - JavaScript Interactions
// ============================================

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Menu Toggle
    // ============================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animation de l'icône (hamburger -> X)
            const icon = mobileMenuBtn.querySelector('[data-lucide]');
            if (icon) {
                const isMenuOpen = !mobileMenu.classList.contains('hidden');
                icon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
                lucide.createIcons(); // Re-render icons
            }
        });
        
        // Fermer le menu mobile quand on clique sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('[data-lucide]');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }
    
    // ============================================
    // Scroll Progress Indicator
    // ============================================
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.className = 'scroll-indicator';
            document.body.prepend(progressBar);
        }
        progressBar.style.width = scrolled + '%';
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // ============================================
    // Navigation Scroll Effect
    // ============================================
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // ============================================
    // Smooth Scroll pour les ancres
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // Animations on Scroll (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe 'animate-on-scroll'
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // ============================================
    // Card Hover Effects Enhancement
    // ============================================
    const cards = document.querySelectorAll('.card-hover, [class*="hover:"]');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // Typing Effect pour le Hero (optionnel)
    // ============================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Utilisation (décommentez si vous voulez l'effet typing)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }
    
    // ============================================
    // Skills Animation (Progress Bars si nécessaire)
    // ============================================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            if (percentage) {
                setTimeout(() => {
                    bar.style.width = percentage + '%';
                }, 200);
            }
        });
    }
    
    // Observer pour déclencher l'animation des skills
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        skillsObserver.observe(skillsSection);
    }
    
    // ============================================
    // Project Filter (pour la page projets)
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ============================================
    // Form Validation (pour la page contact)
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validation simple
            let isValid = true;
            let errorMessage = '';
            
            if (name === '') {
                isValid = false;
                errorMessage += 'Le nom est requis.\n';
            }
            
            if (email === '' || !isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Un email valide est requis.\n';
            }
            
            if (message === '') {
                isValid = false;
                errorMessage += 'Le message est requis.\n';
            }
            
            if (isValid) {
                // Ici vous pouvez ajouter l'envoi du formulaire
                showNotification('Message envoyé avec succès !', 'success');
                contactForm.reset();
            } else {
                showNotification(errorMessage, 'error');
            }
        });
    }
    
    // Validation email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ============================================
    // Notification System
    // ============================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        `;
        
        // Couleurs selon le type
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
        };
        
        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Retirer après 5 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // ============================================
    // Copy to Clipboard
    // ============================================
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showNotification('Copié dans le presse-papier !', 'success');
            }).catch(() => {
                showNotification('Erreur lors de la copie', 'error');
            });
        });
    });
    
    // ============================================
    // Back to Top Button
    // ============================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
    backToTopBtn.className = 'fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-50';
    document.body.appendChild(backToTopBtn);
    
    // Afficher/masquer le bouton
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Action du bouton
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialiser les icônes Lucide pour le nouveau bouton
    lucide.createIcons();
    
    // ============================================
    // Dark Mode Toggle (optionnel pour plus tard)
    // ============================================
    function initDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                localStorage.setItem('darkMode', isDark);
            });
            
            // Charger la préférence
            const savedMode = localStorage.getItem('darkMode');
            if (savedMode === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }
    
    initDarkMode();
    
    // ============================================
    // Performance: Lazy Loading Images
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ============================================
    // Console Easter Egg
    // ============================================
    console.log('%c🚀 Portfolio développé avec passion !', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%cVous êtes curieux ? N\'hésitez pas à me contacter !', 'color: #06b6d4; font-size: 14px;');
    
});

// ============================================
// Export des fonctions utiles (si module)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        typeWriter,
        animateSkillBars
    };
}