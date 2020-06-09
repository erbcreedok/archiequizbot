const moment = require('moment')
const polls = [
  {
    sendDate: moment('15:30 09.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Кто создал Apple?',
    options: [
      'Del Papa',
      'Steve Jobs',
      'Mirus Kurmashev',
      'Bill Gates',
    ],
    answer: 1
  },
  {
    sendDate: moment('16:15 09.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Кто из этих героев не является персонажем Overwatch?',
    options: [
      'Батист',
      'Эхо',
      'Феникс',
      'Мойра',
    ],
    answer: 2
  },
  {
    sendDate: moment('15:00 09.06.2020','HH:mm DD.MM.YYYY'),
    question: 'В каком альбоме Скриптонита появилась песня "Братик 2"',
    options: [
      'Зеркала',
      'Улица 36',
      'Праздник на улице 36',
      '2004',
    ],
    answer: 0
  },
  {
    sendDate: moment('17:00 09.06.2020','HH:mm DD.MM.YYYY'),
    question: 'Какую единцу измерения использует тахометр?',
    options: [
      'тах',
      'ом',
      'обороты в секунду',
      'ньютоны',
    ],
    answer: 2
  },
  {
    sendDate: moment('20:00 09.06.2020','HH:mm DD.MM.YYYY'),
    question: 'В какой роли появился один из режиссеров фильма "Мстители: Финал" - Джо Руссо, в одноименном фильме?',
    options: [
      'Охранника на стоянке',
      'Какого то гея',
      'Старого Скотта Лэнга',
      'Одного из инопланетян',
    ],
    answer: 1
  },
]

module.exports = polls
