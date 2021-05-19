// Initialize Firebase
var config = {
apiKey: "AIzaSyC8gktwM_-yeztzHJ26yRW__e-OZZMQoQs",
authDomain: "personal-blog-8f2f7.firebaseapp.com",
databaseURL: "https://personal-blog-8f2f7.firebaseio.com",
projectId: "personal-blog-8f2f7",
storageBucket: "personal-blog-8f2f7.appspot.com",
messagingSenderId: "1060930764813"
};
firebase.initializeApp(config);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

window.onload = function() {
    let sub = localStorage.getItem('subbed');
    if (!sub) {
        document.getElementById('show-subscribe').style.display = 'block';
    }

    let darkMode = false;
    // Load previous state
    if (localStorage.getItem("darkMode") !== null) {
      darkMode = localStorage.getItem("darkMode") === "true"
    } else {
      // Load preference
      if (typeof window !== 'undefined') {
        darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      }
    }

    let urlParams = new URLSearchParams(window.location.search);
    let darkParam = urlParams.get('dark');
    if (darkParam) {
        darkMode = darkParam === "true";
        localStorage.setItem("darkMode", darkMode);
    }

    displayMode(darkMode);
}

document.getElementById('show-subscribe').onclick = function() {
    document.getElementById('show-subscribe').style.display = 'none';
    document.getElementById('email-box').style.display = 'block';
}

document.getElementById('subscribe-button').onclick = function() {
    let email = document.getElementById('email-subscription').value;
    if (validateEmail(email)) {
        // Adding to Firestore
        db.collection('subscription').add({
            email: email
        });

        localStorage.setItem('subbed', true);
        document.getElementById('subscribe-button').textContent = "Subscribed!";
        document.getElementById('email-box-text').textContent = "Thank you for subscribing!";
        document.getElementById('email-box-text').style.color = 'black';
        setTimeout(dismiss, 1000);
    }
    else {
        document.getElementById('email-box-text').textContent = "Invalid email address, please try again";
        document.getElementById('email-box-text').style.color = 'rgb(185, 0, 0)';
    }
}

document.getElementById('dismiss-button').onclick = function() {
    dismiss();
}

function dismiss() {
    document.getElementById('email-box').style.display = 'none';
    document.getElementById('show-subscribe').style.display = 'block';
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

document.getElementById('dark-mode').onclick = function() {
    let mode = !document.querySelector("body").classList.contains('dark');
    localStorage.setItem("darkMode", mode);
    displayMode(mode);
}

function displayMode(dark) {
    let body = document.querySelector("body");
    let button = document.getElementById('dark-mode');
    if (dark) {
        body.classList.add('dark');
        button.innerHTML = '<span class="icon is-small"><i class="fa fa-sun"></i></span>Light Mode'
    } else {
        body.classList.remove('dark');
        button.innerHTML = '<span class="icon is-small"><i class="fa fa-moon"></i></span>Dark Mode'
    }
}

document.getElementById('loadXSSImage').onclick = function() {
    let e = document.getElementById('loadXSSImage');
    let xssImage = document.createElement("object");
    xssImage.data = "https://food-roulette-3dd83.web.app/xss-example.svg";
    e.parentNode.replaceChild(xssImage, e);
}