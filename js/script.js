const buttonFeedback = document.querySelector(".button__feedback")
const modal = document.querySelector(".modal")
const buttonClose = document.querySelector(".modal__close");

buttonFeedback.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.add("modal--show");
})

buttonClose.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal--show");
})

// Tabs
const tabs = document.querySelectorAll('.tabs__item')
const tabsContent = document.querySelectorAll('.tabs__content')
let tabName

tabs.forEach(item => {
  item.addEventListener('click', selectTabs)
})

function selectTabs() {
  tabs.forEach(item => {
    item.classList.remove('tabs__item--active')
  })
  this.classList.add("tabs__item--active")
  tabName = this.getAttribute('data-tab')
  selectTabsContent(tabName)
}

function selectTabsContent(tabName) {
  tabsContent.forEach(item => {
    item.getAttribute('data-tab') == tabName ? item.classList.add('tabs__content--active') : item.classList.remove('tabs__content--active')
  })
}

// Accordion
const questions = document.querySelectorAll('.faq__question')

for (var i = 0; i < questions.length; i++) {
  questions[i].onclick = function () {
    this.nextElementSibling.classList.toggle('show')
  }
}

// Slider
var wrap = document.querySelector('.slider');
var items = document.querySelector('.slider__list');
var itemCount = document.querySelectorAll('.slider__item').length;
var scroller = document.querySelector('.slider__scroller');
var pos = 0;
var transform = Modernizr.prefixed('transform');

function setTransform() {
 items.style[transform] = 'translate3d(' + (-pos * items.offsetWidth) + 'px,0,0)';
}

function prev() {
 pos = Math.max(pos - 1, 0);
 setTransform();
}
function next() {
 pos = Math.min(pos + 1 , itemCount - 1);
 setTransform();
}
window.addEventListener('resize', setTransform);

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.slider__toggle--prev',
    prevEl: '.slider__toggle--next',
  },
});
