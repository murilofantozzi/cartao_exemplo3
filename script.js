// FAQ Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });

  // Email form submission
  const emailInput = document.getElementById("emailInput");
  const submitButton = document.querySelector(".cta-form .btn");

  if (submitButton) {
    submitButton.addEventListener("click", function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (email === "") {
        alert("Por favor, insira um email válido");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Por favor, insira um email válido");
        return;
      }

      // Simulate form submission
      console.log("Email enviado:", email);
      alert("Obrigado! Entraremos em contato em breve.");
      emailInput.value = "";
    });
  }

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // CTA Buttons
  const ctaButtons = document.querySelectorAll(".btn-primary, .btn-secondary");
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const text = this.textContent.trim();
      if (text === "Começar Agora" || text === "Simular Agora") {
        const ctaSection = document.querySelector(".cta");
        if (ctaSection) {
          ctaSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Add animation on scroll
  observeElements();
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Intersection Observer for animations
function observeElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe cards and sections
  const cards = document.querySelectorAll(
    ".step-card, .benefit-card, .example-card, .testimonial-card, .faq-item"
  );

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  }
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
  console.log(`Event: ${eventName}`, eventData);
  // Here you would send data to your analytics service
}

// Track button clicks
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    const buttonText = e.target.textContent.trim();
    trackEvent("button_click", { button: buttonText });
  }
});

// Track FAQ interactions
document.addEventListener("click", function (e) {
  if (e.target.closest(".faq-question")) {
    const question = e.target
      .closest(".faq-item")
      .querySelector("h3").textContent;
    trackEvent("faq_toggle", { question: question });
  }
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "none";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
