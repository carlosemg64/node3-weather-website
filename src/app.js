const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Carlos Martinez'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'CarlosMartinez'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help',
        title: 'Help',
        name: 'CarlosMartinez'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if (error) {
            return res.send({ error })
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            } 
            console.log(location)
            console.log(forecastData)
            return res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started')
})