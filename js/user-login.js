const userLoginForm = document.getElementById("userLoginForm");

userLoginForm.addEventListener("submit", function () {
    const email = userLoginForm.email.value;
    localStorage.setItem("loggedInEmail", email);
    
});
