const ticketCountSpan = document.getElementById("ticketCount");
const ticketTotalSpan = document.getElementById("ticketTotal");

const count = Number(localStorage.getItem("ticketCount")) || 0;
const total = Number(localStorage.getItem("ticketPrice")) || 0;

ticketCountSpan.textContent = count;
ticketTotalSpan.textContent = total.toFixed(2);

const checkoutForm = document.getElementById("checkoutForm");

checkoutForm.addEventListener("submit", function (e) {
    if (count === 0) {
        e.preventDefault();
        alert("Kon seat select kora nai. Age seat select koro.");
        window.location.href = "seat-select.html";
        return;
    }

    const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");
    document.getElementById("seatsHidden").value = seats.join(", ");
    document.getElementById("totalHidden").value = total.toFixed(2);
});
