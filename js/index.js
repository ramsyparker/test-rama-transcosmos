"use strict";
const toggle = document.querySelector(".menu-toggle");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "MENU";
}
toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
document.querySelector(".footer-menu").addEventListener("click", () => { setMenu(true); toggle.focus(); });
document.querySelectorAll(".header nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => { if (event.key === "Escape") { setMenu(false); } });
window.addEventListener("resize", () => { if (window.innerWidth >= 768) setMenu(false); });
const content = [
  ["Our team of experts specializes in creating unique and effective designs", "We created marketing materials that were consistent with the new brand identity, such as business cards, brochures, and social media graphics."],
  ["We build custom websites that bring your vision to life", "Our websites are visually stunning, easy to navigate, and optimized for search engines, creating a seamless experience for your audience."],
  ["We help your brand connect with its audience", "Our influencer campaigns and high-quality content build brand awareness, engage your audience, and drive conversions."]
];
const tabs = [...document.querySelectorAll("[data-tab]")];
function activateTab(index) {
  tabs.forEach((tab, i) => { tab.setAttribute("aria-selected", String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  document.querySelector("#service-panel").setAttribute("aria-labelledby", tabs[index].id);
  document.querySelector("#tab-summary").textContent = content[index][0];
  document.querySelector("#tab-description").textContent = content[index][1];
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(index));
  tab.addEventListener("keydown", event => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (event.key === "ArrowRight" ? 1 : 2)) % 3;
    activateTab(next); tabs[next].focus();
  });
});
let slide = 0;
const dots = [...document.querySelectorAll("[data-slide]")];
const projects = document.querySelector(".project-list");
const initialProjects = projects.innerHTML;
function showSlide(index) {
  slide = (index + 3) % 3;
  dots.forEach((dot, i) => dot.setAttribute("aria-pressed", String(i === slide)));
  projects.innerHTML = initialProjects;
  if (slide === 1) projects.append(projects.firstElementChild);
  if (slide === 2) projects.querySelectorAll("article").forEach(item => { item.style.backgroundPosition = "40% 75%"; });
}
dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
document.querySelector(".previous").addEventListener("click", () => showSlide(slide - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(slide + 1));
const privacy = document.querySelector(".privacy-dialog");
document.querySelector(".privacy-button").addEventListener("click", () => privacy.showModal());
document.querySelector(".privacy-close").addEventListener("click", () => privacy.close());
