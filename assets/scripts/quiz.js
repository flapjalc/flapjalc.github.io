function nextStep(btn, step) {
  btn.addEventListener("click", function(e) {
    e.preventDefault()
    step.classList.add("quiz__step--active")
  })
}

function prevStep(btn, step) {
  btn.addEventListener("click", function(e) {
    e.preventDefault()
    step.classList.remove("quiz__step--active")
  })
}

function choises(items, step) {
  items.forEach(item => {
    item.addEventListener('click', function(){

      if(item.classList.contains('screen1')) {
        screen1.classList.add('quiz__step--active')
      }

      if(item.classList.contains('screen2')) {
        index = 1;
        console.log(index)
      }

      if(item.classList.contains('screen3')) {
        index = 2;
        console.log(index)
      }

      if(items == options7) {

        if (index == 1) {
          screen2.classList.add('quiz__step--active')
        }

        if (index == 2) {
          screen3.classList.add('quiz__step--active')
        }
      }

      step.classList.add('quiz__step--active')
    })
  })
}

let index;

const btnStep1 = document.querySelector(".quiz__btn--step1");
const btnStep2 = document.querySelectorAll(".quiz__btn--step2");
const btnStep3 = document.querySelector(".quiz__btn--step3");
const btnStep4 = document.querySelector(".quiz__btn--step4");
const btnStep5 = document.querySelectorAll(".quiz__btn--step5");
const btnStep6 = document.querySelector(".quiz__btn--step6");

const step2 = document.querySelector(".quiz__step--2");
const step3 = document.querySelector(".quiz__step--3");
const step4 = document.querySelector(".quiz__step--4");
const step5 = document.querySelector(".quiz__step--5");
const step6 = document.querySelector(".quiz__step--6");
const step7 = document.querySelector(".quiz__step--7");

const screen1 = document.querySelector(".quiz__screen1");
const screen2 = document.querySelector(".quiz__screen2");
const screen3 = document.querySelector(".quiz__screen3");

nextStep(btnStep2[0], step2);
prevStep(btnStep1, step2);
prevStep(btnStep2[1], step3);
prevStep(btnStep3, step4);
prevStep(btnStep4, step5);
nextStep(btnStep5[0], step5);
prevStep(btnStep5[1], step6);
prevStep(btnStep6, step7);

const options2 = document.querySelectorAll(".quiz__select--2")
const options3 = document.querySelectorAll(".quiz__select--3")
const options4 = document.querySelectorAll(".quiz__select--4")
const options5 = document.querySelectorAll(".quiz__select--5")
const options6 = document.querySelectorAll(".quiz__select--6")
const options7 = document.querySelectorAll(".quiz__select--7")

choises(options2, step3)
choises(options3, step4)
choises(options4, step5)
choises(options5, step6)
choises(options6, step7)

choises(options7, screen2)

const quizWrap = document.querySelector(".quiz-wrap");
const quizClose = document.querySelector(".quiz__close");

quizClose.addEventListener("click", function(event) {
  event.preventDefault();
  console.log(11)
})
