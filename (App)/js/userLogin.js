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



//Login User Auth
let loginUser = () => {
    //Making and assigning variable values for login
    let userEmailLogin = document.getElementById("user-Useremail")
    let userPassLogin = document.getElementById("user-password")

    firebase.auth().signInWithEmailAndPassword(userEmailLogin.value, userPassLogin.value)
        .then((res) => {
            swal("Congratulations!", "You are logged in!", "success")
                .then((value) => {

                    setTimeout(() => {
                        window.location = "RestaurantsChoice.html"
                    }, 300)

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

