document.addEventListener('DOMContentLoaded', () => {
  const shippingOptions = document.querySelectorAll('.shipping-option');
  const totalAmountElement = document.getElementById('total-amount');

  let baseAmount = parseFloat(totalAmountElement.textContent);

  shippingOptions.forEach(option => {
    option.addEventListener('change', () => {
      const shippingPrice = parseFloat(option.dataset.price);
      const newTotalAmount = baseAmount + shippingPrice;
      totalAmountElement.textContent = newTotalAmount.toFixed(2);
    });
  });

  // Automatically trigger the change event on the initially checked option to set the initial total amount
  const initiallyCheckedOption = document.querySelector('.shipping-option:checked');
  if (initiallyCheckedOption) {
    const event = new Event('change');
    initiallyCheckedOption.dispatchEvent(event);
  }
});
