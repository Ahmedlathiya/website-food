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


//Signing up User and Creating database
let userSignUp = () => {
    //Declaring Variables with User's data
    let userName = document.getElementById("userName")
    let userEmail = document.getElementById("userEmail")
    let userCountry = document.getElementById("userCountry")
    let userPhone = document.getElementById("userPhone")
    let userCity = document.getElementById("userCity")
    let userPassword = document.getElementById("userPassword")

    //Making Use Object
    let dataUser = {
        userObjName: userName.value,
        userObjEmail: userEmail.value,
        userObjCountry: userCountry.value,
        userObjPhone: userPhone.value,
        userObjCity: userCity.value,
        userObjpassword: userPassword.value,
        type: "user",

    }


    //Signing Up
    firebase.auth().createUserWithEmailAndPassword(userEmail.value, userPassword.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            uidUser = user.uid

            //Creating a database for User
            firebase.database().ref(`users/${uidUser}`).set(dataUser)
                .then(() => {
                    console.log(dataUser)
                    swal("Congratulations!", "You are now registered!", "success")
                        .then((value) => {
                            setTimeout(() => {
                                window.location = "RestaurantsChoice.html"
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

