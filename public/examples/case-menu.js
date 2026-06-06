(function () {
  var root = "/examples/";
  var path = window.location.pathname;

  if (path.indexOf(root) !== 0 || document.querySelector(".case-menu-panel")) {
    return;
  }

  var configs = [
    {
      key: "plumbing",
      title: "Сантехник Бишкек",
      subtitle: "Кейс лендинга",
      links: [
        ["Главная", "/examples/plumbing"],
        ["Услуги", "/examples/plumbing#services"],
        ["Цены", "/examples/plumbing#prices"],
        ["Как работаем", "/examples/plumbing#process"],
        ["Отзывы", "/examples/plumbing#reviews"],
        ["Контакты", "/examples/plumbing#contacts"],
      ],
    },
    {
      key: "clinic",
      title: "MedCare Clinic",
      subtitle: "Кейс корпоративного сайта",
      links: [
        ["Главная", "/examples/clinic"],
        ["О клинике", "/examples/clinic/about"],
        ["Направления", "/examples/clinic/departments"],
        ["Врачи", "/examples/clinic/doctors"],
        ["Услуги и цены", "/examples/clinic/prices"],
        ["Диагностика", "/examples/clinic/diagnostics"],
        ["Отзывы", "/examples/clinic/reviews"],
        ["Контакты", "/examples/clinic/contacts"],
      ],
    },
    {
      key: "accessories-store",
      title: "PhoneMarket",
      subtitle: "Кейс интернет-магазина",
      links: [
        ["Главная", "/examples/accessories-store"],
        ["Каталог", "/examples/accessories-store/catalog"],
        ["Акции", "/examples/accessories-store/deals"],
        ["Избранное", "/examples/accessories-store/favorites"],
        ["Корзина", "/examples/accessories-store/cart"],
        ["Доставка и оплата", "/examples/accessories-store/contacts"],
      ],
    },
  ];

  var config = configs.find(function (item) {
    return path.indexOf(root + item.key) === 0;
  });

  if (!config) {
    return;
  }

  function uniqueLinks(links) {
    var seen = {};
    return links.filter(function (link) {
      var href = link[1];
      if (!href || seen[href] || href.indexOf("javascript:") === 0) return false;
      seen[href] = true;
      return true;
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function readHeaderLinks() {
    var anchors = Array.prototype.slice.call(document.querySelectorAll("header nav a[href]"));
    return anchors
      .map(function (anchor) {
        return [anchor.textContent.trim().replace(/\s+/g, " "), anchor.getAttribute("href")];
      })
      .filter(function (link) {
        return link[0] && link[1] && link[1].indexOf("/examples/") === 0;
      });
  }

  var links = uniqueLinks(config.links.concat(readHeaderLinks()));

  var overlay = document.createElement("div");
  overlay.className = "case-menu-overlay";
  overlay.setAttribute("aria-hidden", "true");

  var panel = document.createElement("aside");
  panel.className = "case-menu-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-label", "Меню кейса");
  panel.innerHTML =
    '<div class="case-menu-head">' +
    '<div class="case-menu-title"><strong>' +
    escapeHtml(config.title) +
    "</strong><span>" +
    escapeHtml(config.subtitle) +
    "</span></div>" +
    '<button class="case-menu-close" type="button" aria-label="Закрыть меню">×</button>' +
    "</div>" +
    '<div class="case-menu-scroll"><nav class="case-menu-links">' +
    links
      .map(function (link) {
        return (
          '<a class="case-menu-link" href="' +
          escapeHtml(link[1]) +
          '">' +
          escapeHtml(link[0]) +
          "</a>"
        );
      })
      .join("") +
    "</nav></div>" +
    '<div class="case-menu-actions">' +
    '<a class="case-menu-home" href="/#cases">Вернуться на главный сайт</a>' +
    '<div class="case-menu-note">Это демонстрационный сайт-кейс. Контакты внутри кейса специально скрыты.</div>' +
    "</div>";

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function lockPage(locked) {
    document.documentElement.classList.toggle("case-menu-lock", locked);
    document.body.classList.toggle("case-menu-lock", locked);
  }

  function openMenu() {
    overlay.classList.add("is-open");
    panel.classList.add("is-open");
    lockPage(true);
  }

  function closeMenu() {
    overlay.classList.remove("is-open");
    panel.classList.remove("is-open");
    lockPage(false);
  }

  function looksLikeMenuTrigger(button) {
    var label = (button.getAttribute("aria-label") || button.textContent || "").toLowerCase();
    var hasMenuIcon =
      button.querySelector(".lucide-menu") ||
      button.querySelector('svg[class*="menu"]') ||
      /menu|меню|каталог/.test(label);
    if (!hasMenuIcon) return false;

    var hrefParent = button.closest("a[href]");
    return !hrefParent;
  }

  var triggers = Array.prototype.slice
    .call(document.querySelectorAll("header button"))
    .filter(looksLikeMenuTrigger);

  if (config.key === "accessories-store") {
    Array.prototype.slice
      .call(document.querySelectorAll('header a[aria-label="Каталог"]'))
      .forEach(function (anchor) {
        triggers.push(anchor);
      });
  }

  triggers.forEach(function (trigger) {
    trigger.classList.add("case-menu-trigger");
    trigger.setAttribute("aria-label", trigger.getAttribute("aria-label") || "Открыть меню");
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      openMenu();
    });
  });

  panel.querySelector(".case-menu-close").addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);
  panel.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (link) closeMenu();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
})();
