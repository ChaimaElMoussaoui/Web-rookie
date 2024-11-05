document.addEventListener('DOMContentLoaded', () => {
   if(localStorage.getItem('products')== null)  {
    loadProductsFromJSON();
   } else {
    loadProducts();
   }
    updateCartCount();
});

function loadProducts() {
    console.log('loadProducts called');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Loaded products from localStorage:', products);
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    products.forEach((product) => {
        console.log('Adding product to container:', product);
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Auteur: ${product.author}</p>
            <p class="price">€${product.price.toFixed(2)}</p>
            <button onclick='addToCart(${product.id})'>
                Toevoegen aan winkelwagen
            </button>
        `;
        container.appendChild(productElement);
    });
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(productId) {
    console.log('addToCart function called with productId:', productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log('Product added to cart:', productId);
}


function loadProductsFromJSON() {
    console.log('loadProductsFromJSON called');
    fetch('products.json')
        .then((response) => response.json())
        .then((products) => {
            console.log('Products loaded from JSON:', products);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
        })
        .catch((error) => console.error('Fout bij het laden van JSON:', error));
}