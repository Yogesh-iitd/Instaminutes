

var url = new URL( window.location);
var username = url.searchParams.get("username");
const socket = io();
socket.emit("mapping" , username);



const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('#msg');

socket.on("message",(clients) => {
  console.log("working")
  clientsDisplay(clients)
})
socket.on("messageUsers", (message, username) => {
  display(message , username)
})


chatForm.addEventListener("submit", e =>{
  e.preventDefault();
  const message = chatMessages.value
  chatMessages.value = ""
  display(message,username)
  socket.emit("chatMessage" , message, username)
})

function clientsDisplay(clients){
  document.querySelector("#users").innerHTML = ""
  for (i in clients){
      const li = document.createElement("li")
      li.textContent = clients[i];
        document.querySelector("#users").append(li)
  }
}

function display(message, username){
  const div = document.createElement("div")
  div.classList.add("message");
  const p1 = document.createElement("p")
  p1.classList.add("meta");
  const p2 = document.createElement("p")
  p2.classList.add("text");
  p1.textContent = username
  p2.textContent =  message
  div.append(p1)
  div.append(p2)
  document.querySelector(".chat-messages").append(div)
}
