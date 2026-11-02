(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Zavrieť menu" : "Otvoriť menu");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Otvoriť menu");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* Scroll-reveal animations. Progressive enhancement: the ".js" class
     (added by an inline script in <head>) is what makes ".reveal"
     elements start hidden in CSS, so if this never runs, nothing was
     ever hidden in the first place. */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* Count-up animation for the numeric stats in the footer badges.
     The HTML always holds the real final number (see index.html /
     kontakt.html), so nothing breaks if this never runs — it just
     briefly resets to 0 and animates back up once scrolled into view. */
  var countEls = document.querySelectorAll(".count-up");
  if (countEls.length && "IntersectionObserver" in window) {
    var prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var animateCount = function (el) {
      var target = parseInt(el.getAttribute("data-count-to"), 10);
      if (!target) return;

      if (prefersReducedMotion) {
        el.textContent = target;
        return;
      }

      var duration = 2200;
      var startTime = null;

      function tick(timestamp) {
        if (startTime === null) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }

      el.textContent = "0";
      window.requestAnimationFrame(tick);
    };

    var countObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countObserver.unobserve(entry.target);
          animateCount(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    countEls.forEach(function (el) {
      // Reserve the final number's width up front so the pill doesn't
      // resize/jitter as the digit count grows while counting up.
      el.style.minWidth = String(el.getAttribute("data-count-to") || "").length + "ch";
      countObserver.observe(el);
    });
  }

  /* Gallery lightbox — click a gallery image to view it full-size. */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lightbox = document.getElementById("lightbox");

  if (galleryItems.length && lightbox) {
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxClose = document.getElementById("lightbox-close");
    var lightboxPrev = document.getElementById("lightbox-prev");
    var lightboxNext = document.getElementById("lightbox-next");
    var currentIndex = 0;
    var lightboxTriggerEl = null;
    var lightboxFocusable = [lightboxClose, lightboxPrev, lightboxNext];

    var showImage = function (index) {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[currentIndex];
      var img = item.querySelector("img");
      lightboxImage.src = item.getAttribute("href");
      lightboxImage.alt = img ? img.alt : "";
    };

    var openLightbox = function (index, triggerEl) {
      lightboxTriggerEl = triggerEl || null;
      showImage(index);
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      lightboxClose.focus();
    };

    var closeLightbox = function () {
      lightbox.hidden = true;
      lightboxImage.src = "";
      document.body.style.overflow = "";
      if (lightboxTriggerEl) {
        lightboxTriggerEl.focus();
        lightboxTriggerEl = null;
      }
    };

    galleryItems.forEach(function (item, index) {
      item.addEventListener("click", function (event) {
        event.preventDefault();
        openLightbox(index, item);
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", function () { showImage(currentIndex - 1); });
    lightboxNext.addEventListener("click", function () { showImage(currentIndex + 1); });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showImage(currentIndex - 1);
      if (event.key === "ArrowRight") showImage(currentIndex + 1);

      // Trap Tab/Shift+Tab inside the dialog's 3 controls while it's open.
      if (event.key === "Tab") {
        var firstEl = lightboxFocusable[0];
        var lastEl = lightboxFocusable[lightboxFocusable.length - 1];
        if (event.shiftKey && document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        } else if (!event.shiftKey && document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    });
  }

  /* Contact form submission — Netlify Forms (no backend code needed;
     Netlify intercepts POSTs to this form at the platform level). */
  var form = document.getElementById("contact-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("form-submit-btn");
  var loadedAtField = document.getElementById("form-loaded-at");
  var MIN_FORM_SECONDS = 3;

  if (loadedAtField) {
    loadedAtField.value = String(Date.now());
  }

  function setStatus(state, text) {
    statusEl.textContent = text;
    statusEl.setAttribute("data-state", state);
  }

  function encodeForNetlify(formEl) {
    var params = new URLSearchParams();
    new FormData(formEl).forEach(function (value, key) {
      params.append(key, value);
    });
    return params.toString();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Soft client-side bot guard: a human can't fill 3 required fields
    // this fast. Netlify's own spam filtering is the real backstop.
    if (loadedAtField && loadedAtField.value) {
      var elapsedSeconds = (Date.now() - Number(loadedAtField.value)) / 1000;
      if (elapsedSeconds < MIN_FORM_SECONDS) {
        setStatus("error", "Skúste to prosím znova o pár sekúnd.");
        return;
      }
    }

    submitBtn.disabled = true;
    setStatus("sending", "Odosielam správu…");

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForNetlify(form)
    })
      .then(function (response) {
        if (!response.ok) throw new Error("request_failed");
        setStatus("success", "Ďakujeme! Vaša správa bola úspešne odoslaná.");
        form.reset();
        if (loadedAtField) {
          loadedAtField.value = String(Date.now());
        }
      })
      .catch(function () {
        setStatus(
          "error",
          "Správu sa nepodarilo odoslať. Skúste to prosím znova, alebo nám napíšte priamo na vavra@geogis.sk."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });

  /*
    SWITCHING TO PHP HOSTING LATER (e.g. WebSupport)?
    1. Delete the active form.addEventListener("submit", ...) block above.
    2. Uncomment the block below.
    3. In kontakt.html, point the <form> at action="send-mail.php" again
       (see the comment there for the exact steps) — send-mail.php itself
       needs no changes, it's untouched and ready to go.

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    setStatus("sending", "Odosielam správu…");

    var formData = new FormData(form);

    fetch(form.getAttribute("action") || "send-mail.php", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        return response
          .json()
          .catch(function () { return {}; })
          .then(function (data) {
            return { ok: response.ok, status: response.status, data: data };
          });
      })
      .then(function (result) {
        if (result.ok) {
          setStatus("success", "Ďakujeme! Vaša správa bola úspešne odoslaná.");
          form.reset();
          if (loadedAtField) {
            loadedAtField.value = String(Date.now());
          }
          return;
        }

        if (result.status === 429) {
          setStatus(
            "error",
            "Z tejto siete prišlo príliš veľa správ za krátky čas. Skúste to prosím o chvíľu znova."
          );
          return;
        }

        throw new Error("request_failed");
      })
      .catch(function () {
        setStatus(
          "error",
          "Správu sa nepodarilo odoslať. Skúste to prosím znova, alebo nám napíšte priamo na vavra@geogis.sk."
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });

  */
})();
