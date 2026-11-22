/* PalmSakk — renders content from config.js. No dependencies. */
(function () {
  "use strict";

  var cfg = window.PALMSAKK_CONFIG;
  if (!cfg) return;

  var ARROW =
    '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">' +
    '<path d="M7 17 17 7M8.5 7H17v8.5" fill="none" stroke="currentColor" stroke-width="1.25" ' +
    'stroke-linecap="square"/></svg>';

  function $(sel) { return document.querySelector(sel); }
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function setText(sel, value) {
    var el = $(sel);
    if (el && value != null) el.textContent = value;
  }

  /* Previewing on your own computer? (file://, localhost, LAN address) */
  function isLocalPreview() {
    var h = location.hostname;
    return location.protocol === "file:" || h === "" || h === "localhost" ||
      h === "127.0.0.1" || /^(192\.168|10\.)\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h);
  }
  function shouldHideUnlinked() {
    var v = cfg.hideUnlinked;
    if (v === true) return true;
    if (v === false) return false;
    return !isLocalPreview();               // "auto"
  }

  /* Only accept real, safe destinations. */
  function resolveHref(link) {
    if (link.type === "email") {
      var email = String(link.email || "").trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
      var q = link.subject ? "?subject=" + encodeURIComponent(link.subject) : "";
      return { href: "mailto:" + email + q, external: false, email: email };
    }
    var url = String(link.url || "").trim();
    if (!/^https:\/\/[^\s]+\.[^\s]+/i.test(url)) return null;
    return { href: url, external: true };
  }

  function rowInner(link, n, state) {
    var desc = '<span class="row__desc">' + esc(link.description) + "</span>";
    var extra = "";
    if (!state) extra = '<span class="row__status">Not linked yet</span>';
    else if (state.email) extra = '<span class="row__mail">' + esc(state.email).replace("@", "@<wbr>") + "</span>";
    return (
      '<span class="row__index">' + pad(n) + "</span>" +
      '<span class="row__body">' +
        '<span class="row__name">' + esc(link.label) + "</span>" + desc + extra +
      "</span>" +
      '<span class="row__arrow">' + ARROW + "</span>"
    );
  }

  function renderLinks() {
    var list = $("#link-list");
    var hide = shouldHideUnlinked();
    var pending = [];

    var items = (Array.isArray(cfg.links) ? cfg.links : [])
      .map(function (link) { return { link: link, state: resolveHref(link) }; })
      .filter(function (it) {
        if (!it.state) pending.push(it.link.label);
        return it.state || !hide;
      });

    list.innerHTML = items.map(function (it, i) {
      var link = it.link, state = it.state, n = i + 1;
      var open = '<li class="reveal' + (state && state.email ? " has-copy" : "") +
        '" style="--i:' + (i + 4) + '">';

      if (!state) {
        return open + '<div class="row is-pending" aria-disabled="true">' +
          rowInner(link, n, null) + "</div></li>";
      }

      var attrs = state.external ? ' target="_blank" rel="noopener noreferrer"' : "";
      var hint = state.external
        ? '<span class="sr-only"> (opens in a new tab)</span>'
        : '<span class="sr-only"> (opens your email app)</span>';
      var copy = state.email
        ? '<button type="button" class="copy" data-copy="' + esc(state.email) + '">' +
            '<span class="copy__text">Copy</span>' +
            '<span class="sr-only"> email address</span></button>'
        : "";

      return open + '<a class="row" href="' + esc(state.href) + '"' + attrs + ">" +
        rowInner(link, n, state) + hint + "</a>" + copy + "</li>";
    }).join("");

    setText("#link-count", items.length ? "01 — " + pad(items.length) : "");
    var empty = $("#links-empty");
    if (empty) empty.hidden = items.length > 0;

    if (pending.length && window.console) {
      console.info("[PalmSakk] Not linked yet" + (hide ? " (hidden)" : "") + ": " +
        pending.join(", ") + ". Add them in assets/js/config.js");
    }
  }

  /* Copy email — works where mailto: links don't (TikTok / IG in-app browsers). */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function bindCopy() {
    var status = $("#copy-status");
    var timer;
    document.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".copy");
      if (!btn) return;
      var label = btn.querySelector(".copy__text");
      copyText(btn.getAttribute("data-copy")).then(function () {
        label.textContent = "Copied";
        btn.classList.add("is-done");
        if (status) status.textContent = "Email address copied.";
      }, function () {
        label.textContent = "Press & hold";
        if (status) status.textContent = "Couldn't copy. Press and hold the address to copy it.";
      }).then(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          label.textContent = "Copy";
          btn.classList.remove("is-done");
          if (status) status.textContent = "";
        }, 1800);
      });
    });
  }

  function renderText() {
    var b = cfg.brand || {};
    setText("#brand-l1", b.line1);
    setText("#brand-l2", b.line2);
    var h1 = $("#brand");
    if (h1 && b.name) h1.setAttribute("aria-label", b.name);

    var kana = $("#kana");
    if (kana) {
      if (b.kana) kana.textContent = b.kana;
      else kana.remove();
    }

    setText("#tagline", cfg.tagline);
    if (Array.isArray(cfg.topics)) {
      var t = $("#topics");
      if (t) t.innerHTML = cfg.topics.map(function (x, i, all) {
        return '<span class="nw">' + esc(x) + (i < all.length - 1 ? " /" : "") + "</span>";
      }).join(" ");
    }

    var photo = cfg.photo || {};
    var fig = $("#portrait"), img = $("#portrait-img");
    if (fig && img) {
      if (photo.src) {
        img.src = photo.src;
        img.alt = photo.alt || "";
        setText("#portrait-cap", photo.caption || "");
        img.addEventListener("error", function () {   // broken path → fall back cleanly
          fig.remove();
          $("#lede").classList.remove("lede--photo");
        });
      } else {
        fig.remove();
        $("#lede").classList.remove("lede--photo");
      }
    }
    setText("#links-title", cfg.sectionTitle);

    var f = cfg.footer || {};
    setText("#foot-left", f.left);
    setText("#foot-jp", f.jp);
    setText("#foot-en", f.en);
    setText("#year", new Date().getFullYear());
    setText("#foot-name", b.name);
  }

  renderText();
  renderLinks();
  bindCopy();

  /* Reveal after first paint so the transition runs. */
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.documentElement.classList.add("is-ready");
    });
  });
})();
