document
  .getElementById("adminLoginForm")
  .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Admin login successful! Going to admin home (demo).");
      window.location.href = "admin-home.html";
  });
