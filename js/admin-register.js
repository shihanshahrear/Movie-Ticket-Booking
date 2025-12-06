document
  .getElementById("adminRegisterForm")
  .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Admin account created (demo)! Now login.");
      window.location.href = "admin-login.html";
  });
