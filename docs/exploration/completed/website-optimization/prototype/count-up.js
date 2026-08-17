// count-up.js — simple viewport-triggered count-up animation for [data-countup] elements.
// Usage: <div data-countup="25000" data-suffix="+">25,000+</div>
// The initial text content is the final formatted value, so the page degrades
// gracefully with the correct number shown even if this script fails to load.

document.addEventListener('DOMContentLoaded', function () {
  var els = document.querySelectorAll('[data-countup]');
  if (!els.length) return;

  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(el) {
    var target = parseFloat(el.getAttribute('data-countup')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400; // ms
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutCubic(progress);
      var current = target * eased;
      el.textContent = formatNumber(current) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target) + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(animate);
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  els.forEach(function (el) {
    observer.observe(el);
  });
});
