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

// ===== Premium cursor (desktop, pointer-fine only) =====
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (finePointer && !reduceMotion) {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (dot && ring) {
    document.body.classList.add("cursor-ready");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });

    const render = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    document.querySelectorAll("a, button, .pill, .cakecard").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });

    const art = document.querySelector(".hero__art");
    if (art) {
      art.addEventListener("mouseenter", () => ring.classList.add("is-view"));
      art.addEventListener("mouseleave", () => ring.classList.remove("is-view"));
    }

    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
  }
}

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
