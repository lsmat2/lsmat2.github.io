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

/* ───────────────────────────────────────────────────────────────────
   Blinking cursor in the tab icon
   Alternates the tab icon between public/favicon.svg and
   public/favicon-cursor-off.svg, like a terminal waiting for input.
   Chrome ignores href changes on an existing icon link and may serve a
   cached file, so each frame is loaded once as a data: URL and a fresh
   <link> element replaces the old one on every tick.
   Skipped for reduced motion. Background tabs throttle timers, so it
   blinks slower there; Safari doesn't show it.
   ─────────────────────────────────────────────────────────────────── */
(async function blinkFavicon() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frames;
    try {
        frames = await Promise.all(['/favicon.svg', '/favicon-cursor-off.svg'].map(async (url) => {
            const svg = await (await fetch(url)).text();
            return 'data:image/svg+xml,' + encodeURIComponent(svg);
        }));
    } catch {
        return; // keep the static icon
    }

    // One icon link we control; other rel="icon" links would compete with it.
    document.querySelectorAll('link[rel="icon"]').forEach((el) => el.remove());

    let frame = 0;
    let current = null;
    const show = () => {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/svg+xml';
        link.href = frames[frame];
        if (current) current.replaceWith(link);
        else document.head.appendChild(link);
        current = link;
        frame = 1 - frame;
    };
    show();
    setInterval(show, 530);
})();
