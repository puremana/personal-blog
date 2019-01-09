window.onload = function() {
    let sub = localStorage.getItem('subbed');
    if (!sub) {
        document.getElementById('email-box').style.display = 'block';
    }
}

function subscribe() {
    localStorage.setItem('subbed', true);
    let email = document.getElementById('email-subscription').value;
    if (validateEmail(email)) {
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

function dismiss() {
    document.getElementById('email-box').classList.add("hidden");
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}