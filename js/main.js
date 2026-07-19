/* ============================================================================
   MAIN APP LOGIC
   Renders everything in PORTFOLIO_DATA (see data.js). Nothing in here should
   need editing to update content — edit data.js instead.
============================================================================ */
(function(){
  const DATA = window.PORTFOLIO_DATA;
  const app = document.getElementById("app");

  /* ---------------------------------------------------------------------
     HELPERS
  --------------------------------------------------------------------- */
  function escapeXML(s){
    return String(s).replace(/[<>&'"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[c]));
  }
  function initials(name){
    return String(name || "?").trim().split(/\s+/).slice(0,2).map(w => w[0] || "").join("").toUpperCase();
  }
  function placeholderSVG(label){
    const safe = (label || "IMAGE").toUpperCase();
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
        <rect width='400' height='300' fill='#13293D'/>
        <rect x='0.5' y='0.5' width='399' height='299' fill='none' stroke='#A9812F' stroke-opacity='0.5'/>
        <text x='200' y='155' font-family='IBM Plex Mono, monospace' font-size='13' fill='#C9A24A'
              text-anchor='middle' letter-spacing='1'>${escapeXML(safe)}</text>
        <text x='200' y='175' font-family='IBM Plex Mono, monospace' font-size='9' fill='#8FA3B5'
              text-anchor='middle' opacity='0.85'>IMAGE PENDING</text>
      </svg>`;
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }
  function imgSrc(src, fallbackLabel){
    return src && src.trim() ? src : placeholderSVG(fallbackLabel);
  }
  function debounce(fn, wait){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  /* ---------------------------------------------------------------------
     HEADER + CONTACT WIRING (nav brand, LinkedIn, WhatsApp x2)
  --------------------------------------------------------------------- */
  function paintHeaderAndContacts(){
    document.title = `${DATA.meta.name} — ${DATA.meta.role}`;

    document.getElementById("hdr-linkedin").href = DATA.meta.linkedinUrl;

    const msg = encodeURIComponent(DATA.meta.whatsappPresetMessage || "Hi!");
    const waLink = `https://wa.me/${DATA.meta.whatsappNumber}?text=${msg}`;
    document.getElementById("hdr-whatsapp").href = waLink;
    document.getElementById("whatsapp-fab").href = waLink;
  }

  /* ---------------------------------------------------------------------
     PROFILE / HERO
  --------------------------------------------------------------------- */
  function renderProfile(){
    const m = DATA.meta;
    const photoInner = m.photo && m.photo.trim()
      ? `<img src="${m.photo}" alt="${escapeXML(m.name)}">`
      : `<span class="photo-initials">${initials(m.name)}</span>`;

    const factsHTML = (m.quickFacts || []).map(f => `
      <div class="qf-item">
        <span class="qf-label">${escapeXML(f.label)}</span>
        <span class="qf-value">${escapeXML(f.value)}</span>
      </div>
    `).join("");

    const bioHTML = (m.bio || []).map(p => `<p>${p}</p>`).join("");
    const waMsg = encodeURIComponent(m.whatsappPresetMessage || "Hi!");

    return `
      <section class="profile">
        <div class="profile-photo-wrap">
          <div class="photo-seal">
            <div class="photo-frame">${photoInner}</div>
          </div>
          <div class="photo-caption">${escapeXML(m.location || "")}</div>
        </div>
        <div class="profile-info">
          <span class="eyebrow">Professional Profile</span>
          <h1>${escapeXML(m.name)}</h1>
          <p class="role">${escapeXML(m.role)}</p>
          <div class="bio">${bioHTML}</div>
          <div class="quick-facts">${factsHTML}</div>
          <div class="profile-actions">
            <a class="btn btn-primary" href="https://wa.me/${m.whatsappNumber}?text=${waMsg}" target="_blank" rel="noopener">Chat on WhatsApp</a>
            <a class="btn btn-outline" href="${m.linkedinUrl}" target="_blank" rel="noopener">View LinkedIn</a>
          </div>
        </div>
      </section>
    `;
  }

  /* ---------------------------------------------------------------------
     HUB VIEW (profile + expertise index)
  --------------------------------------------------------------------- */
  function renderHub(){
    const cardsHTML = DATA.skills.map(s => `
      <a class="skill-card" href="#/skill/${s.id}">
        <h3>${s.title}</h3>
        <p>${s.short}</p>
        <span class="card-open">View full scope
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" stroke-width="1.3"/></svg>
        </span>
      </a>
    `).join("");

    app.innerHTML = `
      ${renderProfile()}
      <section class="section-head" id="expertise">
        <span class="eyebrow">Areas of Expertise</span>
        <h2>Disciplines &amp; Scope of Work</h2>
        <div class="rule"></div>
        <p class="lede">Five practice areas, one working method: understand the system properly, design it with intent, then build something that holds up. Select any area below for its full scope.</p>
      </section>
      <div class="skill-grid">${cardsHTML}</div>
    `;
  }

  /* ---------------------------------------------------------------------
     DETAIL SHEET VIEW
  --------------------------------------------------------------------- */
  function renderSkillDetail(id){
    const skill = DATA.skills.find(s => s.id === id);
    if (!skill){ renderNotFound(); return; }

    let bodyHTML = "";
    if (skill.type === "gallery")  bodyHTML = renderGallerySections(skill);
    if (skill.type === "projects") bodyHTML = renderProjects(skill);
    if (skill.type === "services") bodyHTML = renderServices(skill);

    app.innerHTML = `
      <section class="sheet">
        <a class="breadcrumb" href="#/">
          <svg width="12" height="10" viewBox="0 0 14 10" fill="none"><path d="M14 5H1M1 5L5 1M1 5L5 9" stroke="currentColor" stroke-width="1.3"/></svg>
          Back to profile
        </a>
        <header class="sheet-header">
          <h1>${skill.title}</h1>
          <div class="rule"></div>
          <p class="sheet-intro">${skill.intro}</p>
        </header>
        ${bodyHTML}
      </section>
    `;

    if (skill.type === "gallery") wireLightbox();
  }

  function renderGallerySections(skill){
    return skill.categories.map(cat => `
      <div class="category-block">
        <div class="category-head">
          <h2>${cat.name}</h2>
          <span>${cat.note || ""}</span>
        </div>
        <div class="gallery-grid">
          ${cat.images.map(img => `
            <button class="gallery-item" type="button"
                    data-full="${imgSrc(img.src, cat.name)}"
                    data-caption="${escapeXML(img.caption || cat.name)}">
              <img class="thumb" src="${imgSrc(img.src, cat.name)}" alt="${escapeXML(img.caption || cat.name)}" loading="lazy">
              <figcaption>${img.caption || ""}</figcaption>
            </button>
          `).join("")}
        </div>
      </div>
    `).join("");
  }

  function renderProjects(skill){
    return `<div class="project-grid">
      ${skill.projects.map(p => `
        <article class="project-card">
          <img class="thumb" src="${imgSrc(p.image, p.name)}" alt="${escapeXML(p.name)}" loading="lazy">
          <div class="project-body">
            <h3>${p.name}</h3>
            <span class="project-stack">${p.stack || ""}</span>
            <p>${p.description || ""}</p>
            ${p.link ? `<a class="project-link" href="${p.link}" target="_blank" rel="noopener">View project →</a>` : ""}
          </div>
        </article>
      `).join("")}
    </div>`;
  }

  function renderServices(skill){
    return `<div class="service-grid">
      ${skill.services.map(s => `
        <div class="service-card">
          <h3>${s.name}</h3>
          <p>${s.detail}</p>
        </div>
      `).join("")}
    </div>`;
  }

  function renderNotFound(){
    app.innerHTML = `
      <section class="sheet">
        <a class="breadcrumb" href="#/">← Back to profile</a>
        <header class="sheet-header">
          <h1>Sheet not found</h1>
          <p class="sheet-intro">That reference doesn't exist. Head back to the profile.</p>
        </header>
      </section>`;
  }

  /* ---------------------------------------------------------------------
     LIGHTBOX
  --------------------------------------------------------------------- */
  function ensureLightboxEl(){
    let lb = document.getElementById("lightbox");
    if (lb) return lb;
    lb = document.createElement("div");
    lb.id = "lightbox";
    lb.className = "lightbox";
    lb.innerHTML = `
      <button class="lightbox-close" type="button" aria-label="Close">×</button>
      <figure>
        <img src="" alt="">
        <figcaption></figcaption>
      </figure>`;
    document.body.appendChild(lb);
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
    return lb;
  }
  function closeLightbox(){
    const lb = document.getElementById("lightbox");
    if (lb) lb.classList.remove("open");
  }
  function wireLightbox(){
    const lb = ensureLightboxEl();
    document.querySelectorAll(".gallery-item").forEach(btn => {
      btn.addEventListener("click", () => {
        lb.querySelector("img").src = btn.dataset.full;
        lb.querySelector("img").alt = btn.dataset.caption;
        lb.querySelector("figcaption").textContent = btn.dataset.caption;
        lb.classList.add("open");
      });
    });
  }

  /* ---------------------------------------------------------------------
     FOOTER
  --------------------------------------------------------------------- */
  function renderFooter(){
    if (document.querySelector(".site-footer")) return;
    const footer = document.createElement("footer");
    footer.className = "site-footer";
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <span>&copy; ${year} ${DATA.meta.name}. All rights reserved.</span>
      <span>
        <a href="${DATA.meta.linkedinUrl}" target="_blank" rel="noopener">LinkedIn</a>
        &nbsp;·&nbsp;
        <a href="#/">Back to profile</a>
      </span>`;
    document.body.appendChild(footer);
  }

  /* ---------------------------------------------------------------------
     ROUTER
  --------------------------------------------------------------------- */
  function route(){
    const hash = window.location.hash.replace(/^#/, "") || "/";
    const skillMatch = hash.match(/^\/skill\/([\w-]+)/);

    if (skillMatch){
      window.scrollTo(0, 0);
      renderSkillDetail(skillMatch[1]);
      return;
    }

    renderHub();
    if (hash === "expertise"){
      const el = document.getElementById("expertise");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener("hashchange", route);
  window.addEventListener("DOMContentLoaded", () => {
    paintHeaderAndContacts();
    renderFooter();
    route();
  });
})();