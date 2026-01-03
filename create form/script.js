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

// 5. Simple Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const msg = document.getElementById('form-message');
    msg.innerHTML = "Processing...";
    
    // Simulate API call
    setTimeout(() => {
        msg.innerHTML = "Success! Thank you for reaching out, Aryan will contact you soon.";
        msg.style.color = "#0ea5e9";
        this.reset();
    }, 2000);
});