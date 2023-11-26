var firebaseConfig = {
    apiKey: "AIzaSyCWHxu-mJqcBa8FLrFxjG2KNooleZNZL0w",
    authDomain: "todoapdatabse.firebaseapp.com",
    databaseURL: "https://todoapdatabse-default-rtdb.firebaseio.com",
    projectId: "todoapdatabse",
    storageBucket: "todoapdatabse.appspot.com",
    messagingSenderId: "1061110668413",
    appId: "1:1061110668413:web:8b6cf8151e9ce9a8c12514"
  };
  
  // Initialize Firebase
  var frb = firebase.initializeApp(firebaseConfig);






var input = document.getElementById("input")
var list = document.getElementById("list")

firebase.database().ref("Todos").on("child_added",(data)=>{
    console.log(data.val().value)

     var liElement = document.createElement("li")
     var liText = document.createTextNode(data.val().value)
     liElement.appendChild(liText)
     list.appendChild(liElement)
     liElement.style.paddingRight = "20px"
     liElement.style.marginRight = "20px"

      
     // ************DELETE BUTTON*******************


     var deletbtn = document.createElement("button")
     var deletbtnText = document.createTextNode("Delete")
     deletbtn.appendChild(deletbtnText)
     liElement.appendChild(deletbtn)
     deletbtn.setAttribute("onclick", "deleteBtn(this)")
     deletbtn.setAttribute("id", data.val().key)
    

     deletbtn.style.marginLeft = "20px"
     // deletbtn.style.marginRight = "20px"


     // ************EDIT BUTTON*******************


     var editbtn = document.createElement("button")
     var editbtnText = document.createTextNode("Edit")
     editbtn.appendChild(editbtnText)
     liElement.appendChild(editbtn)
     editbtn.setAttribute("onclick", "editBtn(this)")
     editbtn.setAttribute("id", data.val().key)

     editbtn.style.marginLeft = "20px"
     editbtn.style.marginRight = "-20px"


    input.value = ""

});


function add() {
    var key =firebase.database().ref("Todos").push().key
    // console.log(key)
    var obj={
        value:input.value,
        key:key
    }
    firebase.database().ref("Todos").child(key).set(obj)



    
}

function dell() {
    var list = document.getElementById("list")
    firebase.database().ref("Todos").remove()


    list.innerHTML = "";
}

function deleteBtn(x) {
    firebase.database().ref("Todos").child(x.id).remove()
    x.parentNode.remove()
}
function editBtn(f) {
    var input = prompt("Enter Updated Value....")
    var editTodo={
        value:input,
        key:f.id
    }
    firebase.database().ref("Todos").child(f.id).set(editTodo)

    f.parentNode.firstChild.nodeValue = input;

}
