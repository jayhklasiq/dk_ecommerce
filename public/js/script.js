//hamburg menu
function toggleMenu() {
  document.querySelector('.header-container').classList.toggle('active');
}

//year auto gen
document.getElementById('year').textContent = new Date().getFullYear();


// JavaScript for slider functionality
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slider');
  const buttons = document.querySelectorAll('#pagination button');
  let currentSlide = 0;

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      slides[currentSlide].classList.remove('active');
      buttons[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      buttons[currentSlide].classList.add('active');
    });
  });
});


function toggleMenu() {
    const headerContainer = document.querySelector('.header-container');
    headerContainer.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('#quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function() {
            const price = parseFloat(this.closest('form').querySelector('p').textContent.replace('Price: $', ''));
            const totalAmountElem = this.closest('form').querySelector('#total-amount');
            const total = (price * this.value).toFixed(2);
            totalAmountElem.textContent = total;
        });
    });
});

