// =========================
// DOM READY
// =========================
document.addEventListener("DOMContentLoaded", () => {
  preloader();
  mobileMenu();
  typeWriter();
  revealAnimations();
  skillBars();
  darkModeToggle();
  loadProjects();
  contactForm();
});

// =========================
// PRELOADER
// =========================
function preloader() {
  const preload = document.querySelector(".preloader");
  if (!preload) return;

  setTimeout(() => {
    preload.style.opacity = "0";
    setTimeout(() => preload.remove(), 400);
  }, 600);
}

// =========================
// MOBILE MENU
// =========================
function mobileMenu() {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav ul");
  if (!btn || !nav) return;
  btn.onclick = () => nav.classList.toggle("open");
}

// =========================
// TYPEWRITER EFFECT
// =========================
function typeWriter() {
  const el = document.querySelector(".typewriter");
  if (!el) return;

  const words = ["Front-End Developer", "Designer", "Engineer", "Problem Solver"];
  let i = 0, char = 0, remove = false;

  function loop() {
    const word = words[i];
    el.textContent = word.substring(0, char);

    if (!remove && char < word.length) char++;
    else if (remove && char > 0) char--;
    else {
      remove = !remove;
      if (!remove) i = (i + 1) % words.length;
    }
    setTimeout(loop, remove ? 50 : 90);
  }
  loop();
}

// =========================
// SCROLL REVEAL
// =========================
function revealAnimations() {
  const elements = document.querySelectorAll(".glass, .project-card, .hover-3d");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );
  elements.forEach(el => observer.observe(el));
}

// =========================
// ANIMATE SKILL BARS
// =========================
function skillBars() {
  const bars = document.querySelectorAll(".progress-bar");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.dataset.progress || 0;
        entry.target.style.width = value + "%";
      }
    });
  });
  bars.forEach(bar => observer.observe(bar));
}

// =========================
// DARK/LIGHT MODE
// =========================
function darkModeToggle() {
  const toggle = document.querySelector("#modeToggle");
  if (!toggle) return;
  toggle.onclick = () => document.body.classList.toggle("light-mode");
}

// =========================
// DYNAMIC PROJECTS
// =========================
function loadProjects() {
  const grid = document.querySelector("#projectGrid");
  if (!grid) return;

  const projects = [
    { title: "Dashboard UI", img: "assets/project1.svg", desc: "Admin analytics dashboard" },
    { title: "Landing Page", img: "assets/project2.svg", desc: "Modern animated landing" },
    { title: "E-Commerce", img: "assets/project3.svg", desc: "Complete shopping interface" },
    { title: "Portfolio UI", img: "assets/project4.svg", desc: "Creative personal portfolio" }
  ];

  grid.innerHTML = projects.map(p => `
    <div class="project-card glass hover-3d">
      <img src="${p.img}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <a href="#" class="btn outline">View</a>
    </div>
  `).join("");
}

// =========================
// CONTACT FORM (EmailJS)
// =========================
function contactForm() {
  const form = document.querySelector("#contact-form");
  if (!form || !window.emailjs) return;

  emailjs.init("YOUR_EMAILJS_USER_ID");

  form.addEventListener("submit", e => {
    e.preventDefault();
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form)
      .then(() => {
        showMessage("Message sent successfully!", true);
        form.reset();
      })
      .catch(err => {
        console.error(err);
        showMessage("Oops! Sending failed. Try again.", false);
      });
  });

  function showMessage(msg, success) {
    let messageBox = document.createElement("div");
    messageBox.textContent = msg;
    messageBox.style.position = "fixed";
    messageBox.style.top = "20px";
    messageBox.style.right = "20px";
    messageBox.style.padding = "15px 20px";
    messageBox.style.borderRadius = "12px";
    messageBox.style.background = success ? "rgba(0,234,255,0.9)" : "rgba(255,0,0,0.8)";
    messageBox.style.color = "#000";
    messageBox.style.fontWeight = "700";
    messageBox.style.zIndex = 9999;
    messageBox.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
    document.body.appendChild(messageBox);

    setTimeout(() => {
      messageBox.style.opacity = "0";
      setTimeout(() => messageBox.remove(), 400);
    }, 3000);
  }
}
