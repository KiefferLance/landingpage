// ========================================
// FreshSense Theme Toggle & Detection
// Handles dark/light mode with system preference detection
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Function to apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            html.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        } else {
            html.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
        }
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference
        applyTheme(savedTheme);
    } else {
        // Detect system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const systemTheme = prefersDark ? 'dark' : 'light';
        applyTheme(systemTheme);
        localStorage.setItem('theme', systemTheme);
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark-mode');
        const isDarkMode = html.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

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

// ========================================
// Add animation on scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards for animation
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe detail cards for animation
document.querySelectorAll('.detail-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
