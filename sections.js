// Smooth scrolling for navbar links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle if it's an anchor link
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (targetSection) {
          // Close navbar if open
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            toggler.click();
          }
          
          // Smooth scroll to target
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Highlight active nav link
          navLinks.forEach(link => link.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Animate cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.solution-card, .partner-card, .revenue-card, .pricing-card, .advantage-card, .customer-card, .problem-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });

  // Timeline interactivity: clickable steps and status sync
  const timelineSteps = document.querySelectorAll('.timeline-step');
  const statusItems = document.querySelectorAll('.timeline-status .list-group-item');
  const progressBar = document.querySelector('.timeline-progress-bar');

  function setActiveStep(stepIndex) {
    timelineSteps.forEach((s, i) => {
      const circle = s.querySelector('.step-circle');
      if (i === stepIndex) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });

    statusItems.forEach((item, i) => {
      if (i === stepIndex) item.classList.add('active'); else item.classList.remove('active');
    });

    // update progress (percentage 0-100)
    const pct = ((stepIndex) / (timelineSteps.length - 1)) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
  }

  timelineSteps.forEach((step, idx) => {
    step.addEventListener('click', () => setActiveStep(idx));
  });

  statusItems.forEach((item, idx) => {
    item.addEventListener('click', () => setActiveStep(idx));
  });

  // initialize progress according to initially active item
  (function initTimeline() {
    let activeIdx = 0;
    statusItems.forEach((it, i) => { if (it.classList.contains('active')) activeIdx = i; });
    setActiveStep(activeIdx);
  })();

  // Navbar toggler (vanilla implementation replacing Bootstrap collapse)
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function () {
      navbarCollapse.classList.toggle('show');
    });
  }

  // Simple accordion/collapse behavior for elements using Bootstrap data attributes
  const accordionButtons = document.querySelectorAll('[data-bs-toggle="collapse"]');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const targetSelector = btn.getAttribute('data-bs-target');
      if (!targetSelector) return;
      const target = document.querySelector(targetSelector);
      if (!target) return;

      // If part of an accordion (has data-bs-parent), close siblings
      const parentSelector = target.getAttribute('data-bs-parent') || btn.closest('.accordion')?.getAttribute('id');
      if (parentSelector) {
        // close all collapse children of the parent accordion
        const parent = document.querySelector(parentSelector.startsWith('#') ? parentSelector : `#${parentSelector}`);
        if (parent) {
          const siblings = parent.querySelectorAll('.accordion-collapse');
          siblings.forEach(sib => {
            if (sib !== target) {
              sib.classList.remove('show');
            }
          });
        }
      }

      // Toggle target
      target.classList.toggle('show');
    });
  });
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .navbar-nav a.nav-link.active {
    background: rgba(255, 255, 255, 0.2) !important;
    border-radius: 50rem;
  }

  .navbar-nav a.nav-link {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);
