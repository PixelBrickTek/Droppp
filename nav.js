document.documentElement.classList.add("js-enabled");

document.querySelectorAll(".nav").forEach((nav) => {
  const toggle = nav.querySelector(".nav-toggle");
  const links = nav.querySelector(".navlinks");
  if (!toggle || !links) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
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
});

// Keep every screenshot readable when JavaScript is unavailable.
// Enhance the screen tour into keyboard-accessible tabs only after setup.
document.querySelectorAll("[data-explorer]").forEach((explorer) => {
  const tablist = explorer.querySelector(".explorer-tabs");
  const tabs = Array.from(explorer.querySelectorAll(".explorer-tab"));
  const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));
  if (!tablist || !tabs.length || panels.some((panel) => !panel)) return;

  const selectTab = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (moveFocus) tabs[index].focus();
  };

  tablist.setAttribute("role", "tablist");
  tabs.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    panels[index].setAttribute("role", "tabpanel");
    panels[index].tabIndex = 0;
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectTab(next, true);
    });
  });
  selectTab(0);
  explorer.classList.add("explorer-ready");
});