import Telegraf from 'telegraf';
// import * as micromq from "micromq";
const debug = require('debug')('bot');
const MicroMQ = require('micromq');
const BOT_TOKEN: string = process.env.BOT_TOKEN || '';
const USERNAME: string = process.env.USERNAME || '';
const PORT: number = (process.env.PORT && parseInt(process.env.PORT, 10)) || 3000;
const WEBHOOK_URL: string = `${process.env.WEBHOOK_URL}/bot${BOT_TOKEN}`;

const bot = new Telegraf(BOT_TOKEN, { username: USERNAME });

const logsReceivers = [457241844, 426506251, 336995517];

bot.start((ctx) => ctx.reply('Listening for CTS logs from strategies...'));

// const app = new MicroMQ({
//   name: 'notifications',
//   rabbit: {
//     url: process.env.RABBIT_URL,
//   },
// });

// app.action('notify', (meta: any) => {
//   logsReceivers.forEach(receiver => {
//     // bot.telegram.sendMessage(receiver, "Ну в общем я закупился по нормальной цене поэтому пососи мой член");
//   })
// });



const production = () : void => {
  debug('Bot runs in production mode');
  debug(`${USERNAME} setting webhook: ${WEBHOOK_URL}`);
  bot.telegram.setWebhook(WEBHOOK_URL);
  debug(`${USERNAME} starting webhook on port: ${PORT}`);
  bot.startWebhook(`/bot${BOT_TOKEN}`, null, PORT);
};

const development = () : void => {
  debug('Bot runs in development mode');
  debug(`${USERNAME} deleting webhook`);
  bot.telegram.deleteWebhook();
  debug(`${USERNAME} starting polling`);
  bot.startPolling();
};

process.env.NODE_ENV === 'production' ? production() : development();
