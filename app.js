const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// const client = new Client();

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

let isMsgOpen = false;

let savedMSg = '';

client.on('message', (message) => {

    console.log("isMsgOpen", isMsgOpen);


    if (isMsgOpen) {
        savedMSg = message.body
        isMsgOpen = false
        message.reply('got your msg');
        return;
    }


    if (message.body === 'hello') {
        message.reply('Hiiiii');
    }


    if (message.body === '/enter') {
        isMsgOpen = true
        message.reply('OK, enter your msg');
    }



    if (message.body === 'speak') {
        message.reply(savedMSg);
    }

});




