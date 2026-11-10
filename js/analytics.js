"use strict";

window.dataLayer = window.dataLayer || [];

document.querySelectorAll(".quick-links [data-analytics-id]").forEach(function (link) {
  link.addEventListener("click", function () {
    const label = window.innerWidth >= 768
      ? link.querySelector("span")
      : link.querySelector("em");

    window.dataLayer.push({
      event: "hero_navigation_click",
      link_id: link.getAttribute("data-analytics-id"),
      link_text: label.textContent.trim(),
      link_url: link.getAttribute("href"),
      link_location: "hero_quick_links"
    });
  });
});
