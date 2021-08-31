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



let restaurantLogin = () => {
    //Making Variables for Rest Login
    let restEmailLogin = document.getElementById("rest-email")
    let restPassLogin = document.getElementById("rest-password")

    //Login Authentication
    firebase.auth().signInWithEmailAndPassword(restEmailLogin.value, restPassLogin.value)
        .then((res) => {
            swal("Congratulations!", "You are logged in!", "success")
                .then((value) => {

                    setTimeout(() => {
                        window.location = "restDashboard.html"
                    }, 1000)

                });
        })
        .catch((err) => {
            var errorCode = err.code;
            var errorMessage = err.message;
            swal({
                title: "Oops!",
                text: `${errorMessage}`,
                icon: "error",
            });
        })
}