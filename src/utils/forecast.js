const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/75eb28f7b2f810b4415415afa85e6f60/'+latitude+','+longitude+'?units=si'
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to darksky', undefined)
        } else if(body.error) {
            callback('Unable to find location in darksky', undefined)
        } else {
            callback(undefined, 'Hi there!. ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast