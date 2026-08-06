// ============================================
// PORTFOLIO - MAIN APPLICATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ============================================
    // 1. DARK MODE TOGGLE
    // ============================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const icon = themeToggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // ============================================
    // 2. MOBILE HAMBURGER MENU
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });

    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // ============================================
    // 4. ACTIVE NAV LINK HIGHLIGHT
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // 5. TYPING EFFECT
    // ============================================
    const typingText = document.getElementById('typingText');
    const roles = [
        'Full Stack Developer',
        'Backend Specialist',
        'API Architect',
        'Problem Solver',
        'JavaScript Developer',
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeEffect, 3000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
            return;
        }

        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // ============================================
    // 6. PROJECTS DATA & RENDER - UPDATED WITH IMAGES
    // ============================================
    const projects = [
        {
            title: 'Job Search App API',
            description:
                'Full backend system with 25+ API endpoints, JWT authentication, real-time chat and notifications with Socket.IO, and GraphQL admin dashboard.',
            tech: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'GraphQL'],
            liveUrl: 'https://yousefhdev.github.io/Job-Search-App/',
            githubUrl: 'https://github.com/YousefHDev/Job-Search-App',
            image: 'https://via.placeholder.com/600x400/2563EB/FFFFFF?text=Job+Search+App',
        },
        {
            title: 'Social Media App',
            description:
                'Modular social platform with 20+ API endpoints, JWT authentication, file upload handling, and GraphQL integration for optimized queries.',
            tech: ['Node.js', 'GraphQL', 'MongoDB', 'JWT', 'Multer'],
            liveUrl: 'https://yousefhdev.github.io/Social-Media-App/',
            githubUrl: 'https://github.com/YousefHDev/Social-Media-App',
            image: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Social+Media+App',
        },
        {
            title: 'Saraha Anonymous Messages',
            description:
                'Secure anonymous messaging backend with 15+ API endpoints, JWT authentication, user management, and clean service-controller pattern.',
            tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Validation'],
            liveUrl: 'https://yousefhdev.github.io/Saraha-Anonymous-messages/',
            githubUrl: 'https://github.com/YousefHDev/Saraha-Anonymous-messages',
            image: 'https://via.placeholder.com/600x400/EC4899/FFFFFF?text=Saraha',
        },
        {
            title: 'DevJobs',
            description:
                'Modern job listing platform with React.js, responsive design, dark mode, search, filtering, pagination, and reusable components.',
            tech: ['React.js', 'CSS3', 'React Router', 'JavaScript'],
            liveUrl: 'https://dev-jobs-landing-page.vercel.app/',
            githubUrl: 'https://github.com/YousefHDev/DevJobs',
            image: 'image/Screenshot 2026-08-06 185509.png',
        },
        {
            title: 'Movie Explorer',
            description:
                'Movie browsing app with OMDb API integration, favorites system, loading states, error handling, and Netflix-inspired dark theme.',
            tech: ['React.js', 'Axios', 'OMDb API', 'LocalStorage'],
            liveUrl: 'https://movie-explorer-yhdev.vercel.app/',
            githubUrl: 'https://github.com/YousefHDev/Movie-Explorer',
            image: 'image/Screenshot 2026-08-06 185619.png',
        },
    ];

    const projectsGrid = document.getElementById('projectsGrid');

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.transitionDelay = `${index * 100}ms`;

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" />
                <div class="project-overlay">
                    <div class="project-tech">
                        ${project.tech.map(t => `<span>${t}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.liveUrl}" target="_blank" class="live-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="code-link">
                        <i class="fab fa-github"></i> Source Code
                    </a>
                </div>
            </div>
        `;

        projectsGrid.appendChild(card);
    });

    // ============================================
    // 7. PROJECT CARDS SCROLL ANIMATION
    // ============================================
    const projectCards = document.querySelectorAll('.project-card');

    const projectObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.1 }
    );

    projectCards.forEach((card) => {
        projectObserver.observe(card);
    });

    // ============================================
    // 8. CONTACT FORM
    // ============================================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('⚠️ Please fill in all fields.');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('⚠️ Please enter a valid email address.');
            return;
        }

        // Simulate sending
        const btn = contactForm.querySelector('.btn-primary');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            alert('✅ Message sent successfully! I\'ll get back to you soon.');
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    });

    // ============================================
    // 9. FOOTER YEAR
    // ============================================
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // ============================================
    // 10. SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ============================================
    // 11. PROGRESS BAR ANIMATION ON SCROLL
    // ============================================
    const progressBars = document.querySelectorAll('.progress');

    const progressObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        },
        { threshold: 0.3 }
    );

    progressBars.forEach((bar) => {
        progressObserver.observe(bar);
    });

    // ============================================
    // 12. SCROLL REVEAL FOR SECTIONS
    // ============================================
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });

    console.log('🚀 Portfolio loaded successfully!');
    console.log('👋 Built by Yousef Hesham');
});
