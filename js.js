(() => {
  const burger = document.querySelector(".burger");
  const navMenu = document.querySelector(".nav-menu");
  const links = Array.from(navMenu.querySelectorAll("a"));

  const MOBILE_BREAKPOINT = 940;

  const isMobile = () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;

  const setLinksTabbable = (canTab) => {
    links.forEach((a) => {
      if (canTab) a.removeAttribute("tabindex");
      else a.setAttribute("tabindex", "-1");
    });
  };

  const openMenu = () => {
    navMenu.classList.add("nav-open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Luk menu");

    navMenu.setAttribute("aria-hidden", "false");
    setLinksTabbable(true);

    // flyt fokus ind i menuen
    if (links[0]) links[0].focus();
  };

  const closeMenu = () => {
    navMenu.classList.remove("nav-open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Åbn menu");

    navMenu.setAttribute("aria-hidden", "true");
    setLinksTabbable(false);

    // fokus tilbage til burger
    burger.focus();
  };

  const toggleMenu = () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMenu();
    else openMenu();
  };

  // init state
  const init = () => {
    navMenu.setAttribute("aria-hidden", "true");
    setLinksTabbable(false);
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Åbn menu");
  };

  // Click på burger
  burger.addEventListener("click", () => {
    if (!isMobile()) return; // burger bruges kun på mobil
    toggleMenu();
  });

  // Luk når man klikker på et link (mobil)
  navMenu.addEventListener("click", (e) => {
    const target = e.target;
    if (!isMobile()) return;
    if (target && target.tagName === "A") closeMenu();
  });

  // ESC lukker + focus trap med TAB når menuen er åben
  document.addEventListener("keydown", (e) => {
    if (!isMobile()) return;

    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }

    if (e.key === "Tab") {
      // Focus trap: hold fokus inde i menuen
      const focusables = [burger, ...links].filter((el) => el && el.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Klik udenfor lukker menuen (mobil)
  document.addEventListener("click", (e) => {
    if (!isMobile()) return;

    const isOpen = burger.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;

    const clickInsideNav = navMenu.contains(e.target);
    const clickBurger = burger.contains(e.target);

    if (!clickInsideNav && !clickBurger) closeMenu();
  });

  // Hvis man resizer til desktop, så nulstil menuen
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      navMenu.classList.remove("nav-open");
      burger.classList.remove("open");
      navMenu.removeAttribute("aria-hidden");
      setLinksTabbable(true);
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Åbn menu");
    } else {
      init();
    }
  });

  init();
})();
