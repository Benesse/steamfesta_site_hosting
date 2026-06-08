const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const pageTop = document.querySelector(".page-top");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (pageTop) {
  window.addEventListener("scroll", () => {
    pageTop.classList.toggle("is-visible", window.scrollY > 500);
  });
}
