(() => {
  const form = document.querySelector('[data-access-form]');
  const input = document.querySelector('[data-access-input]');
  const codeButton = document.querySelector('[data-access-code]');
  const cells = Array.from(document.querySelectorAll('[data-access-cell]'));
  const cursor = document.querySelector('[data-cursor]');
  const cursorTargets = document.querySelectorAll('a, button, [role="button"]');
  const getValidCode = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear());
    return `${day}${year}`;
  };

  if (!form || !input || !codeButton || !cells.length) return;

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

  const normalizeCode = (value) => value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, cells.length);

  input.value = '';
  input.setAttribute('name', `project-access-${Date.now()}`);

  const getRedirectTarget = () => {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    const storedTarget = window.sessionStorage.getItem('projectsAccessTarget');

    if (storedTarget) return storedTarget;
    if (next) return next;

    try {
      const referrer = new URL(document.referrer);
      if (referrer.origin === window.location.origin && !referrer.pathname.endsWith('/enter.html')) {
        return `${referrer.pathname}${referrer.search}${referrer.hash}`;
      }
    } catch {
      // Ignore invalid or empty referrer.
    }

    return 'index.html#projects';
  };

  const renderCode = () => {
    const value = normalizeCode(input.value);
    input.value = value;
    const activeIndex = Math.min(value.length, cells.length - 1);

    cells.forEach((cell, index) => {
      const character = value[index] || '';
      cell.textContent = character;
      cell.classList.toggle('has-value', Boolean(character));
      cell.classList.toggle('is-active', index === activeIndex && document.activeElement === input);
    });

    if (form.classList.contains('is-error') && value.length < cells.length) {
      form.classList.remove('is-error');
    }
  };

  const checkCode = () => {
    const value = normalizeCode(input.value);

    if (value === getValidCode()) {
      form.classList.remove('is-error');
      form.classList.add('is-success');
      window.sessionStorage.setItem('projectsAccessGranted', 'true');
      window.setTimeout(() => {
        window.location.href = getRedirectTarget();
      }, 420);
      return;
    }

    form.classList.add('is-error');
    input.select();
  };

  codeButton.addEventListener('click', () => {
    input.focus();
  });

  input.addEventListener('input', () => {
    renderCode();
    if (input.value.length === cells.length) {
      checkCode();
    }
  });

  input.addEventListener('focus', renderCode);
  input.addEventListener('blur', renderCode);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkCode();
  });

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    input.focus();
  });

  input.focus();
  renderCode();
})();
