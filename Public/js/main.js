document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing slider');
    
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevArrow = document.querySelector('.slider-arrow.prev');
    const nextArrow = document.querySelector('.slider-arrow.next');
    
    console.log('Slides found:', slides.length);
    console.log('Indicators found:', indicators.length);
    console.log('Prev arrow:', prevArrow);
    console.log('Next arrow:', nextArrow);
    
    let currentSlide = 1;
    const slideInterval = 5000; // 8 seconds
    let slideTimer;

    function showSlide(index) {
        console.log('Showing slide:', index);
        
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active', 'prev'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add prev class to current slide before changing
        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('prev');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Ensure index stays within bounds
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        // Add active class to new current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        
        console.log('Current slide is now:', currentSlide);
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function goToSlide(index) {
        showSlide(index);
        resetTimer();
    }
    
    function startTimer() {
        slideTimer = setInterval(nextSlide, slideInterval);
        console.log('Auto-slide timer started');
    }
    
    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // Manual navigation with arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            console.log('Next arrow clicked');
            nextSlide();
            resetTimer();
        });
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            console.log('Prev arrow clicked');
            prevSlide();
            resetTimer();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            goToSlide(index);
        });
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            console.log('Slider hovered - pausing');
            clearInterval(slideTimer);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            console.log('Slider left - resuming');
            startTimer();
        });
    }
    
    // Initialize - explicitly start with first slide
    console.log('Initializing slider with slide 0');
    showSlide(0);
    startTimer();
});