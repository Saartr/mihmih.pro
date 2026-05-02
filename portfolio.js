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
  const menuStartSection = menuSections[0]?.section || document.querySelector('.experience-section');
  const projectsSection = document.getElementById('projects');
  const projectMetas = Array.from(document.querySelectorAll('.project-side-meta'));
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxPrev = document.querySelector('[data-lightbox-prev]');
  const lightboxNext = document.querySelector('[data-lightbox-next]');
  const closeButton = document.querySelector('[data-close]');
  const images = Array.from(document.querySelectorAll('[data-lightbox-trigger]'))
    .filter((image) => !image.matches(
      '.hero-dragger img, .inline-icon, .experience-aside img'
    ));
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, [role="button"]');
  const beforeAfterBlocks = Array.from(document.querySelectorAll('[data-before-after]'));
  const scrollRevealItems = Array.from(document.querySelectorAll('[data-scroll-reveal]'));
  const experienceTimeline = document.querySelector('[data-experience-timeline]');
  const experienceTimelineTrigger = document.querySelector('[data-experience-timeline-trigger]');
  const percentCounters = Array.from(document.querySelectorAll('[data-count-percent]'));
  const aboutSidePhoto = document.querySelector('.about-side-photo');

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

    frame.className = 'image-frame image-loading-frame';
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
    { src: 'assets/union-main-new.png', alt: 'НОТА Юнион главный экран' },
    { src: 'assets/union-preview-1.png', alt: 'НОТА Юнион экран 1' },
    { src: 'assets/union-preview-2.png', alt: 'НОТА Юнион экран 2' },
    { src: 'assets/union-preview-3.png', alt: 'НОТА Юнион экран 3' },
    { src: 'assets/union-preview-4.png', alt: 'НОТА Юнион экран 4' },
  ];
  let unionGalleryIndex = 0;
  let lightboxGalleryIndex = null;
  let pauseUnionGallery = () => {};
  let resumeUnionGallery = () => {};

  const setLightboxCursor = (state) => {
    if (!cursor) return;
    cursor.classList.remove('is-zoom-in', 'is-zoom-out');
    if (state) cursor.classList.add(state);
  };

  const resetLightboxZoom = () => {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('is-zoomed');
    lightboxImage.style.removeProperty('width');
    lightboxImage.style.removeProperty('height');
    lightbox.scrollLeft = 0;
    lightbox.scrollTop = 0;
    setLightboxCursor('is-zoom-in');
  };

  const zoomLightboxImage = (event) => {
    if (!lightbox || !lightboxImage) return;

    if (lightbox.classList.contains('is-zoomed')) {
      resetLightboxZoom();
      return;
    }

    const rect = lightboxImage.getBoundingClientRect();
    const naturalWidth = lightboxImage.naturalWidth || rect.width;
    const naturalHeight = lightboxImage.naturalHeight || rect.height;
    const ratioX = naturalWidth / rect.width;
    const ratioY = naturalHeight / rect.height;
    const naturalX = (event.clientX - rect.left) * ratioX;
    const naturalY = (event.clientY - rect.top) * ratioY;

    lightbox.classList.add('is-zoomed');
    lightboxImage.style.width = `${naturalWidth}px`;
    lightboxImage.style.height = `${naturalHeight}px`;

    const padding = parseFloat(getComputedStyle(lightbox).paddingLeft) || 32;
    lightbox.scrollLeft = padding + naturalX - event.clientX;
    lightbox.scrollTop = padding + naturalY - event.clientY;
    setLightboxCursor('is-zoom-out');
  };

  const setLightboxGallerySlide = (nextIndex) => {
    if (!lightboxImage) return;
    resetLightboxZoom();
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

  beforeAfterBlocks.forEach((block) => {
    let isDragging = false;

    const setPosition = (clientX) => {
      const rect = block.getBoundingClientRect();
      if (!rect.width) return;
      const ratio = Math.min(0.98, Math.max(0.02, (clientX - rect.left) / rect.width));
      block.style.setProperty('--before-after-position', `${ratio * 100}%`);
      block.style.setProperty('--before-after-position-ratio', ratio.toFixed(4));
    };

    block.addEventListener('pointerdown', (event) => {
      isDragging = true;
      block.setPointerCapture?.(event.pointerId);
      setPosition(event.clientX);
    });

    block.addEventListener('pointermove', (event) => {
      if (!isDragging && event.pointerType !== 'mouse') return;
      setPosition(event.clientX);
    });

    block.addEventListener('pointerup', (event) => {
      isDragging = false;
      block.releasePointerCapture?.(event.pointerId);
    });

    block.addEventListener('pointercancel', () => {
      isDragging = false;
    });
  });

  if (scrollRevealItems.length) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target.hasAttribute('data-scroll-reveal-once')) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-revealed');
            revealObserver.unobserve(entry.target);
            return;
          }

          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -12% 0px' });

      scrollRevealItems.forEach((item) => revealObserver.observe(item));
    } else {
      scrollRevealItems.forEach((item) => item.classList.add('is-revealed'));
    }
  }

  if (experienceTimeline && experienceTimelineTrigger) {
    if ('IntersectionObserver' in window) {
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          experienceTimeline.classList.add('is-revealed');
          timelineObserver.unobserve(entry.target);
        });
      }, { threshold: 0.35, rootMargin: '0px 0px -18% 0px' });

      timelineObserver.observe(experienceTimelineTrigger);
    } else {
      experienceTimeline.classList.add('is-revealed');
    }
  }

  if (percentCounters.length) {
    const formatCounter = (counter, value) => {
      const prefix = counter.dataset.countPrefix || '';
      const suffix = counter.dataset.countSuffix || '';
      counter.textContent = `${prefix}${Math.round(value)}${suffix}`;
    };

    const animateCounter = (counter) => {
      const target = Number(counter.dataset.countPercent || 0);
      const duration = 1100;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        formatCounter(counter, target * eased);
        if (progress < 1) window.requestAnimationFrame(tick);
      };

      formatCounter(counter, 0);
      window.requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
          } else {
            formatCounter(entry.target, 0);
          }
        });
      }, { threshold: 0.65 });

      percentCounters.forEach((counter) => counterObserver.observe(counter));
    } else {
      percentCounters.forEach(animateCounter);
    }
  }

  document.querySelectorAll('[data-access-target]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-access-target');
      if (target) {
        window.sessionStorage.setItem('projectsAccessTarget', target);
      }
    });
  });

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

    if (sideMenu && menuStartSection) {
      const menuStart = menuStartSection.getBoundingClientRect().top + window.scrollY;
      sideMenu.style.setProperty('--side-menu-top', `${Math.round(menuStart)}px`);
      sideMenu.classList.add('is-ready');
      sideMenu.classList.toggle('is-sticky', window.scrollY >= menuStart - stickyTop);
      if (projectsSection) {
        const projectsStart = projectsSection.getBoundingClientRect().top + window.scrollY;
        sideMenu.classList.toggle('has-top-link', window.scrollY >= projectsStart - stickyTop);
      } else {
        sideMenu.classList.toggle('has-top-link', window.scrollY > 200);
      }
    }
  };

  const updateProjectMetas = () => {
    projectMetas.forEach((meta) => {
      const section = meta.closest('.project-entry') || meta.closest('.section.project');
      const copy = section?.querySelector('.project-card-copy, .project-copy, .project-card h3');
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
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();
  let aboutPhotoSlowdownTimer = null;

  const updateAboutPhotoSpin = () => {
    if (!aboutSidePhoto) return;
    const now = performance.now();
    const scrollDelta = Math.abs(window.scrollY - lastScrollY);
    const timeDelta = Math.max(16, now - lastScrollTime);
    const velocity = Math.min(1, scrollDelta / timeDelta / 2);
    const duration = 3.2 - velocity * 2.4;

    aboutSidePhoto.style.setProperty('--about-photo-spin-duration', `${duration.toFixed(2)}s`);
    lastScrollY = window.scrollY;
    lastScrollTime = now;

    window.clearTimeout(aboutPhotoSlowdownTimer);
    aboutPhotoSlowdownTimer = window.setTimeout(() => {
      aboutSidePhoto.style.setProperty('--about-photo-spin-duration', '3.2s');
    }, 160);
  };

  window.addEventListener('scroll', updateSideMenu, { passive: true });
  window.addEventListener('scroll', updateProjectMetas, { passive: true });
  window.addEventListener('scroll', updateAboutPhotoSpin, { passive: true });
  window.addEventListener('resize', updateSideMenu);
  window.addEventListener('resize', updateProjectMetas);
  window.addEventListener('load', updateProjectMetas);

  const open = (image) => {
    if (!lightbox || !lightboxImage) return;
    const isUnionGalleryImage = image === unionGalleryImage;

    resetLightboxZoom();
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
    resetLightboxZoom();
    setLightboxCursor(null);
    lightboxImage.removeAttribute('src');
    sideMenu?.classList.remove('is-hidden-by-lightbox');
    document.body.style.overflow = '';
    resumeUnionGallery();
  };

  lightboxImage?.addEventListener('pointerenter', () => {
    setLightboxCursor(lightbox?.classList.contains('is-zoomed') ? 'is-zoom-out' : 'is-zoom-in');
  });

  lightboxImage?.addEventListener('pointerleave', () => {
    setLightboxCursor(null);
  });

  images.forEach((image) => {
    const trigger = image.closest('.project-lightbox-preview') || image;

    trigger.addEventListener('pointerenter', () => setLightboxCursor('is-zoom-in'));
    trigger.addEventListener('pointerleave', () => setLightboxCursor(null));
    trigger.addEventListener('click', () => open(image));
  });

  document.querySelectorAll('.project-overlay-figma').forEach((link) => {
    link.addEventListener('pointerenter', () => setLightboxCursor(null));
    link.addEventListener('pointerleave', () => {
      if (link.closest('.project-lightbox-preview')) setLightboxCursor('is-zoom-in');
    });
    link.addEventListener('click', (event) => event.stopPropagation());
  });

  closeButton?.addEventListener('click', close);
  lightboxImage?.addEventListener('click', zoomLightboxImage);
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

