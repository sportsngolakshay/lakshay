document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. HEADER HEIGHT & SCROLL CLASS TOGGLER
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    function checkHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    checkHeaderScroll(); // Check once on initial load

    /* ==========================================================================
       2. MOBILE MENU NAVIGATION TOGGLER
       ========================================================================== */
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenuBar = document.getElementById('nav-menu-bar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('open');
        navMenuBar.classList.toggle('open');
    });

    // Close menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('open');
            navMenuBar.classList.remove('open');
        });
    });

    /* ==========================================================================
       3. HERO SLIDESHOW BACKGROUND AUTO-ROTATOR
       ========================================================================== */
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds
    
    function nextSlide() {
        if (heroSlides.length === 0) return;
        
        // Remove active class from current slide
        heroSlides[currentSlide].classList.remove('active');
        
        // Calculate index of next slide
        currentSlide = (currentSlide + 1) % heroSlides.length;
        
        // Add active class to next slide
        heroSlides[currentSlide].classList.add('active');
    }
    
    // Initialize hero slider loop if elements exist
    if (heroSlides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }

    /* ==========================================================================
       4. SCROLL INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
       ========================================================================== */
    const animatableElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    });
    
    animatableElements.forEach(element => {
        animationObserver.observe(element);
    });

    /* ==========================================================================
       5. ACTIVE SCROLL SPY (HIGHLIGHT ACTIVE NAV LINK)
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 150; // Offset for header trigger
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    /* ==========================================================================
       6. CUSTOM IMAGE GALLERY LIGHTBOX WITH PREV/NEXT
       ========================================================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let activeImageIndex = 0;
    const galleryImages = [];
    
    // Read details of all gallery items
    galleryItems.forEach((item, index) => {
        const imgSrc = item.getAttribute('data-src');
        
        galleryImages.push(imgSrc);
        
        // Open lightbox on item click
        item.addEventListener('click', () => {
            activeImageIndex = index;
            openLightbox(activeImageIndex);
        });
    });
    
    function openLightbox(index) {
        if (!galleryImages[index]) return;
        
        lightboxImg.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    }
    
    function showPrevImage() {
        activeImageIndex = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(activeImageIndex);
    }
    
    function showNextImage() {
        activeImageIndex = (activeImageIndex + 1) % galleryImages.length;
        openLightbox(activeImageIndex);
    }
    
    // Lightbox Event Listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close lightbox on clicking dark backdrop
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation (Esc, Left arrow, Right arrow)
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
});
