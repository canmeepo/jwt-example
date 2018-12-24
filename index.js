const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8888;

const usersMock = [
    {id: 1, name: 'admin', password: 'admin'},
    {id: 2, name: 'root', password: 'root'}
]

app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.status(400).send('not vaolid');

        return;
    }

    const user = usersMock.find(x => {
        return x.name === req.body.name && x.password === req.body.password;
    })

    if (!user) {
        res.status(401).send('user not found');

        return;
    }

    const token = jwt.sign({
        sub: user.id,
        name: user.name
    }, 'salt', {expiresIn: "3 hours"});

    res.status(200).send({authtoken: token});
})

app.get("/public", (req, res) => {
    res.status(200).send('public api')
})

app.get("/public", (req, res) => {
    res.status(200).send('public api')
})

app.get("*", (req, res) => {
    res.status(404).send('not foudn')
})

app.listen(PORT, () => {
    console.log(`Server is running in ${PORT}`)
})