// Theme Toggle System
// Manages switching between 'classic' and 'aurora' themes with localStorage persistence

(function() {
    'use strict';

    const STORAGE_KEY = 'leo-site-theme';
    const THEMES = ['classic', 'aurora'];
    const DEFAULT_THEME = 'classic';

    // Get saved theme or default
    function getSavedTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        return THEMES.includes(saved) ? saved : DEFAULT_THEME;
    }

    // Apply theme to document
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);

        // Update toggle button aria-label
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            const nextTheme = theme === 'classic' ? 'aurora' : 'classic';
            toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        }
    }

    // Toggle between themes
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
        const next = current === 'classic' ? 'aurora' : 'classic';
        applyTheme(next);
    }

    // Initialize theme on page load (before DOM ready to prevent flash)
    applyTheme(getSavedTheme());

    // Set up toggle button when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const toggle = document.querySelector('.theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
        }
    });

    // Expose for external use if needed
    window.themeToggle = {
        toggle: toggleTheme,
        apply: applyTheme,
        get: getSavedTheme
    };
})();
