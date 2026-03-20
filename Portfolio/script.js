tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#00f2ff",
        "background-light": "#f5f6f8",
        "background-dark": "#101622",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
    },
  },
}

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = (show) => {
    if (show) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
      
      mobileMenu.classList.add('open');
      menuToggle.classList.add('active');
      document.body.classList.add('lock-scroll');
    } else {
      mobileMenu.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.classList.remove('lock-scroll');
      setTimeout(() => {
        document.documentElement.style.removeProperty('--scrollbar-width');
      }, 500);
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      toggleMenu(!isOpen);
    });
  }

  // Close menu when clicking backdrop
  const menuBackdrop = document.getElementById('menu-backdrop');
  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', () => toggleMenu(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Scroll Reveal Observer
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed for performance and "reveal once" behavior
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly negative margin for better visual timing
  });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // Professional Neon Arrow Cursor Logic
  const cursorContainer = document.getElementById('cursor-container');
  const cursorArrow = document.getElementById('cursor-arrow');
  const effectContainer = document.getElementById('click-effects');

  let mouseX = -100, mouseY = -100; // Position on screen
  let cursorX = -100, cursorY = -100; // Smoothed position

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const updateCursor = () => {
    // Smoother movement using linear interpolation (Optional, but 1:1 is often better for arrows)
    // For a premium feel, the arrow follows exactly, but has a slight tilt/swing if desired.
    cursorX = mouseX;
    cursorY = mouseY;

    if (cursorContainer) {
      // Offset by -4px to align the SVG's 4,4 tip with the mouse
      cursorContainer.style.transform = `translate3d(${cursorX - 5}px, ${cursorY - 5}px, 0)`;
    }

    requestAnimationFrame(updateCursor);
  };
  requestAnimationFrame(updateCursor);

  // Radiating Sparks Click Effect
  document.addEventListener('mousedown', () => {
    if (!effectContainer) return;
    
    // Create 6 sparks
    for (let i = 0; i < 6; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      spark.style.setProperty('--angle', `${i * 60}deg`);
      
      // Center spark on the arrow tip (5px from container edge)
      spark.style.left = '5px';
      spark.style.top = '5px';
      
      effectContainer.appendChild(spark);
      
      // Animate and remove
      spark.style.animation = 'radiate 0.5s ease-out forwards';
      setTimeout(() => spark.remove(), 500);
    }
    
    // Slight squish effect on arrow
    if (cursorArrow) cursorArrow.style.transform = 'scale(0.8)';
  });

  document.addEventListener('mouseup', () => {
    if (cursorArrow) cursorArrow.style.transform = '';
  });

  // Interaction Hover Logic
  const interactiveElements = document.querySelectorAll('a, button, .marquee-item, [role="button"]');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
  // Prevent click bubbling on portfolio project links (fixes mobile double-trigger)
  document.querySelectorAll('#work a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
});

