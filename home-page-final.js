// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Create Resume Button Click Handler
document.getElementById('createBtn').addEventListener('click', () => {
    // Add animation class
    const btn = document.getElementById('createBtn');
    btn.classList.add('clicked');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        btn.classList.remove('clicked');
        // Add your create resume functionality here
        console.log('Creating new resume...');
    }, 300);
});

// Open Resume Button Click Handler
document.getElementById('openBtn').addEventListener('click', () => {
    // Add animation class
    const btn = document.getElementById('openBtn');
    btn.classList.add('clicked');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        btn.classList.remove('clicked');
        // Add your open resume functionality here
        console.log('Opening existing resume...');
    }, 300);
});