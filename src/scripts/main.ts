/* ============================================================================
   Portfolio runtime — one bundled module.
   Lenis smooth scroll + GSAP ScrollTrigger reveals, counters, skill bars,
   a custom cursor, a hero "data-flow" constellation, the role rotator,
   nav state, scroll progress and magnetic buttons.
   ============================================================================ */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarse = window.matchMedia("(pointer: coarse)").matches;

/* ------------------------------------------------------------------ Lenis */
const lenis = new Lenis({
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.6,
});

lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Anchor links -> Lenis
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
    }
  });
});

/* -------------------------------------------------- Reveal-on-scroll system */
function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
  items.forEach((el) => {
    const delay = parseFloat(el.dataset.delay || "0");
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true,
      },
    });
  });

  // Staggered groups
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
    const kids = Array.from(group.querySelectorAll<HTMLElement>("[data-stagger-item]"));
    gsap.from(kids, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: "top 85%", once: true },
    });
  });

  // Parallax floaters
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.2");
    gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
}

/* ------------------------------------------------------- Animated counters */
function initCounters() {
  gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
    const target = parseFloat(el.dataset.counter || "0");
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString("en-US");
          },
        });
      },
    });
  });
}

/* --------------------------------------------------------- Skill bar fill */
function initSkills() {
  gsap.utils.toArray<HTMLElement>(".skill-fill").forEach((bar) => {
    const level = parseFloat(bar.dataset.level || "0");
    gsap.fromTo(
      bar,
      { width: "0%" },
      {
        width: `${level}%`,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: bar, start: "top 90%", once: true },
      }
    );
  });
}

/* ----------------------------------------------------------- Custom cursor */
function initCursor() {
  if (coarse) return;
  const dot = document.querySelector<HTMLElement>(".cursor-dot");
  const ring = document.querySelector<HTMLElement>(".cursor-ring");
  if (!dot || !ring) return;

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const ringPos = { ...pos };
  let raf = 0;

  const render = () => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    dot.style.transform = `translate(${pos.x - 3.5}px, ${pos.y - 3.5}px)`;
    ring.style.transform = `translate(${ringPos.x - 19}px, ${ringPos.y - 19}px)`;
    raf = requestAnimationFrame(render);
  };
  render();

  window.addEventListener("pointermove", (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
  });

  const interactive = "a, button, [data-cursor], input, textarea, .card-hover";
  document.addEventListener("pointerover", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) ring.classList.add("is-active");
  });
  document.addEventListener("pointerout", (e) => {
    const t = e.target as HTMLElement;
    if (t.closest(interactive)) ring.classList.remove("is-active");
  });

  // Auto-hide when leaving window
  document.addEventListener("pointerleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("pointerenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
}

/* --------------------------------------------------- Magnetic buttons */
function initMagnetic() {
  if (coarse) return;
  gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
    const strength = 0.4;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* --------------------------------------------------- 3D tilt + glare */
function initCardFX() {
  if (coarse || reduced) return;
  gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((card) => {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "power3.out" });

    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      ry((nx - 0.5) * 7);
      rx(-(ny - 0.5) * 7);
      yTo(-3);
      // glare position for the CSS ::after layer
      card.style.setProperty("--mx", `${nx * 100}%`);
      card.style.setProperty("--my", `${ny * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      rx(0);
      ry(0);
      yTo(0);
    });
  });
}

/* ------------------------------------- Experience timeline line draw */
function initTimeline() {
  const line = document.querySelector<HTMLElement>("[data-timeline]");
  if (!line) return;
  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      transformOrigin: "top center",
      scrollTrigger: {
        trigger: line.parentElement,
        start: "top 75%",
        end: "bottom 55%",
        scrub: 0.6,
      },
    }
  );
}

/* ------------------------------------------------------ Role rotator */
function initRoleRotator() {
  const el = document.querySelector<HTMLElement>("[data-role]");
  if (!el) return;
  const roles = JSON.parse(el.dataset.roles || "[]") as string[];
  if (!roles.length) return;

  let i = 0;
  let current = roles[0];
  el.textContent = current;

  const tick = () => {
    i = (i + 1) % roles.length;
    const next = roles[i];
    // Delete
    let deleting = current.length;
    const del = () => {
      deleting--;
      el.textContent = current.slice(0, deleting);
      if (deleting > 0) {
        setTimeout(del, 35);
      } else {
        type(next);
      }
    };
    const type = (word: string) => {
      let building = 0;
      const add = () => {
        building++;
        el.textContent = word.slice(0, building);
        if (building < word.length) {
          setTimeout(add, 60);
        } else {
          current = word;
        }
      };
      add();
    };
    del();
  };
  setInterval(tick, 2600);
}

/* ------------------------------------------------ Nav: state + progress */
function initNav() {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const progress = document.querySelector<HTMLElement>(".scroll-progress");
  const links = gsap.utils.toArray<HTMLAnchorElement>("[data-nav-link]");
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href") || ""))
    .filter(Boolean) as HTMLElement[];

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 24);

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? y / h : 0;
      progress.style.transform = `scaleX(${p})`;
    }
  };
  lenis.on("scroll", onScroll);
  onScroll();

  // Active link via ScrollTrigger
  sections.forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec,
      start: "top 50%",
      end: "bottom 50%",
      onToggle: (self) => {
        if (self.isActive) {
          links.forEach((l) => l.classList.remove("is-active"));
          const active = document.querySelector(`[data-nav-link][href="#${sec.id}"]`);
          active?.classList.add("is-active");
        }
      },
    });
  });

  // Mobile menu
  const toggle = document.querySelector<HTMLElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  toggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  menu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    })
  );
}

/* ------------------------- Hero "data-flow" constellation (canvas) */
function initConstellation() {
  const canvas = document.querySelector<HTMLCanvasElement>("[data-constellation]");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduce = reduced ? 0.35 : 1;
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let raf = 0;
  const mouse = { x: -9999, y: -9999 };

  type Node = { x: number; y: number; vx: number; vy: number; r: number };
  let nodes: Node[] = [];

  const COLORS = ["#22d3ee", "#2dd4bf", "#8b5cf6", "#38bdf8"];

  const resize = () => {
    const parent = canvas.parentElement!;
    w = parent.clientWidth;
    h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(72, Math.floor((w * h) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
    }));
  };
  resize();
  window.addEventListener("resize", resize);

  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  };
  window.addEventListener("pointermove", onMove);

  const LINK = 130;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);

    for (const n of nodes) {
      // gentle attraction toward cursor
      const dxm = mouse.x - n.x;
      const dym = mouse.y - n.y;
      const dm = Math.hypot(dxm, dym);
      if (dm < 160) {
        n.vx += (dxm / dm) * 0.02 * reduce;
        n.vy += (dym / dm) * 0.02 * reduce;
      }
      n.vx *= 0.992;
      n.vy *= 0.992;
      n.x += n.vx * reduce;
      n.y += n.vy * reduce;

      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      n.x = Math.max(0, Math.min(w, n.x));
      n.y = Math.max(0, Math.min(h, n.y));
    }

    // links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < LINK) {
          const op = (1 - d / LINK) * 0.5;
          ctx.strokeStyle = `rgba(56, 189, 248, ${op * reduce})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const c = COLORS[i % COLORS.length];
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.globalAlpha = 0.85 * reduce;
      ctx.fill();
      ctx.globalAlpha = 0.18 * reduce;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    raf = requestAnimationFrame(draw);
  };
  draw();

  // pause when offscreen
  const hero = canvas.closest("section");
  if (hero) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!raf) draw();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(hero);
  }
}

/* ------------------------------------------------------------- Boot */
function boot() {
  document.documentElement.classList.remove("no-js");
  initReveals();
  initCounters();
  initSkills();
  initCursor();
  initMagnetic();
  initCardFX();
  initTimeline();
  initRoleRotator();
  initNav();
  initConstellation();
  // Make sure triggers compute correct positions after layout/fonts
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
