"use strict";
window.onload = () => {
    document.getElementById('logInForm').onsubmit = (event) => {
        event.preventDefault();
        console.log('awdawd')
    };
    document.getElementById("loginButton").addEventListener("click", function(event) {
        event.preventDefault();
        doAttemptLogin();
    }, false);
};



function doAttemptLogin() {
    const nameValue = document.getElementById('name').value;
    const passwordValue = document.getElementById('password').value;

    if(!nameValue || !passwordValue) { console.error('No username or password!') }// TODO: Alert user no password or name
    fetch(`https://smackfly-2fd1.restdb.io/rest/users-fly-smacker?q={"name": "${nameValue}", "password": "${passwordValue}"}`, {
        method: "get",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5de40f274658275ac9dc2152",
            "cache-control": "no-cache",
            // "Access-Control-Allow-Origin": "*",
        },
        //mode: "no-cors",
    })
    .then(e => {
        e.json()
            .then((data) => {
                if(Array.isArray(data) && data[0]) {
                    console.log('Logged in as ' + data[0].name);
                    delete data[0].password;
                    localStorage.setItem('LOGGED_USER', JSON.stringify(data[0]));
                } else {
                    console.error('Username or password incorrect');
                }
            })
    });
}

function showLogin() {
    const overlays = document.querySelectorAll('.overlayWrapper');
    const loginOverlay = document.getElementById('login-screen');

    Array.from(overlays).forEach((overlay) => {
        overlay.classList.add('hidden');
    })

    loginOverlay.classList.remove('hidden');
    console.log('show login');
}
