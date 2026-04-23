document.addEventListener('DOMContentLoaded', () => {
    // Navbar effect on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, observerOptions);

    // Add fade-in class to elements we want to animate
    const elementsToAnimate = [
        ...document.querySelectorAll('.card'),
        document.querySelector('.accessory-banner'),
        ...document.querySelectorAll('.feature-box'),
        ...document.querySelectorAll('.section-title')
    ];

    elementsToAnimate.forEach(el => {
        if(el) {
            el.classList.add('fade-in');
            observer.observe(el);
        }
    });
});
