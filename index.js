const express = require('express');

const app = express();
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:code', (req, res) => {
    let { code } = req.params;
    res.render('display');
});

const PORT = process.env.SOAPSTONE_PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
