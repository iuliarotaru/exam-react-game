//cors key: 5de40f274658275ac9dc2152
//link https://smackfly-2fd1.restdb.io/rest/users-fly-smacker

const userInfo = document.querySelector("#userInfo");
const id = "5df91589306b1b1e000321f1"; //change this to load your own info
const userName = document.querySelector("#userName");
const updateUserBtn = document.querySelector("#updateUser");

updateUserBtn.addEventListener("click", e => {
    e.preventDefault();
    put();
 })

loadUser();

//fetch existing user data from restdb
function loadUser(){
    //fetches user data into the userform
    fetch(`https://smackfly-2fd1.restdb.io/rest/users-fly-smacker/${id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-apikey": "5de40f274658275ac9dc2152",
          "cache-control": "no-cache"
        }
      })
        .then(e => e.json())
        .then(users => {
        //loads username in header
        userName.textContent = users.name;

        //loads userinfo in the form
        userInfo.elements.name.value=users.name,
        userInfo.elements.firstname.value=users.firstname;
        userInfo.elements.lastname.value=users.lastname;
        userInfo.elements.email.value=users.email;
        userInfo.elements.password.value=users.password;
        //don't need this for non-dynamic
        //userInfo.elements.id.value=users._id;
        });
}

//update existing user data in restdb via form
function put() {
    let data = {
        name: userInfo.elements.name.value,
        firstname: userInfo.elements.firstname.value,
        lastname: userInfo.elements.lastname.value,
        email: userInfo.elements.email.value,
        password: userInfo.elements.password.value
    };

    let postData = JSON.stringify(data);

    fetch(`https://smackfly-2fd1.restdb.io/rest/users-fly-smacker/${id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "x-apikey": "5de40f274658275ac9dc2152",
            "cache-control": "no-cache"
        },
        body: postData
    }
)
.then(d => d.json())
.then( updatedUser => {
    userInfo.elements.name.value=updatedUser.name,
    userInfo.elements.firstname.value=updatedUser.firstname;
    userInfo.elements.lastname.value=updatedUser.lastname;
    userInfo.elements.email.value=updatedUser.email;
    userInfo.elements.password.value=updatedUser.password;

    updateUserBtn.textContent = "Success!";
    updateUserBtn.style.backgroundColor = "#fca91f";
});
}

