const moment = require('moment')
const polls = [
  {
    sendDate: moment('20:55 08.06.2020','HH:mm DD.MM.YYYY'),
    question: 'В какое заведения я тебя пригласил на первую встречу',
    options: [
      'Del Papa',
      'Дареджани',
      'Rumi',
      'Take it Easy',
    ],
    answer: 3
  },
  {
    sendDate: moment('20:56 08.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Как назывался фильм, на который я тебя впервые пригласил?',
    options: [
      'Лед 2',
      'Аким',
      'Русалка в Париже',
      'Главный герой',
    ],
    answer: 1
  },
  {
    sendDate: moment('20:37 08.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Какая песня ассоциировалась у меня во время нашего знакомства?',
    options: [
      'Billie Eilish - Bellyache',
      'Анжелика Варум - Все в твоих руках',
      'Khalid - Location',
      'Jason Mraz - I’m yours',
    ],
    answer: 1
  },
  {
    sendDate: moment('20:38 08.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Какую книгу подарил мне твой Отец при знакомстве?',
    options: [
      'От нуля к единице',
      'Богатый Папа бедный Папа',
      'Думай и богатей',
      'Граф Монте Кристо',
    ],
    answer: 2
  },
  {
    sendDate: moment('20:39 08.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Как называется футбольная команда, за которую я болею?',
    options: [
      'Манчестер Юнайтед',
      'Челси',
      'Арсенал',
      'Реал Мадрид',
    ],
    answer: 2
  },
]

module.exports = polls
