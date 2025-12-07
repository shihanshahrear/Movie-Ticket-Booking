<?php
require 'config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $pass  = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 1) {
        $stmt->bind_result($id, $hash);
        $stmt->fetch();

        if (password_verify($pass, $hash)) {
            $_SESSION['user_id'] = $id;
            $_SESSION['user_email'] = $email;
            echo "<script>alert('Login successful'); window.location='avatar.html';</script>";
        } else {
            echo "<script>alert('Wrong password'); history.back();</script>";
        }
    } else {
        echo "<script>alert('User not found'); history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
