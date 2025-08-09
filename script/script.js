document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('primary-nav');
  const navToggle = document.querySelector('.nav-toggle');

  const searchToggle = document.querySelector('.search-toggle');
  const searchForm = document.getElementById('site-search');
  const searchInput = searchForm ? searchForm.querySelector('input[type="search"]') : null;
  const searchClose = document.querySelector('.search-close');

  const toTop = document.querySelector('.to-top');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Helper: check if search is active
  const isSearchActive = () => header && header.classList.contains('header-search-active');

  const openSearch = () => {
    if (!header || !searchForm) return;
    header.classList.add('header-search-active');
    searchForm.classList.add('active');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    if (nav) nav.setAttribute('aria-hidden', 'true');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 0);
    }
  };

  const closeSearch = () => {
    if (!header || !searchForm) return;
    header.classList.remove('header-search-active');
    searchForm.classList.remove('active');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
    if (nav) nav.removeAttribute('aria-hidden');
  };

  // Toggle search on search icon click
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      if (isSearchActive()) {
        closeSearch();
      } else {
        // Close mobile nav if open
        if (nav && nav.classList.contains('open')) {
          nav.classList.remove('open');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
        openSearch();
      }
    });
  }

  // Close search via X button
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }

  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isSearchActive()) {
      closeSearch();
    }
  });

  // Click outside to close search
  document.addEventListener('click', (e) => {
    if (!isSearchActive()) return;
    const target = e.target;
    const withinSearch = searchForm && searchForm.contains(target);
    const onSearchToggle = searchToggle && searchToggle.contains(target);
    if (!withinSearch && !onSearchToggle) {
      closeSearch();
    }
  });

  // Mobile nav toggle
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Close search if opening nav
      if (open && isSearchActive()) closeSearch();
    });

    // Close nav when clicking a link (use capture to catch early)
    nav.addEventListener('click', (e) => {
      const t = e.target;
      if (t && t.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll-to-top behavior
  if (toTop) {
    const onScroll = () => {
      if (window.scrollY > 200) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});