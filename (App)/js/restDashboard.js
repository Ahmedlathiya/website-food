let uploadImgItem = (file) => {
    // console.log(file)
    return new Promise((resolve, reject) => {


        let storageRef = firebase.storage().ref(`itemImages/${file.name}`)
        let uploading = storageRef.put(file)

        uploading.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                reject(error)
            },
            () => {
                uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    resolve(downloadURL)
                });
            }
        );
    })
}













/// Item Add function
let addItemRes = async () => {
    //Variables
    let itemName = document.getElementById("res-itemName")
    let itemPrice = document.getElementById("res-itemPrice")
    let categoryFood = document.getElementById("res-categoryFood")
    let deliveryType = document.getElementById("res-deliveryType")

    //Uploading Images
    let itemImg = document.getElementById("res-imageItem")
    let imgRestItem = await uploadImgItem(itemImg.files[0])

    //Item Object
    let addItemData = {
        itemObjName: itemName.value,
        itemObjPrice: itemPrice.value,
        itemObjCategory: categoryFood.value,
        itemObjImage: imgRestItem,
        itemObjdelivery: deliveryType.value,
    }

    ////Auth Start
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in

            var uid = user.uid;
            firebase.database().ref(`RestItems/${uid}`).push(addItemData)
                .then(() => {
                    console.log(addItemData)
                })
            // ...
        } else {
            // User is signed out
        }
    });
    ////Auth End

}

//Displaying Real Time Data from database
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in

        var uid = user.uid;

        firebase.database().ref(`RestItems/${uid}`).on('child_added', (data) => {

            // console.log(data.val().itemObjName)

            let cardRow = document.getElementById("card-row");
            cardRow.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mt-5" style="width: 18rem;">
                    <img src=${data.val().itemObjImage} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${data.val().itemObjName}</h5>
                        <p class="card-text">${data.val().itemObjPrice}</p>
                        <p class="card-text">${data.val().itemObjCategory}</p>
                        <p class="card-text">${data.val().itemObjdelivery}</p>

                        <a href="#" class="btn btn-primary" onclick="delItem('${data.key}')">Delete Item</a>
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




//Displaying Real Time Data from database for Items Ordered by User Start
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in

        let resUid = user.uid;
        console.log(resUid)

        firebase.database().ref(`resItemsOrder/${resUid}`).on('child_added', (data) => {
            // console.log(data.val())
            let foodOrderedId = data.val()
            firebase.database().ref(`RestItems/${resUid}`).on('value', (itemDataFromRest) => {
                // console.log(itemDataFromRest.val()[foodOrderedId].itemObjName)
                let itemsToDeliverRow = document.getElementById("itemsToDeliverRow")
                itemsToDeliverRow.innerHTML +=
                    `
                    <div class="col-lg-4 col-md-6 col-sm-12">
                    <div class="card mt-5" style="width: 18rem;">
                        <img src="${itemDataFromRest.val()[foodOrderedId].itemObjImage}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${itemDataFromRest.val()[foodOrderedId].itemObjName}</h5>
                            <p class="card-text">${itemDataFromRest.val()[foodOrderedId].itemObjPrice}</p>
                            <p class="card-text">${itemDataFromRest.val()[foodOrderedId].itemObjCategory}</p>
                            <p class="card-text">${itemDataFromRest.val()[foodOrderedId].itemObjdelivery}</p>
    
                            <a href="javascript:void(0);" class="btn btn-success" onclick="deliverItem('${data.key}')">Deliver Item</a>
                        </div>
                    </div>
    
                </div>
                
                `
                // console.log(data.key)

            })






        })

        // ...
    }

    else {
        // User is signed out

    }
});

//Displaying Real Time Data from database for Items Ordered by User End













///Delete Item
let delItem = (key) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            var uid = user.uid;
            firebase.database().ref(`RestItems/${uid}/${key}`).remove()

        } else {
            // User is signed out

        }
    })
    event.target.parentNode.parentNode.parentNode.remove()
}

//Logout
let logoutRest = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location = "restaurantLogin.html"
    }).catch((error) => {
        // An error happened.
    });
}




let deliverItem = (deliverItemkey) => {
    // console.log(deliverItemkey)


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            var uid = user.uid;
            firebase.database().ref(`resItemsOrder/${uid}/${deliverItemkey}`).on('value', (orderedRestItems) => {
                // console.log(orderedRestItems.val())
                let itemDeliveredId = orderedRestItems.val()

                //Sending delivered Items to database
                firebase.database().ref(`deliveredItems/${uid}`).push(itemDeliveredId)
                    .then(() => {
                        console.log("Item send with Id ---> " + itemDeliveredId)
                        firebase.database().ref(`resItemsOrder/${uid}/${deliverItemkey}`).remove()





                    })




            })

        } else {
            // User is signed out

        }
    })
    event.target.parentNode.parentNode.parentNode.remove()




}



///Display Real time data for delivered Items
firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        var uid = user.uid;
        firebase.database().ref(`deliveredItems/${uid}`).on('child_added', (deliverItemData) => {
            // console.log(deliverItemData.val())
            keyDelItemFromDb = deliverItemData.val()
            firebase.database().ref(`RestItems/${uid}`).on('value', (itemDeliveredFinal) => {
                // console.log(itemDeliveredFinal.val()[keyDelItemFromDb])
                let finalDeliveredItem = itemDeliveredFinal.val()[keyDelItemFromDb]
                let deliverItemsRow = document.getElementById("deliverItemsRow")
                deliverItemsRow.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mt-5" style="width: 18rem;">
                    <img src="${finalDeliveredItem.itemObjImage}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${finalDeliveredItem.itemObjName}</h5>
                        <p class="card-text">${finalDeliveredItem.itemObjPrice}</p>
                        <p class="card-text">${finalDeliveredItem.itemObjCategory}</p>
                        <p class="card-text">${finalDeliveredItem.itemObjdelivery}</p>

                        <a href="javascript:void(0);" class="btn btn-success" onclick="">Item Delivered</a>
                    </div>
                </div>

            </div>
                
                `
            })
        })

    } else {
        // User is signed out

    }
})
































