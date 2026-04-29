(() => {
  const firstScreenAssets = Array.from(document.querySelectorAll('.hero img'));
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
  const lightboxPrev = document.querySelector('[data-lightbox-prev]');
  const lightboxNext = document.querySelector('[data-lightbox-next]');
  const closeButton = document.querySelector('[data-close]');
  const images = Array.from(document.querySelectorAll('.page img, .monopoly img'))
    .filter((image) => !image.matches(
      '.hero-dragger img, .inline-icon, .experience-aside img'
    ));
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, img, [role="button"]');

  const waitForImage = (image) => {
    if (image.complete) {
      return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
    }

    return new Promise((resolve) => {
      image.addEventListener('load', resolve, { once: true });
      image.addEventListener('error', resolve, { once: true });
    }).then(() => (image.decode ? image.decode().catch(() => undefined) : undefined));
  };

  const showFirstScreen = () => {
    document.documentElement.classList.remove('is-first-screen-loading');
  };

  Promise.all([
    ...firstScreenAssets.map(waitForImage),
    document.fonts?.ready || Promise.resolve(),
  ]).then(showFirstScreen);

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

  const unionGallery = document.querySelector('[data-union-gallery]');
  const unionGalleryImage = unionGallery?.querySelector('[data-union-gallery-image]');
  const unionGalleryPrev = unionGallery?.querySelector('[data-union-gallery-prev]');
  const unionGalleryNext = unionGallery?.querySelector('[data-union-gallery-next]');
  const unionGallerySlides = [
    { src: 'assets/union-main-new.png', alt: '\u041d\u041e\u0422\u0410 \u042e\u043d\u0438\u043e\u043d \u0433\u043b\u0430\u0432\u043d\u044b\u0439 \u044d\u043a\u0440\u0430\u043d' },
    { src: 'assets/union-preview-1.png', alt: '\u041d\u041e\u0422\u0410 \u042e\u043d\u0438\u043e\u043d \u044d\u043a\u0440\u0430\u043d 1' },
    { src: 'assets/union-preview-2.png', alt: '\u041d\u041e\u0422\u0410 \u042e\u043d\u0438\u043e\u043d \u044d\u043a\u0440\u0430\u043d 2' },
    { src: 'assets/union-preview-3.png', alt: '\u041d\u041e\u0422\u0410 \u042e\u043d\u0438\u043e\u043d \u044d\u043a\u0440\u0430\u043d 3' },
    { src: 'assets/union-preview-4.png', alt: '\u041d\u041e\u0422\u0410 \u042e\u043d\u0438\u043e\u043d \u044d\u043a\u0440\u0430\u043d 4' },
  ];
  let unionGalleryIndex = 0;
  let lightboxGalleryIndex = null;
  let pauseUnionGallery = () => {};
  let resumeUnionGallery = () => {};

  const setLightboxGallerySlide = (nextIndex) => {
    if (!lightboxImage) return;
    lightboxGalleryIndex = (nextIndex + unionGallerySlides.length) % unionGallerySlides.length;
    const slide = unionGallerySlides[lightboxGalleryIndex];

    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
    unionGalleryIndex = lightboxGalleryIndex;
    if (unionGalleryImage) {
      unionGalleryImage.src = slide.src;
      unionGalleryImage.alt = slide.alt;
    }
  };

  if (unionGallery && unionGalleryImage) {
    let unionGalleryTimer = null;
    let isUnionGalleryPaused = false;

    const setUnionGallerySlide = (nextIndex) => {
      unionGalleryIndex = (nextIndex + unionGallerySlides.length) % unionGallerySlides.length;
      const slide = unionGallerySlides[unionGalleryIndex];

      unionGalleryImage.src = slide.src;
      unionGalleryImage.alt = slide.alt;
      if (lightboxGalleryIndex !== null) {
        setLightboxGallerySlide(unionGalleryIndex);
      }
    };

    const stopUnionGallery = () => {
      if (!unionGalleryTimer) return;
      window.clearInterval(unionGalleryTimer);
      unionGalleryTimer = null;
    };

    const startUnionGallery = () => {
      stopUnionGallery();
      if (isUnionGalleryPaused) return;
      unionGalleryTimer = window.setInterval(() => {
        setUnionGallerySlide(unionGalleryIndex + 1);
      }, 2600);
    };

    pauseUnionGallery = () => {
      isUnionGalleryPaused = true;
      stopUnionGallery();
    };

    resumeUnionGallery = () => {
      isUnionGalleryPaused = false;
      startUnionGallery();
    };

    unionGallery.addEventListener('pointerenter', pauseUnionGallery);
    unionGallery.addEventListener('pointerleave', resumeUnionGallery);
    unionGallery.addEventListener('focusin', pauseUnionGallery);
    unionGallery.addEventListener('focusout', (event) => {
      if (!unionGallery.contains(event.relatedTarget)) {
        resumeUnionGallery();
      }
    });
    unionGalleryPrev?.addEventListener('click', () => setUnionGallerySlide(unionGalleryIndex - 1));
    unionGalleryNext?.addEventListener('click', () => setUnionGallerySlide(unionGalleryIndex + 1));
    startUnionGallery();
  }

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    let pointerX = -100;
    let pointerY = -100;
    let pointerRotation = 0;

    const updateCursor = () => {
      cursor.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) rotate(${pointerRotation}deg)`;
    };

    document.documentElement.classList.add('has-custom-cursor');

    window.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      cursor.classList.add('is-visible');
      updateCursor();
    }, { passive: true });

    document.addEventListener('pointerleave', () => {
      cursor.classList.remove('is-visible');
    });

    cursorTargets.forEach((target) => {
      target.addEventListener('pointerenter', () => {
        pointerRotation = 15;
        cursor.classList.add('is-active');
        updateCursor();
      });
      target.addEventListener('pointerleave', () => {
        pointerRotation = 0;
        cursor.classList.remove('is-active');
        updateCursor();
      });
    });
  }

  const updateSideMenu = () => {
    if (!menuSections.length) return;
    const stickyTop = sideMenu
      ? parseFloat(getComputedStyle(sideMenu).getPropertyValue('--side-menu-sticky-top')) || 56
      : 56;

    const isPageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const active = isPageBottom
      ? menuSections.at(-1)
      : menuSections
      .filter(({ section }) => section.getBoundingClientRect().top <= window.innerHeight * 0.45)
      .at(-1) || menuSections[0];

    menuLinks.forEach((link) => {
      link.classList.toggle('is-active', link === active.link);
    });

    if (sideMenu && experienceSection) {
      const menuStart = experienceSection.getBoundingClientRect().top + window.scrollY;
      sideMenu.style.setProperty('--side-menu-top', `${Math.round(menuStart)}px`);
      sideMenu.classList.add('is-ready');
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
    const isUnionGalleryImage = image === unionGalleryImage;

    if (isUnionGalleryImage) {
      pauseUnionGallery();
      lightbox.classList.add('has-gallery');
      setLightboxGallerySlide(unionGalleryIndex);
    } else {
      lightbox.classList.remove('has-gallery');
      lightboxGalleryIndex = null;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt || '';
    }
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    sideMenu?.classList.add('is-hidden-by-lightbox');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    if (!lightbox || !lightboxImage) return;
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.classList.remove('has-gallery');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxGalleryIndex = null;
    lightboxImage.removeAttribute('src');
    sideMenu?.classList.remove('is-hidden-by-lightbox');
    document.body.style.overflow = '';
    resumeUnionGallery();
  };

  const runImageShine = (image) => {
    const frame = image.closest('.image-frame') || image;
    const rect = frame.getBoundingClientRect();
    const shine = document.createElement('span');
    const styles = getComputedStyle(frame);

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
  lightboxPrev?.addEventListener('click', () => {
    if (lightboxGalleryIndex === null) return;
    setLightboxGallerySlide(lightboxGalleryIndex - 1);
  });
  lightboxNext?.addEventListener('click', () => {
    if (lightboxGalleryIndex === null) return;
    setLightboxGallerySlide(lightboxGalleryIndex + 1);
  });
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
    if (!lightbox?.classList.contains('is-open') || lightboxGalleryIndex === null) return;
    if (event.key === 'ArrowLeft') setLightboxGallerySlide(lightboxGalleryIndex - 1);
    if (event.key === 'ArrowRight') setLightboxGallerySlide(lightboxGalleryIndex + 1);
  });
})();
