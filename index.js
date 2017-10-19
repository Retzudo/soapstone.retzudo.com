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

    res.send(codeToMessage(code));
});

const PORT = process.env.SOAPSTONE_PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
