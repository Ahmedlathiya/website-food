const inputs = document.querySelectorAll(".input");


function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}


inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});




// Restaurant Signing Up Button
let signUpRest = () => {
    // Declaring variables for Restaurant Data
    let restName = document.getElementById("restName")
    let restEmail = document.getElementById("restEmail")
    let restCountry = document.getElementById("restCountry")
    let restCity = document.getElementById("restCity")
    let restPassword = document.getElementById("restPassword")

    // Making Object for Restaurant Data
    let dataRest = {
        restObjName: restName.value,
        restObjEmail: restEmail.value,
        restObjCountry: restCountry.value,
        restObjCity: restCity.value,
        restObjpassword: restPassword.value,
        type: "restaurant",

    }

    //Signing Up and Creating a database
    firebase.auth().createUserWithEmailAndPassword(restEmail.value, restPassword.value)
        .then((userCredential) => {
            // Signed in 

            var user = userCredential.user;
            var uidRest = user.uid

            //Creating a database
            firebase.database().ref(`restaurants/${uidRest}`).set(dataRest)
                .then(() => {
                    console.log(dataRest)
                    swal("Congratulations!", "You are now a part of us!", "success")
                        .then((value) => {
                            setTimeout(() => {
                                window.location = "restDashboard.html"
                            }, 300)

                        });
                })

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                title: "Oops!",
                text: `${errorMessage}`,
                icon: "error",
            });
            // ..
        });
}