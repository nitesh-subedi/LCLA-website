// Progressive enhancement: BibTeX copy button + scroll reveals.
// Without JS (or with reduced motion) everything stays fully visible.
(function () {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = document.getElementById(btn.dataset.copy).textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Copied';
      } catch (e) {
        btn.textContent = 'Select & copy';
      }
      setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
    });
  });

  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.reveal-zoom, .section-title, .lede, .step, .highlight, .card, .stat-row > div, .table-wrap, .objective'
  );
  targets.forEach(el => { if (!el.classList.contains('reveal-zoom')) el.classList.add('reveal'); });
  document.documentElement.classList.add('js-motion');

  const io = new IntersectionObserver((entries, obs) => {
    let i = 0;
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.style.transitionDelay = (i++ * 70) + 'ms';
      e.target.classList.add('in');
      obs.unobserve(e.target);
    }
  }, { threshold: 0.1 });
  targets.forEach(el => io.observe(el));
})();
