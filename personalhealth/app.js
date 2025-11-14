document.querySelector("#medicine-section button").addEventListener("click",function(){
    document.querySelector("#popupform").style.display="flex";
});
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popupform").style.display = "none";
});

document.getElementById("saveMed").addEventListener("click",function(){
    console.log("button clicked");
    let name=document.querySelector("#medName").value;
    let time=document.querySelector("#medTime").value;
    let notes=document.querySelector("#medNotes").value;

    if(!name||!time){
        alert("please enter Medicine Name and Time");
        return;
    }
    let reminder={
        name:name,
        time:time,
        notes:notes

    };
    let reminders=JSON.parse(localStorage.getItem('medReminders'))||[];
    reminders.push(reminder);
    localStorage.setItem("medReminders",JSON.stringify(reminders));
    alert("Medicine Reminder Saved");
    document.querySelector("#popupform").style.display="none";
    
})
setInterval(()=>{
    let reminders=JSON.parse(localStorage.getItem("medReminders"))||[];
    let now=new Date();
    console.log(now);
    let currentTime=now.toTimeString().slice(0,5);
    reminders.forEach(reminder=>{
        if(reminder.time===currentTime){
            let medCard=document.getElementById("medicine-section");
            medCard.style.background="#fff3cd";
            medCard.innerHTML=`
                <h2>Medicine Reminder 🔔</h2>
                <p><strong>${reminder.name}</strong> — ${reminder.notes || ""}</p>
                <p>⏰ Time: ${reminder.time}</p>`;


        }
    });

},30000);

// Theme Toggle
const body = document.body;
const themeBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeBtn.textContent = "Light Mode ☀️";
} else {
    themeBtn.textContent = "Dark Mode 🌙";
}

themeBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "Light Mode ☀️";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "Dark Mode 🌙";
    }
});
// Open Water Reminder Popup
document.querySelector("#water-section button").addEventListener("click", function(){
    document.querySelector("#waterpopup").style.display = "flex";
});

// Close Popup
document.getElementById("closeWaterPopup").addEventListener("click", function() {
    document.getElementById("waterpopup").style.display = "none";
});

// Save Water Reminder
document.getElementById("saveWater").addEventListener("click", function(){
    let interval = document.getElementById("waterInterval").value;
    if(!interval){
        alert("Please enter interval in minutes");
        return;
    }

    let nextTime = Date.now() + interval * 60000;
    localStorage.setItem("nextWaterTime", nextTime);

    alert("Water Reminder Set");
    document.querySelector("#waterpopup").style.display = "none";
});

// Trigger Water Reminder (every 30 sec check)
setInterval(() => {
    let nextWaterTime = localStorage.getItem("nextWaterTime");
    if(nextWaterTime && Date.now() >= nextWaterTime){
        let waterCard = document.getElementById("water-section");
        waterCard.style.background = "#d4f5ff"; // Light blue alert
        waterCard.innerHTML = `
            <h2>🚰 Drink Water Reminder!</h2>
            <p>Stay hydrated for better health</p>
            <p>💧 It's time to drink water now</p>
        `;
    }
}, 30000);

// Open Sleep Popup
document.querySelector("#sleep-section button").addEventListener("click", function () {
    document.querySelector("#sleepPopup").style.display = "flex";
});

// Close Sleep Popup
document.getElementById("closeSleepPopup").addEventListener("click", function () {
    document.getElementById("sleepPopup").style.display = "none";
});

// Save Sleep Reminder
document.getElementById("saveSleep").addEventListener("click", function(){
    let sleepTime = document.getElementById("sleepTime").value;
    let wakeTime = document.getElementById("wakeTime").value;

    if (!sleepTime || !wakeTime) {
        alert("Please enter both Sleep and Wake-up time");
        return;
    }

    let sleepReminder = { sleepTime, wakeTime };
    localStorage.setItem("sleepReminder", JSON.stringify(sleepReminder));
    alert("Sleep Reminder Saved ✅");
    document.getElementById("sleepPopup").style.display = "none";
});
// Sleep Reminder Trigger
let sleepReminder = JSON.parse(localStorage.getItem("sleepReminder"));
if (sleepReminder && sleepReminder.sleepTime === currentTime) {
    let sleepCard = document.getElementById("sleep-section");
    sleepCard.style.background = "#d4edda";
    sleepCard.innerHTML = `
        <h2>Sleep Reminder 😴</h2>
        <p>It's time to sleep!</p>
        <p>⏰ Sleep: ${sleepReminder.sleepTime}</p>
        <p>🌅 Wake-up: ${sleepReminder.wakeTime}</p>
    `;
}

