var TelegramBot = require('node-telegram-bot-api');

var token = '1228827108:AAHsPCjv4dJGXmb_L8jMIPxD1IAw-jS25q4';

var bot = new TelegramBot(token, { polling: true });

var cron = require('cron')
var CronJob = cron.CronJob

var express = require('express');
var app = express();

var users = {}
var white_list = ['archiebatman', 'yerbols', 'whereisaiman']
var subscribedUsers = {}

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
  if (!white_list.includes(username)) {
    bot.sendMessage(chatId, 'Ты кто такой?! я тебя не звал, пошел нахерово отсюда').then(f => f)
    return
  }
  bot.sendMessage(chatId, '*Приветствуем самую красивую и мегаталантливую девушку на свете\\!*\n' +
    '\n' +
    '*Правила игры\\:*  \n' +
    'Ежедневно от 10 до 15 числа вы будете получать 5 вопросов в 11 утра, на которую должны ответить правильно, за каждый правильный ответ вы зарабатываете 1 балл\\.\n' +
    '\n' +
    'После вас ждет второй тур данного квеста, желаю удачи\\! \n' +
    'Познавательной вам игры\\!',
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

function sendPoll(poll, chatId) {
  console.log(`poll '${poll.question}' sent to ${chatId} (@${users[chatId]})`)
  bot.sendPoll(chatId, poll.question, poll.options, {
    is_anonymous: false,
    type: 'quiz',
    correct_option_id: poll.answer,
  }).then((msg) => {
    pollEntities.push(msg)
  })
}

bot.onText(/\/send_poll/, (msg) => {
  const chatId = msg.chat.id
  sendPoll(test_polls[Math.round(Math.random() * test_polls.length) % test_polls.length], chatId)
})

polls.forEach(poll => {
  new CronJob(poll.sendDate.format('s m H D * *'), () => {
    console.log(users)
    Object.keys(subscribedUsers).forEach((chatId) => {
      sendPoll(poll, chatId)
    })
  }, null, true, 'Asia/Almaty')
})

test_polls.forEach(poll => {
  new CronJob(poll.sendDate.format('s m H D * *'), () => {
    console.log(users)
    Object.keys(subscribedUsers).forEach((chatId) => {
      sendPoll(poll, chatId)
    })
  }, null, true, 'Asia/Almaty')
})

let updates;
setInterval(() => {
  bot.getChat(254410503).then(u => updates = u)
}, 3000)

app.get('/', async (req, res) => {
  res.send(`
    <pre>${JSON.stringify(users, null, '  ')}</pre>
    <br/>
    <pre>${JSON.stringify(pollEntities, null, '  ')}</pre>
    <pre>${JSON.stringify(updates, null, '  ')}</pre>
  `)
})

app.listen(process.env.PORT || 3000)

setInterval(() => {
  console.log('health monitor is alive', moment().format('HH:mm DD.MM.YYYY'))
}, 1000 * 60 * 5)
