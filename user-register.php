<?php
require 'config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $first = $_POST['first_name'];
    $last  = $_POST['last_name'];
    $email = $_POST['email'];
    $pass1 = $_POST['password'];
    $pass2 = $_POST['confirm_password'];

    if ($pass1 !== $pass2) {
        echo "<script>alert('Password match kore nai'); history.back();</script>";
        exit;
    }

    $hash = password_hash($pass1, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $first, $last, $email, $hash);

    if ($stmt->execute()) {
        echo "<script>alert('Account created! Please login.'); window.location='user-login.html';</script>";
    } else {
        echo "<script>alert('Error: maybe email already exists'); history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
