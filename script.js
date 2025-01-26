document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
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

  // Handle Sign-Up Form Submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const realName = document.getElementById("realName").value;
    const password = document.getElementById("password").value;
    username = document.getElementById("username").value;

    if (!realName || !password || !username) {
      alert("Please fill out all fields.");
      return;
    }

    const isUsernameTaken = users.some(user => user.username === username);
    if (isUsernameTaken) {
      alert("This username is already taken. Please choose a different one.");
      return;
    }

    users.push({ realName, username, password });
    alert(`Welcome, ${username}!`);
    signupForm.parentElement.classList.add("hidden");
    chat.classList.remove("hidden");
    adminButton.classList.remove("hidden"); // Show Admin Button after sign up
  });

  // Handle Showing Password
  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  togglePasswordButton.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordButton.textContent = type === "password" ? "Show Password" : "Hide Password";
  });

  // Handle Login Button
  loginButton.addEventListener("click", () => {
    const loginPage = document.getElementById("loginPage");
    const signupPage = document.getElementById("signupPage");
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });

  // Handle Login Form Submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

    if (user) {
      username = user.username;
      alert(`Welcome back, ${username}!`);
      loginForm.parentElement.classList.add("hidden");
      chat.classList.remove("hidden");
      adminButton.classList.remove("hidden"); // Show Admin Button after login
    } else {
      alert("Invalid username or password.");
    }
  });

  // Handle Sending Messages
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message) {
      addMessage(username, message);
      messageInput.value = "";
    }
  });

  // Add Message to Chat
  function addMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Handle Logout
  logoutButton.addEventListener("click", () => {
    chat.classList.add("hidden");
    document.getElementById("signupForm").parentElement.classList.remove("hidden");
    document.getElementById("signupForm").reset();
    messagesDiv.innerHTML = "";
    adminButton.classList.add("hidden");
  });

  // Handle Admin Controls
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







