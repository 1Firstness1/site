document.addEventListener('DOMContentLoaded', function() {
    initMobileNavigation();
    initServiceButtons();
    initCarousel();
    initFormValidation();
    initSmoothScroll();
});

// Мобильное меню
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navList.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// Карусель отзывов
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let currentIndex = 0;

    function updateSlides(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('current-slide');
                slide.style.opacity = '1';
                slide.style.pointerEvents = 'auto';
            } else {
                slide.classList.remove('current-slide');
                slide.style.opacity = '0';
                slide.style.pointerEvents = 'none';
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides(currentIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides(currentIndex);
        });
    }
}

// Кнопки услуг
function initServiceButtons() {
    const buttons = document.querySelectorAll('.btn-service');
    const select = document.getElementById('service');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.service-card');
            const title = card.querySelector('.service-title').textContent;

            let value = 'other';
            if (title.includes('Традиционные')) value = 'traditional';
            else if (title.includes('Кремация')) value = 'cremation';
            else if (title.includes('Транспорт')) value = 'transport';
            else if (title.includes('Уход')) value = 'care';

            if (select) select.value = value;

            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Валидация
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            if(name && phone) {
                alert('Запрос успешно отправлен. Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Пожалуйста, заполните обязательные поля.');
            }
        });
    }
}

// Скролл
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}