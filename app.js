const express = require('express');

const { codeToMessage } = require('./code');

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:code', (req, res) => {
    let { code } = req.params;
    let message = codeToMessage(code);
    let fullMessage = [message.partOne, message.conjunction, message.partTwo].join(' ').trim();

    res.render('display', Object.assign(message, {
      code,
      fullMessage
    }));
});

module.exports = app;
