import "./assets/scss/all.scss";

console.log("Hello world!");

console.log("env:" + import.meta.env.VITE_MODE);

document.addEventListener("DOMContentLoaded", function () {
  // 系列鏡框
  const seriesframeMenuItem = document.querySelectorAll(
    ".series-frame-menu-item"
  );

  const path = window.location.pathname;

  if (path.includes("series_frame_optical")) {
    seriesframeMenuItem[0].classList.add("series-frame-menu-container-active");
  } else if (path.includes("series_frame_sunglasses")) {
    seriesframeMenuItem[1].classList.add("series-frame-menu-container-active");
  }
});
