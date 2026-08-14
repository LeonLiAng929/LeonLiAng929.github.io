(() => {
  const precisePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!precisePointer.matches || reducedMotion.matches) return;

  const script = document.currentScript;
  const cursorSource = script && script.dataset.runningCursorSrc;
  if (!cursorSource) return;

  const cursor = document.createElement('div');
  cursor.className = 'running-cursor';
  cursor.setAttribute('aria-hidden', 'true');

  const image = document.createElement('img');
  image.alt = '';
  image.draggable = false;
  image.decoding = 'async';
  cursor.appendChild(image);

  const hideCursor = () => cursor.classList.remove('is-visible');
  const moveCursor = (event) => {
    cursor.style.transform = `translate3d(${event.clientX - 24}px, ${event.clientY - 24}px, 0)`;
    cursor.classList.add('is-visible');
  };

  image.addEventListener('load', () => {
    document.body.appendChild(cursor);
    document.documentElement.classList.add('running-cursor-enabled');

    document.addEventListener('pointermove', moveCursor, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (!event.relatedTarget) hideCursor();
    });
    window.addEventListener('blur', hideCursor);

    document.querySelectorAll('iframe').forEach((frame) => {
      frame.addEventListener('mouseenter', hideCursor);
    });
  });

  image.addEventListener('error', () => {
    cursor.remove();
    document.documentElement.classList.remove('running-cursor-enabled');
  });

  image.src = cursorSource;
})();
