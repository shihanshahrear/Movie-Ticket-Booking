const seatsContainer = document.getElementById("seats");
const selectedCount = document.getElementById("selectedCount");
const confirmBtn = document.getElementById("confirmBtn");

const PRICE_PER_TICKET = 10;
const TOTAL_SEATS = 40;

for (let i = 0; i < TOTAL_SEATS; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");
    const seatNo = "S" + (i + 1);
    seat.dataset.seatNo = seatNo;

    if (i === 2 || i === 3 || i === 10) {
        seat.classList.add("booked");
    }

    seat.addEventListener("click", function () {
        if (!seat.classList.contains("booked")) {
            seat.classList.toggle("selected");
            updateCount();
        }
    });

    seatsContainer.appendChild(seat);
}

function updateCount() {
    const selected = document.querySelectorAll(".seat.selected").length;
    selectedCount.textContent = selected;
}

confirmBtn.addEventListener("click", function () {
    const selectedSeats = Array.from(
        document.querySelectorAll(".seat.selected")
    ).map(seat => seat.dataset.seatNo);

    if (selectedSeats.length === 0) {
        alert("At least 1 ta seat select koro.");
        return;
    }

    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    localStorage.setItem("ticketCount", selectedSeats.length);
    localStorage.setItem(
        "ticketPrice",
        selectedSeats.length * PRICE_PER_TICKET
    );

    window.location.href = "checkout.html";
});
