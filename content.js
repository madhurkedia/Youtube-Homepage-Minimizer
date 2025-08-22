(function() {
  function onHome() {
    const path = window.location.pathname;
    const search = window.location.search || "";
    return (path === "/" && !search);
  }

  function addOverlay() {
    if (document.getElementById("ymsh-overlay")) return;

    document.documentElement.classList.add("ymsh-active");

    const overlay = document.createElement("div");
    overlay.id = "ymsh-overlay";

    const form = document.createElement("form");
    form.id = "ymsh-search-wrap";
    form.setAttribute("role", "search");

    const input = document.createElement("input");
    input.type = "text";
    input.id = "ymsh-input";
    input.placeholder = "Search";
    input.autocomplete = "off";
    input.autofocus = true;

    form.appendChild(input);
    overlay.appendChild(form);
    document.body.appendChild(overlay);

    // Pressing Enter will submit
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const q = input.value.trim();
      if (!q) return;
      const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
      window.location.href = url;
    });
  }

  function removeOverlay() {
    document.documentElement.classList.remove("ymsh-active");
    const overlay = document.getElementById("ymsh-overlay");
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }

  function applyForRoute() {
    if (onHome()) {
      addOverlay();
    } else {
      removeOverlay();
    }
  }

  applyForRoute();
  window.addEventListener("yt-navigate-finish", applyForRoute);
  window.addEventListener("popstate", applyForRoute);
  let lastHref = location.href;
  setInterval(() => {
    if (lastHref !== location.href) {
      lastHref = location.href;
      applyForRoute();
    }
  }, 800);
})();
