// فعال کردن و غیرفعال کردن منوی موبایل
const menuToggle = document.getElementById("menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});
