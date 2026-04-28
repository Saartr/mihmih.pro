(() => {
  const sideMenu = document.querySelector('.side-menu');
  const menuLinks = Array.from(document.querySelectorAll('[data-menu-link]'));
  const menuSections = menuLinks
    .map((link) => ({
      link,
      section: document.getElementById(link.dataset.menuLink || ''),
    }))
    .filter((item) => item.section);
  const experienceSection = document.querySelector('.experience-section');
  const projectsSection = document.getElementById('projects');
  const projectMetas = Array.from(document.querySelectorAll('.project-side-meta'));
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const closeButton = document.querySelector('[data-close]');
  const images = Array.from(document.querySelectorAll('.page img, .monopoly img'))
    .filter((image) => !image.matches(
      '.hero-pointer-image, .hero-avatar-image, .inline-icon, .experience-aside img'
    ));
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, img, [role="button"]');

  images.forEach((image) => {
    const frame = document.createElement('span');
    const layoutClasses = [];

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

    document.documentElement.classList.add('has-custom-cursor');

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.add('is-visible');
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-visible');
    });

    cursorTargets.forEach((target) => {
      target.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      target.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  const updateSideMenu = () => {
    if (!menuSections.length) return;
    const stickyTop = sideMenu
      ? parseFloat(getComputedStyle(sideMenu).getPropertyValue('--side-menu-sticky-top')) || 56
      : 56;

    const active = menuSections
      .filter(({ section }) => section.getBoundingClientRect().top <= window.innerHeight * 0.45)
      .at(-1) || menuSections[0];

    menuLinks.forEach((link) => {
      link.classList.toggle('is-active', link === active.link);
    });

    if (sideMenu && experienceSection) {
      const menuStart = experienceSection.getBoundingClientRect().top + window.scrollY;
      sideMenu.style.setProperty('--side-menu-top', `${Math.round(menuStart)}px`);
      sideMenu.classList.toggle('is-sticky', window.scrollY >= menuStart - stickyTop);
      if (projectsSection) {
        const projectsStart = projectsSection.getBoundingClientRect().top + window.scrollY;
        sideMenu.classList.toggle('has-top-link', window.scrollY >= projectsStart - stickyTop);
      }
    }
  };

  const updateProjectMetas = () => {
    projectMetas.forEach((meta) => {
      const section = meta.closest('.section.project');
      const copy = section?.querySelector('.project-copy');
      const nextSection = section?.nextElementSibling?.classList.contains('project')
        ? section.nextElementSibling
        : null;

      if (!section || !copy || !nextSection) return;

      const fixedTop = parseFloat(getComputedStyle(meta).getPropertyValue('--project-side-meta-fixed-top')) || 70;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const startTop = copy.getBoundingClientRect().top + window.scrollY;
      const nextTop = nextSection.getBoundingClientRect().top + window.scrollY;
      const metaHeight = meta.offsetHeight;
      const stopOffset = parseFloat(meta.dataset.stopOffset || '160');
      const fixedStart = startTop - fixedTop;
      const fixedEnd = nextTop - fixedTop - metaHeight - stopOffset;

      meta.style.top = `${Math.round(startTop - sectionTop)}px`;

      if (window.scrollY >= fixedEnd) {
        meta.classList.remove('is-fixed');
        meta.style.top = `${Math.round(nextTop - sectionTop - metaHeight - stopOffset)}px`;
        return;
      }

      if (window.scrollY >= fixedStart) {
        meta.classList.add('is-fixed');
        meta.style.removeProperty('top');
        return;
      }

      meta.classList.remove('is-fixed');
    });
  };

  updateSideMenu();
  updateProjectMetas();
  window.addEventListener('scroll', updateSideMenu, { passive: true });
  window.addEventListener('scroll', updateProjectMetas, { passive: true });
  window.addEventListener('resize', updateSideMenu);
  window.addEventListener('resize', updateProjectMetas);
  window.addEventListener('load', updateProjectMetas);

  const open = (image) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    sideMenu?.classList.add('is-hidden-by-lightbox');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.removeAttribute('src');
    sideMenu?.classList.remove('is-hidden-by-lightbox');
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
