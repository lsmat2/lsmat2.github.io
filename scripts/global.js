// Shared JavaScript functionality across all pages

// Hamburger menu toggle
function toggleMenu() {
    const navElements = document.getElementById('nav-elements');
    navElements.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar');
    const navElements = document.getElementById('nav-elements');
    
    if (!navbar.contains(event.target)) {
        navElements.classList.remove('active');
    }
});