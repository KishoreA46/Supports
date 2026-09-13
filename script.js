/**
 * WidgetPDF Privacy Policy - Interactive Features & Mobile Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Theme Management (Persist in LocalStorage)
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('widgetpdf_policy_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', next);
      localStorage.setItem('widgetpdf_policy_theme', next);
      showToast(`Switched to ${next} mode`);
    });
  });
  });

  // Real-time Policy Search
  const searchInput = document.getElementById('policySearch');
  const policyCards = document.querySelectorAll('.policy-card');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      policyCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Highlight TOC links corresponding to visible cards
      const tocLinks = document.querySelectorAll('.toc-link');
      tocLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const targetCard = document.getElementById(targetId);
        if (targetCard && targetCard.style.display === 'none') {
          link.style.opacity = '0.35';
        } else {
          link.style.opacity = '1';
        }
      });
    });
  }

  // IntersectionObserver for Table of Contents & Mobile Chips
  const observerOptions = {
    root: null,
    rootMargin: '-15% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update Desktop TOC
        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Update Mobile Chips
        document.querySelectorAll('.mobile-chip').forEach(c => c.classList.remove('active'));
        const activeChip = document.querySelector(`.mobile-chip[href="#${id}"]`);
        if (activeChip) {
          activeChip.classList.add('active');
          activeChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  }, observerOptions);

  policyCards.forEach(card => observer.observe(card));

  // Toast Notification Helper
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }
});
