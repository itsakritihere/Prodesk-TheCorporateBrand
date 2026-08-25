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