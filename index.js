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

bot.onText(/\/start/, function (msg) {
  var chatId = msg.from.id
  var username = msg.from.username
  users[chatId] = username
  if (!white_list.includes(username)) {
    bot.sendMessage(chatId, 'Ты кто такой?! я тебя не звал, пошел нахерово отсюда')
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
    subscribedUsers[chatId] = username
  })
})

// ['poll', 'callback_query', 'inline_query', 'chosen_inline_result', 'audio', 'message'].forEach(event => {
//   bot.on(event, (msg) => {
//     console.log(event, msg)
//   })
// })

var polls = require('./polls.js')

polls.forEach(poll => {
  new CronJob(poll.sendDate.format('s m H D * *'), () => {
    console.log(users)
    Object.keys(subscribedUsers).forEach((chatId) => {
      bot.sendPoll(chatId, poll.question, poll.options, {
        is_anonymous: false,
        type: 'quiz',
        correct_option_id: poll.answer,
      }).then((...args) => {
        // console.log('args', ...args)
      })
    })
  }, null, true, 'Asia/Almaty')
})

app.get('/', (req, res) => {
  res.send(JSON.stringify(users))
})

app.listen(process.env.PORT || 3000)
