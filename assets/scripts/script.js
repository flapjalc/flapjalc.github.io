const buttonFeedback = document.querySelector(".button__feedback")
const modal = document.querySelector(".modal")
const buttonClose = document.querySelector(".modal__close");
const overlay = document.querySelector(".modal-overlay");

buttonFeedback.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.add("modal--show");

  overlay.classList.add('modal--show')
})

buttonClose.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal--show");
  overlay.classList.remove('modal--show')
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
    this.classList.toggle('faq__question--active')
  }
}

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.slider__toggle--prev',
    prevEl: '.slider__toggle--next',
  },
});
