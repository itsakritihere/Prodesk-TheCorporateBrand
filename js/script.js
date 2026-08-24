const menuToggle = document.querySelector("#menu-toggle");
const navbarMenu = document.querySelector("#navbar-menu");

menuToggle.addEventListener("click", () => {

    const isOpen = navbarMenu.classList.toggle("navbar__menu--active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});