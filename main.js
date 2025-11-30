// Minimal vanilla slider for testimonials and navbar scroll effect
document.addEventListener('DOMContentLoaded', function () {
  // Simple slider
  const slider = document.querySelector('.testimonials-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.slide'));
    let idx = 0;

    // wrap slides in track for transform
    slider.style.position = 'relative';
    slider.style.overflow = 'hidden';
    const track = document.createElement('div');
    track.className = 'slider-track';
    track.style.display = 'flex';
    track.style.transition = 'transform 0.45s ease';
    track.style.width = `${slides.length * 100}%`;

    slides.forEach(sl => {
      sl.style.flex = '0 0 100%';
      sl.style.maxWidth = '100%';
      track.appendChild(sl);
    });
    slider.appendChild(track);

    // Arrows
    const prev = document.createElement('button');
    const next = document.createElement('button');
    prev.className = 'slider-prev'; prev.innerHTML = '&#10094;';
    next.className = 'slider-next'; next.innerHTML = '&#10095;';
    slider.appendChild(prev); slider.appendChild(next);

    function show(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * (100 / slides.length)}%)`;
    }

    prev.addEventListener('click', () => show(idx - 1));
    next.addEventListener('click', () => show(idx + 1));

    // show first
    show(0);
  }

  // Navbar scroll effect
  const navbar = document.getElementById('mainNavbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
    });
  }
});
