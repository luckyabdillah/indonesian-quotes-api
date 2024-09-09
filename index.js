const express = require('express')
const cors = require('cors')
const path = require('path')
const api = require("./routes/api.js")
const app = express()
const port = process.env.PORT || 3000

// Middleware Setup
app.use(cors())
app.set("json spaces", 2)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))

app.use(express.json()) // Parsing JSON request body

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/guide', (req, res) => {
    res.render('guide')
})

app.get('/api', (req, res) => {
    res.render('api')
})

app.use('/api', api)

app.listen(port, () => {
    console.log(`Indonesian Quotes API app listening on port ${port}`)
})