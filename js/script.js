const menuToggle = document.querySelector("#menu-toggle");
const navbarMenu = document.querySelector("#navbar-menu");
const navbarLinks = document.querySelectorAll(".navbar__link");

menuToggle.addEventListener("click", () => {

    const isOpen =
        navbarMenu.classList.toggle("navbar__menu--open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

});


navbarLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navbarMenu.classList.remove(
            "navbar__menu--open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* -------- Theme toggle (Blueprint / Diazo) -------------- */
/* Dark = "blueprint": Pale tracing lines on deep indigo, gives it the classic look.
   Light = "diazo": the paper-reproduction process that turned blueprints
   into navy lines on white. State persists via localStorage. */

const themeToggle = document.querySelector("#theme-toggle");
const themeToggleLabel = document.querySelector("#theme-toggle-label");
const THEME_KEY = "prodesk-theme";

function applyThemeUI(theme) {

    const isLight = theme === "light";

    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark blueprint theme" : "Switch to light diazo theme"
    );

    if (themeToggleLabel) {
        themeToggleLabel.textContent = isLight ? "Diazo" : "Blueprint";
    }

}

if (themeToggle) {

    // Sync the toggle's visual state with whatever the inline
    // pre-paint script already applied to <html data-theme="...">.
    applyThemeUI(document.documentElement.getAttribute("data-theme") || "dark");

    themeToggle.addEventListener("click", () => {

        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", next);

        try {
            localStorage.setItem(THEME_KEY, next);
        } catch (error) {
            // Storage unavailable (private browsing, disabled cookies, etc).
            // Theme still applies for the current session.
        }

        applyThemeUI(next);

    });

}


/* ---------------- Scroll reveal ---------------- */
/* One quiet, consistent treatment on section-level elements rather than
   scattered effects. Respects prefers-reduced-motion via the CSS rule
   that removes the initial hidden state entirely. */

const revealTargets = document.querySelectorAll(
    ".service-card, .about-feature, .process-card, .stats__item, .contact__box"
);

revealTargets.forEach((el) => el.setAttribute("data-reveal", ""));

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));

} else {

    // No IntersectionObserver support: just show everything.
    revealTargets.forEach((el) => el.classList.add("is-visible"));

}
