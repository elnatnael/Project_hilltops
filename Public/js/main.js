document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing all features');
    
    // Initialize Vision Mission Slider
    initVisionMissionSlider();
    
    // Initialize School Compound Slider
    initSchoolCompoundSlider();
    
    // Initialize Email Links
    initEmailLinks();
    
    // Initialize Header Scroll Effect
    initHeaderScroll();
});

function initVisionMissionSlider() {
    console.log('Initializing Vision Mission Slider');
    
    const slides = document.querySelectorAll('.vision-mission-slider .slide');
    const indicators = document.querySelectorAll('.vision-mission-slider .indicator');
    const prevArrow = document.querySelector('.vision-mission-slider .slider-arrow.prev');
    const nextArrow = document.querySelector('.vision-mission-slider .slider-arrow.next');
    
    console.log('Vision Mission Slides found:', slides.length);
    console.log('Vision Mission Indicators found:', indicators.length);
    
    // If no vision mission slider elements found, exit early
    if (slides.length === 0) {
        console.log('No Vision Mission Slider found on this page');
        return;
    }
    
    let currentSlide = 0;
    const slideInterval = 5000;
    let slideTimer;

    function showSlide(index) {
        console.log('Showing Vision Mission slide:', index);
        
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
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
        
        console.log('Vision Mission current slide is now:', currentSlide);
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
        console.log('Vision Mission auto-slide timer started');
    }
    
    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // Manual navigation with arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            console.log('Vision Mission next arrow clicked');
            nextSlide();
            resetTimer();
        });
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            console.log('Vision Mission prev arrow clicked');
            prevSlide();
            resetTimer();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Vision Mission indicator clicked:', index);
            goToSlide(index);
        });
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.vision-mission-slider .slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            console.log('Vision Mission slider hovered - pausing');
            clearInterval(slideTimer);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            console.log('Vision Mission slider left - resuming');
            startTimer();
        });
    }
    
    // Initialize
    console.log('Initializing Vision Mission slider with slide 0');
    showSlide(0);
    startTimer();
}

function initSchoolCompoundSlider() {
    console.log('Initializing School Compound Slider');
    
    const compoundImages = document.querySelectorAll('.school-compound .compound-image, .school-compound .building-image, .school-compound .playground-image');
    const indicators = document.querySelectorAll('.school-compound .compound-indicator');
    const prevArrow = document.querySelector('.school-compound .compound-arrow.prev');
    const nextArrow = document.querySelector('.school-compound .compound-arrow.next');
    
    console.log('School Compound Images found:', compoundImages.length);
    console.log('School Compound Indicators found:', indicators.length);
    
    // If no school compound slider elements found, exit early
    if (compoundImages.length === 0) {
        console.log('No School Compound Slider found on this page');
        return;
    }
    
    let currentSlide = 0;
    const slideInterval = 5000;
    let slideTimer;

    function showSlide(index) {
        console.log('Showing School Compound slide:', index);
        
        // Remove active class from all slides and indicators
        compoundImages.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Update current slide index
        currentSlide = index;
        
        // Ensure index stays within bounds
        if (currentSlide >= compoundImages.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = compoundImages.length - 1;
        
        // Add active class to new current slide and indicator
        compoundImages[currentSlide].classList.add('active');
        if (indicators[currentSlide]) {
            indicators[currentSlide].classList.add('active');
        }
        
        console.log('School Compound current slide is now:', currentSlide);
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
        console.log('School Compound auto-slide timer started');
    }
    
    function resetTimer() {
        clearInterval(slideTimer);
        startTimer();
    }

    // Manual navigation with arrows
    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            console.log('School Compound next arrow clicked');
            nextSlide();
            resetTimer();
        });
    }
    
    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            console.log('School Compound prev arrow clicked');
            prevSlide();
            resetTimer();
        });
    }
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('School Compound indicator clicked:', index);
            goToSlide(index);
        });
    });
    
    // Pause on hover
    const compoundContainer = document.querySelector('.school-compound .image-content');
    if (compoundContainer) {
        compoundContainer.addEventListener('mouseenter', () => {
            console.log('School Compound slider hovered - pausing');
            clearInterval(slideTimer);
        });
        
        compoundContainer.addEventListener('mouseleave', () => {
            console.log('School Compound slider left - resuming');
            startTimer();
        });
    }
    
    // Initialize
    console.log('Initializing School Compound slider with slide 0');
    showSlide(0);
    startTimer();
}

function initEmailLinks() {
    console.log('Initializing Email Links');
    
    const emailLinks = document.querySelectorAll('.email-link');
    console.log('Email links found:', emailLinks.length);
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Email link clicked');
            
            const email = this.getAttribute('data-email');
            const subject = this.getAttribute('data-subject');
            
            console.log('Email:', email, 'Subject:', subject);
            
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
            console.log('Opening:', mailtoLink);
            
            window.location.href = mailtoLink;
        });
    });
}

function initHeaderScroll() {
    console.log('Initializing Header Scroll Effect');
    
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}