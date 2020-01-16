// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAtJpHOBflkuYFaWomFtN_uheNRg5f3yHY",
    authDomain: "sawroom3gameover.firebaseapp.com",
    databaseURL: "https://sawroom3gameover.firebaseio.com",
    projectId: "sawroom3gameover",
    storageBucket: "",
    messagingSenderId: "411484034492",
    appId: "1:411484034492:web:42d2e4308fa3bcb1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const sawroomDB = db.collection("SawRoom").doc("SawRoom3");

// All the times are in milliseconds
// How much is the gap between the hours
const gapBetweenNextHour = 8100000;
// When is the first hour
const firstHour = 61200000;

function msToHours(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

// When is the last hour
const lastHourInLocale = msToHours(77400000); // Change this and "lastHour" respectively
const lastHour = 77400000;

// Prices
const prices = [115, 140, 160, 180];

// Operators
const firstOperator = `<select class="operator firstOperator"><option id="op1" value="">--</option><option id="op1">Иван</option><option id="op1">Стенли</option></select>`
const secondOperator = `<select class="operator secondOperator"><option id="op2" value="">--</option><option id="op2">Иван</option><option id="op2">Стенли</option></select>`