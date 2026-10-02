document.documentElement.classList.add("js-enabled");

document.querySelectorAll(".nav").forEach((nav) => {
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".navlinks");
  if (!toggle || !links) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeMenu();
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);
  links.querySelectorAll(".is-active").forEach((link) => link.setAttribute("aria-current", "page"));
});
