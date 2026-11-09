/* Aibiike Nurlanova portfolio: theme toggle and draft bar. */
(function () {
  "use strict";
  var root = document.documentElement;

  // ---------- Theme toggle ----------
  var btn = document.getElementById("theme-btn");
  var moon = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  function isDark() {
    var t = root.getAttribute("data-theme");
    return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function paint() {
    if (!btn) return;
    var d = isDark();
    btn.querySelector("svg").innerHTML = d ? sun : moon;
    btn.setAttribute("aria-label", d ? "Switch to light mode" : "Switch to dark mode");
  }
  if (btn) btn.addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  });
  paint();

  // Placeholder links do nothing until filled in.
  document.querySelectorAll("[data-placeholder]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // ---------- Draft bar: shows only while placeholders remain ----------
  var n = document.querySelectorAll(".ph").length;
  var bar = document.getElementById("draft-bar");
  if (bar && n) {
    document.getElementById("draft-count").textContent = n + " placeholder" + (n === 1 ? "" : "s") + " on this page.";
    bar.hidden = false;
  }
})();
