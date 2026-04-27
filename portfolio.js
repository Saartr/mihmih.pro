(() => {
  const brand = document.querySelector('.brand');
  const portrait = document.querySelector('.portrait');
  const firstProjectCopy = document.querySelector('.project-copy');
  const sideMeta = document.querySelector('.side-meta');
  const sideCompanyText = document.querySelector('[data-side-company-text]');
  const sideYearsText = document.querySelector('[data-side-years-text]');
  const sideMetaSections = Array.from(document.querySelectorAll('[data-side-company][data-side-years]'));
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeButton = document.querySelector('[data-close]');
  const images = document.querySelectorAll('.page img, .monopoly img');
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, img, [role="button"]');

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursor.classList.add('is-visible');
      cursor.style.transform = `translate(${event.clientX - 16}px, ${event.clientY - 16}px)`;
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-visible');
    });

    cursorTargets.forEach((target) => {
      target.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      target.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  const updatePortrait = () => {
    if (!brand || !portrait) return;

    const maxDrop = parseFloat(getComputedStyle(brand).getPropertyValue('--portrait-drop-max')) || 0;
    const distance = 70;
    const progress = Math.min(Math.max(window.scrollY / distance, 0), 1);

    brand.style.setProperty('--portrait-drop', `${Math.round(progress * maxDrop)}px`);
  };

  updatePortrait();
  window.addEventListener('scroll', updatePortrait, { passive: true });
  window.addEventListener('resize', updatePortrait);

  const updateSideMeta = () => {
    if (!firstProjectCopy || !sideMeta) return;

    const start = firstProjectCopy.getBoundingClientRect().top + window.scrollY;
    sideMeta.classList.toggle('is-visible', window.scrollY >= start);

    const active = sideMetaSections
      .filter((section) => section.getBoundingClientRect().top <= 80)
      .at(-1);

    if (active && sideCompanyText && sideYearsText) {
      sideCompanyText.textContent = active.dataset.sideCompany || '';
      sideYearsText.textContent = active.dataset.sideYears || '';
    }
  };

  updateSideMeta();
  window.addEventListener('scroll', updateSideMeta, { passive: true });
  window.addEventListener('resize', updateSideMeta);

  const open = (image) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    document.body.style.overflow = '';
  };

  images.forEach((image) => {
    image.addEventListener('click', () => open(image));
  });

  closeButton?.addEventListener('click', close);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
})();
