/**
 * Federico Humada Portfolio - Main JavaScript
 * Handles navigation, interactive filters, mobile menu, clipboard, theme, and GitHub sync.
 */

import { initGitHubSync } from './github.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProjectFilters();
  initThemeToggle();
  initClipboard();
  initGitHubSync();
});

/* ==========================================================================
   Navigation & Header
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky header blur effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  mobileToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Close mobile drawer when clicking a link
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
    });
  });

  // Scrollspy: highlight active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   Theme Toggle (Dark / Light)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.querySelector('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('portfolio_theme') || 'dark';

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  themeBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('portfolio_theme', nextTheme);
    updateThemeIcon(nextTheme);
  });
}

function updateThemeIcon(theme) {
  const themeBtn = document.querySelector('.theme-toggle-btn');
  if (!themeBtn) return;
  if (theme === 'light') {
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Cambiar a modo oscuro');
  } else {
    themeBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
    themeBtn.setAttribute('title', 'Cambiar a modo claro');
  }
}

/* ==========================================================================
   Clipboard Utility
   ========================================================================== */
function initClipboard() {
  const copyBtn = document.getElementById('copy-email-btn');
  const feedback = document.getElementById('copy-feedback');

  copyBtn?.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || 'fedehda.dev@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      if (feedback) {
        feedback.textContent = '✓ ¡Correo copiado al portapapeles!';
        setTimeout(() => {
          feedback.textContent = '';
        }, 3000);
      }
    } catch {
      if (feedback) {
        feedback.textContent = 'Email: ' + email;
      }
    }
  });
}
