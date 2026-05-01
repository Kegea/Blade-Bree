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
window.submitBooking = function(btn){
  btn.textContent = '✓ We\'ll hit you on WhatsApp';
  btn.style.background = '#2c6e49';
  setTimeout(() => {
    btn.textContent = 'Confirm Booking →';
    btn.style.background = '';
  }, 3500);
}
