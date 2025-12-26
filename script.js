// ========== FIREBASE CONFIGURATION ==========
const firebaseConfig = {
    apiKey: "AIzaSyDrQgBcO6aKV8SXNmA2CVF-Tw4K4PXaQdM",
    authDomain: "landing-page-1-fdfb7.firebaseapp.com",
    projectId: "landing-page-1-fdfb7",
    storageBucket: "landing-page-1-fdfb7.firebasestorage.app",
    messagingSenderId: "318369342738",
    appId: "1:318369342738:web:3c790ea7357374e2a97fcb",
    measurementId: "G-7GP5BCY507"
};

// Initialize Firebase
let db = null;
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
}
// ============================================

// Testimonial Carousel Navigation
let currentIndex = 0;
const carousel = document.querySelector('.testimonial-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testimonial-section .dot');
const prevBtn = document.querySelector('.testimonial-section .prev');
const nextBtn = document.querySelector('.testimonial-section .next');

function updateCarousel() {
    if (!carousel || cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth + 20; // card width + gap
    carousel.scrollLeft = currentIndex * cardWidth;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        updateCarousel();
    });
}

// Dot navigation
if (dots.length > 0) {
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
}

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

if (resultsPrevBtn && resultsCarousel) {
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

// Product Image Gallery
const mainProductImg = document.querySelector('.main-product-img');
const thumbnails = document.querySelectorAll('.thumbnail-img');

console.log('Main image:', mainProductImg);
console.log('Thumbnails found:', thumbnails.length);

if (mainProductImg && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            console.log('Thumbnail clicked:', this.src);
            
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image source to clicked thumbnail source
            mainProductImg.src = this.src;
            
            console.log('Main image updated to:', mainProductImg.src);
        });
    });
} else {
    console.log('Error: Main image or thumbnails not found!');
}

// Accordion Toggle
const accordionButtons = document.querySelectorAll('.btn-productdescription');

accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const accordionBox = this.closest('.productdescription');
        const hiddenBox = accordionBox.querySelector('.hidden-box');
        const icon = this.querySelector('ion-icon');
        
        // Toggle active class on hidden box
        hiddenBox.classList.toggle('active');
        
        // Change icon
        if (hiddenBox.classList.contains('active')) {
            icon.setAttribute('name', 'remove-outline');
        } else {
            icon.setAttribute('name', 'chevron-down-outline');
        }
    });
});

// Write Review Button
const writeReviewBtn = document.querySelector('.btn-write-review');
const reviewModal = document.getElementById('reviewModal');
const modalClose = document.querySelector('.review-modal-close');

if (writeReviewBtn) {
    writeReviewBtn.addEventListener('click', function() {
        reviewModal.classList.add('active');
    });
}

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', function() {
        reviewModal.classList.remove('active');
    });
}

// Close modal when clicking outside
if (reviewModal) {
    reviewModal.addEventListener('click', function(e) {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
        }
    });
}

// Star Rating
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = this.getAttribute('data-rating');
        updateStars(selectedRating);
    });
    
    star.addEventListener('mouseenter', function() {
        updateStars(this.getAttribute('data-rating'));
    });
});

const starRating = document.querySelector('.star-rating');
if (starRating) {
    starRating.addEventListener('mouseleave', function() {
        updateStars(selectedRating);
    });
}

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index + 1 <= rating) {
            star.textContent = '★';
            star.classList.add('active');
        } else {
            star.textContent = '☆';
            star.classList.remove('active');
        }
    });
}

// Load saved reviews from Firebase
function loadSavedReviews() {
    if (!db) {
        console.log('Firebase not initialized, reviews will not load');
        return;
    }
    
    const reviewsList = document.querySelector('.reviews-list');
    if (!reviewsList) return;
    
    // Get reviews from Firestore, ordered by timestamp (newest first)
    db.collection('reviews')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const review = doc.data();
                createReviewCard(review.name, review.text, review.rating, doc.id);
            });
            updateReviewCount();
        })
        .catch((error) => {
            console.error('Error loading reviews:', error);
        });
}

// Helper function to create review card
function createReviewCard(name, text, rating, reviewId) {
    const reviewsList = document.querySelector('.reviews-list');
    const newReview = document.createElement('div');
    newReview.className = 'review-card';
    newReview.dataset.canDelete = 'true';
    newReview.dataset.reviewId = reviewId; // Store Firebase document ID
    newReview.innerHTML = `
        <button class="btn-delete-review">&times;</button>
        <h4 class="review-customer-name">${name}</h4>
        <p class="review-verified">verified customer</p>
        <p class="review-text">${text}</p>
        <div class="review-rating">
            <span class="review-stars">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>
            <span class="review-score">${rating}.0</span>
        </div>
    `;
    
    reviewsList.insertBefore(newReview, reviewsList.firstChild);
    
    // Attach delete handler
    const deleteBtn = newReview.querySelector('.btn-delete-review');
    deleteBtn.addEventListener('click', function() {
        deleteReview(newReview);
    });
}

// Save review to Firebase (called when submitting new review)
function saveReviewToFirebase(name, text, rating) {
    if (!db) {
        console.error('Firebase not initialized');
        alert('Review system not available. Please check Firebase configuration.');
        return;
    }
    
    db.collection('reviews').add({
        name: name,
        text: text,
        rating: rating,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        console.log('Review added with ID:', docRef.id);
        // Create the review card with the new ID
        createReviewCard(name, text, rating, docRef.id);
        updateReviewCount();
        
        // Show success message
        alert('Thank you for your review! Your review has been posted.');
        
        // Close modal and reset
        reviewModal.classList.remove('active');
        reviewForm.reset();
        selectedRating = 0;
        updateStars(0);
    })
    .catch((error) => {
        console.error('Error adding review:', error);
        alert('Failed to post review. Please try again.');
    });
}

// Update review count
function updateReviewCount() {
    const summaryText = document.querySelector('.summary-text');
    if (summaryText) {
        const allReviews = document.querySelectorAll('.review-card');
        summaryText.textContent = `5.0 rating of ${allReviews.length} reviews`;
    }
}

// Load reviews when page loads
if (document.querySelector('.reviews-list')) {
    loadSavedReviews();
}

// Form submission
const reviewForm = document.querySelector('.review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }
        
        // Get form data
        const name = reviewForm.querySelector('input[type="text"]').value;
        const reviewText = reviewForm.querySelector('textarea').value;
        
        // Save to Firebase
        saveReviewToFirebase(name, reviewText, selectedRating);
    });
}

// Delete Review Function
function deleteReview(reviewCard) {
    if (!confirm('Are you sure you want to delete this review?')) {
        return;
    }
    
    const reviewId = reviewCard.dataset.reviewId;
    
    if (!db || !reviewId) {
        // Fallback for local-only reviews or if Firebase isn't configured
        reviewCard.remove();
        updateReviewCount();
        return;
    }
    
    // Delete from Firebase
    db.collection('reviews').doc(reviewId).delete()
        .then(() => {
            console.log('Review deleted from Firebase');
            reviewCard.remove();
            updateReviewCount();
        })
        .catch((error) => {
            console.error('Error deleting review:', error);
            alert('Failed to delete review. Please try again.');
        });
}

// Add delete handlers to existing reviews
document.querySelectorAll('.btn-delete-review').forEach(button => {
    button.addEventListener('click', function() {
        const reviewCard = this.closest('.review-card');
        deleteReview(reviewCard);
    });
});

// OPTION C: Admin Mode Toggle
const adminModeCheckbox = document.getElementById('adminMode');
if (adminModeCheckbox) {
    adminModeCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('admin-mode');
            console.log('Admin mode enabled - delete buttons visible');
        } else {
            document.body.classList.remove('admin-mode');
            console.log('Admin mode disabled - delete buttons hidden');
        }
    });
}

// OPTION A: Enable admin mode via console
// To use: Open console (F12) and type: document.body.classList.add('admin-mode')

// Sort Reviews Dropdown
const sortDropdown = document.getElementById('sort-reviews');

if (sortDropdown) {
    sortDropdown.addEventListener('change', function() {
        const sortValue = this.value;
        const reviewsList = document.querySelector('.reviews-list');
        const reviewCards = Array.from(reviewsList.querySelectorAll('.review-card'));
        
        // Sort based on selection
        reviewCards.sort((a, b) => {
            if (sortValue === 'rating') {
                const ratingA = parseFloat(a.querySelector('.review-score').textContent);
                const ratingB = parseFloat(b.querySelector('.review-score').textContent);
                return ratingB - ratingA;
            }
            return 0;
        });
        
        // Re-append sorted cards
        reviewCards.forEach(card => {
            reviewsList.appendChild(card);
        });
        
        console.log('Sorted by:', sortValue);
    });
}