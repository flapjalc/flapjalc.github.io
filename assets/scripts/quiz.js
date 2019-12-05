// function nextStep(btn, step, items) {
//   btn.addEventListener("click", function(e) {
//     e.preventDefault()
//     step.classList.add("quiz__step--active")
//   })
// }

let i = 0;
let index1 = 0;
let index;

const btnStep1 = document.querySelector(".quiz__btn--step1");
const btnStep2 = document.querySelectorAll(".quiz__btn--step2");
const btnStep3 = document.querySelectorAll(".quiz__btn--step3");
const btnStep4 = document.querySelectorAll(".quiz__btn--step4");
const btnStep5 = document.querySelectorAll(".quiz__btn--step5");
const btnStep6 = document.querySelectorAll(".quiz__btn--step6");
const btnStep7 = document.querySelectorAll(".quiz__btn--step7");
const btnResult = document.querySelector(".quiz__btn--result");

const options1 = document.querySelectorAll(".quiz__select--1");
const options2 = document.querySelectorAll(".quiz__select--2");
const options3 = document.querySelectorAll(".quiz__select--3");
const options4 = document.querySelector(".quiz__select--4");
const options5 = document.querySelectorAll(".quiz__select--5");
const options6 = document.querySelectorAll(".quiz__select--6");
const options7 = document.querySelectorAll(".quiz__select--7");

const step2 = document.querySelector(".quiz__step--2");
const step3 = document.querySelector(".quiz__step--3");
const step4 = document.querySelector(".quiz__step--4");
const step5 = document.querySelector(".quiz__step--5");
const step6 = document.querySelector(".quiz__step--6");
const step7 = document.querySelector(".quiz__step--7");

const screen1 = document.querySelector(".quiz__screen1");
const screen2 = document.querySelector(".quiz__screen2");
const screen3 = document.querySelector(".quiz__screen3");

function start(btn, step, items) {
  items.forEach(item => {
    item.addEventListener('click', function(){

      if(!item.classList.contains('checked')) {
        i += 1;
        item.classList.add('checked')
      } else {
        i -= 1;
        item.classList.remove('checked')
        btn.setAttribute("disabled", "disabled");
      }

      if(i > 0) {
        btn.removeAttribute("disabled");
      }
    })

    btn.addEventListener("click", function(e) {
      e.preventDefault()
      step.classList.add("quiz__step--active")
    })
  })
}

function nextStep4(btn, step, item) {
  item.addEventListener('input', function(){

    if(item.value !== " ") {
      console.log('Работает')
      btn.removeAttribute("disabled");
    } else {
      console.log('Не работает')
      btn.setAttribute("disabled", "disabled");
    }
  })

  btn.addEventListener("click", function(e) {
    e.preventDefault()
    step.classList.add("quiz__step--active")
  })
}

function nextStep(btn, step, items) {
  items.forEach(item => {
    item.addEventListener('click', function(){

      if(item) {
        btn.removeAttribute("disabled");

        if(item.classList.contains('screen1')) {
          index1 = 1;
        }

        if(item.classList.contains('screen2')) {
          index = 2;
        }

        if(item.classList.contains('screen3')) {
          index = 3;
        }

        if(items == options7) {
          showScreen(btn)
        }

      } else {
        btn.setAttribute("disabled", "disabled");
      }
    })

    btn.addEventListener("click", function(e) {
      e.preventDefault()
      step.classList.add("quiz__step--active")
    })
  })
}

function showScreen (btn) {
  btn.addEventListener("click", function() {
    btn.removeAttribute("disabled");

    if (index1 == 1) {
      return screen1.classList.add('quiz__step--active')
    }

    if (index == 2) {
      screen2.classList.add('quiz__step--active')
    }

    if (index == 3) {
      screen3.classList.add('quiz__step--active')
    }
  })
}

function prevStep(btn, step) {
  btn.addEventListener("click", function(e) {
    e.preventDefault()
    step.classList.remove("quiz__step--active")
  })
}


start(btnStep2[0], step2, options1);
prevStep(btnStep1, step2);

nextStep(btnStep3[0], step3, options2);
prevStep(btnStep2[1], step3);

nextStep(btnStep4[0], step4, options3);
prevStep(btnStep3[1], step4);

nextStep4(btnStep5[0], step5, options4);
prevStep(btnStep4[1], step5);

nextStep(btnStep6[0], step6, options5);
prevStep(btnStep5[1], step6);

nextStep(btnStep7[0], step7, options6);
prevStep(btnStep6[1], step7);

nextStep(btnResult, step7, options7);

const quizWrap = document.querySelector(".quiz-wrap");
const quizClose = document.querySelectorAll(".quiz__close");

quizClose.forEach(item => {
  item.addEventListener('click', function(){
    event.preventDefault();
    quizWrap.classList.add("quiz--hide")
  })
})
