/* ───────────────────────────────────────────────────────────────────
   Footer year
   ─────────────────────────────────────────────────────────────────── */
(function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
})();

/* ───────────────────────────────────────────────────────────────────
   Reveal-on-scroll
   ─────────────────────────────────────────────────────────────────── */
(function setupReveals() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
})();

/* ───────────────────────────────────────────────────────────────────
   Active-section highlight in topnav as you scroll
   Active section = the last one whose top has crossed the trigger line
   (35% from the viewport top). Reliable for long sections, sticks the
   final section active when scrolled past it into the footer, and
   leaves nothing active while the hero is in view (no nav link for it).
   ─────────────────────────────────────────────────────────────────── */
(function setupScrollSpy() {
    const links = document.querySelectorAll('.topnav ul a[href^="#"]');
    if (!links.length) return;

    const sections = [];
    const linkBySection = new Map();
    links.forEach(a => {
        const id = a.getAttribute('href').slice(1);
        const sec = document.getElementById(id);
        if (sec) {
            sections.push(sec);
            linkBySection.set(sec, a);
        }
    });
    if (!sections.length) return;

    const setActive = (link) => {
        links.forEach(a => {
            const on = a === link;
            a.classList.toggle('is-active', on);
            if (on) a.setAttribute('aria-current', 'location');
            else a.removeAttribute('aria-current');
        });
    };

    function update() {
        const triggerY = window.innerHeight * 0.35;
        let active = null;
        for (const sec of sections) {
            if (sec.getBoundingClientRect().top - triggerY <= 0) {
                active = sec; // last one whose top has crossed wins
            }
        }
        setActive(active ? linkBySection.get(active) : null);
    }

    let raf = 0;
    function onScroll() {
        if (raf) return;
        raf = requestAnimationFrame(() => { raf = 0; update(); });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
})();
