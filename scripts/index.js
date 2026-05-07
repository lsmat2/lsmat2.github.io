/* ───────────────────────────────────────────────────────────────────
   Render Experience + Projects from JSON
   ─────────────────────────────────────────────────────────────────── */

const EXPERIENCES_URL = '/projects/experiences.json';
const PROJECTS_URL    = '/projects/projects.json';

const txt = (s) => String(s ?? '');

/* "Founder & Lead Software Engineer - Local Venue Discovery App"
   → { role: "Founder & Lead Software Engineer", org: "Local Venue Discovery App" } */
function splitTitle(raw) {
    const i = raw.indexOf(' - ');
    if (i === -1) return { role: raw, org: '' };
    return { role: raw.slice(0, i).trim(), org: raw.slice(i + 3).trim() };
}

/* "January 2024 - Present" → "JAN 2024 — PRESENT" */
const MONTHS_SHORT = {
    January: 'Jan', February: 'Feb', March: 'Mar', April: 'Apr',
    May: 'May', June: 'Jun', July: 'Jul', August: 'Aug',
    September: 'Sep', October: 'Oct', November: 'Nov', December: 'Dec'
};
function formatTime(raw) {
    if (!raw) return '';
    return raw
        .split(/\s*-\s*/)
        .map(part => part.replace(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b/g, m => MONTHS_SHORT[m]))
        .join(' — ')
        .toUpperCase();
}

function renderExperiences(list) {
    const ol = document.getElementById('experienceList');
    if (!ol) return;
    ol.removeAttribute('aria-busy');
    ol.innerHTML = list.map((exp) => {
        const { role, org } = splitTitle(txt(exp.title));
        const time = formatTime(txt(exp.time));
        const loc = txt(exp.location);
        const bullets = (exp.descriptions || [])
            .map(d => `<li>${escapeHTML(d)}</li>`).join('');
        return `
            <li class="exp-item reveal">
                <div class="exp-time">
                    ${escapeHTML(time)}
                    ${loc ? `<span class="exp-location">${escapeHTML(loc)}</span>` : ''}
                </div>
                <div class="exp-body">
                    <h3 class="exp-role">${escapeHTML(role)}</h3>
                    ${org ? `<p class="exp-org">${escapeHTML(org)}</p>` : ''}
                    <ul class="exp-bullets">${bullets}</ul>
                </div>
            </li>
        `;
    }).join('');
    upgradeReveals(ol);
}

function renderProjects(list) {
    const ol = document.getElementById('projectsList');
    const counter = document.getElementById('projectCount');
    if (!ol) return;
    ol.removeAttribute('aria-busy');
    ol.innerHTML = list.map((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        const time = formatTime(txt(p.time));
        return `
            <li class="proj-item reveal" tabindex="0">
                <span class="proj-num">[${num}]</span>
                <h3 class="proj-title">${escapeHTML(txt(p.title))}</h3>
                <span class="proj-time">${escapeHTML(time)}</span>
                <p class="proj-desc">${escapeHTML(txt(p.description))}</p>
            </li>
        `;
    }).join('');
    if (counter) counter.textContent = `${list.length} entries · hover to expand`;
    upgradeReveals(ol);
}

/* Newly-injected .reveal nodes need to be observed too */
function upgradeReveals(scope) {
    const els = scope.querySelectorAll('.reveal');
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
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(el => io.observe(el));
}

function escapeHTML(s) {
    return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

async function fetchJSON(url) {
    const r = await fetch(url, { cache: 'no-cache' });
    if (!r.ok) throw new Error(`${url} → ${r.status}`);
    return r.json();
}

(async function init() {
    try {
        const [exp, proj] = await Promise.all([
            fetchJSON(EXPERIENCES_URL),
            fetchJSON(PROJECTS_URL)
        ]);
        renderExperiences(exp.experiences || []);
        renderProjects(proj.projects || []);
    } catch (err) {
        console.error('[content] failed to load JSON:', err);
        const ol = document.getElementById('experienceList');
        if (ol) ol.innerHTML = `<li class="exp-item"><div class="exp-body"><p class="exp-org">Could not load content. Make sure the site is served over HTTP (not opened from file://).</p></div></li>`;
        const pl = document.getElementById('projectsList');
        if (pl) pl.innerHTML = '';
    }
})();
