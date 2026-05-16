// ===== REGISTER GSAP PLUGINS =====
gsap.registerPlugin(ScrollTrigger);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', (e) => {
    cx = e.clientX;
    cy = e.clientY;
    gsap.to(cursor, { x: cx - 6, y: cy - 6, duration: 0.1 });
});

gsap.ticker.add(() => {
    rx += (cx - rx) * 0.1;
    ry += (cy - ry) * 0.1;
    gsap.set(ring, { x: rx - 18, y: ry - 18 });
});

// Show cursor on success overlay
const successOverlay = document.getElementById('successOverlay');
const cursorElements = document.querySelectorAll('a, button, .project-card, .skill-card, .service-card');

cursorElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { width: 20, height: 20, duration: 0.2 });
        gsap.to(ring, { width: 60, height: 60, x: rx - 30, y: ry - 30, opacity: 0.8, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 12, height: 12, duration: 0.2 });
        gsap.to(ring, { width: 36, height: 36, opacity: 0.5, duration: 0.2 });
    });
});

// Ensure cursor is visible on success overlay
successOverlay.addEventListener('mouseenter', () => {
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
});

// ===== LOADER =====
const loaderText = document.getElementById('loader-text');
const loaderFill = document.getElementById('loader-fill');
const names = ['H', 'Ha', 'Hak', 'Haki', 'Hakim', ' ', 'Hakim U', 'Hakim Ul', 'Hakim Ull', 'Hakim Ulla', 'Hakim Ullah'];
let nameIndex = 0;

const typeInterval = setInterval(() => {
    if (nameIndex < names.length) {
        loaderText.textContent = names[nameIndex++];
    } else {
        clearInterval(typeInterval);
    }
}, 80);

gsap.to(loaderFill, {
    width: '100%',
    duration: 1.8,
    ease: 'power2.inOut',
    onComplete: () => {
        gsap.to('#loader', {
            opacity: 0,
            y: -40,
            duration: 0.6,
            ease: 'power2.in',
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                initAnimations();
            }
        });
    }
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    gsap.set('#progress', { scaleX: scrollY / totalHeight });
});

// ===== THEME TOGGLE =====
const themeBtn = document.getElementById('themeBtn');
themeBtn.onclick = () => {
    const html = document.documentElement;
    const newTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = newTheme;
    themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
};

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.onclick = () => mobileNav.classList.toggle('open');

function closeMobileNav() {
    mobileNav.classList.remove('open');
}

// ===== FLOATING PARTICLES =====
function createParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        const colors = ['#6c63ff', '#ff6584', '#43e97b'];

        particle.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${Math.random() * 100}vw;
                    background: ${colors[Math.floor(Math.random() * 3)]};
                    animation-duration: ${Math.random() * 20 + 15}s;
                    animation-delay: -${Math.random() * 20}s;
                `;
        document.body.appendChild(particle);
    }
}
createParticles();

// ===== MAIN ANIMATIONS =====
function initAnimations() {
    // Hero animations
    const tl = gsap.timeline();
    tl.to('.hero-greeting', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .add(() => {
            const letters = document.querySelectorAll('.hero-name .letter');
            gsap.to(letters, { y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' });
        }, '-=0.2')
        .from('.role-text', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
        .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .to('.hero-btns', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .to('.hero-right', { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.2');

    // Wrap each letter in hero name
    document.querySelectorAll('.hero-name .word').forEach(word => {
        word.innerHTML = word.textContent.split('').map(l => `<span class="letter">${l}</span>`).join('');
    });

    // Re-run letter animation
    setTimeout(() => {
        gsap.from('.hero-name .letter', { y: '100%', duration: 0.8, stagger: 0.04, ease: 'power3.out' });
    }, 100);

    // Role typewriter effect
    const roles = ['MERN Stack Developer', 'React.js Expert', 'Node.js Engineer', 'Full Stack Developer'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const roleEl = document.getElementById('roleText');

    function typeRole() {
        const current = roles[roleIndex];
        if (!isDeleting) {
            if (charIndex < current.length) {
                roleEl.textContent = current.slice(0, ++charIndex);
                setTimeout(typeRole, 80);
            } else {
                isDeleting = true;
                setTimeout(typeRole, 2000);
            }
        } else {
            if (charIndex > 0) {
                roleEl.textContent = current.slice(0, --charIndex);
                setTimeout(typeRole, 40);
            } else {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeRole, 300);
            }
        }
    }
    setTimeout(typeRole, 1500);

    // Reveal elements on scroll
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
        );
    });

    // Skill bars animation
    document.querySelectorAll('.skill-card').forEach(card => {
        const percentage = card.dataset.skill;
        const fill = card.querySelector('.skill-fill');
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            once: true,
            onEnter: () => gsap.to(fill, { width: percentage + '%', duration: 1.5, ease: 'power2.out' })
        });
    });

    // Stats counter animation
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = +el.dataset.target;
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function () {
                        el.textContent = Math.round(this.targets()[0].val) + (target === 100 ? '%' : '+');
                    }
                });
            }
        });
    });

    // Timeline items animation
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.15,
            scrollTrigger: { trigger: item, start: 'top 80%', once: true }
        });
    });
}

// ===== FORM SUBMISSION =====
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const btn = document.getElementById('submitBtn');
    const formMsg = document.getElementById('formMsg');

    // Validate form
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fname || !email || !message) {
        formMsg.className = 'form-msg error';
        formMsg.textContent = '⚠️ Please fill in all required fields (First Name, Email, Message).';
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        formMsg.className = 'form-msg error';
        formMsg.textContent = '⚠️ Please enter a valid email address.';
        return;
    }

    // Update button state
    btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;"><span class="loading-spinner"></span> Sending...</span>';
    btn.disabled = true;
    formMsg.className = 'form-msg';
    formMsg.textContent = '';

    try {
        // Submit form data to Web3Forms
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Show beautiful success message
            showSuccessMessage(fname);

            // Clear form fields
            ['fname', 'lname', 'email', 'subject', 'message'].forEach(id => {
                document.getElementById(id).value = '';
            });
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        formMsg.className = 'form-msg error';
        formMsg.textContent = '⚠️ Oops! Something went wrong. Please try again.';
    } finally {
        btn.innerHTML = 'Send Message 🚀';
        btn.disabled = false;
    }
});

// ===== SHOW BEAUTIFUL SUCCESS MESSAGE =====
function showSuccessMessage(name) {
    const overlay = document.getElementById('successOverlay');
    const title = document.getElementById('successTitle');
    const subtitle = document.getElementById('successSubtitle');

    // Update message content
    title.textContent = `Hey ${name}! 🎉`;
    subtitle.textContent = 'Your message has been successfully sent! I\'m excited to connect and will get back to you within 24 hours.';

    // Show overlay with cursor
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Show cursor on overlay
    gsap.to(cursor, { opacity: 1, duration: 0.2 });
    gsap.to(ring, { opacity: 1, duration: 0.2 });

    // Trigger confetti and sparkles
    createConfetti();
    setTimeout(() => createSparkles(), 400);
}

// ===== CLOSE SUCCESS MESSAGE =====
function closeSuccessMessage() {
    const overlay = document.getElementById('successOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#6c63ff', '#ff6584', '#43e97b', '#ffd700', '#00d4ff', '#ff6b6b', '#feca57', '#54a0ff'];

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 6;
            const left = Math.random() * 100;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.5;

            confetti.style.cssText = `
                        background: ${color};
                        width: ${size}px;
                        height: ${size}px;
                        left: ${left}%;
                        top: -20px;
                        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                        animation: confettiFall ${duration}s linear ${delay}s forwards;
                        transform: rotate(${Math.random() * 360}deg);
                    `;

            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => confetti.remove(), (duration + delay) * 1000 + 500);
        }, i * 20);
    }
}

// ===== SPARKLES EFFECT =====
function createSparkles() {
    const card = document.querySelector('.success-card');
    const rect = card.getBoundingClientRect();
    const colors = ['#6c63ff', '#ff6584', '#43e97b', '#ffd700'];

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';

        const angle = (Math.PI * 2 * i) / 20;
        const radius = Math.random() * 40 + 60;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;

        sparkle.style.cssText = `
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    --tx: ${tx}px;
                    --ty: ${ty}px;
                    animation: sparkleFloat ${Math.random() * 0.8 + 0.6}s ease-out forwards;
                    width: ${Math.random() * 3 + 2}px;
                    height: ${Math.random() * 3 + 2}px;
                    background: ${colors[Math.floor(Math.random() * 4)]};
                    border-radius: 50%;
                    z-index: 10002;
                `;

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}

// ===== PROJECT MODALS =====
const projects = {
    ecommerce: {
        name: 'E-Commerce Platform',
        emoji: 'https://res.cloudinary.com/dbeotyvpg/image/upload/q_auto/f_auto/v1778914327/ecommerce_sgnhf9.png',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Cloudinary'],
        desc: 'A full-featured e-commerce solution with product management, shopping cart, Stripe payment integration, admin dashboard with analytics, order management, user authentication with JWT, and email notifications.',
        features: ['Product catalog with filters & search', 'Shopping cart & wishlist', 'Stripe payment gateway', 'Admin dashboard with analytics', 'Order tracking system', 'JWT authentication']
    },
    taskapp: {
        name: 'Fitness & Gym Management Platform',
        emoji: '📋',
        tags: ['React.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
        desc: 'A powerful fitness platform with workout programs, trainer profiles, membership plans, progress tracking, and real-time updates for a modern gym experience.</',
        features: ['Workout & training programs', 'membership management', 'Trainer profiles', 'Fitness progress tracking', 'Class scheduling system', 'Real-time updates & notifications']
    },
    blog: {
        name: 'Veloura Restaurant',
        emoji: '✍️',
        tags: ['MERN Stack', 'Redux', 'Cloudinary', 'TipTap Editor'],
        desc: 'A modern restaurant platform for Rome dining experiences featuring online reservations, elegant menu showcases, chef specials, gallery management, customer reviews, and seamless table booking.</',
        features: ['Online table reservations', 'Elegant food menu showcase', 'Chef special dishes', 'Customer reviews & ratings', 'Gallery & ambiance showcase', 'Modern booking experience']
    },
    chat: {
        name: 'Real-Time Chat App',
        emoji: '💬',
        tags: ['Socket.io', 'React.js', 'Node.js', 'MongoDB'],
        desc: 'A feature-rich instant messaging application with public and private rooms, file sharing, online presence indicators, and message encryption.',
        features: ['Real-time messaging', 'Public & private rooms', 'File sharing', 'Online presence', 'Message history', 'End-to-end encryption']
    },
    social: {
        name: 'Social Media App',
        emoji: '👥',
        tags: ['MERN Stack', 'WebSockets', 'AWS S3', 'Cloudinary'],
        desc: 'A complete social platform with posts, follows, likes, stories, real-time notifications, and media sharing capabilities.',
        features: ['Posts & stories', 'Follow/unfollow system', 'Like & comment system', 'Real-time notifications', 'Media uploads', 'Explore/discover feed']
    },
    dash: {
        name: 'Analytics Dashboard',
        emoji: '📊',
        tags: ['React.js', 'Chart.js', 'Node.js', 'REST API'],
        desc: 'A business intelligence dashboard with interactive data visualizations, custom date filtering, CSV export, and real-time data updates.',
        features: ['Interactive charts (Chart.js)', 'Custom date range filters', 'CSV/PDF export', 'Real-time data updates', 'KPI widgets', 'Responsive layout']
    }
};

function openModal(id) {
    const project = projects[id];
    if (!project) return;

    document.getElementById('modalBody').innerHTML = `
                <div style="font-size:3rem;margin-bottom:20px">${project.emoji}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
                    ${project.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <h2 style="font-family:'Syne',sans-serif;font-size:1.6rem;font-weight:800;margin-bottom:16px">${project.name}</h2>
                <p style="color:var(--text2);line-height:1.8;margin-bottom:24px">${project.desc}</p>
                <h3 style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;margin-bottom:12px">Key Features</h3>
                <ul style="list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:28px">
                    ${project.features.map(f => `
                        <li style="font-size:.85rem;color:var(--text2);display:flex;align-items:center;gap:8px">
                            <span style="color:var(--accent3)">✓</span>${f}
                        </li>
                    `).join('')}
                </ul>
                <div style="display:flex;gap:12px">
                    <a href="#" class="btn btn-primary">🔗 Live Demo</a>
                    <a href="#" class="btn btn-outline">⌥ View Code</a>
                </div>
            `;

    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(e) {
    if (e && e.target !== document.getElementById('modalOverlay') && e.type !== 'click') return;
    if (e && e.currentTarget === document.getElementById('modalOverlay') && e.target !== e.currentTarget) return;

    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close modal if open
        if (document.getElementById('modalOverlay').classList.contains('open')) {
            document.getElementById('modalOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }
        // Close success overlay if open
        if (document.getElementById('successOverlay').classList.contains('active')) {
            closeSuccessMessage();
        }
    }
});

// Close success message on clicking outside
successOverlay.addEventListener('click', function (e) {
    if (e.target === this) {
        closeSuccessMessage();
    }
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) {
            current = s.id;
        }
    });

    links.forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
});