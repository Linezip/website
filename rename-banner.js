/* Line rename banner
   Tells visitors that Stake is now Line, with a link to line.zip.
   Shown until the visitor dismisses it (remembered in localStorage).
   Included right after <body> so it is in place before first paint.
   To retire it, remove the <script> tag for this file from each page. */
(function () {
  var KEY = "stake-rename-banner-dismissed";

  try {
    if (window.localStorage.getItem(KEY) === "1") return;
  } catch (e) {}

  var banner = document.createElement("div");
  banner.className = "rename-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Name change");
  banner.innerHTML =
    '<div class="wrap">' +
    '<p>Stake is now Line (<a href="https://line.zip">line.zip</a>). Same team, same product.</p>' +
    '<button type="button" class="rename-banner-close" aria-label="Dismiss notice">' +
    '<span aria-hidden="true">&times;</span></button>' +
    "</div>";

  banner.querySelector("button").addEventListener("click", function () {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch (e) {}
    banner.parentNode.removeChild(banner);
    var brand = document.querySelector(".site-header .brand");
    if (brand) brand.focus();
  });

  document.body.insertBefore(banner, document.body.firstChild);
})();
