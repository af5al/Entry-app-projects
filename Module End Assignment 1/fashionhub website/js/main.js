// Select elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile navigation
mobileMenuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("active");

  // Update accessibility attribute
  mobileMenuBtn.setAttribute("aria-expanded", isOpen);

  // Toggle hamburger animation
  mobileMenuBtn.classList.toggle("open", isOpen);
});

// Close menu when clicking a navigation link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedToggle = mobileMenuBtn.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
  }
});
