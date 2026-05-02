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

// Floating WhatsApp button
const waBtn = document.createElement('a');
waBtn.href = 'https://wa.me/14155238886?text=Hi%20Blade%20%26%20Bree%2C%20I%20found%20you%20online%20and%20would%20like%20to%20know%20more';
waBtn.target = '_blank';
waBtn.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.141 1.542 5.878L.057 23.943l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.886 9.886 0 01-5.031-1.375l-.361-.214-3.741.981.999-3.648-.235-.374A9.861 9.861 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
  </svg>
`;
waBtn.style.cssText = `
  position: fixed;
  bottom: 28px;
  right: 28px;
  width: 56px;
  height: 56px;
  background: #25D366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 9999;
  cursor: pointer;
  transition: transform 0.2s;
`;
waBtn.addEventListener('mouseenter', () => waBtn.style.transform = 'scale(1.1)');
waBtn.addEventListener('mouseleave', () => waBtn.style.transform = 'scale(1.0)');
document.body.appendChild(waBtn);
