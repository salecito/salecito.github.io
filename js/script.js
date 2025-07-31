document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
          const animationClass = el.dataset.animate;

          if (entry.isIntersecting) {
            // Lazy load from template (if applicable)
            const templateId = el.dataset.src;
            if (templateId && !el.dataset.loaded) {
              const template = document.querySelector(templateId);
              if (template) {
                el.innerHTML = template.innerHTML;
                el.dataset.loaded = "true";
              }
            }

            el.classList.add(animationClass);
            el.classList.remove('scroll-animate');

            // Animate once unless marked with .rerun
            if (!el.classList.contains('rerun')) {
              observer.unobserve(el);
            }
          } else {
            // Only reset if rerun is allowed
            if (el.classList.contains('rerun')) {
              el.classList.remove(animationClass);
              el.classList.add('scroll-animate');
            }
          }
        });
      }, {
        threshold: 0.000001,
        rootMargin: '0px 0px -10% 0px'
      });

      document.querySelectorAll('.scroll-animate[data-animate]').forEach(el => {
        observer.observe(el);
      });
    });