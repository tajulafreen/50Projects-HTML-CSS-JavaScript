/* eslint-disable no-unused-vars */
// Fake API URL (you can replace this with a real API if needed)
const apiUrl = 'https://fakestoreapi.com/products';

// Elements
const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsList = document.getElementById('cart-items');

// Cart array to store added products
const cart = [];

// Display fetched products
const displayProducts = (products) => {
  productsContainer.innerHTML = ''; // Clear previous products

  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3 class="title">${product.title}</h3>
        <p class="price">$${product.price}</p>
        <button onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
      `;
    productsContainer.appendChild(productElement);
  });
};

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Add product to cart
const addToCart = (id, title, image, price) => {
  const existingProductIndex = cart.findIndex((item) => item.id === id);

  if (existingProductIndex === -1) {
    cart.push({
      id,
      title,
      image,
      price,
      quantity: 1,
    });
  } else {
    cart[existingProductIndex].quantity += 1;
  }

  console.log(cart); // You can replace this with a cart UI or alert
  alert(`${title} added to cart!`);
};

// Close cart modal
closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

// Display cart contents
const displayCart = () => {
  cartItemsList.innerHTML = ''; // Clear previous cart items

  cart.forEach((item) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${item.title} (x${item.quantity})</span>
      <span>$${item.price * item.quantity}</span>
    `;
    cartItemsList.appendChild(cartItem);
  });
};

// Open cart modal
cartBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty.');
  } else {
    displayCart();
    cartModal.style.display = 'flex';
  }
});

// Initialize
fetchProducts();
