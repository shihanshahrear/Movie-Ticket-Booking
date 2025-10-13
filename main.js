// main.js - handles UI, navigation and localStorage for multi-page demo
// Comments included throughout

// --- Sample movie dataset ---
const MOVIES = [
  { id:1, title: 'Galactic Wars', desc: 'An epic space saga full of heroes and villains.', duration: '2h 15m', rating: 8.4, poster: '(image2)', price: 6 },
  { id:2, title: 'River of Dreams', desc: 'A touching drama that explores human bonds.', duration: '1h 50m', rating: 7.6, poster: '(image3)', price: 5 },
  { id:3, title: 'Night Runner', desc: 'Action packed thriller through the city night.', duration: '2h 5m', rating: 7.9, poster: '(image4)', price: 7 },
  { id:4, title: 'Smile Again', desc: 'Light-hearted comedy and romance.', duration: '1h 58m', rating: 7.2, poster: '(image5)', price: 5 },
  { id:5, title: 'Moonlight Tales', desc: 'Mystery and drama intertwined.', duration: '2h 0m', rating: 7.8, poster: '(image6)', price: 6 },
  { id:6, title: 'Speed Alley', desc: 'High-octane racing adventure.', duration: '1h 48m', rating: 7.3, poster: '(image7)', price: 6 }
];

// Utility: save booking object to localStorage
function saveBooking(data){
  localStorage.setItem('booking', JSON.stringify(data));
}

// Utility: load booking object
function loadBooking(){
  const s = localStorage.getItem('booking');
  return s ? JSON.parse(s) : null;
}

// --- Home page rendering: movie cards ---
if(document.getElementById('movieGrid')){
  const grid = document.getElementById('movieGrid');
  function renderMovies(list){
    grid.innerHTML = '';
    list.forEach(m => {
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-6 mb-4';
      col.innerHTML = `
        <div class="card bg-secondary h-100">
          <div class="card-body d-flex flex-column">
            <div class="poster-placeholder mb-3">${m.poster}</div>
            <h5 class="card-title">${m.title}</h5>
            <p class="text-muted small mb-2">${m.duration} • Rating: ${m.rating}</p>
            <p class="card-text text-muted small mb-3">${m.desc}</p>
            <div class="mt-auto">
              <a href="movie.html" class="btn btn-primary w-100" data-id="${m.id}" onclick="openMovie(event)">View & Book</a>
            </div>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });
  }
  renderMovies(MOVIES);

  // Search functionality
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', () => {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if(!q){ renderMovies(MOVIES); return; }
    const filtered = MOVIES.filter(m => m.title.toLowerCase().includes(q));
    renderMovies(filtered);
  });
}

// When clicking "View & Book" save selection and go to movie.html
function openMovie(e){
  e.preventDefault();
  const id = Number(e.currentTarget.getAttribute('data-id'));
  const movie = MOVIES.find(m => m.id === id);
  if(movie){
    // save to localStorage for other pages
    saveBooking({ movieId: movie.id, movieTitle: movie.title, showtime: null, seats: [], total: 0, pricePerSeat: movie.price });
    // navigate to movie page (already link)
    window.location.href = 'movie.html';
  }
}

// --- movie.html logic: populate details from localStorage ---
if(document.getElementById('movieTitle')){
  const booking = loadBooking();
  if(booking){
    const movie = MOVIES.find(m => m.id === booking.movieId);
    if(movie){
      document.getElementById('movieTitle').textContent = movie.title;
      document.getElementById('movieHeader').textContent = movie.title;
      document.getElementById('movieDesc').textContent = movie.desc;
      document.getElementById('movieMeta').textContent = movie.duration + ' • Rating: ' + movie.rating;
    }
  }
  // when user clicks "Select Seats & Book"
  document.getElementById('toBooking').addEventListener('click', () => {
    const showtime = document.getElementById('showtimeSelect').value;
    const booking = loadBooking() || {};
    booking.showtime = showtime;
    saveBooking(booking);
    window.location.href = 'booking.html';
  });
}

// --- booking.html logic: render seats and summary ---
if(document.getElementById('seatMap')){
  const booking = loadBooking();
  const movie = booking ? MOVIES.find(m => m.id === booking.movieId) : null;
  document.getElementById('bookingMovieTitle').textContent = movie ? ('Select seats for: ' + movie.title) : 'Select seats';
  document.getElementById('summaryMovie').textContent = movie ? movie.title : '-';
  document.getElementById('summaryShowtime').textContent = booking.showtime || '-';

  const seatMap = document.getElementById('seatMap');
  const summarySeats = document.getElementById('summarySeats');
  const summaryTotal = document.getElementById('summaryTotal');

  let selectedSeats = booking.seats || [];

  // sample booked seats
  const bookedSample = new Set([3,4,11,12,20]);

  function renderSeats(){
    seatMap.innerHTML = '';
    for(let i=1;i<=40;i++){
      const btn = document.createElement('button');
      btn.className = 'seat';
      btn.textContent = i;
      if(bookedSample.has(i)){
        btn.classList.add('booked');
        btn.disabled = true;
      } else if(selectedSeats.includes(i)){
        btn.classList.add('selected');
      }
      btn.addEventListener('click', () => toggleSeat(btn, i));
      seatMap.appendChild(btn);
    }
    updateSummary();
  }

  function toggleSeat(btn, num){
    if(btn.classList.contains('selected')){
      btn.classList.remove('selected');
      selectedSeats = selectedSeats.filter(s => s !== num);
    } else {
      btn.classList.add('selected');
      selectedSeats.push(num);
    }
    updateSummary();
  }

  function updateSummary(){
    summarySeats.textContent = selectedSeats.length ? selectedSeats.join(', ') : '-';
    const total = (movie ? movie.price : 0) * selectedSeats.length;
    summaryTotal.textContent = '$' + total;
    // save to booking
    const b = loadBooking() || {};
    b.seats = selectedSeats;
    b.total = total;
    saveBooking(b);
  }

  // proceed to payment
  document.getElementById('toPayment').addEventListener('click', () => {
    const b = loadBooking();
    if(!b || !b.seats || b.seats.length === 0){
      alert('Please select at least one seat.');
      return;
    }
    window.location.href = 'payment.html';
  });

  renderSeats();
}

// --- payment.html logic: show summary and simulate payment ---
if(document.getElementById('paymentForm')){
  const booking = loadBooking();
  const payMovie = document.getElementById('payMovie');
  const paySeats = document.getElementById('paySeats');
  const payTotal = document.getElementById('payTotal');
  if(booking){
    const movie = MOVIES.find(m => m.id === booking.movieId);
    payMovie.textContent = movie ? movie.title : '-';
    paySeats.textContent = booking.seats && booking.seats.length ? booking.seats.join(', ') : '-';
    payTotal.textContent = '$' + (booking.total || 0);
  }

  document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic validation (in demo)
    const name = document.getElementById('cardName').value.trim();
    if(!name){ alert('Enter card name'); return; }
    // simulate payment success
    const booking = loadBooking() || {};
    booking.paid = true;
    booking.paidAt = new Date().toISOString();
    saveBooking(booking);
    // go to confirmation
    window.location.href = 'confirmation.html';
  });
}

// --- confirmation.html logic: display final ticket and enable download (simulated) ---
if(document.getElementById('confText')){
  const booking = loadBooking();
  if(!booking || !booking.paid){
    document.getElementById('confText').textContent = 'No recent booking found.';
  } else {
    const movie = MOVIES.find(m => m.id === booking.movieId);
    const text = `Movie: ${movie.title}\nShowtime: ${booking.showtime}\nSeats: ${booking.seats.join(', ')}\nTotal: $${booking.total}\nBooked at: ${booking.paidAt}`;
    document.getElementById('ticketBox').textContent = text;
    document.getElementById('downloadTicket').addEventListener('click', (e) => {
      e.preventDefault();
      // create a simple text file for download
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket_${movie.title.replace(/\s+/g,'_')}.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }
}

// Expose openMovie to global (used in inline onclick)
window.openMovie = openMovie;
