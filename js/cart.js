function loadCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    console.log('Cart Items Container:', cartItemsContainer);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Cart:', cart);
    console.log('Products:', products);

    cartItemsContainer.innerHTML = ''; 
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Je winkelwagen is leeg.</p>'; 
    }

    cart.forEach((productId) => {
        const product = products.find((p) => p.id === productId);
        console.log('Current Product:', product);
        if (product) {
            const itemElement = createCartItemElement(product);
            cartItemsContainer.appendChild(itemElement);
            totalPrice += product.price;
        }
    });

    const totalPriceElement = document.getElementById('total-price');
    console.log('Total Price Element:', totalPriceElement); 
    if (totalPriceElement) {
        totalPriceElement.innerText = `Totaal: €${totalPrice.toFixed(2)}`;
    } else {
        console.error('Total price element not found!');
    }
}


function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter((id) => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
    console.log('Product removed from cart:', productId);
}


function createCartItemElement(product) {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="details">
            <h3>${product.title}</h3>
            <p>Auteur: ${product.author}</p>
        </div>
        <div class="price">€${product.price.toFixed(2)}</div>
        <button class="remove-button" onclick="removeFromCart(${product.id})">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
    return itemElement;
}


function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    console.log('Product added to cart:', productId);
}


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    console.log('Cart Count Element:', cartCountElement);
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    } else {
        console.error('Cart count element not found!');
    }
}


function placeOrderFromCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (cart.length === 0) {
        alert('Je winkelwagen is leeg.');
        return;
    }

    const order = {
        id: Math.floor(Math.random() * 100000),
        totalPrice: cart.reduce((total, productId) => {
            const product = products.find((p) => p.id === productId);
            return total + (product ? product.price : 0);
        }, 0),
        products: cart.map((productId) => {
            const product = products.find((p) => p.id === productId);
            return {
                productId: productId,
                price: product ? product.price : 0,
            };
        }),
        dateTime: Date.now(),
    };


    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    document.getElementById('success-message').style.display = 'block';
    loadCart();
    updateCartCount();
}


function placeOrder() {
    placeOrderFromCart();
}


document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartCount();
});


