// Portfolio interactivity (vanilla JS)
document.addEventListener('DOMContentLoaded', () => {
  // Typewriter effect
  const typewriterElement = document.getElementById('typewriter');
  let text = "je suis Fallou Tambedou Dev Full-Stack Web/Mobile";
  let index = 0;
  let htmlContent = '';

  function typeWriter() {
    if (index < text.length) {
      if (index === 8) { // After "je suis "
        htmlContent += '<span class="accent">';
      }
      if (index === 23) { // After "Fallou Tambedou "
        htmlContent += '</span><span class="small">';
      }
      htmlContent += text.charAt(index);
      typewriterElement.innerHTML = htmlContent;
      index++;
      setTimeout(typeWriter, 100); // Adjust speed here (100ms per letter)
    } else {
      // Close the small span
      htmlContent += '</span>';
      typewriterElement.innerHTML = htmlContent;
      // After typing, erase "Dev Full-Stack Web/Mobile" and retype "alias { bakh-code }"
      setTimeout(() => {
        htmlContent = 'je suis <span class="accent">Fallou Tambedou </span><span class="small">';
        typewriterElement.innerHTML = htmlContent;
        text = "alias {bakh-code}";
        index = 0;
        function retype() {
          if (index < text.length) {
            htmlContent += text.charAt(index);
            typewriterElement.innerHTML = htmlContent;
            index++;
            setTimeout(retype, 100);
          } else {
            htmlContent += '</span>';
            typewriterElement.innerHTML = htmlContent;
            // Add blinking cursor after retyping is done
            typewriterElement.classList.add('cursor');
          }
        }
        retype();
      }, 1000); // Wait 1 second before erasing and retyping
    }
  }

  // Start typewriter after a short delay
  setTimeout(typeWriter, 500);

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const icon = navToggle.querySelector('i');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Change icon based on menu state
    if (navLinks.classList.contains('open')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1 && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav after click
        if (window.innerWidth <= 900 && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          icon.className = 'fas fa-bars';
        }
      }
    });
  });

  // Back to top button
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) backTop.style.opacity = 1;
    else backTop.style.opacity = 0;
  });

  // Project modal logic
  // Project modal logic: data for each project and renderer
  const projects = {
    'LeppayBakh': {
      title: 'LeppayBakh — Système gestionnaire de tâche',
      image: 'image/gestion.png',
      description: 'Plateforme de gestion (clients, comptes, stock entre société) avec interface de diagramme. Rôle: lead dev. Fonctionnalités : gestion clients, comptes, stocks, rapports et authentification.',
      tech: ['HTML','CSS','JavaScript','PHP','MySQL'],
      github: '#',
      demo: '#',
      date: '2024'
    },
    'FastFood': {
     
      description: 'Application Android en Java. Menu dynamique, panier, gestion des commandes et suivi en temps réel. Rôle: développeur mobile.',
      tech: ['Android','Java','SQLite'],
      github: '#',
      demo: '#',
      date: '2023'
    },
    'vote': {
     
      description: 'Plateforme de vote sécurisé avec gestion des candidatures et tableaux de bord. Rôle: backend et intégration.',
      tech: ['HTML','CSS','JavaScript','PHP'],
      github: '#',
      demo: '#',
      date: '2022'
    },
    'legal-tech': {
      description: 'Solution Legal-Tech développée pour gérer services juridiques et suivi client. Rôle: full-stack; sécurisé et conteneurisé.',
      tech: ['HTML','CSS','JavaScript','PHP','Docker'],
      github: '#',
      demo: '#',
      date: '2024'
    }
  };

  function renderProjectContent(data, id){
    const techs = (data.tech || []).map(t => `<span>${t}</span>`).join('');
    const githubLink = data.github ? `<a class="btn ghost" href="${data.github}" target="_blank">Voir code</a>` : '';
    const demoLink = data.demo ? `<a class="btn" href="${data.demo}" target="_blank">Voir démo</a>` : '';

    return `
      <div class="meta">
        <h3>${data.title || id}</h3>
        <p>${data.description || 'Description à venir.'}</p>
        <div class="techs">${techs}</div>
        <div class="links">${githubLink} ${demoLink}</div>
        <p class="muted">Date : ${data.date || '—'}</p>
      </div>
    `;
  }

  window.openProject = function(e, id){
    e.preventDefault();
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('projectModalBody');
    const data = projects[id] || { title: id, description: 'Description à venir.', image: 'image/Digital.jpg', tech: [], github:'#', demo:'#' };
    body.innerHTML = renderProjectContent(data, id);
    modal.setAttribute('aria-hidden', 'false');
    // move focus to close button for accessibility
    const closeBtn = document.getElementById('modalClose');
    if (closeBtn) closeBtn.focus();
  };

  document.getElementById('modalClose').addEventListener('click', ()=> {
    document.getElementById('projectModal').setAttribute('aria-hidden', 'true');
  });

  // Close modal by clicking outside content
  document.getElementById('projectModal').addEventListener('click', (ev) => {
    if (ev.target.id === 'projectModal') document.getElementById('projectModal').setAttribute('aria-hidden', 'true');
  });

  // Scroll-triggered animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('animate-fade-in');
    observer.observe(section);
  });

  // Observe specific elements for slide-up effect
  const slideUpElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item');
  slideUpElements.forEach(el => {
    el.classList.add('animate-slide-up');
    observer.observe(el);
  });



});

// Contact form handler with AJAX
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  if (!name || !email || !message) {
    formMessage.innerHTML = '<p class="error">Veuillez remplir tous les champs.</p>';
    return;
  }

  // Clear previous messages
  formMessage.innerHTML = '';

  // Prepare form data
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);
  formData.append('message', message);

  // Send AJAX request
  fetch('contact.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      formMessage.innerHTML = '<p class="success">' + data.message + '</p>';
      // Clear form fields
      document.getElementById('contactForm').reset();
    } else {
      formMessage.innerHTML = '<p class="error">' + data.message + '</p>';
    }
  })
  .catch(error => {
    formMessage.innerHTML = '<p class="error">Erreur lors de l\'envoi du message. Veuillez réessayer.</p>';
    console.error('Error:', error);
  });
});
