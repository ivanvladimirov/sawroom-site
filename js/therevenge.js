// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAx6C3HDVmMFUluj3A5odaErJ608FpW20g",
    authDomain: "sawroom2therevenge.firebaseapp.com",
    databaseURL: "https://sawroom2therevenge.firebaseio.com",
    projectId: "sawroom2therevenge",
    storageBucket: "sawroom2therevenge.appspot.com",
    messagingSenderId: "334966803157",
    appId: "1:334966803157:web:c2391b3f3777ac71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const sawroomDB = db.collection("SawRoom").doc("SawRoom2");

// All the times are in miliseconds
// How much is the gap between the hours
const gapBetweenNextHour = 8100000;
// When is the first hour
const firstHour = 59400000;

function msToHours(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

// When is the last hour
const lastHourInLocale = msToHours(75600000); // Change this and "lastHour" respectively
const lastHour = 75600000;

// Prices
const prices = [100, 120, 140, 160];

// Operators
const firstOperator = `<select class="operator firstOperator"><option id="op1" value="">--</option><option id="op1">Жоро</option><option id="op1">Иван</option><option id="op1">Оги</option><option id="op1">Стенли</option></select>`
const secondOperator = `<select class="operator secondOperator"><option id="op2" value="">--</option><option id="op2">Жоро</option><option id="op2">Иван</option><option id="op2">Оги</option><option id="op2">Стенли</option></select>`