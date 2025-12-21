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
const resultsPrevBtn = document.querySelector('.section-results .carousel-arrow.prev');

function updateResultsArrows() {
    if (!resultsPrevBtn) return;
    
    const scrollLeft = resultsCarousel.scrollLeft;
    
    // Show/hide prev button
    if (scrollLeft > 0) {
        resultsPrevBtn.style.display = 'flex';
    } else {
        resultsPrevBtn.style.display = 'none';
    }
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
if (resultsCarousel) {
    resultsCarousel.addEventListener('scroll', updateResultsArrows);
    // Initialize arrows on page load
    updateResultsArrows();
}

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