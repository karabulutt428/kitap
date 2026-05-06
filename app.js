/* Kütüphane uygulaması - hash routing */
(() => {
  const app = document.getElementById("app");
  const searchInput = document.getElementById("search");
  const themeToggle = document.getElementById("theme-toggle");

  /* ---------- Tema ---------- */
  const savedTheme = localStorage.getItem("kutuphane-theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  let themeTransitionTimer = null;
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.classList.add("theme-transitioning");
    if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem("kutuphane-theme", next); } catch (_) {}
    clearTimeout(themeTransitionTimer);
    themeTransitionTimer = setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 320);
  });

  /* ---------- Yardımcılar ---------- */
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

  const encodePath = (p) => p.split("/").map(encodeURIComponent).join("/");

  // Aynı koleksiyon vurgu rengine bağlı 2-renk degrade üret
  const palette = (accent) => {
    // Basit "lighter" tonu üretmek için renk parlatma
    const hex = (accent || "#7a5230").replace("#", "");
    const r = parseInt(hex.substr(0,2),16);
    const g = parseInt(hex.substr(2,2),16);
    const b = parseInt(hex.substr(4,2),16);
    const lighten = (v) => Math.min(255, Math.round(v + (255 - v) * 0.35));
    const c2 = `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`;
    return { c1: accent, c2 };
  };

  // Kitap rengi: koleksiyon rengini biraz çeşitlendir
  const bookPalette = (accent, idx) => {
    const hex = (accent || "#7a5230").replace("#", "");
    let r = parseInt(hex.substr(0,2),16);
    let g = parseInt(hex.substr(2,2),16);
    let b = parseInt(hex.substr(4,2),16);
    const shift = (idx * 18) % 60 - 30;
    const adjust = (v) => Math.max(20, Math.min(220, v + shift));
    r = adjust(r); g = adjust(g); b = adjust(b);
    const c1 = `rgb(${r}, ${g}, ${b})`;
    const c2 = `rgb(${Math.min(255, r+50)}, ${Math.min(255, g+40)}, ${Math.min(255, b+30)})`;
    return { c1, c2 };
  };

  /* ---------- Veri ---------- */
  const data = (typeof LIBRARY_DATA !== "undefined") ? LIBRARY_DATA : { collections: [] };

  const findCollection = (id) => data.collections.find(c => c.id === id);
  const findBook = (cid, bid) => {
    const c = findCollection(cid);
    return c ? { collection: c, book: c.books.find(b => b.id === bid) } : null;
  };

  /* ---------- Görünümler ---------- */
  function viewHome(query = "") {
    const q = query.trim().toLowerCase();
    let collections = data.collections;
    let bookHits = [];

    if (q) {
      collections = data.collections.filter(c =>
        c.title.toLowerCase().includes(q) ||
        (c.author || "").toLowerCase().includes(q)
      );
      data.collections.forEach(c => {
        c.books.forEach(b => {
          if (b.title.toLowerCase().includes(q) || (b.subtitle || "").toLowerCase().includes(q)) {
            bookHits.push({ collection: c, book: b });
          }
        });
      });
    }

    if (q && collections.length === 0 && bookHits.length === 0) {
      return `
        <div class="empty">
          <h3>Sonuç bulunamadı</h3>
          <p>"${escapeHtml(query)}" ile eşleşen koleksiyon veya kitap yok.</p>
        </div>`;
    }

    const heading = q
      ? `<div class="page-head"><h1>Arama Sonuçları</h1><p>"${escapeHtml(query)}" için bulunanlar.</p></div>`
      : `<div class="page-head">
           <h1>Kütüphanem</h1>
           <p>Koleksiyonlarda gezin, bir kitap aç ve okumaya başla.</p>
         </div>`;

    const collectionsHtml = collections.length ? `
      <section>
        <div class="section-head">
          <h2>Koleksiyonlar</h2>
          <span class="muted">${collections.length} koleksiyon</span>
        </div>
        <div class="collections-grid">
          ${collections.map(renderCollectionCard).join("")}
        </div>
      </section>` : "";

    const bookHitsHtml = bookHits.length ? `
      <section style="margin-top: 48px;">
        <div class="section-head">
          <h2>Kitaplar</h2>
          <span class="muted">${bookHits.length} kitap</span>
        </div>
        <div class="books-grid">
          ${bookHits.map(({collection, book}, i) => renderBookCard(collection, book, i)).join("")}
        </div>
      </section>` : "";

    return heading + collectionsHtml + bookHitsHtml;
  }

  function bookCoverUrl(collection, book) {
    if (!book.cover) return null;
    const folder = collection.coverFolder || collection.folder;
    return encodePath(`${folder}/${book.cover}`);
  }

  function renderCollectionCard(c) {
    const { c1, c2 } = palette(c.accent);
    // En fazla 4 kitap kapağını yelpaze gibi göster
    const featured = c.books.slice(0, 4);
    const hasCovers = featured.some(b => b.cover);
    const stack = hasCovers
      ? `<div class="cover-stack">${featured.map((b, i) => {
            const url = bookCoverUrl(c, b);
            return url
              ? `<div class="stack-item" style="--i:${i}"><img class="cover-img" src="${url}" alt="${escapeHtml(b.title)} kapağı" loading="lazy" onload="this.parentElement.classList.add('cover-loaded')" onerror="this.parentElement.classList.add('cover-loaded','cover-failed')" /></div>`
              : `<div class="stack-item cover-loaded" style="--i:${i}"><div class="stack-fallback">${escapeHtml(b.title)}</div></div>`;
         }).join("")}</div>`
      : `<div class="cover-title">${escapeHtml(c.title)}</div>`;

    return `
      <a class="collection-card" href="#/koleksiyon/${encodeURIComponent(c.id)}">
        <div class="collection-cover ${hasCovers ? "has-stack" : ""}" style="--c1:${c1}; --c2:${c2}">
          ${stack}
        </div>
        <div class="collection-meta">
          <h3>${escapeHtml(c.title)}</h3>
          ${c.author ? `<div class="collection-author">${escapeHtml(c.author)}</div>` : ""}
          <div class="collection-count">
            ${c.books.length} kitap
          </div>
        </div>
      </a>`;
  }

  function renderBookCard(collection, book, idx) {
    const { c1, c2 } = bookPalette(collection.accent, idx);
    const coverUrl = bookCoverUrl(collection, book);
    const cover = coverUrl
      ? `<div class="book-cover has-image"><img class="cover-img" src="${coverUrl}" alt="${escapeHtml(book.title)} kapağı" loading="lazy" onload="this.parentElement.classList.add('cover-loaded')" onerror="this.parentElement.classList.add('cover-loaded','cover-failed')" /></div>`
      : `<div class="book-cover cover-loaded" style="--c1:${c1}; --c2:${c2}">
          ${book.number ? `<div class="book-number">${escapeHtml(String(book.number).padStart(2, "0"))}</div>` : `<div class="book-number">·</div>`}
          <div class="book-title">${escapeHtml(book.title)}</div>
        </div>`;
    return `
      <a class="book-card" href="#/oku/${encodeURIComponent(collection.id)}/${encodeURIComponent(book.id)}">
        ${cover}
        <div class="book-info">
          <p class="name">${escapeHtml(book.title)}</p>
          <p class="sub">${escapeHtml(collection.title)}</p>
        </div>
      </a>`;
  }

  function viewCollection(id) {
    const c = findCollection(id);
    if (!c) return viewNotFound();

    return `
      <nav class="breadcrumbs">
        <a href="#/">Ana Sayfa</a>
        <span class="sep">/</span>
        <span>${escapeHtml(c.title)}</span>
      </nav>
      <div class="page-head">
        <h1>${escapeHtml(c.title)}</h1>
        ${c.author ? `<p style="margin-bottom:6px;"><strong style="color:var(--text)">${escapeHtml(c.author)}</strong></p>` : ""}
        ${c.description ? `<p>${escapeHtml(c.description)}</p>` : ""}
      </div>
      <div class="section-head">
        <h2>Kitaplar</h2>
        <span class="muted">${c.books.length} kitap</span>
      </div>
      <div class="books-grid">
        ${c.books.map((b, i) => renderBookCard(c, b, i)).join("")}
      </div>`;
  }

  let activeReader = null;

  function renderReader(cid, bid) {
    const found = findBook(cid, bid);
    if (!found || !found.book) { app.innerHTML = viewNotFound(); return; }
    const { collection, book } = found;
    const fileUrl = encodePath(`${collection.folder}/${book.file}`);

    app.innerHTML = `
      <nav class="breadcrumbs">
        <a href="#/">Ana Sayfa</a>
        <span class="sep">/</span>
        <a href="#/koleksiyon/${encodeURIComponent(collection.id)}">${escapeHtml(collection.title)}</a>
        <span class="sep">/</span>
        <span>${escapeHtml(book.title)}</span>
      </nav>
      <div class="reader">
        <div class="reader-bar">
          <div class="reader-title">
            <h1>${escapeHtml(book.subtitle || book.title)}</h1>
            <p>${escapeHtml(collection.title)}${collection.author ? " · " + escapeHtml(collection.author) : ""}</p>
          </div>
          <div class="reader-actions">
            <a class="btn" href="#/koleksiyon/${encodeURIComponent(collection.id)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Geri
            </a>
            <a class="btn" href="${fileUrl}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7M10 14 21 3M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/></svg>
              Yeni sekmede aç
            </a>
            <a class="btn primary" href="${fileUrl}" download>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              İndir
            </a>
          </div>
        </div>
        <div class="pdf-toolbar" id="pdf-toolbar">
          <button class="pdf-btn" id="pdf-prev" title="Önceki sayfa (←)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span class="pdf-page-jump">
            <input type="number" id="pdf-page" min="1" value="1" />
            <span class="muted">/ <span id="pdf-pagecount">–</span></span>
          </span>
          <button class="pdf-btn" id="pdf-next" title="Sonraki sayfa (→)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <span class="pdf-sep"></span>
          <button class="pdf-btn" id="pdf-zoom-out" title="Uzaklaş (−)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/></svg>
          </button>
          <span class="pdf-zoom-label" id="pdf-zoom-label">%100</span>
          <button class="pdf-btn" id="pdf-zoom-in" title="Yakınlaş (+)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg>
          </button>
          <button class="pdf-btn pdf-btn-text" id="pdf-fit" title="Genişliğe sığdır">Sığdır</button>
        </div>
        <div class="pdf-container" id="pdf-container">
          <canvas id="pdf-canvas"></canvas>
          <div class="pdf-status" id="pdf-status">Yükleniyor…</div>
        </div>
      </div>`;

    initPdfReader(fileUrl, `kutuphane-page-${cid}-${bid}`);
  }

  async function initPdfReader(url, storageKey) {
    if (activeReader) { activeReader.dispose(); activeReader = null; }

    const canvas = document.getElementById("pdf-canvas");
    const container = document.getElementById("pdf-container");
    const status = document.getElementById("pdf-status");
    const pageInput = document.getElementById("pdf-page");
    const pageCount = document.getElementById("pdf-pagecount");
    const zoomLabel = document.getElementById("pdf-zoom-label");
    const toolbar = document.getElementById("pdf-toolbar");
    const ctx = canvas.getContext("2d");

    let pdf = null;
    let currentPage = parseInt(localStorage.getItem(storageKey) || "1", 10) || 1;
    let scale = 1;
    let fitMode = "width";
    let renderTask = null;
    let disposed = false;

    pageInput.value = currentPage;

    if (typeof pdfjsLib === "undefined") {
      fallbackToIframe("PDF.js yüklenemedi.");
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    try {
      pdf = await pdfjsLib.getDocument(url).promise;
    } catch (err) {
      fallbackToIframe("PDF açılamadı, klasik görüntüleyiciye geçildi.");
      return;
    }
    if (disposed) return;

    pageCount.textContent = pdf.numPages;
    pageInput.max = pdf.numPages;
    if (currentPage > pdf.numPages) currentPage = 1;
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    if (disposed) return;
    await renderPage();

    async function renderPage() {
      if (!pdf || disposed) return;
      if (renderTask) { try { renderTask.cancel(); } catch (_) {} }
      status.style.display = "flex";
      const page = await pdf.getPage(currentPage);
      if (disposed) return;
      if (fitMode === "width") {
        const baseViewport = page.getViewport({ scale: 1 });
        const cw = Math.max(320, container.clientWidth - 32);
        scale = Math.max(0.2, cw / baseViewport.width);
      }
      const viewport = page.getViewport({ scale });
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      try {
        renderTask = page.render({ canvasContext: ctx, viewport });
        await renderTask.promise;
      } catch (e) {
        if (e && e.name === "RenderingCancelledException") return;
      }
      if (disposed) return;
      status.style.display = "none";
      pageInput.value = currentPage;
      zoomLabel.textContent = "%" + Math.round(scale * 100);
      localStorage.setItem(storageKey, String(currentPage));
    }

    function go(delta) {
      if (!pdf) return;
      const next = Math.min(pdf.numPages, Math.max(1, currentPage + delta));
      if (next !== currentPage) { currentPage = next; renderPage(); }
    }

    document.getElementById("pdf-prev").onclick = () => go(-1);
    document.getElementById("pdf-next").onclick = () => go(1);
    pageInput.onchange = () => {
      if (!pdf) return;
      let n = parseInt(pageInput.value, 10);
      if (isNaN(n)) n = currentPage;
      n = Math.min(pdf.numPages, Math.max(1, n));
      currentPage = n; renderPage();
    };
    document.getElementById("pdf-zoom-in").onclick = () => {
      fitMode = "manual"; scale = Math.min(4, scale * 1.2); renderPage();
    };
    document.getElementById("pdf-zoom-out").onclick = () => {
      fitMode = "manual"; scale = Math.max(0.3, scale / 1.2); renderPage();
    };
    document.getElementById("pdf-fit").onclick = () => {
      fitMode = "width"; renderPage();
    };

    const onKey = (e) => {
      if (disposed) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.key === "ArrowLeft" || e.key === "PageUp") { go(-1); e.preventDefault(); }
      else if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { go(1); e.preventDefault(); }
      else if (e.key === "+" || e.key === "=") { fitMode = "manual"; scale = Math.min(4, scale * 1.2); renderPage(); }
      else if (e.key === "-") { fitMode = "manual"; scale = Math.max(0.3, scale / 1.2); renderPage(); }
    };
    document.addEventListener("keydown", onKey);

    let resizeTimer;
    const onResize = () => {
      if (fitMode !== "width") return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderPage, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Dokunmatik kaydırma — yatay swipe ile sayfa değiştir
    let touchStartX = null, touchStartY = null, touchStartT = 0;
    const onTouchStart = (e) => {
      if (e.touches.length !== 1) { touchStartX = null; return; }
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartT = Date.now();
    };
    const onTouchEnd = (e) => {
      if (touchStartX === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const dt = Date.now() - touchStartT;
      touchStartX = null;
      // dikey kaydırmadan ayır: yatay > dikey * 1.5, hızlı, 60+ piksel
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
        if (dx < 0) go(1); else go(-1);
      }
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    activeReader = {
      dispose() {
        disposed = true;
        if (renderTask) { try { renderTask.cancel(); } catch (_) {} }
        document.removeEventListener("keydown", onKey);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onResize);
        container.removeEventListener("touchstart", onTouchStart);
        container.removeEventListener("touchend", onTouchEnd);
      }
    };

    function fallbackToIframe(msg) {
      if (toolbar) toolbar.style.display = "none";
      container.innerHTML = `<iframe class="pdf-frame" src="${url}" title="PDF"></iframe>`;
    }
  }

  function viewNotFound() {
    return `
      <div class="empty">
        <h3>Sayfa bulunamadı</h3>
        <p>Aradığınız içerik mevcut değil. <a href="#/" style="color:var(--accent)">Ana sayfaya dön</a>.</p>
      </div>`;
  }

  /* ---------- Yönlendirme ---------- */
  function render() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);

    const isReader = parts[0] === "oku" && parts[1] && parts[2];
    if (!isReader && activeReader) { activeReader.dispose(); activeReader = null; }

    if (parts.length === 0) {
      app.innerHTML = viewHome(searchInput.value);
    } else if (parts[0] === "koleksiyon" && parts[1]) {
      app.innerHTML = viewCollection(parts[1]);
    } else if (isReader) {
      renderReader(parts[1], parts[2]);
    } else {
      app.innerHTML = viewNotFound();
    }
    if (!isReader) markCachedCovers();
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // Tarayıcı cache'inden anında dönen görsellerde onload bazı durumlarda tetiklenmeyebilir.
  function markCachedCovers() {
    app.querySelectorAll(".cover-img").forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        img.parentElement && img.parentElement.classList.add("cover-loaded");
      }
    });
  }

  /* ---------- Arama ---------- */
  let searchTimer = null;
  searchInput.addEventListener("input", () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      // Arama kullanıldığında her zaman ana sayfaya geç
      if (location.hash !== "#/") {
        location.hash = "#/";
      } else {
        render();
      }
    }, 120);
  });

  window.addEventListener("hashchange", render);
  render();
})();
