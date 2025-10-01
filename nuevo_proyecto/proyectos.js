// Proyectos Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Animación de entrada de las tarjetas
    const proyectoCards = document.querySelectorAll('.proyecto-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    proyectoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Lazy loading de imágenes
    const images = document.querySelectorAll('.proyecto-image img');
    
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
    
    // Click en tarjetas para abrir en modal o lightbox
    proyectoCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('.proyecto-image img');
            const title = this.querySelector('.proyecto-info h3').textContent;
            
            // Aquí podrías implementar un modal o lightbox
            console.log(`Proyecto seleccionado: ${title}`);
            
            // Efecto de ripple al hacer click
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Animación del separador Fiberquil
    const separador = document.querySelector('.separador-fiberquil');
    if (separador) {
        const sepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease';
                    sepObserver.unobserve(entry.target);
                }
            });
        });
        
        sepObserver.observe(separador);
    }
    
    // Precargar imágenes para mejorar la experiencia
    function preloadImages() {
        const imageUrls = Array.from(images).map(img => img.src || img.dataset.src);
        imageUrls.forEach(url => {
            if (url) {
                const img = new Image();
                img.src = url;
            }
        });
    }
    
    // Iniciar precarga después de 2 segundos
    setTimeout(preloadImages, 2000);
});

// Animación fadeInUp para el separador
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(254, 150, 3, 0.5);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
