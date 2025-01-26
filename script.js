document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const chat = document.getElementById("chat");
  const messagesDiv = document.getElementById("messages");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const logoutButton = document.getElementById("logoutButton");

  let username = "";


  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const realName = document.getElementById("realName").value;
    const password = document.getElementById("password").value;
    username = document.getElementById("username").value;

    if (realName && password && username) {
      alert(`Welcome, ${username}!`);
      signupForm.parentElement.classList.add("hidden");
      chat.classList.remove("hidden");
    } else {
      alert("Please fill out all fields.");
    }
  });

  
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message) {
      addMessage(username, message);
      messageInput.value = "";
    }
  });

  
  function addMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  
  logoutButton.addEventListener("click", () => {
    chat.classList.add("hidden");
    signupForm.parentElement.classList.remove("hidden");
    document.getElementById("signupForm").reset();
    messagesDiv.innerHTML = "";
  });
});
