<?php
require 'config.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $userEmail  = $_POST['email'];
    $movieTitle = $_POST['movie_title'];
    $showTime   = $_POST['show_time'];
    $seats      = $_POST['seats'];
    $totalPrice = $_POST['total_price'];

    $stmt = $conn->prepare(
        "INSERT INTO bookings (user_email, movie_title, show_time, seats, total_price)
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("ssssd", $userEmail, $movieTitle, $showTime, $seats, $totalPrice);

    if ($stmt->execute()) {
        echo "<script>alert('Payment & booking successful!'); window.location='ticket.html';</script>";
    } else {
        echo "<script>alert('Booking save korte problem holo'); history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
