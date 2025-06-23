window.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  if (modeToggle && body) {
    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        modeToggle.textContent = "☀️";
      } else {
        modeToggle.textContent = "🌙";
      }
    });
  } else {
    console.log("Toggle button or body not found.");
  }
});




// 🌙 Dark Mode Toggle for Hero Section
window.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("mode-toggle");
  const heroSection = document.querySelector(".hero");

  if (modeToggle && heroSection) {
    modeToggle.addEventListener("click", () => {
      heroSection.classList.toggle("dark-mode");
      modeToggle.textContent = heroSection.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  }
});



// 🔐 Login Form Logic
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const messageEl = document.getElementById("message");

// ✅ Toggle password visibility
function togglePassword() {
  const icon = document.querySelector(".toggle-password");
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  icon.textContent = isHidden ? "🙈" : "👁️";
}

// 🔴 Show error with shake animation
function showError(msg) {
  messageEl.style.color = "red";
  messageEl.textContent = msg;
  loginForm.classList.add("shake");

  setTimeout(() => {
    loginForm.classList.remove("shake");
  }, 500);
}

// ✅ Submit login form using fetch
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  messageEl.textContent = "";
  loginForm.classList.remove("shake");

  // 🌐 Client-side validation
  if (username === "" || password === "") {
    showError("Please enter both username and password.");
    return;
  }

  if (password.length < 8) {
    showError("Password must be at least 8 characters.");
    return;
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)||  !/[!@#$%^&*(),.?":{}|<>]/.test(password) ) {
    showError("Password must contain at least 1 uppercase, 1 lowercase letter, and 1 number, and 1 special character.");
    return;
  }

  // ✅ Send to Flask
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  })
  .then(response => response.text())
  .then(data => {
    messageEl.style.color = "limegreen";
    messageEl.textContent = "✅ Login successful!";
    alert("🎉 Login Successful! You can now play the game.");

    // Clear inputs after 2 seconds
    setTimeout(() => {
      messageEl.textContent = "";
      usernameInput.value = "";
      passwordInput.value = "";
    }, 2000);
  })
  .catch(error => {
    showError("Error during login. Try again.");
    console.error(error);
  });
});

