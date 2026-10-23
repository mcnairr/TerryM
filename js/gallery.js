// Native modal dialogs provide focus trapping, Escape, and background inertness.
(() => {
  const galleries = document.querySelectorAll('.gallery');
  if (!galleries.length || !window.HTMLDialogElement) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photograph viewer');
  dialog.innerHTML = '<button class="close" aria-label="Close photograph viewer">×</button><button class="prev" aria-label="Previous photograph">‹</button><img alt=""><p class="caption" aria-live="polite"></p><p class="lightbox-help">Use the arrow keys to browse · Escape to close</p><button class="next" aria-label="Next photograph">›</button>';
  document.body.append(dialog);
  let items = [], index = 0, opener;
  const show = n => {
    index = (n + items.length) % items.length;
    const item = items[index];
    dialog.querySelector('img').src = item.href;
    dialog.querySelector('img').alt = item.querySelector('img').alt;
    dialog.querySelector('.caption').textContent = `${index + 1} of ${items.length} · ${item.querySelector('img').alt}`;
  };
  galleries.forEach(gallery => {
    const links = [...gallery.querySelectorAll('.gallery-item')];
    links.forEach((link, n) => link.addEventListener('click', e => {
      // Retain normal open-in-new-tab behavior.
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); items = links; opener = link; show(n);
      dialog.showModal(); document.body.style.overflow = 'hidden';
      dialog.querySelector('.close').focus();
    }));
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); show(index + (e.key === 'ArrowLeft' ? -1 : 1)); }
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialog.querySelector('img').removeAttribute('src'); opener?.focus(); });
})();
