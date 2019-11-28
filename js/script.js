var buttonFeedback = document.querySelector(".button__feedback");
var modal = document.querySelector(".modal");
var buttonClose = document.querySelector(".modal__close");

buttonFeedback.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.add("modal--show");
})

buttonClose.addEventListener("click", function(event) {
  event.preventDefault();
  modal.classList.remove("modal--show");
})
