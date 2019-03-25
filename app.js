const express = require('express')
const app = express()
const port = 3000
const mock_data = require('./mock_data');


app.get('/', (req, res) => res.send(mock_data))

app.get('/:name', (req, res) => res.send('Hi ' + req.params.name))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))