

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    const observerOptions = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});


document.addEventListener('DOMContentLoaded', function () {
    const profileContainer = document.querySelector('.profile-container');
    const technologies = [
        { icon: 'fab fa-js', color: '#f7df1e', angle: 0 },
        { icon: 'fab fa-html5', color: '#e34f26', angle: 51.4 },
        { icon: 'fab fa-css3-alt', color: '#1572b6', angle: 102.8 },
        { icon: 'fab fa-react', color: '#61dafb', angle: 154.2 },
        { icon: 'fab fa-laravel', color: '#ff2d20', angle: 205.6 },
        { icon: 'fab fa-bootstrap', color: '#7952b3', angle: 257 },
        { icon: 'fab fa-github', color: '#ffffff', angle: 308.4 }
    ];

    technologies.forEach((tech) => {
        const icon = document.createElement('div');
        icon.className = 'tech-icon';
        icon.innerHTML = `<i class="${tech.icon} fa-lg" style="color: ${tech.color};"></i>`;
        icon.style.setProperty('--angle', `${tech.angle}deg`);
        profileContainer.appendChild(icon);
    });

    let isAnimating = false;

    profileContainer.addEventListener('click', function () {
        if (isAnimating) return;
        isAnimating = true;

        const icons = document.querySelectorAll('.tech-icon');
        icons.forEach(icon => {
            icon.style.animation = 'none';
            icon.offsetHeight; // Trigger reflow
            icon.style.animation = 'scatterAnimation 2s ease-in-out';
        });

        setTimeout(() => {
            icons.forEach(icon => {
                icon.style.animation = 'orbitAnimation 60s linear infinite';
            });
            isAnimating = false;
        }, 2000);
    });
});


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> CLASE ACTIVE <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todas las secciones y enlaces de navegación
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Función para actualizar el enlace activo
    function updateActiveLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajusta este valor según tu header
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Verificar si la sección está en el viewport
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover la clase active de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Agregar evento scroll
    window.addEventListener('scroll', updateActiveLink);

    updateActiveLink();

    // Manejar el clic en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

const track = document.querySelector('.skills-track');
const cards = [...document.querySelectorAll('.skill-card')];

const clones = Array.from({ length: 10 }, () => cards.map(card => card.cloneNode(true)))
                    .flat();

// Agrega las tarjetas clonadas al contenedor
track.append(...clones);

// Ajusta dinámicamente el ancho del contenedor
const totalCards = cards.length * 11;
track.style.width = `${250 * totalCards}px`; // Ancho dinámico basado en 250px por tarjeta



/**>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END ACTIVE CLASS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

//notificacion
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const thankYouMessage = document.querySelector('.thank-you-message');

    function showThankYouMessage() {
        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
    }

    window.resetForm = function() {
        form.reset();
        form.style.display = 'block';
        thankYouMessage.style.display = 'none';
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showThankYouMessage();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        })
        .catch(error => {
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        });
    });
});