const seatsContainerAdmin = document.getElementById("seats");
const totalSeatsSpan = document.getElementById("totalSeats");
const soldSeatsSpan = document.getElementById("soldSeats");
const availableSeatsSpan = document.getElementById("availableSeats");
const totalSellSpan = document.getElementById("totalSell");

const PRICE = 10;
const TOTAL_SEATS = 56;
const SOLD_SEATS = 31;

for (let i = 0; i < TOTAL_SEATS; i++) {
    const seat = document.createElement("div");
    seat.classList.add("seat");

    if (i < SOLD_SEATS) {
        seat.classList.add("sold");
    } else {
        seat.classList.add("empty");
    }

    seatsContainerAdmin.appendChild(seat);
}

totalSeatsSpan.textContent = TOTAL_SEATS;
soldSeatsSpan.textContent = SOLD_SEATS;
availableSeatsSpan.textContent = TOTAL_SEATS - SOLD_SEATS;
totalSellSpan.textContent = SOLD_SEATS * PRICE;

const dateButtons = document.querySelectorAll(".date");
dateButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        dateButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        alert("Demo: different date select kora hoise (same data).");
    });
});
