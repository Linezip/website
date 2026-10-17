/* Stake nav toggle + scroll reveal */
(function () {
  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Scroll reveal: show anything that is on screen or already scrolled past,
  // so nothing near the bottom of the page stays hidden.
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduce) {
    els.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var ticking = false;
  function check() {
    ticking = false;
    var vh = window.innerHeight;
    els = els.filter(function (el) {
      if (el.getBoundingClientRect().top < vh) {
        el.classList.add("in");
        return false;
      }
      return true;
    });
    if (!els.length) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(check);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();
})();
