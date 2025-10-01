// Clientes Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de entrada de los logos
    const clienteLogos = document.querySelectorAll('.cliente-logo');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    clienteLogos.forEach((logo, index) => {
        logo.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(logo);
    });
    
    // Lazy loading de imágenes
    const images = document.querySelectorAll('.cliente-logo img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Efecto de hover mejorado
    clienteLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.background = 'white';
        });
    });
});
