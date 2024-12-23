

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
    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        this.reset();
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

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.scroll-progress').style.width = scrolled + '%';
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