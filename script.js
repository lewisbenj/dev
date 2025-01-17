let counter = 0;
let counter2 = 0;

//Static
const birthdayString = "Birthday: December 2, 2007";
const celebrateString = "Thanks everyone for visiting!"
const contactmethod = "Contact me through Discord: @BenjaminLewis";

//Countdown
const birthdayMonth = 11;
const birthdayDay = 2;
const birthYear = 2007;
const today = new Date();
const dayoftoday = new Date().getDate;
const monthoftoday = new Date().getMonth;
const currentYear = today.getFullYear();

var radio = null;
var radioPlayingSong = null;

var radioIsLoading = false;

let nextBirthday = new Date(currentYear, birthdayMonth - 1, birthdayDay);
if (today > nextBirthday) {
    nextBirthday = new Date(currentYear + 1, birthdayMonth - 1, birthdayDay);
}

const timeDifference = nextBirthday - today;
const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

const nextAge = nextBirthday.getFullYear() - birthYear;


//Event
document.addEventListener('DOMContentLoaded', function() {
    if (dayoftoday == birthdayDay && monthoftoday == birthdayMonth) document.getElementById('countdown').textContent = celebrateString;
    else document.getElementById('countdown').textContent = birthdayString;

    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.shiftKey && event.key === 'C') || (event.ctrlKey && event.key === 'U')) {
            event.preventDefault();
        }
    });
    
    //Status
    fetch('https://api.lanyard.rest/v1/users/812279245661274132')
        .then(response => response.json())
        .then(data => {
            const status = data.data.discord_status;
            const statusElement = document.getElementById('bio-status');
            
            // Set the text based on status
            statusElement.textContent = '●';
            
            // Remove any existing status classes
            statusElement.classList.remove('online', 'idle', 'dnd', 'offline');

            console.log(status);
            
            // Add class based on the status
            switch (status) {
                case 'online':
                    statusElement.classList.add('online');
                    break;
                case 'idle':
                    statusElement.classList.add('idle');
                    break;
                case 'dnd':
                    statusElement.classList.add('dnd');
                    break;
                case 'offline':
                    statusElement.classList.add('offline');
                    break;
                default:
                    statusElement.classList.add('offline'); // Default to offline
            }
        })
        .catch(error => {
            console.error('Error fetching the API:', error);
            document.getElementById('bio-status').textContent = '⚠︎';
        });

    setInterval(change, 5000);
    // setInterval(changemethod, 5000);

    setInterval(setRadioText, 500);

    let a = new EventSource("");
    a.onmessage = function(t) {
        let e = JSON.parse(t.data);
        if (e.streamTitle) {
            radioPlayingSong = e.streamTitle;
        }
    }
});

function setRadioText() {
    var m = getMutedStatus();
    if (radioIsLoading) {
        var mt = "(Loading...)"
    }
    else {
        if (m) {
            var mt = "(Tap here to unmute)"
        }
        else {
            var mt = "(Tap here to mute)"
        }
    }
    document.getElementById("radio-text-1").textContent = "🎵 Benjamin chill vibes " + mt;
    document.getElementById("radio-text-2").textContent = "Instupendo - Comfort Chain🎧" + mt;
    document.getElementById("radio-text-3").textContent = radioPlayingSong;
}

function getMutedStatus() {
    if (radio == null) {
        return true;
    }

    if (radio.muted) {
        return true;
    }
    else {
        return false;
    } 
}

function radiotoggle() {
    if (radioIsLoading) {
        return;
    }

    if (radio == null) {
        radioIsLoading = true;
        radio = new Audio('https://stream.zeno.fm/tnql3oa9ccgtv');
        radio.addEventListener("canplaythrough", (event) => {
            radioIsLoading = true;
        });
        radio.play();
        return;
    }

    if (radio.muted) {
        radio.muted = false;
    }
    else {
        radio.muted = true;
    }

}

function change() {
  document.getElementById("countdown").setAttribute("class", "text-fade");

  setTimeout(() => {
    const countdownElement = document.getElementById('countdown');
    if (counter == 0) {
        if (dayoftoday == birthdayDay && monthoftoday == birthdayMonth) { countdownElement.textContent = celebrateString; }
        else { countdownElement.textContent = birthdayString; }
    }
    if (counter == 1) {
        if (dayoftoday == birthdayDay && monthoftoday == birthdayMonth) { countdownElement.textContent = `Celebrate my birthday on my Facebook! Click the Facebook icon below!` }
        else { countdownElement.textContent = `${daysUntilBirthday} days until my ${nextAge}-year-old birthday!`; }
    }
    document.getElementById("countdown").setAttribute("class", "text-show");
  }, 500)

  counter++;

  if (counter > 1) {
    counter = 0;
  }
}


// function changemethod() {
//     document.getElementById("contactmethod").setAttribute("class", "text-fade");
  
//     setTimeout(() => {
//       const contactElement = document.getElementById('contactmethod');
//       if (counter2 == 0) {
//           contactElement.textContent = contactmethod;
//       }
//       if (counter2 == 1) {
//           contactElement.textContent = `Contact me through mail: akk1to.dev@gmail.com`;
//       }
//       document.getElementById("contactmethod").setAttribute("class", "text-show");
//     }, 500)
  
//     counter2++;
  
//     if (counter2 > 1) {
//       counter2 = 0;
//     }
//   }
