document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const chat = document.getElementById("chat");
  const messagesDiv = document.getElementById("messages");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const logoutButton = document.getElementById("logoutButton");
  const adminButton = document.getElementById("adminButton");
  const loginButton = document.getElementById("loginButton");

  let username = "";
  const adminPassword = "ni01xo00";
  let users = [];

  
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const realName = document.getElementById("realName").value;
    const password = document.getElementById("password").value;
    username = document.getElementById("username").value;

    if (realName && password && username) {
      users.push({ realName, username });
      alert(`Welcome, ${username}!`);
      signupForm.parentElement.classList.add("hidden");
      chat.classList.remove("hidden");
    } else {
      alert("Please fill out all fields.");
    }
  });

  
  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  togglePasswordButton.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordButton.textContent = type === "password" ? "Show Password" : "Hide Password";
  });


  loginButton.addEventListener("click", () => {
    const loginPage = document.getElementById("loginPage");
    const signupPage = document.getElementById("signupPage");
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
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

 
  adminButton.addEventListener("click", () => {
    const enteredPassword = prompt("Enter admin password:");
    if (enteredPassword === adminPassword) {
      const action = prompt("Admin Actions:\n1. View Users\n2. Block User\nChoose an action:");

      if (action === "1") {
        alert(users.map((user, index) => `${index + 1}. ${user.realName} (${user.username})`).join("\n") || "No users available.");
      } else if (action === "2") {
        const usernameToBlock = prompt("Enter the username to block:");
        users = users.filter(user => user.username !== usernameToBlock);
        alert(`${usernameToBlock} has been blocked.`);
      } else {
        alert("Invalid action.");
      }
    } else {
      alert("Incorrect password.");
    }
  });
});

