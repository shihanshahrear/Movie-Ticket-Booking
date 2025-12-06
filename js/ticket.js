const seatListSpan = document.getElementById("seatList");
const ticketTotalSpan = document.getElementById("ticketTotal");

const selectedSeats =
    JSON.parse(localStorage.getItem("selectedSeats") || "[]");
seatListSpan.textContent = selectedSeats.join(", ");

const total = Number(localStorage.getItem("ticketPrice")) || 0;
ticketTotalSpan.textContent = total.toFixed(2);

document.getElementById("printBtn").addEventListener("click", function () {
    window.print();
});
