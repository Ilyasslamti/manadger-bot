const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// --- إعداد سيرفر ويب بسيط لمنع توقف البوت ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>Manadger Bot is Alive! 🤖</h1>');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// --- إعدادات البوت ---
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
        executablePath: '/usr/bin/google-chrome-stable'
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Client is ready!');
});

client.on('message', async msg => {
    const text = msg.body.toLowerCase();

    if (text === 'ping') {
        msg.reply('pong');
    }
    
    else if (text === 'menu' || text === 'سلام') {
        msg.reply('مرحباً بك في منادجر تك 💻\n\n1. خدماتنا\n2. الدعم الفني\n\nأرسل الرقم للاختيار.');
    }
});

client.initialize();
