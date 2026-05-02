// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('on'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// Drag scroll barbers
const scroll = document.getElementById('barberScroll');
let isDown=false, startX, scrollLeft;
if (scroll) {
  scroll.addEventListener('mousedown', e => {
    isDown=true; scroll.classList.add('active');
    startX = e.pageX - scroll.offsetLeft;
    scrollLeft = scroll.scrollLeft;
  });
  scroll.addEventListener('mouseleave', () => isDown=false);
  scroll.addEventListener('mouseup', () => isDown=false);
  scroll.addEventListener('mousemove', e => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - scroll.offsetLeft;
    scroll.scrollLeft = scrollLeft - (x - startX) * 1.4;
  });
}

// Booking confirm
window.submitBooking = async function(btn) {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('wa').value.trim();
  const service = document.getElementById('service').value;
  const barber = document.getElementById('barber').value || 'No preference';
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value.trim();

  if (!name || !phone || !service || !date || !time) {
    alert('Please fill in all required fields.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    await fetch('https://mindgeek.app.n8n.cloud/webhook/Booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: name,
        customerPhone: phone,
        service: service,
        barber: barber,
        date: date,
        time: time,
        notes: notes
      })
    });

    btn.textContent = '✓ Booked! Check your WhatsApp';
    btn.style.background = '#2c6e49';
    setTimeout(() => {
      btn.textContent = 'Confirm Booking →';
      btn.style.background = '';
      btn.disabled = false;
    }, 5000);

  } catch (error) {
    btn.textContent = 'Something went wrong — try again';
    btn.style.background = '#c0392b';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Confirm Booking →';
      btn.style.background = '';
    }, 3000);
  }
}
