let currentSlide1 = 0;
let currentSlide2 = 0;
let currentSlide3 = 0;
const images1 = document.querySelectorAll('.carousel-image1');
const images2 = document.querySelectorAll('.carousel-image2');
const images3 = document.querySelectorAll('.carousel-image3');
const dotsContainer1 = document.querySelector('.carousel-dots1');
const dotsContainer2 = document.querySelector('.carousel-dots2');
const dotsContainer3 = document.querySelector('.carousel-dots3');

function init() {
    initCarousel();
    // initCarouselSwitch();
}

function initCarouselSwitch() {
    var slideSwitch = 2;
    setInterval(function() {
        if (slideSwitch == 0) {
            changeSlide1(1);
            slideSwitch = 1;
        } else if (slideSwitch == 1) {
            changeSlide2(1);
            slideSwitch = 2;
        } else {
            changeSlide3(1);
            slideSwitch = 0;
        }
    }, 3000);
}

function initCarousel() {
    // Show current image
    images1[currentSlide1].style.display = 'block';
    // Populate the dots and add functionality
    images1.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.classList.add('carousel-dot1');
        dot.onclick = () => changeSlide1(i - currentSlide1);
        dotsContainer1.appendChild(dot);
    });
    
    // Do for carousel 2
    images2[currentSlide2].style.display = 'block';
    images2.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.classList.add('carousel-dot2');
        dot.onclick = () => changeSlide2(i - currentSlide2);
        dotsContainer2.appendChild(dot);
    });
    
    // And carousel 3
    images3[currentSlide3].style.display = 'block';
    images3.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        dot.classList.add('carousel-dot3');
        dot.onclick = () => changeSlide3(i - currentSlide3);
        dotsContainer3.appendChild(dot);
    });

    updateDots1();
    updateDots2();
    updateDots3();
}

function changeSlide1(n) {
    // Display both, transition, hide
    // let prevSlide = currentSlide1;
    // let nextSlide = (currentSlide1 + n + images1.length) % images1.length;
    // images1[prevSlide].style.display = 'block';
    // images1[nextSlide].style.display = 'block';
    // images1[prevSlide].style.transform = 'translateX(-100%)';
    // images1[nextSlide].style.transform = 'translateX(0%)';
    // images1[prevSlide].style.display = 'none';
    // currentSlide1 = nextSlide;
    // updateDots1();
    images1[currentSlide1].style.display = 'none';
    currentSlide1 = (currentSlide1 + n + images1.length) % images1.length;
    images1[currentSlide1].style.display = 'block';
    updateDots1();
}
function changeSlide2(n) {
  images2[currentSlide2].style.display = 'none';
  currentSlide2 = (currentSlide2 + n + images2.length) % images2.length;
  images2[currentSlide2].style.display = 'block';
  updateDots2();
}
function changeSlide3(n) {
  images3[currentSlide3].style.display = 'none';
  currentSlide3 = (currentSlide3 + n + images3.length) % images3.length;
  images3[currentSlide3].style.display = 'block';
  updateDots3();
}

function updateDots1() {
  const dots = document.querySelectorAll('.carousel-dot1');
  dots.forEach(dot => dot.style.backgroundColor = '#bbb');
  dots[currentSlide1].style.backgroundColor = '#717171';
}
function updateDots2() {
  const dots = document.querySelectorAll('.carousel-dot2');
  dots.forEach(dot => dot.style.backgroundColor = '#bbb');
  dots[currentSlide2].style.backgroundColor = '#717171';
}
function updateDots3() {
  const dots = document.querySelectorAll('.carousel-dot3');
  dots.forEach(dot => dot.style.backgroundColor = '#bbb');
  dots[currentSlide3].style.backgroundColor = '#717171';
}

window.onload = init;
