// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB6vVkAtBopUCCkbrbdtjVBoKby4xd1nRA",
    authDomain: "sawroomthebeginning.firebaseapp.com",
    databaseURL: "https://sawroomthebeginning.firebaseio.com",
    projectId: "sawroomthebeginning",
    storageBucket: "sawroomthebeginning.appspot.com",
    messagingSenderId: "532529791907",
    appId: "1:532529791907:web:e3bc67860e741e19"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const sawroomDB = db.collection("SawRoom").doc("SawRoom");

// All the times are in miliseconds
// How much is the gap between the hours
const gapBetweenNextHour = 6300000;
// When is the first hour
const firstHour = 62100000;

function msToHours(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes;
}

// When is the last hour
const lastHourInLocale = msToHours(74700000); // Change this and "lastHour" respectively
const lastHour = 74700000;

// Prices
const prices = [70, 90, 110, 120, 130];

// Operators
const firstOperator = `<select class="operator firstOperator"><option id="op1" value="">--</option><option id="op1">Жоро</option><option id="op1">Оги</option></select>`
const secondOperator = `<select class="operator secondOperator"><option id="op2" value="">--</option><option id="op2">Жоро</option><option id="op2">Оги</option></select>`