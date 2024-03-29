const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageTwo.textContent = 'Loading...'
    fetch('/weather?address='+location).then( (response) => {
    response.json().then( (data) => {
    if(data.error)
        {   messageTwo.textContent = data.error
            console.log(data.error)
    } else {
    messageTwo.textContent = data.location + data.forecast
    console.log(data.location)
    console.log(data.forecast)
    }
    })
}) 
})  