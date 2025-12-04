document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // THEME MANAGEMENT
    // =========================
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        const isDark = theme === 'dark';
        html.classList.toggle('dark-mode', isDark);
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }

    // Initialize theme: saved > system > light
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (prefersDark.matches ? 'dark' : 'light');
    applyTheme(initialTheme);

    // Listen for theme toggle
    themeToggle.addEventListener('click', () => {
        const newTheme = html.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Listen for system theme changes (only if no saved preference)
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // =========================
    // SCROLL ANIMATIONS
    // =========================
    const scrollElements = document.querySelectorAll(
        '.feature-card, .detail-card, .section-title, .section-subtitle, .stat-item, .visual-content'
    );

    function isElementInView(el) {
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= viewportHeight / 1.25 && rect.bottom >= 0;
    }

    function updateScrollAnimations() {
        scrollElements.forEach((el) => {
            el.classList.toggle('animate-in', isElementInView(el));
        });
    }

    // Run on load and scroll
    updateScrollAnimations();
    window.addEventListener('scroll', updateScrollAnimations, { passive: true });

    // =========================
    // SMOOTH NAVIGATION LINKS
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
