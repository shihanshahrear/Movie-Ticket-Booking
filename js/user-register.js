document.getElementById("userRegisterForm").addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Account created! Now login.");
      window.location.href = "user-login.html";
  });
