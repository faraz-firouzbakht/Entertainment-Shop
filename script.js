// Mobile menu toggle and accessibility helpers
(function(){
  function onReady(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  onReady(function(){
    var menuBtn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    var closeBtn = document.getElementById('mobile-menu-close');
    var menuIcon = document.getElementById('mobile-menu-icon');

    if (!menuBtn || !menu) return;

    function openMenu(){
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      document.documentElement.classList.add('overflow-hidden');
      // Prevent body scroll on mobile
      document.body.style.overflow = 'hidden';
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');
      if (menuIcon) menuIcon.className = 'fas fa-times';
      // Focus the first link for accessibility
      var first = menu.querySelector('a, button');
      if (first) first.focus();
    }

    function closeMenu(){
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      document.documentElement.classList.remove('overflow-hidden');
      document.body.style.overflow = '';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
      if (menuIcon) menuIcon.className = 'fas fa-bars';
      menuBtn.focus();
    }

    menuBtn.addEventListener('click', function(e){
      e.preventDefault();
      if (menu.classList.contains('hidden')) openMenu(); else closeMenu();
    });

    closeBtn && closeBtn.addEventListener('click', function(e){ e.preventDefault(); closeMenu(); });

    // Close when clicking on overlay (outside the inner content)
    menu.addEventListener('click', function(e){ if (e.target === menu) closeMenu(); });

    // Close on escape
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !menu.classList.contains('hidden')) closeMenu(); });

    // Close when clicking a link inside the mobile menu (so navigation hides the menu)
    menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ closeMenu(); }); });
  });
})();
