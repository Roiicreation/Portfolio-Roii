document.addEventListener('DOMContentLoaded', function() {
    // Verifica l'esistenza degli elementi del cursore
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (cursor && cursorDot) {
        let scale = 1;

        function updateCursor(e) {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(${scale})`;
            cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
        }

        document.addEventListener('mousemove', updateCursor);

        // Effetto hover sul cursore
        document.querySelectorAll('a, button, .card').forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                if (cursor) {
                    scale = 1.5;
                    cursor.style.border = '2px solid var(--accent)';
                }
            });
            
            elem.addEventListener('mouseleave', () => {
                if (cursor) {
                    scale = 1;
                    cursor.style.border = '2px solid var(--accent)';
                }
            });
        });
    }

    // Animazione sezioni
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Anima gli elementi nella sezione
                const elements = entry.target.querySelectorAll('.animate');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate-visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});