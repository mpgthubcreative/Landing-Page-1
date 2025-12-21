// Testimonial Carousel Navigation
let currentIndex = 0;
const carousel = document.querySelector('.testimonial-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-section .dot');
const prevBtn = document.querySelector('.testimonial-section .prev');
const nextBtn = document.querySelector('.testimonial-section .next');

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    carousel.scrollLeft = currentIndex * cardWidth;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(cards.length - 1, currentIndex + 1);
    updateCarousel();
});

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
    });
});

// Results Carousel Navigation
const resultsCarousel = document.querySelector('.results-carousel');
const resultsNextBtn = document.querySelector('.section-results .carousel-arrow.next');
const resultsPrevBtn = document.querySelector('.section-results .carousel-arrow.prev');

function updateResultsArrows() {
    const scrollLeft = resultsCarousel.scrollLeft;
    const maxScroll = resultsCarousel.scrollWidth - resultsCarousel.clientWidth;
    
    // Show/hide prev button
    if (scrollLeft > 0) {
        resultsPrevBtn.style.display = 'flex';
    } else {
        resultsPrevBtn.style.display = 'none';
    }
    
    // Show/hide next button
    if (scrollLeft >= maxScroll - 1) {
        resultsNextBtn.style.display = 'none';
    } else {
        resultsNextBtn.style.display = 'flex';
    }
}

if (resultsNextBtn) {
    resultsNextBtn.addEventListener('click', () => {
        const scrollAmount = resultsCarousel.offsetWidth;
        resultsCarousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        setTimeout(updateResultsArrows, 300);
    });
}

if (resultsPrevBtn) {
    resultsPrevBtn.addEventListener('click', () => {
        resultsCarousel.scrollTo({
            left: 0,
            behavior: 'smooth'
        });
        setTimeout(updateResultsArrows, 300);
    });
}

// Update arrows on scroll
resultsCarousel.addEventListener('scroll', updateResultsArrows);

// Initialize arrows on page load
updateResultsArrows();

// Quantity Selector Buttons
const quantityInput = document.querySelector('.quantity-input');
const minusBtn = document.querySelector('.quantity-btn.minus');
const plusBtn = document.querySelector('.quantity-btn.plus');

if (minusBtn && plusBtn && quantityInput) {
    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
}