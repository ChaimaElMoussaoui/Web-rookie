document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) {
        loadProductData(productId);
    }

    document
        .getElementById('edit-form')
        .addEventListener('submit', function (event) {
            event.preventDefault();
            saveProductData();
        });
});

function loadProductData(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-title').value = product.title;
        document.getElementById('product-author').value = product.author;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-image').value = product.image;
    }
}

function saveProductData() {
    const id = parseInt(document.getElementById('product-id').value);
    const title = document.getElementById('product-title').value;
    const author = document.getElementById('product-author').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex((p) => p.id === id);

    if (productIndex !== -1) {
        products[productIndex] = {
            id,
            title,
            author,
            price,
            image,
        };
        localStorage.removeItem('products');
        localStorage.setItem('products', JSON.stringify(products));
        alert('Product updated successfully!');
        window.location.href = 'admin.html';
    } else {
        alert('Product not found!');
    }
}
document.getElementById('product-price').setAttribute('step', '0.01');
