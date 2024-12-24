const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const placeOrderButton = document.getElementById('place-order');

let cart = [];
let totalPrice = 0;

const addToCart = (event) => {
  const itemName = event.target.dataset.name;
  const itemPrice = parseFloat(event.target.dataset.price);

  // Add item to cart
  cart.push({ name: itemName, price: itemPrice });

  // Update total price
  totalPrice += itemPrice;

  // Add item to the cart UI
  const cartItem = document.createElement('li');
  cartItem.textContent = `${itemName} - $${itemPrice.toFixed(2)}`;
  cartItemsList.appendChild(cartItem);

  // Update the total price displayed
  totalPriceElement.textContent = totalPrice.toFixed(2);

  // Enable the "Place Order" button
  placeOrderButton.disabled = false;
};

addToCartButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

const placeOrder = () => {
  if (cart.length === 0) return;

  alert('Order placed successfully!');
  cart = [];
  totalPrice = 0;

  // Clear cart UI
  cartItemsList.innerHTML = '';
  totalPriceElement.textContent = '0.00';

  // Disable the "Place Order" button again
  placeOrderButton.disabled = true;
};

placeOrderButton.addEventListener('click', placeOrder);
