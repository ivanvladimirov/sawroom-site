// Get Today's Date
var xmlHttp;
function srvTime(){
    try {
        //FF, Opera, Safari, Chrome
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        //IE
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (eerr3) {
                //AJAX not supported, use CPU time.
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD',window.location.href.toString(),false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date");
}

var st = srvTime();

let todaysDate = new Date(st);
todaysDate.setUTCHours(0,0,0,0);

// Week Days Renaming
let weekDay = new Array(7);
weekDay[0] = "Sunday";
weekDay[1] = "Monday";
weekDay[2] = "Tuesday";
weekDay[3] = "Wednesday";
weekDay[4] = "Thirsday";
weekDay[5] = "Friday";
weekDay[6] = "Saturday";

// Date Formatting
let DD = todaysDate.getUTCDate(),
    MM = todaysDate.getUTCMonth() + 1,
    YYYY = todaysDate.getUTCFullYear();

// Selector based functions minify
function append(parent, child) {
    return parent.appendChild(child);
}

function element(selector) {
    return document.querySelector(selector);
}

function create(selector) {
    return document.createElement(selector);
}

// Day Declarations
let startDate = element(".date").textContent = `${DD}/${MM}/${YYYY}`;
let allWeekDays = document.querySelectorAll(".weekDay");
let allDates = document.querySelectorAll(".date");
let newWeek = -1;

function daysInMonth (month, year) {
    return new Date(year, month, 0).getUTCDate();
}

// All the times are in milliseconds!
let oneDay = 86400000; //24 Hours

// Block front-end hours after that time
const sameDayHours = 21600000; // Currently 6 hours

let hoursIncrement = 0;
let newWeekHours = 604800000;
let todaysDatePlusFirstHour = todaysDate.getTime() + firstHour - gapBetweenNextHour;

let allHoursDiv = document.querySelectorAll(".hours");

// Display all weekdays and dates
let datesIncrement = 0;
let todaysDateNow = new Date(st).getTime();

for (let i = 0; i < allDates.length; i++) {
    // Set "data-day" to know if it's a weekend day
    let nextDay = todaysDate.getUTCDay() + i;
    
    if (nextDay == 0) {
        nextDay = 7;
    }

    allHoursDiv[i].setAttribute("data-day", nextDay);

    if (nextDay > 7) {
        newWeek++;
        allWeekDays[i].textContent = weekDay[newWeek];
    };

    // Dates
    datesIncrement += oneDay;
    let dates = todaysDateNow + datesIncrement - oneDay;
    allDates[i].textContent = new Date(dates).toLocaleDateString('en-GB', {timeZone: 'UTC'});
    allWeekDays[i].textContent = new Date(dates).toLocaleDateString('en-GB', {timeZone: 'UTC', weekday: 'long'});

    element(".nextWeek").addEventListener("click", function() {
        dates = dates + newWeekHours;
        allDates[i].textContent = new Date(dates).toLocaleDateString('en-GB', {timeZone: 'UTC'});
    });

    element(".prevWeek").addEventListener("click", function() {
        dates = dates - newWeekHours;
        allDates[i].textContent = new Date(dates).toLocaleDateString('en-GB', {timeZone: 'UTC'});
    });
}

// weekendHoursFirst.classList.add("hour");
// weekendHoursSecond.classList.add("hour");
// document.querySelector('.hours[data-day=\"7\"').prepend(weekendHoursSecond);
// document.querySelector('.hours[data-day=\"7\"').prepend(weekendHoursFirst);

let weekendHourSaturdayDiv = document.createElement("div");
let weekendHourSundayDiv = document.createElement("div");
weekendHourSaturdayDiv.classList.add("hour");
weekendHourSundayDiv.classList.add("hour");

var allHours = document.querySelectorAll(".hour");

let saturday = document.querySelector('.hours[data-day=\"6\"');
let sunday = document.querySelector('.hours[data-day=\"7\"');

for (let i = 0; i < allHours.length; i++) {
    hoursIncrement += gapBetweenNextHour;
    let hours = todaysDatePlusFirstHour + hoursIncrement;
    allHours[i].textContent = msToHours(hours);
    allHours[i].setAttribute("data-id", hours/1000);

    saturday.prepend(weekendHourSaturdayDiv);
    weekendHourSaturdayDiv.textContent = msToHours(parseInt(saturday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour);
    weekendHourSaturdayDiv.setAttribute("data-id", (parseInt(saturday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)
    sunday.prepend(weekendHourSundayDiv);
    weekendHourSundayDiv.textContent = msToHours(parseInt(sunday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour);
    weekendHourSundayDiv.setAttribute("data-id", (parseInt(sunday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)

    // Make every day with the same hours
    if(msToHours(hours) == lastHourInLocale) {
        hoursIncrement += 86400000 - (lastHour - firstHour + gapBetweenNextHour);
    }

    if (todaysDate.getTime() + oneDay >= allHours[i].getAttribute("data-id")*1000) {
        allHours[i].classList = "sameDay hour";
    }

    if (todaysDate.getTime() + oneDay >= weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
        weekendHourSaturdayDiv.classList = "sameDay hour";
    }

    // If the hour has passed, assign class name "passed"
    if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > allHours[i].getAttribute("data-id")*1000) {
        allHours[i].className = "passed hour";
    }

    element(".nextWeek").addEventListener("click", function() {
        hours = hours + newWeekHours;
        // Change Hours
        // allHours[i].textContent = msToHours(hours);
        
        allHours[i].setAttribute("data-id", hours/1000);
        weekendHourSaturdayDiv.setAttribute("data-id", (parseInt(saturday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)

        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
            weekendHourSaturdayDiv.className = "passed";
        } 
        else
        if (todaysDate.getTime() + oneDay >= weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
            weekendHourSaturdayDiv.classList = "sameDay hour";
        } else {
            weekendHourSaturdayDiv.className = "hour"
        }
            
        weekendHourSundayDiv.setAttribute("data-id", (parseInt(sunday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)

        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSundayDiv.getAttribute("data-id")*1000) {
            weekendHourSundayDiv.className = "passed";
        } 
        else if (todaysDate.getTime() + oneDay >= weekendHourSundayDiv.getAttribute("data-id")*1000) {
            weekendHourSundayDiv.classList = "sameDay hour";
        } else{
            weekendHourSundayDiv.className = "hour"
        }

        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > allHours[i].getAttribute("data-id")*1000) {
            allHours[i].className = "passed";
        } 
        else 
        if (todaysDate.getTime() + oneDay >= allHours[i].getAttribute("data-id")*1000) {
            allHours[i].classList = "sameDay hour";
        } else {
            allHours[i].className = "hour";
        }
    })

    element(".prevWeek").addEventListener("click", function() {
        hours = hours - newWeekHours;
        // Change Hours
        // allHours[i].textContent = msToHours(hours);
        allHours[i].setAttribute("data-id", hours/1000);
        weekendHourSaturdayDiv.setAttribute("data-id", (parseInt(saturday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)
        
        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
            weekendHourSaturdayDiv.className = "passed";
        } 
        else
        if (todaysDate.getTime() + oneDay >= weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
            weekendHourSaturdayDiv.classList = "sameDay hour";
        } else {
            weekendHourSaturdayDiv.className = "hour"
        }
        
        weekendHourSundayDiv.setAttribute("data-id", (parseInt(sunday.children[1].getAttribute("data-id"))*1000 - gapBetweenNextHour)/1000)

        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSundayDiv.getAttribute("data-id")*1000) {
            weekendHourSundayDiv.className = "passed";
        } 
        else if (todaysDate.getTime() + oneDay >= weekendHourSundayDiv.getAttribute("data-id")*1000) {
            weekendHourSundayDiv.classList = "sameDay hour";
        } else{
            weekendHourSundayDiv.className = "hour"
        }
        
        if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > allHours[i].getAttribute("data-id")*1000) {
            allHours[i].className = "passed";
        } 
        else 
        if (todaysDate.getTime() + oneDay >= allHours[i].getAttribute("data-id")*1000) {
            allHours[i].classList = "sameDay hour";
        } else {
            allHours[i].className = "hour";
        }
    })
};

if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSaturdayDiv.getAttribute("data-id")*1000) {
    weekendHourSaturdayDiv.className = "passed hour";
}

if ((new Date(st).getTime() + gapBetweenNextHour + sameDayHours) > weekendHourSundayDiv.getAttribute("data-id")*1000) {
    weekendHourSundayDiv.className = "passed hour";
}

const form = document.querySelector("#reservation");
const people = document.querySelector("#people");

// Assign all prices on the blood splats and how much it is per person
for (let i = 0; i < document.querySelectorAll(".price-tag").length; i++) {
    if(prices.length == 5) {
        var minimumPeople = 2;
        var divider = 1;
    } else if (prices.length == 4){
        var minimumPeople = 3;
        var divider = 2;
    }
    document.querySelectorAll(".price-tag")[i].textContent = `${prices[i]}leva`
    document.querySelectorAll(".per-person")[i].textContent = `${Math.round(prices[i]/(minimumPeople+i))} per person`

    document.querySelector(".big").textContent = `${Math.round(prices.slice(-1)[0] / (prices.length + divider))}leva`;
}

// Set Copyright year

document.querySelector("#copyrightYear").textContent = todaysDate.getUTCFullYear();