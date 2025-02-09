document.addEventListener('DOMContentLoaded', () => {
    const carousel = {
        container: document.querySelector('.carousel-container'),
        wrapper: document.querySelector('.carousel-wrapper'),
        slides: document.querySelectorAll('.carousel-slide'),
        dotsContainer: document.querySelector('.carousel-dots'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        currentSlide: 0,
        touchStartX: null,
        touchEndX: null,
        autoPlayInterval: null,

        init() {
            // Create dots
            this.slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => this.goToSlide(index));
                this.dotsContainer.appendChild(dot);
            });

            // Add event listeners
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });

            // Touch events
            this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e));
            this.container.addEventListener('touchend', () => this.handleTouchEnd());

            // Auto play
            this.startAutoPlay();
            this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
            this.container.addEventListener('mouseleave', () => this.startAutoPlay());

            // Initialize first slide
            this.updateSlide();
        },

        updateSlide() {
            // Update slides
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentSlide);
            });

            // Update dots
            const dots = this.dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });

            // Announce for screen readers
            this.announceSlide();
        },

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.updateSlide();
        },

        prevSlide() {
            this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.updateSlide();
        },

        goToSlide(index) {
            this.currentSlide = index;
            this.updateSlide();
        },

        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
            this.container.classList.add('dragging');
        },

        handleTouchMove(e) {
            if (!this.touchStartX) return;
            this.touchEndX = e.touches[0].clientX;
        },

        handleTouchEnd() {
            this.container.classList.remove('dragging');
            if (!this.touchStartX || !this.touchEndX) return;

            const diff = this.touchStartX - this.touchEndX;
            const threshold = 50; // minimum distance for swipe

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            this.touchStartX = null;
            this.touchEndX = null;
        },

        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
        },

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        },

        announceSlide() {
            // Announce slide change for screen readers
            const liveRegion = document.querySelector('.carousel-live-region') || (() => {
                const region = document.createElement('div');
                region.className = 'carousel-live-region sr-only';
                region.setAttribute('aria-live', 'polite');
                document.body.appendChild(region);
                return region;
            })();
            
            liveRegion.textContent = `Showing slide ${this.currentSlide + 1} of ${this.slides.length}`;
        }
    };

    // Initialize carousel
    carousel.init();
});