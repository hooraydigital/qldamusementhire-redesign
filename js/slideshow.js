// ============================================
// HERO SLIDESHOW
// ============================================
(() => {
    const slideshow  = document.getElementById('heroSlideshow');
    if (!slideshow) return;

    const slides     = slideshow.querySelectorAll('.hero-slide');
    const dots       = slideshow.querySelectorAll('.slideshow-dot');
    const counter    = document.getElementById('slideshowCounter');
    const progress   = document.getElementById('slideshowProgress');
    const prevBtn    = document.getElementById('slidePrev');
    const nextBtn    = document.getElementById('slideNext');
    const total      = slides.length;
    const INTERVAL   = 5000;
    let current      = 0;
    let timer        = null;

    function goTo(index) {
        if (index >= total) index = 0;
        if (index < 0) index = total - 1;

        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');

        dots.forEach(d => d.classList.remove('active'));
        dots[index].classList.add('active');

        counter.textContent = (index + 1) + ' / ' + total;
        current = index;
        startProgress();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startProgress() {
        progress.style.transition = 'none';
        progress.style.width = '0%';
        void progress.offsetWidth;
        progress.style.transition = 'width ' + INTERVAL + 'ms linear';
        progress.style.width = '100%';
    }

    function startAutoplay() {
        stopAutoplay();
        timer = setInterval(next, INTERVAL);
        startProgress();
    }

    function stopAutoplay() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
    nextBtn.addEventListener('click', () => { next(); startAutoplay(); });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goTo(parseInt(dot.getAttribute('data-slide')));
            startAutoplay();
        });
    });

    slideshow.addEventListener('mouseenter', stopAutoplay);
    slideshow.addEventListener('mouseleave', startAutoplay);

    let touchStartX = 0;
    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        stopAutoplay();
    }, { passive: true });
    slideshow.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) next(); else prev();
        }
        startAutoplay();
    }, { passive: true });

    slideshow.setAttribute('tabindex', '0');
    slideshow.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { next(); startAutoplay(); }
        if (e.key === 'ArrowLeft')  { prev(); startAutoplay(); }
    });

    startAutoplay();
})();
