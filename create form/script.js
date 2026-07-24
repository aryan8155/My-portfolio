// 1. Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 2. Typing Animation
const text = "Frontend Developer. UI Designer. Problem Solver.";
let index = 0;
let isDeleting = false;
let currentText = '';
const typingTarget = document.querySelector('.typing-text');

function typeEffect() {
    const fullText = text;
    if (isDeleting) {
        currentText = fullText.substring(0, index - 1);
        index--;
    } else {
        currentText = fullText.substring(0, index + 1);
        index++;
    }

    typingTarget.innerHTML = currentText;

    let speed = isDeleting ? 50 : 150;

    if (!isDeleting && index === fullText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && index === 0) {
        isDeleting = false;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

// 3. Dark Mode Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const icon = themeBtn.querySelector('i');
    
    if (body.classList.contains('dark-theme')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Check Local Storage for Theme
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
}

// 4. Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();

// 5. Contact Form with EmailJS
const EMAILJS_CONFIG = {
    publicKey: 'n3Jep_eUlAhWjmDEx',
    serviceId: 'service_p8iz7uv',
    templateId: 'template_lehn11b'
};

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = contactForm.querySelector('.btn-submit');
const submitBtnHtml = submitBtn.innerHTML;

function setFormMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = '';
    formMessage.classList.add('show', type);
}

function isEmailJsConfigured() {
    return !Object.values(EMAILJS_CONFIG).some(value => value.startsWith('YOUR_'));
}

if (window.emailjs) {
    emailjs.init({
        publicKey: EMAILJS_CONFIG.publicKey
    });
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!window.emailjs) {
        setFormMessage('Email service load nahi hui. Internet check karke dubara try karo.', 'error');
        return;
    }

    if (!isEmailJsConfigured()) {
        setFormMessage('EmailJS keys set nahi hain. script.js mein publicKey, serviceId, templateId update karo.', 'error');
        return;
    }

    const templateParams = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        submitted_at: new Date().toLocaleString('en-IN')
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setFormMessage('Message bheja ja raha hai...', 'info');

    try {
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        setFormMessage('Success! Message send ho gaya. Main jaldi reply karunga.', 'success');
        contactForm.reset();
    } catch (error) {
        setFormMessage('Oops! Message send nahi ho paya. Thodi der baad phir try karo.', 'error');
        console.error('EmailJS Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtnHtml;
    }
});