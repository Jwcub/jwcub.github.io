/*
Skapad av Kevin Maninnerby, kema2501@student.miun.se
 */

"use strict";
// Invänta laddning av DOM
document.addEventListener("DOMContentLoaded", () => { 
    
    // Händelselyssnare
    document.getElementById("generate").addEventListener("click", generateCard);
    document.getElementById("clear").addEventListener("click", clearAll);  

   getStoredCards();
});

// Validera formulär och generera studentkort
function generateCard() {

    // Värden från formulär
    const studentName = document.getElementById("fullname").value;
    const studentEmail = document.getElementById("email").value;
    const studentPhone = document.getElementById("phone").value;
    const studentFont = document.getElementById("font").value;


    // Validera formulär
    const errorMessage = [];

    if(studentName === ""){
       errorMessage.push("Namn måste anges");
    }
    if(studentEmail === ""){
        errorMessage.push("E-post måste anges");
    }
    if(studentPhone === ""){
       errorMessage.push("Telefonnummer måste anges");
    }
      if(studentFont === ""){
       errorMessage.push("Typsnitt måste anges");
    }

    if(errorMessage.length > 0){ //Om felmeddelande finns, hoppa ur funktion
        // Visa felmeddelande som lista
        errorMessage.forEach((message) => {
        const errorListEl = document.getElementById("errorlist");
        const errorMessageEl = document.createElement("li");
        const errorText = document.createTextNode(message);
        errorMessageEl.appendChild(errorText);
        errorListEl.appendChild(errorMessageEl);
        }); return;
    } else {
        document.getElementById("errorlist").innerHTML = "";
    }

    // Lägg till namn till visitkort
    const fullNameEl = document.getElementById("previewfullname");
    fullNameEl.innerHTML = studentName;

    // Lägg till mejl till visitkort
    const emailEl = document.getElementById("previewemail");
    emailEl.innerHTML = studentEmail;

    // Lägg till telefonnr till visitkort
    const phoneEl = document.getElementById("previewphone");
    phoneEl.innerHTML = studentPhone;

    // Byt typsnitt på kort
    const cardEl = document.querySelector(".card");
    cardEl.style.fontFamily = `${studentFont}`

    // Lagra kort i webStorage
    storeCard();

    // Rensa input
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("font").value = "";
}

// Lagra till webStorage
function storeCard() {
    const studentCard = document.querySelectorAll(".card-info");
    let studentInfo = [];

    // Läs in studentinfo och lagra i en array
    studentCard.forEach((info) => {
    studentInfo.push(info.textContent);
    });
    
    // Lägger till typsnitt i lagrad info
    studentInfo.push(document.getElementById("font").value);

    // Hitta ledig plats i localStorage
    let count = localStorage.length; 
    let newCard = `StudentCard${count + 1}`;

    // Lagra studentinformation 
    localStorage.setItem(newCard, JSON.stringify(studentInfo));
}

// Hämta lagrade studentkort
function getStoredCards() {

    // Kontrollera om det finns information lagrad i WebStorage
    if(localStorage.length < 1) return;

    // DOM element för tidigare lagrade kort
    const historyEl = document.getElementById("history");

    // Iterarar genom lagrade studentkort
    for (let i = 0; i < localStorage.length; i++) {
        const card = localStorage.key(i);

        const storedInfo = localStorage.getItem(card);
        const storedInfoJs = JSON.parse(storedInfo);

        // Skapa <li> element och lägg till studentinformation
        const li = document.createElement("li");
        li.className = "stored-card";
        li.style.cursor = "pointer";
        li.textContent = storedInfoJs;
        historyEl.appendChild(li);

        // Använd lagrad data för att återsakapa studentkort
        li.addEventListener("click", () => {
        document.getElementById("previewfullname").textContent = storedInfoJs[0];
        document.getElementById("previewemail").textContent = storedInfoJs[1];
        document.getElementById("previewphone").textContent = storedInfoJs[2];
        document.querySelector(".card").style.fontFamily = storedInfoJs[3];
        });
    }
}

function clearAll() {

    // Sätter ursprungsvärde på titlar i studentkort
    document.getElementById("previewfullname").innerHTML = "Namn";
    document.getElementById("previewemail").innerHTML = "E-post";
    document.getElementById("previewphone").innerHTML = "Telefon";

    // Rensa felmeddelanden
    document.getElementById("errorlist").innerHTML = "";

    // Rensa Webbstorage
    localStorage.clear();

    // Laddar om sidan
    window.location.reload();
}