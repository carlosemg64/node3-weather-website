const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FybG9zZW1nNjQiLCJhIjoiY2p5M2FsdXAxMDNhZDNtcDNrc2EydWNwdyJ9.achJshjbdIxEo2j8QSyytQ&limit=1'
    
    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode