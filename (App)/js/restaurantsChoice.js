
//Displaying Real Time Data from database
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in

        var uid = user.uid;

        firebase.database().ref(`restaurants`).on('child_added', (data) => {

            

            let restChoicesRow = document.getElementById("rest-choicesRow");
            restChoicesRow.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="card mt-5" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${data.val().restObjName}</h5>
                        <p class="card-text">${data.val().restObjCountry}</p>
                        <p class="card-text">${data.val().restObjCity}</p>

                        <a href="#" class="btn btn-primary" onclick="selectRest('${data.key}')">Select Restaurant</a>
                    </div>
                </div>

            </div>
            `

        })

        // ...
    } else {
        // User is signed out

    }
});

//Select Rest
let selectRest = (key) => {
    console.log(key)
    localStorage.setItem('keyRest', key)
    window.location = "websiteMain.html"
}



///Logout
let resChoiceLogout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = "userLogin.html"
    }).catch((error) => {
        // An error happened.
    });
}