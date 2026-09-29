const slides = [...document.querySelectorAll('.slide')];
const counter = document.getElementById('slideCounter');
const dots = document.getElementById('slideDots');
let activeSlide = 0;

function renderDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slide-dot${index === activeSlide ? ' is-active' : ''}`;
        dot.title = `Ir para o slide ${index + 1}`;
        dot.setAttribute('aria-label', `Ir para o slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });
}

function goToSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
    counter.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeSlide));
    if (window.lucide) lucide.createIcons();
}

document.getElementById('prevSlide').addEventListener('click', () => goToSlide(activeSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => goToSlide(activeSlide + 1));
document.getElementById('fullscreen').addEventListener('click', async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
});

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        goToSlide(activeSlide + 1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goToSlide(activeSlide - 1);
    }
    if (event.key.toLowerCase() === 'f') document.getElementById('fullscreen').click();
});

document.addEventListener('click', event => {
    if (event.target.closest('a, button')) return;
    if (event.clientX > window.innerWidth / 2) goToSlide(activeSlide + 1);
    else goToSlide(activeSlide - 1);
});

renderDots();
goToSlide(0);
if (window.lucide) lucide.createIcons();
