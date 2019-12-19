//cors key: 5de40f274658275ac9dc2152
//link https://smackfly-2fd1.restdb.io/rest/users-fly-smacker

const userInfo = document.querySelector("#userInfo");
const id = "5df91589306b1b1e000321f1";
const userName = document.querySelector("#userName");

editUser();

function editUser(){
    //fetches user data into the userform
    fetch(`https://smackfly-2fd1.restdb.io/rest/users-fly-smacker/5df91589306b1b1e000321f1`, {
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
        userInfo.elements.firstname.value=users.firstname;
        userInfo.elements.lastname.value=users.lastname;
        userInfo.elements.email.value=users.email;
        //userInfo.elements.id.value=users._id;
        });
}

function put() {
    let data = {
        firstName: userInfo.elements.firstname.value,
        lastName: userInfo.elements.lastname.value,
        email: userInfo.elements.email.value
    };

    let postData = JSON.stringify(data);

    const userId = userInfo.elements.id.value;

    fetch("https://smackfly-2fd1.restdb.io/rest/users-fly-smacker/" + userId,
    {
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
    const parentElement = document.querySelector(`article[data-task-id="${updatedUser._id}"]`);
    
    parentElement.querySelector("h2").textContent = updatedUser.task;
    parentElement.querySelector(".taskDate").textContent = updatedUser.when;
    parentElement.querySelector(".taskNotes").textContent = updatedUser.notes;
});
}

