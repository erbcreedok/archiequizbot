var TelegramBot = require('node-telegram-bot-api');
var moment = require('moment')
var token = '1228827108:AAHsPCjv4dJGXmb_L8jMIPxD1IAw-jS25q4';
var request = require('request').defaults({ encoding: null });
var bot = new TelegramBot(token, { polling: true });

var cron = require('cron')
var CronJob = cron.CronJob

var express = require('express');
var app = express();

var test_users = {'254410503': 'yerbols', '462848442': 'archiebatman'}
var subscribedUsers = {'254410503': 'yerbols', '462848442': 'archiebatman', '473898662': 'whereisaiman'}
var users = {...subscribedUsers}
var white_list = ['archiebatman', 'yerbols', 'whereisaiman']

var pollEntities = []

bot.on('message', function (msg) {
  var chatId = msg.from.id
  var username = msg.from.username
  users[chatId] = username
  if (white_list.includes(username)) {
    subscribedUsers[chatId] = username
  }
})

bot.onText(/\/start/, function (msg) {
  var chatId = msg.from.id
  var username = msg.from.username
  if (!white_list.includes(username)) {
    bot.sendMessage(chatId, 'Ты кто такой?! Я тебя не знаю').then(f => f)
    return
  }
  bot.sendMessage(chatId, '*Приветствуем самую красивую и мегаталантливую девушку на свете\\!*\n' +
    '\n' +
    '*Правила игры\\:*  \n' +
    'Ежедневно с 10 по 15 июня Вы будете получать по 1 вопросу в 11:00 утра, на которые Вы должны будете ответить\\.\n' +
    'За каждый правильный ответ Вы получаете «1 балл»\n\n' +
    'После вас ждет второй тур данного квеста, желаю удачи\\! \n' +
    'Познавательной вам игры\\!'
    ,
    {parse_mode: 'MarkdownV2'}).then(() => {
  })
})

// ['poll', 'callback_query', 'inline_query', 'chosen_inline_result', 'audio', 'message'].forEach(event => {
//   bot.on(event, (msg) => {
//     console.log(event, msg)
//   })
// })

var polls = require('./polls.js')
var test_polls = require('./test_polls.js')

// function sendPoll(poll, chatId) {
//   console.log(`poll '${poll.question}' sent to ${chatId} (@${users[chatId]})`)
//   bot.sendPoll(chatId, poll.question, poll.options, {
//     is_anonymous: false,
//     type: 'quiz',
//     correct_option_id: poll.answer,
//   }).then((msg) => {
//     pollEntities.push(msg)
//   })
// }

// function sendNextMessage(chatId) {
//   console.log(`next message have been sent tot ${chatId} (${users[chatId]})`)
//   bot.sendMessage(
//     chatId,
//     'Сегодня, то есть _15 числа в 21:00_ жду вас в «Take it Easy»\\.\n' +
//     '*Правила игры:*\n' +
//     'быть в том красном платье, что носили при нашей встрече\\.\n' +
//     'Столик на имя Арчи',
//     {parse_mode: 'MarkdownV2'}
//   ).then(f => f)
// }

// bot.onText(/\/send_poll/, (msg) => {
//   const chatId = msg.chat.id
//   sendPoll(test_polls[Math.round(Math.random() * test_polls.length) % test_polls.length], chatId)
// })


app.get('/', async (req, res) => {
  res.send(`
    <pre>${JSON.stringify(users, null, '  ')}</pre>
    <br/>
    <pre>${JSON.stringify(pollEntities, null, '  ')}</pre>
  `)
})

app.listen(process.env.PORT || 3000)


setInterval(() => {
  console.log('healsth monitor is alive', moment().format('HH:mm DD.MM.YYYY'))
}, 1000 * 30)

function sendImage(chatId, data) {
  console.log(`photo ${data} have been sent to ${chatId} (${users[chatId]})`)
  bot.sendPhoto(chatId, data).then((f) => f)
}


bot.on('photo', (msg) => {
  const sendToEveryone = moment().isAfter(moment('17:00 15.06.2020', 'HH:mm DD.MM.YYYY'))
  let sendTo = Object.keys(test_users)
  console.log('sendToEveryone', sendToEveryone)
  if (sendToEveryone) {
    sendTo = Object.keys(test_users)
  }
  if (['archiebatman', 'yerbols'].includes(users[msg.chat.id])) {
    const file_id = msg.photo[0].file_id
    console.log('file_id', file_id)
    sendTo.forEach(id => {
      sendImage(id, file_id)
    })
  }
})
