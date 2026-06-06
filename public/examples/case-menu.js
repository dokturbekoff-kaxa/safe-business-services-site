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

  var faqAnswers = {
    plumbing: {
      "Выезжаете срочно?":
        "Да. Если мастер свободен, выезд возможен в день обращения. Напишите проблему и адрес, чтобы быстро оценить ситуацию.",
      "Можно узнать цену заранее?":
        "Да. По фото, видео или короткому описанию можно назвать ориентир. Точная стоимость фиксируется после осмотра до начала работы.",
      "Работаете по Бишкеку?":
        "Да, пример кейса рассчитан на Бишкек: выезд по городу, квартиры, дома и коммерческие помещения.",
      "Даёте гарантию?":
        "Да. На выполненные работы можно указать гарантию, а условия зависят от типа услуги и материалов.",
      "Можно вызвать мастера вечером?":
        "Да, можно оставить заявку вечером. Мастер или администратор согласует ближайшее удобное время.",
    },
    clinic: {
      "Как записаться на приём?":
        "Можно оставить заявку на сайте или написать в WhatsApp. Администратор уточнит направление, врача и удобное время.",
      "Можно ли записаться через WhatsApp?":
        "Да. В кейсе контакты скрыты, но в реальном сайте кнопка WhatsApp ведёт на рабочий номер клиники.",
      "Можно ли узнать цену заранее?":
        "Да. Можно показать стоимость консультаций, диагностики и анализов в разделе услуг, а администратор уточнит детали перед записью.",
      "Есть ли приём детей?":
        "Да, для клиники можно выделить педиатрию, семейные приёмы и отдельные условия для детей.",
      "Нужно ли приходить заранее?":
        "Обычно достаточно прийти за 10-15 минут до приёма, чтобы оформить документы и спокойно пройти регистрацию.",
      "Можно ли отменить или перенести запись?":
        "Да. В реальном проекте можно подключить перенос записи через администратора, WhatsApp или CRM.",
    },
    "accessories-store": {
      "Как оформить заказ?":
        "Выберите товар, добавьте в корзину или нажмите WhatsApp. В реальном магазине заявка приходит менеджеру или в CRM.",
      "Есть ли доставка?":
        "Да. Можно показать доставку по городу, самовывоз и отправку по регионам.",
      "Можно оплатить при получении?":
        "Да. В проект можно добавить оплату наличными, переводом, картой или онлайн-эквайрингом.",
      "Можно подобрать аксессуар под модель?":
        "Да. Каталог можно фильтровать по бренду, модели телефона, цвету, типу товара и цене.",
      "Товары реально продаются?":
        "Это сайт-кейс, поэтому контакты и реальные продажи специально отключены.",
    },
  };

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function findFaqAnswer(question, button) {
    var answers = faqAnswers[config.key] || {};
    if (answers[question]) return answers[question];

    var section = button.closest("section");
    var sectionText = normalizeText(section ? section.textContent : "");
    if (/faq|частые вопросы|часто задаваемые вопросы|вопросы/i.test(sectionText)) {
      return "Это демонстрационный ответ для сайта-кейса. В реальном проекте этот блок заполняется под условия, цены и процесс конкретного бизнеса.";
    }

    return "";
  }

  function setFaqOpen(button, content, open) {
    button.setAttribute("data-state", open ? "open" : "closed");
    button.setAttribute("aria-expanded", open ? "true" : "false");
    content.setAttribute("data-state", open ? "open" : "closed");
    content.hidden = !open;

    var item = button.closest('[data-state="open"], [data-state="closed"]');
    if (item && item !== button) {
      item.setAttribute("data-state", open ? "open" : "closed");
    }
  }

  function setupCaseFaq() {
    Array.prototype.slice
      .call(document.querySelectorAll("button[aria-controls]"))
      .forEach(function (button) {
        if (button.dataset.caseFaqReady === "true") return;

        var contentId = button.getAttribute("aria-controls");
        var content = contentId ? document.getElementById(contentId) : null;
        var question = normalizeText(button.textContent);
        var answer = findFaqAnswer(question, button);

        if (!content || !answer) return;

        button.dataset.caseFaqReady = "true";
        button.classList.add("case-faq-trigger");
        content.classList.add("case-faq-panel");

        if (!normalizeText(content.textContent)) {
          content.innerHTML = '<div class="case-faq-answer">' + escapeHtml(answer) + "</div>";
        }

        setFaqOpen(button, content, false);

        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          setFaqOpen(button, content, button.getAttribute("data-state") !== "open");
        });
      });
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

  setupCaseFaq();

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
