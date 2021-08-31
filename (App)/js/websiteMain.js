

//Displaying Real Time Data from database
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in

        let keyforRest = localStorage.getItem('keyRest')
        console.log(keyforRest)
        var uid = user.uid;

        firebase.database().ref(`RestItems/${keyforRest}`).on('child_added', (data) => {

            console.log(data.val().itemObjName)
            // let restHeading = document.getElementById("rest-heading")
            // restHeading.innerHTML = `${data.val().itemObjName}`
            let mainWebItemRow = document.getElementById("mainWebItemRow");
            mainWebItemRow.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card mt-5" style="width: 18rem;">
                <img src=${data.val().itemObjImage} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.val().itemObjName}</h5>
                    <p class="card-text">${data.val().itemObjPrice} $</p>
                    <p class="card-text">${data.val().itemObjCategory}</p>
                    <p class="card-text">${data.val().itemObjdelivery}</p>

                    <a href="javascript:void(0);" class="btn btn-primary" onclick="orderItem('${data.key}')">Order Item</a>
                </div>
            </div>

        </div>
            `

        })

        //Restaurant Name Entered into Title
        firebase.database().ref(`restaurants/${keyforRest}`).on('value', (data) => {

            console.log(data.val().restObjName)
            let restHeading = document.getElementById("rest-heading")
            restHeading.innerHTML = `${data.val().restObjName}`


        })


        // ...
    } else {
        // User is signed out

    }
});








//Ordering Item
let orderItem = (itemKey) => {
    console.log(itemKey)
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in,
            let itemId = itemKey
            var uid = user.uid;
            let restKeyForOrder = localStorage.getItem('keyRest')

            // firebase.database().ref(`itemsOrder/${restKeyForOrder}/${uid}`).push(itemId)
            //     .then(() => {
            //         swal("Item Ordered", "You can always order more!", "success")
            //             .then((value) => {


            //             });
            //     })
            // // ...
            firebase.database().ref(`resItemsOrder/${restKeyForOrder}`).push(itemId)
                .then(() => {
                    swal("Item Ordered", "You can always order more!", "success")
                        .then((value) => {


                        });
                })
            // ...









            // ...
        } else {
            // User is signed out
            // ...
        }
    });


}








//Logout
let logoutRest = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = "userLogin.html"
    }).catch((error) => {
        // An error happened.
    });
}

