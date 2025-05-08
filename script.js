document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selection ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('#mainNav .nav-list a[href^="#"]');
    const goTopBtn = document.getElementById('goTopBtn');
    const footerYearSpan = document.getElementById('footer-year');
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const sections = document.querySelectorAll('main section[id]');

    // --- Mobile Menu Toggle ---
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // document.body.classList.add('no-scroll'); // Optional
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // document.body.classList.remove('no-scroll'); // Optional
            }
        });
    }

    // --- Smooth Scroll & Close Mobile Menu on Link Click ---
    if (navLinks.length > 0 && mainNav) {
        navLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = mainNav.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 15; // Adjusted offset

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }

                if (navList && navList.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navList.classList.remove('active');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    // document.body.classList.remove('no-scroll'); // Optional
                }
            });
        });
    }

    // --- Close Mobile Menu on Click Outside ---
    if (menuToggle && navList && mainNav) {
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && navList.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // document.body.classList.remove('no-scroll'); // Optional
            }
        });
    }

    // --- Active Navigation Link Highlighting on Scroll ---
    const activateNavLink = () => {
        if (!mainNav || sections.length === 0 || navLinks.length === 0) return;

        let currentSectionId = '';
        const scrollPosition = window.pageYOffset;
        const navHeight = mainNav.offsetHeight;
        const offsetThreshold = navHeight + 60;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offsetThreshold;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = sectionId;
            }
        });

         if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50 && sections.length > 0) {
             const lastSection = sections[sections.length - 1];
             if (lastSection) {
                currentSectionId = lastSection.getAttribute('id');
             }
         }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    };

    if (sections.length > 0) {
        window.addEventListener('scroll', activateNavLink);
        activateNavLink(); // Initial check
    }

    // --- Go Top Button Logic ---
    if (goTopBtn) {
        const showGoTopButton = () => {
            const triggerHeight = window.innerHeight * 0.6;
            if (window.pageYOffset > triggerHeight) {
                goTopBtn.classList.add('show');
            } else {
                goTopBtn.classList.remove('show');
            }
        };

        window.addEventListener('scroll', showGoTopButton);
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        showGoTopButton(); // Initial check
    }

    // --- Scroll Animations using Intersection Observer ---
    if ('IntersectionObserver' in window && elementsToAnimate.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        elementsToAnimate.forEach(el => observer.observe(el));
    } else {
        elementsToAnimate.forEach(el => el.classList.add('animated'));
    }

    // --- Update Footer Year ---
    if (footerYearSpan) {
        footerYearSpan.textContent = new Date().getFullYear();
    }

    console.log("Ravi Ranjan Portfolio Script Loaded Successfully.");
});