(() => {
  const brand = document.querySelector('.brand');
  const portrait = document.querySelector('.portrait');
  const firstProjectTitle = document.querySelector('.project-copy h3');
  const sideMeta = document.querySelector('.side-meta');
  const sideCompanyText = document.querySelector('[data-side-company-text]');
  const sideYearsText = document.querySelector('[data-side-years-text]');
  const sideMetaSections = Array.from(document.querySelectorAll('[data-side-company][data-side-years]'));
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeButton = document.querySelector('[data-close]');
  const images = document.querySelectorAll('.page img:not(.portrait):not(.wordmark), .monopoly img');
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, img, [role="button"]');
  let sideMetaStart = 0;

  images.forEach((image) => {
    const frame = document.createElement('span');
    const layoutClasses = ['circle', 'circle-main', 'circle-side', 'layer-back', 'layer-front'];

    frame.className = 'image-frame image-loading-frame';
    layoutClasses.forEach((className) => {
      if (image.classList.contains(className)) {
        image.classList.remove(className);
        frame.classList.add(className);
      }
    });

    image.parentNode.insertBefore(frame, image);
    frame.appendChild(image);
    image.classList.add('image-loading');

    const markLoaded = () => {
      image.classList.remove('image-loading');
      image.classList.add('image-loaded');
      frame.classList.remove('image-loading-frame');
      frame.classList.add('image-loaded-frame');
    };

    if (image.complete) {
      markLoaded();
    } else {
      image.addEventListener('load', markLoaded, { once: true });
      image.addEventListener('error', markLoaded, { once: true });
    }
  });

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let pointerX = -100;
    let pointerY = -100;

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.add('is-visible');
      cursor.style.transform = `translate(${pointerX - 12}px, ${pointerY - 12}px)`;
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

  const updateSideMetaPosition = () => {
    if (!firstProjectTitle || !sideMeta) return;

    const titleTop = firstProjectTitle.getBoundingClientRect().top + window.scrollY;
    sideMetaStart = titleTop;
    sideMeta.style.setProperty('--side-meta-top', `${Math.round(titleTop)}px`);
    sideMeta.classList.add('is-positioned');
  };

  updateSideMetaPosition();
  window.addEventListener('resize', updateSideMetaPosition);

  const updateSideMeta = () => {
    if (!sideMeta) return;
    const stickyTop = parseFloat(getComputedStyle(sideMeta).getPropertyValue('--side-meta-sticky-top')) || 56;

    sideMeta.classList.toggle('is-sticky', window.scrollY >= sideMetaStart - stickyTop);

    const active = sideMetaSections
      .filter((section) => section.getBoundingClientRect().top <= stickyTop + 24)
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
    sideMeta?.classList.add('is-hidden-by-lightbox');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    sideMeta?.classList.remove('is-hidden-by-lightbox');
    document.body.style.overflow = '';
  };

  const runImageShine = (image) => {
    const rect = image.getBoundingClientRect();
    const shine = document.createElement('span');
    const styles = getComputedStyle(image);

    shine.className = 'image-shine';
    shine.style.left = `${Math.round(rect.left + window.scrollX)}px`;
    shine.style.top = `${Math.round(rect.top + window.scrollY)}px`;
    shine.style.width = `${Math.round(rect.width)}px`;
    shine.style.height = `${Math.round(rect.height)}px`;
    shine.style.borderRadius = styles.borderRadius;
    document.body.appendChild(shine);
    shine.addEventListener('animationend', () => shine.remove(), { once: true });
  };

  images.forEach((image) => {
    image.addEventListener('pointerenter', () => runImageShine(image));
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
