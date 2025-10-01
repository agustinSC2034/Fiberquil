// ============================================
// GALLERY FUNCTIONALITY
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');
const thumbs = document.querySelectorAll('.thumb');
let currentIndex = 0;
let autoPlayInterval;

// Show specific gallery item
function showGalleryItem(index) {
    galleryItems.forEach(item => item.classList.remove('active'));
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    
    galleryItems[index].classList.add('active');
    thumbs[index].classList.add('active');
    currentIndex = index;
}

// Thumbnail click event
thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        showGalleryItem(index);
        resetAutoPlay();
    });
});

// Auto play gallery
function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showGalleryItem(currentIndex);
    }, 5000); // Change every 5 seconds
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Start auto play on load
if (galleryItems.length > 0) {
    startAutoPlay();
}

// Pause auto play when user hovers over gallery
const gallery = document.querySelector('.intro-gallery');
if (gallery) {
    gallery.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    gallery.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// ============================================
// SCROLL ANIMATIONS FOR SERVICE SECTIONS
// ============================================
const serviceDetails = document.querySelectorAll('.service-detail');

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only animate once
            serviceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

serviceDetails.forEach(section => {
    serviceObserver.observe(section);
});

// ============================================
// SMOOTH SCROLL WITH OFFSET FOR ANCHORS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for hash links that point to elements on the page
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            const header = document.getElementById('header');
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const menuToggle = document.getElementById('menuToggle');
            const navMenu = document.getElementById('navMenu');
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// ============================================
// HIGHLIGHT ACTIVE SERVICE IN NAVIGATION
// ============================================
function highlightActiveService() {
    const sections = document.querySelectorAll('.service-detail, .services-intro');
    const navLinks = document.querySelectorAll('.dropdown-menu a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = window.pageYOffset + 150;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveService);

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// SERVICES MENU DROPDOWN BEHAVIOR
// ============================================
const servicesDropdown = document.querySelector('.dropdown a[href="#servicios"]');
if (servicesDropdown && window.innerWidth <= 992) {
    servicesDropdown.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = servicesDropdown.closest('.dropdown');
        dropdown.classList.toggle('active');
    });
}

// ============================================
// PRINT SERVICES TO CONSOLE
// ============================================
console.log('%c Servicios Fiberquil ', 'background: #FE9603; color: #fff; font-size: 16px; padding: 8px;');
console.log('%c Instalaciones profesionales de telecomunicaciones ', 'background: #073C8B; color: #fff; font-size: 12px; padding: 5px;');

// ============================================
// PARALLAX EFFECT ON SERVICE IMAGES
// ============================================
window.addEventListener('scroll', () => {
    const serviceImages = document.querySelectorAll('.service-image img');
    const scrolled = window.pageYOffset;
    
    serviceImages.forEach(img => {
        const imageTop = img.getBoundingClientRect().top + window.pageYOffset;
        const imageVisible = imageTop < (scrolled + window.innerHeight) && imageTop + img.offsetHeight > scrolled;
        
        if (imageVisible) {
            const parallaxSpeed = 0.3;
            const yPos = (scrolled - imageTop) * parallaxSpeed;
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// ============================================
// INITIALIZE ON LOAD
// ============================================
window.addEventListener('load', () => {
    // Trigger initial check for visible sections
    highlightActiveService();
    
    // Add animation class to visible elements
    setTimeout(() => {
        serviceDetails.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.classList.add('visible');
            }
        });
    }, 100);
});
