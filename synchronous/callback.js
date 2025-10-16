const name = "vishal";

function login(cb) {
  setTimeout(() => {
    console.log(`${name} logged in successfully`);
    cb();
  }, 1000);
}

function getData(cb) {
  setTimeout(() => {
    console.log("Data fetched sucessfully");
    cb();
  }, 8000);
}

function calculateData(cb) {
  setTimeout(() => {
    console.log("Data calculated sucessfully");
    cb();
  }, 3000);
}

function sendSMS(cb) {
  setTimeout(() => {
    console.log("Message sent sucessfully");
    cb();
  }, 3000);
}

function logout() {
  setTimeout(() => {
    console.log(`${name} logged out successfully`);
  }, 3000);
}

// This is the callback hell
login(() => {
  getData(() => {
    calculateData(() => {
      sendSMS(() => {
        logout();
      });
    });
  });
});