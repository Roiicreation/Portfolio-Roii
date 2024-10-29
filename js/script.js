document.addEventListener('DOMContentLoaded', function() {
    // Loading Animation
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        });
    }

    // Inizializzazione AOS con opzioni ottimizzate
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 50,
        disable: function() {
            return window.innerWidth < 768 && 'phone';
        }
    });

    // Cursore personalizzato
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let scale = 1;

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px) scale(${scale})`;
                cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
            });
        });

        // Effetto hover per il cursore
        document.querySelectorAll('a, button, .card, .project-card').forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                scale = 1.5;
                cursor.style.border = '2px solid var(--accent)';
                cursorDot.style.opacity = '0';
            });
            
            elem.addEventListener('mouseleave', () => {
                scale = 1;
                cursor.style.border = '2px solid var(--accent)';
                cursorDot.style.opacity = '1';
            });
        });
    }

    // Particles.js con configurazione ottimizzata
    if (typeof particlesJS !== 'undefined') {
        const isMobile = window.innerWidth <= 768;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: isMobile ? 20 : 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00ff88'
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: isMobile ? 2 : 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff88',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: isMobile ? 1 : 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: !isMobile,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Animazioni scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);

    // Smooth scroll migliorato
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filtri progetti con animazioni
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    card.style.transition = 'all 0.4s ease-out';
                    
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            card.style.display = 'block';
                            requestAnimationFrame(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'scale(1)';
                            });
                        }, 400);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
    }

    // Animazioni per le skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    // Form con animazioni
    const form = document.querySelector('.contact-form');
    if (form) {
        const formElements = form.querySelectorAll('input, textarea');
        
        formElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.parentElement.classList.add('focused');
            });
            
            element.addEventListener('blur', () => {
                if (!element.value) {
                    element.parentElement.classList.remove('focused');
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.classList.add('submitted');
            
            setTimeout(() => {
                alert('Messaggio inviato con successo!');
                form.reset();
                form.classList.remove('submitted');
                formElements.forEach(element => {
                    element.parentElement.classList.remove('focused');
                });
            }, 1000);
        });
    }

    // Effetto Glitch per il titolo
    const glitchTitle = document.querySelector('.glitch-title');
    if (glitchTitle) {
        const text = glitchTitle.textContent;
        glitchTitle.innerHTML = `
            ${text}
            <span aria-hidden="true">${text}</span>
            <span aria-hidden="true">${text}</span>
        `;
    }

    // Form animations
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Animazione invio
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';
            
            // Simula invio
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Animazione successo
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Inviato!';
            submitBtn.style.background = '#00ff88';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                document.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 2000);
        });
    }

    // Gestione dei bottoni "Leggi di più"
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const blogId = this.getAttribute('data-blog');
            window.location.href = `blog/${blogId}.html`;
        });
    });

    // Project Pages Functionality
    const projectButtons = document.querySelectorAll('[data-project]');
    const projectPages = document.querySelector('.project-pages');
    const projectContainers = document.querySelectorAll('.project-page');
    const backToProjectsButtons = document.querySelectorAll('.back-to-projects');

    // Seleziona gli elementi necessari
    const projectsGrid = document.querySelector('.projects-grid');
    const allProjectPages = document.querySelectorAll('.project-page');

    // Funzione per aprire un progetto specifico
    function openProject(projectId) {
        // Nascondi tutti i project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = 'none';
        });
        
        // Mostra il progetto completo
        const projectContent = document.getElementById(projectId);
        if (projectContent) {
            projectContent.style.display = 'block';
        }
    }

    // Funzione per tornare alla griglia dei progetti
    function closeProject() {
        // Nascondi tutti i progetti completi
        document.querySelectorAll('.project-full').forEach(project => {
            project.style.display = 'none';
        });
        
        // Mostra tutti i project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.display = 'block';
        });
    }

    // Aggiungi event listener ai bottoni "Vedi Progetto"
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            openProject(projectId);
        });
    });

    // Aggiungi event listener ai bottoni "Torna ai progetti"
    backToProjectsButtons.forEach(button => {
        button.addEventListener('click', closeProject);
    });

    // Chiudi con il tasto ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProject();
        }
    });

    // Gestione Blog
    function openBlog(event, blogId) {
        event.preventDefault(); // Previene la navigazione
        
        // Nascondi tutte le card dei blog
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.display = 'none';
        });
        
        // Mostra il blog completo
        const blogContent = document.querySelector(`#${blogId}`);
        if (blogContent) {
            blogContent.style.display = 'block';
        }
    }

    // Funzione per tornare alla lista dei blog
    function closeBlog(event) {
        event.preventDefault();
        
        // Nascondi tutti i blog completi
        document.querySelectorAll('.blog-full').forEach(blog => {
            blog.style.display = 'none';
        });
        
        // Mostra tutte le card dei blog
        document.querySelectorAll('.blog-card').forEach(card => {
            card.style.display = 'block';
        });
    }

    // Aggiungi event listener ai pulsanti "Torna ai blog"
    document.querySelectorAll('.back-to-blogs').forEach(button => {
        button.addEventListener('click', closeBlog);
    });
}); 

// Aggiungi questo al tuo JavaScript esistente
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Rimuovi la classe active da tutti i link
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.remove('active');
        });
        
        // Aggiungi la classe active al link cliccato
        this.classList.add('active');
    });
});

// Evidenzia il link corretto durante lo scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('.section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}); 