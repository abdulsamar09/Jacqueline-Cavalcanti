// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Lenis for Smooth Inertia Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0, 0);

// ---- MENU OVERLAY ----
const menuTrigger = document.getElementById('menuTrigger');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose   = document.getElementById('menuClose');
const menuLinks   = document.querySelectorAll('[data-menu-link]');

function openMenu() {
    menuOverlay.classList.add('open');
    lenis.stop();
}

function closeMenu() {
    menuOverlay.classList.remove('open');
    lenis.start();
}

menuTrigger?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));



document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Custom Cursor
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .luxury-card, .reel-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-active'));
    });

    // 3. Scroll Progress Bar
    gsap.to('.scroll-progress', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
        }
    });

    // 4. Navbar Scroll Effect
    const nav = document.querySelector('.premium-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 5. Hero Intro Load Animation with MatchMedia
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        const heroTl = gsap.timeline();
        heroTl.from('.premium-nav', { y: -100, opacity: 0, duration: 1.5, ease: "power3.out" })
              .to('.hero-video', { scale: 1, duration: 2, ease: "power3.out" }, "-=1")
              .fromTo('.title-inner', { y: '110%' }, { y: '0%', duration: 1, stagger: 0.1, ease: "power4.out" }, "-=1.5")
              .fromTo('.subtitle-word', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5")
              .fromTo('.subtitle-dot', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.8")
              .fromTo('.hero-tagline', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
              .fromTo('.hero-buttons', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
              .fromTo('.hero-fighter-image', { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "-=1");
    });

    mm.add("(max-width: 768px)", () => {
        const heroTl = gsap.timeline();
        heroTl.from('.premium-nav', { y: -50, opacity: 0, duration: 1, ease: "power3.out" })
              .to('.hero-video', { scale: 1, duration: 2, ease: "power3.out" }, "-=1")
              .fromTo('.title-inner', { y: '110%' }, { y: '0%', duration: 1, stagger: 0.1, ease: "power4.out" }, "-=1.5")
              .fromTo('.subtitle-word', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.5")
              .fromTo('.hero-buttons', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
              .fromTo('.hero-fighter-image', { y: 100, opacity: 0 }, { y: 0, opacity: 0.5, duration: 1.5, ease: "power3.out" }, "-=1.2");
    });

    // Parallax Hero Fighter on scroll + Zoom In
    gsap.to('.hero-fighter-image', {
        y: 80,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Scroll Zoom-In on fighter image
    gsap.to('.fighter-cutout', {
        scale: 1.18,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    // 6. Section 2: Story Animations
    gsap.fromTo('.story-img', 
        { y: -50, scale: 1.1 },
        { 
            y: 50, scale: 1,
            ease: "none",
            scrollTrigger: {
                trigger: '.vertical-image-wrapper',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        }
    );

    gsap.from('.stat-card', {
        x: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.stat-cards',
            start: 'top 80%'
        }
    });

    gsap.from('.massive-text', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '.story-content',
            start: 'top 80%'
        }
    });

    gsap.to('.animated-divider', {
        width: '100px',
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.story-content',
            start: 'top 70%'
        }
    });

    // 7. Section 3: Pinned Horizontal Gallery
    const gallerySection = document.querySelector('.gallery-pinned-section');
    const galleryTrack = document.querySelector('.gallery-horizontal-track');
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryBgs = document.querySelectorAll('.gallery-bg-item');
    const progressInner = document.querySelector('.progress-inner');

    if (gallerySection && galleryTrack) {
        // Calculate the amount to scroll horizontally
        // We want the last slide to be fully visible at the end of the scroll
        const getScrollAmount = () => {
            let trackWidth = galleryTrack.scrollWidth;
            return -(trackWidth - window.innerWidth); 
        };

        const galleryTl = gsap.timeline({
            scrollTrigger: {
                trigger: gallerySection,
                start: "top top",
                end: "bottom bottom",
                scrub: 3,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Update progress bar
                    gsap.to(progressInner, { width: `${self.progress * 100}%`, duration: 0.1 });
                    
                    // Dynamic Background & Slide Active State
                    const slideCount = gallerySlides.length;
                    // Map progress (0-1) to slide index
                    let activeIndex = Math.floor(self.progress * slideCount * 0.99); // 0.99 to avoid out of bounds at 1.0
                    
                    if (activeIndex >= 0 && activeIndex < slideCount) {
                        galleryBgs.forEach((bg, i) => {
                            if (i === activeIndex) bg.classList.add('active');
                            else bg.classList.remove('active');
                        });
                        
                        gallerySlides.forEach((slide, i) => {
                            if (i === activeIndex) slide.classList.add('active');
                            else slide.classList.remove('active');
                        });
                    }
                }
            }
        });

        galleryTl.to(galleryTrack, {
            x: getScrollAmount,
            ease: "none"
        });

        // Add title parallax
        galleryTl.to('.gallery-title-layer', {
            y: -50,
            opacity: 0.5,
            ease: "none"
        }, 0);
    }

    // 8. Section 4: Cinematic Video Scale Mask
    gsap.fromTo('.cinematic-video-wrapper',
        { scale: 0.7, borderRadius: '40px' },
        { 
            scale: 1, borderRadius: '8px',
            scrollTrigger: {
                trigger: '.video-showcase',
                start: 'top bottom',
                end: 'center center',
                scrub: true
            }
        }
    );

    gsap.fromTo('.animated-quote',
        { y: 50, opacity: 0, scale: 0.9 },
        { 
            y: 0, opacity: 1, scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.quote-container',
                start: 'top 90%'
            }
        }
    );

    // 9. Section 5: Sponsors
    gsap.from('.luxury-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
            trigger: '.sponsors-track',
            start: 'top 85%'
        }
    });

    // 10. Section 6: Live Feed Container
    gsap.from('.live-feed-container', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.social-section',
            start: 'top 80%'
        }
    });

    // 10. Section 6: Mission Orbital Collage
    gsap.set('.orbit-item', { opacity: 1, scale: 1 }); // Ensure visibility first
    
    gsap.from('.orbit-center', {
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
            trigger: '.mission-collage-section',
            start: 'top 70%'
        }
    });

    gsap.from('.orbit-item', {
        opacity: 0,
        scale: 0,
        stagger: 0.08,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
            trigger: '.collage-orbit-container',
            start: 'top 65%'
        }
    });

    // Subtle Floating Effect for Orbit Items (Animated on inner to preserve orbit position)
    const orbitInners = document.querySelectorAll('.orbit-item .item-inner');
    orbitInners.forEach((inner, i) => {
        gsap.to(inner, {
            y: "+=15",
            x: "+=8",
            rotation: i % 2 === 0 ? 3 : -3,
            duration: 3 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });

    // Orbit Media Modal Logic
    const orbitModal = document.getElementById('orbitModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    document.querySelectorAll('.orbit-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            modalBody.innerHTML = ''; // Clear previous

            if (type === 'image') {
                const src = item.getAttribute('data-src');
                modalBody.innerHTML = `<img src="${src}" alt="Showcase">`;
            } else if (type === 'video') {
                const videoId = item.getAttribute('data-id');
                modalBody.innerHTML = `<iframe src="https://player.vimeo.com/video/${videoId}?autoplay=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
            }

            orbitModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    const closeModal = () => {
        orbitModal.classList.remove('active');
        modalBody.innerHTML = ''; // Stop video
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);



    // 12. Section 8: Contact Form Reveal
    gsap.from('.glass-panel', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
            trigger: '.contact-form-side',
            start: 'top 75%'
        }
    });

    gsap.from('.contact-image-side img', {
        scale: 1.2,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.contact-split',
            start: 'top 80%'
        }
    });

    // ---- Reel Phone Carousel ----
    const reelCards = document.querySelectorAll('.reel-card');
    const reelTrack = document.getElementById('reelTrack');
    const reelWrapper = document.querySelector('.reel-carousel-wrapper');
    let reelActive = 2; // start at card 3

    function updateReel() {
        if (!reelCards.length) return;

        const total = reelCards.length;
        // Use the actual client width of the card for more responsive behavior
        const cardWidth = reelCards[0].offsetWidth;
        const viewportWidth = window.innerWidth;
        
        // Responsive gap based on screen size
        let gap = 40;
        if (viewportWidth < 768) gap = 20;
        if (viewportWidth < 480) gap = 10;

        reelCards.forEach((card, i) => {
            card.classList.remove('active', 'adjacent', 'far');
            
            // Calculate absolute distance handling wrap-around for infinite scroll
            let offset = ((i - reelActive + Math.floor(total/2) + total) % total) - Math.floor(total/2);
            
            // Set X position dynamically via CSS variable
            const xPos = offset * (cardWidth + gap);
            card.style.setProperty('--card-x', `${xPos}px`);
            
            // Absolute offset to determine visibility/scale classes
            let absOffset = Math.abs(offset);

            if (absOffset === 0) {
                card.classList.add('active');
                loadVimeo(card, true);
            } else if (absOffset === 1) {
                card.classList.add('adjacent');
                loadVimeo(card, false);
            } else if (absOffset === 2) {
                card.classList.add('far');
                loadVimeo(card, false);
            } else {
                loadVimeo(card, false);
            }
        });
    }

    function loadVimeo(card, shouldPlay) {
        const vimeoId = card.getAttribute('data-vimeo');
        const wrap = card.querySelector('.reel-iframe-wrap');
        if (!vimeoId || vimeoId === 'VIMEO_ID_HERE' || !wrap) return;

        let iframe = wrap.querySelector('iframe');
        if (!iframe) {
            // 1. Fetch and create actual Vimeo thumbnail
            let poster = card.querySelector('.reel-poster');
            if (!poster) {
                poster = document.createElement('img');
                poster.className = 'reel-poster';
                poster.alt = 'Reel Thumbnail';
                
                // Set a default fallback image immediately from assets
                const fallbacks = [
                    'assests/reel_thumb1.png', 
                    'assests/reel_thumb2.png', 
                    'assests/reel_thumb3.png', 
                    'assests/reel_thumb4.png',
                    'assests/img1.jpeg',
                    'assests/img4.jpeg'
                ];
                // Use the card index to pick a fallback so it's consistent
                const cardIndex = Array.from(card.parentNode.children).indexOf(card);
                poster.src = fallbacks[cardIndex % fallbacks.length];
                
                card.querySelector('.phone-screen').insertBefore(poster, wrap);

                // Try to fetch high-quality thumbnail from Vimeo API
                fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.thumbnail_url) {
                            poster.src = data.thumbnail_url;
                            poster.style.opacity = '1'; // Ensure it's visible
                        }
                    })
                    .catch(e => {
                        console.error('Vimeo thumbnail error:', e);
                        // Fallback is already set, so we just keep it
                    });
            }

            // 2. Create the iframe
            iframe = document.createElement('iframe');
            // Use controls=0 to hide playbar.
            iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=${shouldPlay?1:0}&muted=1&loop=1&autopause=0&controls=0&title=0&byline=0&portrait=0`;
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;
            wrap.appendChild(iframe);
        } else {
            // If already exists, send play/pause command via postMessage
            const action = shouldPlay ? 'play' : 'pause';
            iframe.contentWindow.postMessage(JSON.stringify({ method: action }), '*');
        }
    }

    // Video Controls
    document.querySelectorAll('.reel-card .play-pause').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.reel-card');
            const iframe = card.querySelector('iframe');
            if (!iframe) return;
            
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-play')) {
                iframe.contentWindow.postMessage(JSON.stringify({ method: 'play' }), '*');
                icon.classList.replace('fa-play', 'fa-pause');
            } else {
                iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                icon.classList.replace('fa-pause', 'fa-play');
            }
        });
    });

    document.querySelectorAll('.reel-card .mute-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.reel-card');
            const iframe = card.querySelector('iframe');
            if (!iframe) return;
            
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-volume-mute')) {
                iframe.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: 1 }), '*');
                icon.classList.replace('fa-volume-mute', 'fa-volume-up');
            } else {
                iframe.contentWindow.postMessage(JSON.stringify({ method: 'setVolume', value: 0 }), '*');
                icon.classList.replace('fa-volume-up', 'fa-volume-mute');
            }
        });
    });

    document.getElementById('reelPrev')?.addEventListener('click', () => {
        reelActive = (reelActive - 1 + reelCards.length) % reelCards.length;
        updateReel();
    });
    document.getElementById('reelNext')?.addEventListener('click', () => {
        reelActive = (reelActive + 1) % reelCards.length;
        updateReel();
    });

    reelCards.forEach((card, i) => {
        card.addEventListener('click', () => { reelActive = i; updateReel(); });
    });

    // Initial load and resize handling
    window.addEventListener('resize', updateReel);
    updateReel();

    // ---- Form Submission Demo ----

    const form = document.querySelector('.futuristic-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn span');
            const originalText = btn.innerText;
            btn.innerText = 'TRANSMITTING...';
            
            setTimeout(() => {
                btn.innerText = 'DATA RECEIVED';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 3000);
            }, 1500);
        });
    }
});
