"use strict";
//cors key: 5de40f274658275ac9dc2152
//link https://smackfly-2fd1.restdb.io/rest/users-fly-smacker

const signUpForm = document.querySelector("form#signUp");
const signUpBtn = document.querySelector(".signUpBtn");
const removeAfterSignup = document.querySelector("#remove-after-signup");
const addAfterSignup = document.querySelector("#add-after-signup");
const navbarBeforeSignup = document.querySelector("#navbar-before-signup");
const navbarAfterSignup = document.querySelector("#navbar-after-signup");

signUpForm.addEventListener("submit", e => {
  e.preventDefault();
  signUpBtn.textContent = "Waiting...";
  post();
  console.log("aici");
  navbarBeforeSignup.classList.add("hidden");
  navbarAfterSignup.classList.remove("hidden");
});

function post() {
  const data = {
    name: signUpForm.elements.name.value,
    email: signUpForm.elements.email.value,
    password: signUpForm.elements.password.value
  };

  const postData = JSON.stringify(data);
  fetch("https://smackfly-2fd1.restdb.io/rest/users-fly-smacker", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5de40f274658275ac9dc2152",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      //showToast();
      signUpForm.reset();

      document
        .querySelector("#signup-screen .react-button-holder")
        .classList.remove("hidden");

      document
        .querySelector("#signup-screen .text-after-signup")
        .classList.remove("hidden");
      removeAfterSignup.classList.add("hidden");
    });
}

//TODO
//const usernameField =
//const usernameNotUnique = document.querySelector("#usernameNotUnique")
//if username is taken
//usernameField.style.background = "#ef4d4e";
//#usernameNotUnique.style.display = "block";
