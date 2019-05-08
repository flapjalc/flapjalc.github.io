var words = [
  {en: 'Speak', ru: 'Говорить (на языке)'},
  {en: 'Understand ', ru: 'Понимать'},
  {en: 'Know ', ru: 'Знать'},
  {en: 'Do', ru: 'Делать (выполнять)'},
  {en: 'Work', ru: 'Работать'},
  {en: 'Need', ru: 'Нуждаться'},
  {en: 'Study', ru: 'Учиться'},
  {en: 'Read', ru: 'Читать'},
  {en: 'Live', ru: 'Жить'},
  {en: 'Want', ru: 'Хотеть'},
  {en: 'Would like (I\'d like)', ru: 'Хотел бы'},
  {en: 'Play', ru: 'Играть'},
  {en: 'Like', ru: 'Нравится'},
  {en: 'Help', ru: 'Помогать'},
  {en: 'Swim', ru: 'Плавать'},
  {en: 'Remember', ru: 'Помнить'},
  {en: 'See', ru: 'Видеть'},
  {en: 'Seem', ru: 'Казаться'},
  {en: 'Happen', ru: 'Случаться / Происходить'},
  {en: 'go', ru: 'идти, ехать'},
  {en: 'teach', ru: 'преподавать'},
  {en: 'watch', ru: 'смотреть'},
  {en: 'wash', ru: 'мыть'},
  {en: 'relax', ru: 'отдыхать'},
  {en: 'fly', ru: 'летать'},
  {en: 'cry', ru: 'плакать'},
  {en: 'try', ru: 'стараться'},
  {en: 'learn', ru: 'учить'},
  {en: 'get up', ru: 'вставать'},
  {en: 'eat', ru: 'есть / кушать'},
  {en: 'drink', ru: 'пить'},
  {en: 'have', ru: 'иметь'},
  {en: 'cost', ru: 'стоить'},
  {en: 'think', ru: 'думать'},
  {en: 'look', ru: 'выглядеть'},
  {en: 'say', ru: 'говорить (что либо)'},
  {en: 'buy', ru: 'купить'},
  {en: 'order', ru: 'заказать'},
  {en: 'call', ru: 'звонить'},
  {en: 'visit', ru: 'посещать'},
  {en: 'get', ru: 'получать'},
  {en: 'sell', ru: 'продать'},
  {en: 'rent', ru: 'арендовать'},
  {en: 'find', ru: 'найти'},
  {en: 'thank', ru: 'благодарить'},
  {en: 'talk', ru: 'говорить (о чём либо) с кем то'},
  {en: 'tell', ru: 'сказать (кому то)'},
  {en: 'write', ru: 'писать'},
  {en: 'listen', ru: 'слушать'},
  {en: 'hear', ru: 'слышать'},
  {en: 'translate', ru: 'переводить'},
  {en: 'earn', ru: 'зарабатывать'},
  {en: 'invite', ru: 'приглашать'},
  {en: 'join', ru: 'присоединяться'},
  {en: 'prefer', ru: 'предпочитать'},
  {en: 'be', ru: 'быть'},
  {en: 'ask', ru: 'спрашивать, задавать'},
  {en: 'become', ru: 'статовится'},
  {en: 'interest', ru: 'интересовать'},
  {en: 'finish', ru: 'заканчивать'},
  {en: 'start / begin', ru: 'начинать'},
  {en: 'drive', ru: 'водить'},
  {en: 'walk', ru: 'ходить (пешком)'},
  {en: 'check', ru: 'проверять'},
  {en: 'save', ru: 'сохранять'},
  {en: 'train', ru: 'тренироваться'},
  {en: 'communicate', ru: 'общаться'},
  {en: 'continue', ru: 'продолжать'},
  {en: 'include', ru: 'включать'},
  {en: 'meet', ru: 'встречать'},
  {en: 'pay', ru: 'платить'},
  {en: 'wait', ru: 'ждать'},
  {en: 'forget', ru: 'забывать (в уме)'},
  {en: 'leave', ru: 'забывать (оставлять какие либо вещи)'},
  {en: 'mean', ru: 'означать, иметь ввиду'},
  {en: 'spend', ru: 'проводить (время)'},
  {en: 'explain', ru: 'объяснять'},
  {en: 'grow', ru: 'выращивать'},
  {en: 'cook', ru: 'готовить'},
  {en: 'produce', ru: 'производить'},
  {en: 'answer / reply', ru: 'отвечать'},
  {en: 'hate', ru: 'ненавидеть'},
  {en: 'promise', ru: 'обещать'},
  {en: 'refuse', ru: 'отказываться'},
  {en: 'consider', ru: 'считать'},
  {en: 'complain', ru: 'жаловаться'},
  {en: 'control', ru: 'контролировать'},
  {en: 'satisfy', ru: 'удовлетворять'},
  {en: 'discuss', ru: 'обсуждать'},
  {en: 'expect', ru: 'ожидать'},
  {en: 'disagree', ru: 'не соглашаться'},
  {en: 'realize', ru: 'осознавать'},
  {en: 'travel', ru: 'путешествовать'},
  {en: 'depends', ru: 'зависеть'},
  {en: 'combine', ru: 'совмещать'},

  {en: 'there', ru: 'там'},
  {en: 'here', ru: 'здесь'},
  {en: 'well', ru: 'хорошо'},
  {en: 'very well', ru: 'очень хорошо'},
  {en: 'hard', ru: 'усердно'},
  {en: 'early', ru: 'рано'},
  {en: 'late', ru: 'поздно'},
  {en: 'later', ru: 'позже'},
  {en: 'different', ru: 'различные, другой'},
  {en: 'every day', ru: 'каждый день'},
  {en: 'all day', ru: 'целый день'},
  {en: 'in the evening', ru: 'вечером'},
  {en: 'in the morning', ru: 'утром'},
  {en: 'so', ru: 'так'},
  {en: 'too', ru: ' тоже'},
  {en: 'a lot / lots of / much', ru: 'много'},
  {en: 'too much', ru: 'слишком много'},
  {en: 'little', ru: 'мало'},
  {en: 'any', ru: 'какие либо'},
  {en: 'more', ru: 'больше'},
  {en: 'less', ru: 'меньше'},
  {en: 'another', ru: 'другой (ед. числе)'},
  {en: 'other', ru: 'другие (множ. числе)'},
  {en: 'new', ru: 'новый'},
  {en: 'everything', ru: 'всё'},
  {en: 'inside', ru: 'внутри'},
  {en: 'hard-working', ru: 'трудолюбивый'},
  {en: 'lazy', ru: 'ленивый'},
  {en: 'best', ru: 'лучший'},
  {en: 'right', ru: 'правильный'},
  {en: 'married', ru: 'женатый'},
  {en: 'single', ru: 'холост'},
  {en: 'hungry', ru: 'голодный'},
  {en: 'thirsty', ru: 'жаждущий'},
  {en: 'stupid / silly / foolish', ru: 'тупой'},
  {en: 'clever (smart)', ru: 'умный'},
  {en: 'wrong', ru: 'неправильно, не прав'},
  {en: 'mistaken', ru: 'ошибочный'},
  {en: 'it\'s cold', ru: 'холодно'},
  {en: 'it\'s warm', ru: 'жарко'},
  {en: 'it\'s sunny', ru: 'солнечно'},
  {en: 'it\'s cloudy', ru: 'облачно'},
  {en: 'it\'s rainy', ru: 'дождливо'},
  {en: 'it\'s windy', ru: 'ветрено'},
  {en: 'strange', ru: 'странно'},
  {en: 'normal', ru: 'нормально'},
  {en: 'obvious', ru: 'очевидно'},
  {en: 'innovative', ru: 'инновационный'},
  {en: 'popular', ru: 'популярный'},
  {en: 'basic', ru: 'базовый'},
  {en: 'afraid', ru: 'испуганный, напуганный'},
  {en: 'difficult', ru: 'сложный'},
  {en: 'pregnant', ru: 'беременная'},
  {en: 'dangerous', ru: 'опасный'},
  {en: 'reliable', ru: 'надежный'},
  {en: 'funny', ru: 'смешной'},
  {en: 'brialliant', ru: 'блестящий'},
  {en: 'surprised', ru: 'удивлённый'},
  {en: 'well-paid', ru: 'хорошо - оплачиваемый'},
  {en: 'serious', ru: 'серьёзный'},
  {en: 'at all', ru: 'вовсе'},
  {en: 'experienced', ru: 'опытный'},
  {en: 'pleasant', ru: 'приятный'},
  {en: 'global', ru: 'глобальный'},
  {en: 'successful', ru: 'успешный'},
  {en: 'clear', ru: 'ясно'},
  {en: 'famous', ru: 'знаменитый'},
  {en: 'necessary', ru: 'необходимый'},
  {en: 'emotional', ru: 'эмоциональный'},
  {en: 'similar', ru: 'похожи, схожи'},
  {en: 'the same', ru: 'такие же'},
  {en: 'traditional', ru: 'традиционный'},
  {en: 'satisfactory', ru: 'удовлетворительный'},
  {en: 'informative', ru: 'информативный'},
  {en: 'independent', ru: 'независимый'},
  {en: 'outstanding', ru: 'выдающийся'},
  {en: 'special', ru: 'особый'},
  {en: 'unusual', ru: 'необычный'},
  {en: 'shocking', ru: 'шокирующий'},
  {en: 'available', ru: 'доступный'},
  {en: 'friendly', ru: 'дружелюбный'},
  {en: 'quite', ru: 'довольно, вполне'},
  {en: 'common', ru: 'распространённый'},
  {en: 'acceptable', ru: 'приемлемый'},
  {en: 'excellent', ru: 'отличный'},
  {en: 'amazing / surprising', ru: 'удивительный'},
  {en: 'unexpected', ru: 'неожиданный'},
  {en: 'divorced', ru: 'разведённый'},
  {en: 'most', ru: 'наиболее'},
  {en: 'fully', ru: 'полностью'},
  {en: 'sad', ru: 'грустно'},

  {en: 'now', ru: 'сейчас'},
  {en: 'right now', ru: 'прямо сейчас'},
  {en: 'confident', ru: 'уверен в себе'},
  {en: 'Dish', ru: 'Блюдо'},
  {en: 'Suit', ru: 'Костюм'},
  {en: 'Clothes', ru: 'Вещи (одежда)'},
  {en: 'Justice', ru: 'Справедливость'},
  {en: 'File', ru: 'Файл'},
  {en: 'Confidence', ru: 'Увереность'},
  {en: 'Professionalism', ru: 'Профессионализм'},
  {en: 'Guest', ru: 'Гость'},
  {en: 'Nowadays', ru: 'В настоящее время'},
];

var app = document.querySelector('#app')
var start = document.querySelector('#start')

var callFunctions = false;

start.addEventListener('click', function() {
  this.remove()
  generateWords()
});

var result = [];

function generateWords(){
  var h1 = document.querySelector('h1')
  var p = document.querySelector('p')
  var rand = Math.floor(Math.random() * words.length);

  if (result.indexOf(words[rand].ru) == -1) {
      result.push(words[rand].ru)
      h1.innerHTML = words[rand].ru
      h1.style.color = '#000000'
      p.innerHTML = ''

      function translate(){
        p.innerHTML = words[rand].ru
        h1.innerHTML = words[rand].en
        h1.style.color = '#f68729'
        if(!callFunctions){
          createButtons()
        }
        callFunctions = true
      }

      setTimeout(translate, 2000);
    } else if (result.length == words.length) {
      var per = Math.round(per = (right / result.length) * 100);
      alert('Вы успешно завершили упражнение!' + 'Ваш результат: ' + per + '%')
    } else {
      generateWords()
    }
  }

var buttonRight = document.createElement('button')
var buttonWrong = document.createElement('button')

function createButtons() {
  buttonRight.textContent = 'Right'
  app.appendChild(buttonRight)

  buttonWrong.innerHTML = 'Wrong'
  app.appendChild(buttonWrong)
}

function show(){
  buttonRight.removeAttribute('style')
  buttonWrong.removeAttribute('style')
}

var right = 0, wrong = 0

buttonRight.addEventListener('click', function(){
  right += 1
  buttonRight.style.display = 'none'
  buttonWrong.style.display = 'none'

  generateWords()

  setTimeout(show, 2000);
})

buttonWrong.addEventListener('click', function(){
  wrong += 1
  buttonRight.style.display = 'none'
  buttonWrong.style.display = 'none'

  generateWords()

  setTimeout(show, 2000);
})
