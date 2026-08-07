// ===== Current year in footer =====
document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ===== Sticky navbar + scroll progress + hero parallax =====
const nav = document.getElementById("nav");
const progress = document.querySelector(".scroll-progress");
const cake = document.querySelector(".hero__cake");

const onScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle("scrolled", y > 40);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }
  // Subtle parallax: cake drifts slower than the page as you scroll
  if (cake && !reduceMotion) {
    cake.style.setProperty("--parY", `${Math.min(y, 900) * 0.08}px`);
  }
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });

// ===== Mobile menu toggle =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

const closeMenu = () => {
  links.classList.remove("open");
  toggle.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
};

toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.classList.toggle("open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("nav-open", isOpen);
});

links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

// ===== Cake menu category flip tiles =====
const flipTiles = document.querySelectorAll(".fliptile");
const tileBaseHeight = (tile) =>
  parseFloat(getComputedStyle(tile).height) || 300;

const sizeTile = (tile) => {
  if (tile.classList.contains("flipped")) {
    const back = tile.querySelector(".fliptile__back");
    // Grow to fit all flavours so nothing needs inner scrolling
    const needed = back.scrollHeight;
    const base = tile.dataset.baseH ? parseFloat(tile.dataset.baseH) : 300;
    tile.style.height = `${Math.max(base, needed)}px`;
  } else {
    tile.style.height = "";
  }
};

const tileGrid = document.querySelector(".tilegrid");

flipTiles.forEach((tile) => {
  // Remember the collapsed height for this breakpoint
  tile.dataset.baseH = String(tileBaseHeight(tile));
  const toggle = () => {
    const willOpen = !tile.classList.contains("flipped");
    // Only one tile open at a time — collapse the others
    flipTiles.forEach((t) => {
      if (t !== tile) {
        t.classList.remove("flipped");
        t.style.height = "";
      }
    });
    tile.classList.toggle("flipped", willOpen);
    if (tileGrid) tileGrid.classList.toggle("is-open", willOpen);
    sizeTile(tile);
    if (willOpen) {
      // Bring the opened tile to the centre of the screen
      setTimeout(
        () => tile.scrollIntoView({ behavior: "smooth", block: "center" }),
        80
      );
    }
  };
  tile.addEventListener("click", (e) => {
    if (e.target.closest("a")) return; // let WhatsApp links work
    toggle();
  });
  tile.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  });
});

// ===== Cake designs gallery =====
const buildDesignList = (folder, count) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      thumb: `assets/designs/${folder}/thumbs/${folder}-${n}.jpg`,
      full: `assets/designs/${folder}/${folder}-${n}.jpg`,
    };
  });

const simpleDesigns = buildDesignList("simple", 39);

const complexDesigns = [
  { thumb: "assets/designs/complex/thumbs/complex-01.jpg", full: "assets/designs/complex/complex-01.jpg", weight: "0.5 kg", price: "₹1000" },
  { thumb: "assets/designs/complex/thumbs/complex-02.jpg", full: "assets/designs/complex/complex-02.jpg", weight: "0.5 kg", price: "₹1000" },
  { thumb: "assets/designs/complex/thumbs/complex-03.jpg", full: "assets/designs/complex/complex-03.jpg", weight: "0.5 kg", price: "₹1000" },
  { thumb: "assets/designs/complex/thumbs/complex-04.jpg", full: "assets/designs/complex/complex-04.jpg", weight: "0.5 kg", price: "₹1000" },
  { thumb: "assets/designs/complex/thumbs/complex-05.jpg", full: "assets/designs/complex/complex-05.jpg", weight: "0.5 kg", price: "₹1200" },
  { thumb: "assets/designs/complex/thumbs/complex-06.jpg", full: "assets/designs/complex/complex-06.jpg", weight: "0.5 kg", price: "₹1200" },
  { thumb: "assets/designs/complex/thumbs/complex-07.jpg", full: "assets/designs/complex/complex-07.jpg", weight: "0.5 kg", price: "₹1200" },
  { thumb: "assets/designs/complex/thumbs/complex-08.jpg", full: "assets/designs/complex/complex-08.jpg", weight: "0.5 kg", price: "₹1200" },
  { thumb: "assets/designs/complex/thumbs/complex-09.jpg", full: "assets/designs/complex/complex-09.jpg", weight: "0.5 kg", price: "₹1200" },
  { thumb: "assets/designs/complex/thumbs/complex-10.jpg", full: "assets/designs/complex/complex-10.jpg", weight: "0.5 kg", price: "₹1500" },
  { thumb: "assets/designs/complex/thumbs/complex-11.jpg", full: "assets/designs/complex/complex-11.jpg", weight: "0.5 kg", price: "₹1500" },
  { thumb: "assets/designs/complex/thumbs/complex-12.jpg", full: "assets/designs/complex/complex-12.jpg", weight: "1 kg", price: "₹1500" },
  { thumb: "assets/designs/complex/thumbs/complex-13.jpg", full: "assets/designs/complex/complex-13.jpg", weight: "1.5 kg", price: "₹2000" },
  { thumb: "assets/designs/complex/thumbs/complex-14.jpg", full: "assets/designs/complex/complex-14.jpg", weight: "1.5 kg", price: "₹2500" },
  { thumb: "assets/designs/complex/thumbs/complex-15.jpg", full: "assets/designs/complex/complex-15.jpg", weight: "1.5 kg", price: "₹3000" },
];

const designsModal = document.getElementById("designsModal");
const designsGrid = document.getElementById("designsGrid");

if (designsModal && designsGrid) {
  const designsComplex = document.getElementById("designsComplex");
  const openBtns = document.querySelectorAll("[data-open-designs]");
  const closeEls = designsModal.querySelectorAll("[data-close-designs]");
  const tabs = designsModal.querySelectorAll(".designs__tab");
  const noteSimple = designsModal.querySelector(".designs__note:not(.designs__note--complex)");
  const noteComplex = designsModal.querySelector(".designs__note--complex");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCount = document.getElementById("lightboxCount");
  const lightboxMeta = document.getElementById("lightboxMeta");

  const built = { simple: false, complex: false };
  let lastFocused = null;
  let currentIndex = 0;
  let activeList = simpleDesigns;

  const buildGrid = (container, list, labelPrefix, withMeta) => {
    const frag = document.createDocumentFragment();
    list.forEach((design, i) => {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "design-cell" + (withMeta ? " design-cell--meta" : "");
      cell.setAttribute(
        "aria-label",
        withMeta
          ? `View ${labelPrefix} ${i + 1} — ${design.weight}, ${design.price}`
          : `View ${labelPrefix} ${i + 1}`
      );

      const img = document.createElement("img");
      img.src = design.thumb;
      img.alt = `${labelPrefix} ${i + 1}`;
      img.loading = "lazy";
      img.decoding = "async";
      const markLoaded = () => cell.classList.add("is-loaded");
      if (img.complete) markLoaded();
      else {
        img.addEventListener("load", markLoaded, { once: true });
        img.addEventListener("error", markLoaded, { once: true });
      }
      cell.appendChild(img);

      if (withMeta) {
        const cap = document.createElement("span");
        cap.className = "design-cell__cap";
        cap.innerHTML =
          `<span class="design-cell__wt">${design.weight}</span>` +
          `<span class="design-cell__pr">${design.price}</span>`;
        cell.appendChild(cap);
      }

      cell.addEventListener("click", () => openLightbox(list, i));
      frag.appendChild(cell);
    });
    container.appendChild(frag);
  };

  const ensureGrid = (name) => {
    if (name === "simple" && !built.simple) {
      buildGrid(designsGrid, simpleDesigns, "cake design", false);
      built.simple = true;
    }
    if (name === "complex" && !built.complex && designsComplex) {
      buildGrid(designsComplex, complexDesigns, "custom cake", true);
      built.complex = true;
    }
  };

  const setTab = (name) => {
    tabs.forEach((t) => {
      const active = t.dataset.tab === name;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    });
    const showSimple = name === "simple";
    designsGrid.hidden = !showSimple;
    if (designsComplex) designsComplex.hidden = showSimple;
    if (noteSimple) noteSimple.hidden = !showSimple;
    if (noteComplex) noteComplex.hidden = showSimple;
    ensureGrid(name);
  };

  const openModal = () => {
    lastFocused = document.activeElement;
    setTab("simple");
    designsModal.classList.add("is-open");
    designsModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const closeBtn = designsModal.querySelector(".designs__close");
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    designsModal.classList.remove("is-open");
    designsModal.setAttribute("aria-hidden", "true");
    if (!lightbox || !lightbox.classList.contains("is-open")) {
      document.body.classList.remove("modal-open");
    }
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  };

  openBtns.forEach((b) => b.addEventListener("click", openModal));
  closeEls.forEach((el) => el.addEventListener("click", closeModal));
  tabs.forEach((t) => t.addEventListener("click", () => setTab(t.dataset.tab)));

  // ----- Lightbox -----
  const showImage = (i) => {
    currentIndex = (i + activeList.length) % activeList.length;
    const d = activeList[currentIndex];
    lightboxImg.classList.remove("is-loaded");
    lightboxImg.src = d.full;
    lightboxImg.alt = `Cake design ${currentIndex + 1}`;
    if (lightboxImg.complete) lightboxImg.classList.add("is-loaded");
    if (lightboxCount)
      lightboxCount.textContent = `${currentIndex + 1} / ${activeList.length}`;
    if (lightboxMeta) {
      if (d.weight || d.price) {
        lightboxMeta.hidden = false;
        lightboxMeta.innerHTML =
          `<span class="lightbox__wt">${d.weight}</span>` +
          `<span class="lightbox__pr">${d.price}</span>`;
      } else {
        lightboxMeta.hidden = true;
        lightboxMeta.innerHTML = "";
      }
    }
  };

  function openLightbox(list, i) {
    if (!lightbox) return;
    activeList = list;
    showImage(i);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    if (!designsModal.classList.contains("is-open")) {
      document.body.classList.remove("modal-open");
    }
  };

  if (lightbox) {
    lightboxImg.addEventListener("load", () =>
      lightboxImg.classList.add("is-loaded")
    );
    lightbox
      .querySelector("[data-close-lightbox]")
      .addEventListener("click", closeLightbox);
    lightbox
      .querySelector("[data-lightbox-prev]")
      .addEventListener("click", () => showImage(currentIndex - 1));
    lightbox
      .querySelector("[data-lightbox-next]")
      .addEventListener("click", () => showImage(currentIndex + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Touch swipe
    let touchX = null;
    lightbox.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.changedTouches[0].clientX;
      },
      { passive: true }
    );
    lightbox.addEventListener(
      "touchend",
      (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 45) showImage(currentIndex + (dx < 0 ? 1 : -1));
        touchX = null;
      },
      { passive: true }
    );
  }

  // ----- Keyboard -----
  document.addEventListener("keydown", (e) => {
    if (lightbox && lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      else if (e.key === "ArrowRight") showImage(currentIndex + 1);
      return;
    }
    if (designsModal.classList.contains("is-open") && e.key === "Escape") {
      closeModal();
    }
  });
}

// ===== Order form -> prefilled WhatsApp message =====
const orderForm = document.getElementById("orderForm");
const orderSent = document.getElementById("orderSent");
const orderRetry = document.getElementById("orderRetry");
const WA_NUMBER = "919174080087";

if (orderForm) {
  const buildMessage = (data) => {
    const lines = ["Hi Kakes by Khushi! I'd like to place an order 🎂", ""];
    const add = (label, value) => {
      if (value) lines.push(`${label}: ${value}`);
    };
    add("Name", data.name);
    add("Item", data.item);
    add("Flavour", data.flavour);
    add("Size", data.size);
    add("Needed by", data.date);
    add("Delivery area", data.area);
    add("Notes", data.notes);
    return lines.join("\n");
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  let lastUrl = "";

  const openWhatsApp = () => {
    if (lastUrl) window.open(lastUrl, "_blank", "noopener");
  };

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!orderForm.reportValidity()) return;

    const f = orderForm.elements;
    const data = {
      name: f["name"].value.trim(),
      item: f["item"].value,
      flavour: f["flavour"].value.trim(),
      size: f["size"].value,
      date: formatDate(f["date"].value),
      area: f["area"].value,
      notes: f["notes"].value.trim(),
    };

    const text = buildMessage(data);
    lastUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    openWhatsApp();

    orderForm.hidden = true;
    if (orderSent) {
      orderSent.hidden = false;
      orderSent.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  if (orderRetry) {
    orderRetry.addEventListener("click", (e) => {
      e.preventDefault();
      openWhatsApp();
    });
  }
}

// Recompute heights of any open tiles when the layout width changes
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    flipTiles.forEach((tile) => {
      if (!tile.classList.contains("flipped")) {
        tile.style.height = "";
        tile.dataset.baseH = String(tileBaseHeight(tile));
      } else {
        sizeTile(tile);
      }
    });
  }, 150);
});
