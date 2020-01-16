

document.querySelectorAll(".hour").forEach(element => {
    element.addEventListener("click", function() {
        document.querySelector(".closeButton").addEventListener("click", function() {
            document.querySelector(".modal").style.display = "none";
            document.location.reload();
        })

        if (this.classList.contains("booked") || this.classList.contains("passed")) {
            document.querySelector(".modal").style.display = "none";
        } else {
            let takenDate = parseInt(this.getAttribute("data-id")*1000);
            let now = new Date(st);

            people.addEventListener('change', function() {
                if(people.value == 3) {
                    i = 0;
                }
                if(people.value == 4) {
                    i = 1;
                }
                if(people.value == 5) {
                    i = 2;
                }
                if(people.value == 6) {
                    i = 3;
                }
                
                if(i < 2) {
                    document.querySelector("#gamemode").removeAttribute("disabled");
                } else {
                    document.querySelector("#gamemode").setAttribute("disabled", "");
                    document.querySelector("#gamemode").value = "Hardcore";
                }
            })

            document.querySelector(".modal").style.display = "flex";
            document.querySelector(".takenDate").textContent = `${new Date(takenDate).toLocaleDateString('en-GB', {timeZone: 'UTC'})} - ${msToHours(takenDate)}`;
            document.querySelector(".dateHiddenInput").value = new Date(takenDate).toLocaleDateString('en-GB', {timeZone: 'UTC'});
            document.querySelector(".hourHiddenInput").value = msToHours(takenDate);
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                var docRef = sawroomDB.collection("reservations").doc((parseInt(this.getAttribute("data-id"))*1000).toString());
                var privateDocRef = sawroomDB.collection("reservationsSecure").doc((parseInt(this.getAttribute("data-id"))*1000).toString());
                docRef.get().then(function(doc) {
                    if (doc.exists) {
                        console.log("Има я таа резервация, шми хакваш ли ся?");
                    } else 
                    if (new Intl.DateTimeFormat('en-GB',{timeZone: 'UTC', hour:'numeric',minute:'numeric'}).format(takenDate) !== "14:15" && 
                        new Intl.DateTimeFormat('en-GB',{timeZone: 'UTC', hour:'numeric',minute:'numeric'}).format(takenDate) !== "16:30" &&
                        new Intl.DateTimeFormat('en-GB',{timeZone: 'UTC', hour:'numeric',minute:'numeric'}).format(takenDate) !== "18:45" &&
                        new Intl.DateTimeFormat('en-GB',{timeZone: 'UTC', hour:'numeric',minute:'numeric'}).format(takenDate) !== "21:00") {
                        console.log("Така ни можи, батюшка :( ... Стига хаква, моля ти са :(");
                    } else {
                        // doc.data() will be undefined in this case
                        docRef.set({
                            booking: takenDate
                        })

                        privateDocRef.set({
                            name: form.name.value,
                            phone: form.phone.value,
                            email: form.email.value,
                            people: form.people.value,
                            money: prices[i],
                            teamname: form.teamname.value,
                            language: form.language.value,
                            discount: form.discount.value,
                            gamemode: form.gamemode.value,
                            fake: false,
                            status: '<i class="fas fa-minus-circle confirmation"></i>',
                            madeOn: Date.UTC(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds(),now.getMilliseconds()),
                            booking: takenDate,
                            firstOperator: firstOperator,
                            secondOperator: secondOperator,
                            timeInRoom: "00:00:00",
                            operatorReload: `<i class="operatorReload fas fa-redo"></i>`,
                            buttons: '<i id="editBooking" class="fas fa-pen"><span>Edit</span></i><i id="deleteBooking" class="fas fa-minus-square"><span>Delete</span></i>'
                        })

                        if(document.querySelector("#form-messages").textContent == "success") {
                            document.querySelector(".heading").style.display = "none";
                            form.innerHTML = `
                            <div class='heading'>ОК, ${form.name.value}, разбрахме те...</div>
                            Играе ти се нещо страшно... Ще го получиш. Часът ти е запазен.<br><br>
                            SawRoom 2: The Revenge не е обикновена стая, имай го предвид...<br>
                            Ще имате доста интересни моменти за разказване, след като приключим с вас.<br><br>
                            И запомнете... каквото и да се случва - не се съпротивлявайте и не се отказвайте, струва си да го изпитате!<br>
                            `;
                        } else {
                            document.querySelector(".heading").style.display = "none";
                            form.innerHTML = `
                            <div class='heading'>Нещо се обърка :(</div>
                            Не можахме да ти пратим имейл, сигурен ли си, че си въвел правилен имейл адрес? Опитай отново и ако грешката е някъде в нас, ни пиши или ни се обади, за да я оправим!
                            `;
                        }
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            })
        }
    })
})

function loadData(doc) {
    for (let i = 0; i < allHours.length; i++) {
        if (allHours[i].getAttribute("data-id")*1000 == doc.data().booking) {
            allHours[i].classList.add("booked");
        }
        if (allHours[i].classList.contains("passed")) {
            allHours[i].classList.remove("booked");
        }
        if(weekendHourSaturdayDiv.getAttribute("data-id")*1000 == doc.data().booking) {
            weekendHourSaturdayDiv.classList.add("booked");
        }
        if (weekendHourSaturdayDiv.classList.contains("passed")) {
            weekendHourSaturdayDiv.classList.remove("booked");
        }
        if(weekendHourSundayDiv.getAttribute("data-id")*1000 == doc.data().booking) {
            weekendHourSundayDiv.classList.add("booked");
        }
        if (weekendHourSundayDiv.classList.contains("passed")) {
            weekendHourSundayDiv.classList.remove("booked");
        }
    }
}

let todaysDateStart = todaysDate.getTime();

document.querySelector(".calendar").style.opacity = "0.2";
document.querySelector(".lds-roller").style.display = "none";

if (todaysDateStart >= new Date(st).getTime()){
    document.querySelector(".prevWeek").style.visibility = "visible";
}

// Firebase
sawroomDB.collection("reservations").where('booking', '>=', todaysDateStart).where('booking', '<=', todaysDateStart + newWeekHours).get().then(function(querySnapshot){
    if(querySnapshot.docs) {
        document.querySelector(".calendar").style.opacity = "1";
        document.querySelector(".lds-roller").style.display = "none";
    }
    querySnapshot.forEach(doc => {
       loadData(doc);
    });
  }).catch(err => {
     console.log('Error getting documents', err);
})

element(".nextWeek").addEventListener("click", function() {
    document.querySelector(".calendar").style.opacity = "0.2";
    document.querySelector(".lds-roller").style.display = "inline-block";
    todaysDateStart = todaysDateStart + newWeekHours;
    if (todaysDateStart >= new Date(st).getTime()){
        document.querySelector(".prevWeek").style.visibility = "visible";
    }
    sawroomDB.collection("reservations").where('booking', '>=', todaysDateStart).where('booking', '<=', todaysDateStart + newWeekHours).get().then(function(querySnapshot){
        if(querySnapshot.docs) {
            document.querySelector(".calendar").style.opacity = "1";
            document.querySelector(".lds-roller").style.display = "none";
        }
        querySnapshot.forEach(doc => {
           loadData(doc);
        });
      }).catch(err => {
         console.log('Error getting documents', err);
    })
});

element(".prevWeek").addEventListener("click", function() {
    document.querySelector(".calendar").style.opacity = "0.2";
    document.querySelector(".lds-roller").style.display = "inline-block";
    todaysDateStart = todaysDateStart - newWeekHours;
    if (todaysDateStart < new Date(st).getTime()) {
        document.querySelector(".prevWeek").style.visibility = "hidden";
    } 
    sawroomDB.collection("reservations").where('booking', '>=', todaysDateStart).where('booking', '<=', todaysDateStart + newWeekHours).get().then(function(querySnapshot){
        if(querySnapshot.docs) {
            document.querySelector(".calendar").style.opacity = "1";
            document.querySelector(".lds-roller").style.display = "none";
        }
        querySnapshot.forEach(doc => {
            loadData(doc);
        });
      }).catch(err => {
         console.log('Error getting documents', err);
    })
});