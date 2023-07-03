let loginLink = document.getElementById("login-link");
let loginPopup = document.getElementById("login-popup");

loginLink.addEventListener("click", () => {
  loginPopup.classList.toggle("show-popup");
});

loginPopup.addEventListener("click", (event) => {
  if (event.target === loginPopup) {
    loginPopup.classList.remove("show-popup");
  }
});

let dataLink = document.querySelector('a[href="data.html"]');
let reportsLink = document.querySelector('a[href="reports.html"]');

function displayLoginMessage(event) {
  event.preventDefault();
  alert("Please Login to Continue.");
}

dataLink.addEventListener("click", displayLoginMessage);
reportsLink.addEventListener("click", displayLoginMessage);

let loginForm = loginPopup.querySelector("form");
let emailInput = loginForm.querySelector("#email");
let passwordInput = loginForm.querySelector("#password");
let loginMessage = loginPopup.querySelector("#login-message");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let email = emailInput.value;
  let password = passwordInput.value;

  if (email === "") {
    loginMessage.innerText = "Fill your email.";
  } else if (password === "") {
    loginMessage.innerText = "Fill the password.";
  } else {
    loginForm.style.display = "none";
    loginMessage.innerText = "Logging in... Wait Please!";
    setTimeout(() => {
      fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => {
          if (response.ok) {
            loginMessage.innerText = "LOGIN - SUCCESSFUL";
            setTimeout(() => {
              window.location.href = "data.html";
            }, 3000);
          } else {
            loginForm.style.display = "block";
            loginMessage.innerText = "Failed to login. Please try again.";
            emailInput.value = "";
            passwordInput.value = "";
          }
        })
        .catch((error) => {
          loginForm.style.display = "block";
          loginMessage.innerText = "Failed to login. Please try again.";
          emailInput.value = "";
          passwordInput.value = "";
        });
    }, 2000);
  }
});
