const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  const revealNodes = document.querySelectorAll(".reveal");
  revealNodes.forEach((node, index) => {
    node.style.setProperty("--delay", `${Math.min(index * 45, 360)}ms`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  revealNodes.forEach((node) => revealObserver.observe(node));
}

const counters = document.querySelectorAll("[data-counter]");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-counter"));
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      const suffix = target === 100 ? "%" : "+";
      counter.textContent = `${value}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(tick);
  });
}

const metrics = document.querySelector(".metrics");
if (metrics) {
  const metricsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.38 }
  );
  metricsObserver.observe(metrics);
}

if (!prefersReducedMotion) {
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
}
