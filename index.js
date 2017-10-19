const express = require('express');

const app = express();
app.set('view engine', 'pug');

app.get('/:code', (req, res) => {
    let { code } = req.params;
    if (!code) {
        res.render('index');
    } else {
        res.render('display');
    }
});
