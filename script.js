document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");
  const chatPage = document.getElementById("chatPage");
  const signupPage = document.getElementById("signupPage");
  const loginPage = document.getElementById("loginPage");
  const logoutButton = document.getElementById("logoutButton");
  const adminButton = document.getElementById("adminButton");
  const messageForm = document.getElementById("messageForm");
  const messageInput = document.getElementById("messageInput");
  const messagesDiv = document.getElementById("messages");
  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");

  const adminPassword = "ni01xo00";
  let users = [];
  let username = "";

  // Show/hide password
  togglePasswordButton.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePasswordButton.textContent = type === "password" ? "Show Password" : "Hide Password";
  });

  // Navigate to login page
  loginButton.addEventListener("click", () => {
    signupPage.classList.add("hidden");
    loginPage.classList.remove("hidden");
  });

  // Handle signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const realName = document.getElementById("realName").value;
    const newUsername = document.getElementById("username").value;
    const newPassword = document.getElementById("password").value;

    if (users.some(user => user.username === newUsername)) {
      alert("This username is already taken. Please choose a different one.");
      return;
    }

    users.push({ realName, username: newUsername, password: newPassword });
    username = newUsername;
    alert(`Welcome, ${username}!`);
    signupPage.classList.add("hidden");
    chatPage.classList.remove("hidden");
  });

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const user = users.find(u => u.username === loginUsername && u.password === loginPassword);

    if (user) {
      username = user.username;
      alert(`Welcome back, ${username}!`);
      loginPage.classList.add("hidden");
      chatPage.classList.remove("hidden");
    } else {
      alert("Invalid username or password.");
    }
  });

  // Handle message submission
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message) {
      addMessage(username, message);
      messageInput.value = "";
    }
  });

  // Add message to chat
  function addMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Handle logout
  logoutButton.addEventListener("click", () => {
    chatPage.classList.add("hidden");
    signupPage.classList.remove("hidden");
    document.getElementById("signupForm").reset();
    document.getElementById("loginForm").reset();
    messagesDiv.innerHTML = "";
  });

  // Admin button functionality
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









