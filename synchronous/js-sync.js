const name = "vishal"

function login() {
    setTimeout(() => {
        console.log(`${name} logged in successfully`)
    }, 1000)
}

function getData() {
    setTimeout(() => {
        console.log("Data fetched sucessfully");
    }, 8000)
}

function calculateData() {
    setTimeout(() => {
        console.log("Data calculated sucessfully");
    }, 3000)
}

function sendSMS() {
    setTimeout(() => {
        console.log("Message sent sucessfully");
    }, 3000)
}

function logout() {
    setTimeout(() => {
        console.log(`${name} logged out successfully`)
    }, 3000)
}

login()
getData()
calculateData()
sendSMS()
logout()