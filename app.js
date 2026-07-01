// ===== Impremium pré-site — interactions =====
(function () {
  "use strict";

  // --- Theme toggle (in-memory, no storage) ---
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
    });
  }

  // --- Year in footer ---
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // --- Scroll reveal ---
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // --- Smooth anchor scroll handled by CSS scroll-behavior ---
})();


// ---- Menu burger mobile ----
(function () {
  var btn = document.getElementById('burgerBtn');
  var menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fermer au clic sur un lien
  menu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
})();

// ---- Bandeau cookie ----
(function () {
  var banner = document.getElementById('cookie-banner');
  var btn = document.getElementById('cookie-accept');
  if (!banner || !btn) return;

  // Masquer immédiatement au clic
  btn.addEventListener('click', function() {
    banner.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(100%)';
    setTimeout(function() {
      banner.style.display = 'none';
    }, 320);
    // Mémoriser dans le cookie si possible
    try {
      var d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      document.cookie = 'cookie-accepted=1;expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
    } catch(e) {}
  });

  // Masquer si cookie déjà présent
  try {
    if (document.cookie.indexOf('cookie-accepted=1') !== -1) {
      banner.style.display = 'none';
    }
  } catch(e) {}
})();
