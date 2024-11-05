document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const editForm = document.getElementById('edit-form');
    if (editForm) {
        editForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const productId = parseInt(
                document.getElementById('product-id').value,
            );
            const updatedProduct = {
                id: productId,
                title: document.getElementById('product-title').value,
                price: parseFloat(
                    document.getElementById('product-price').value,
                ),
                image: document.getElementById('product-image').value,
            };
            editProduct(productId, updatedProduct);
        });
    }
});

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

function loadProducts() {
    console.log('loadProducts called');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Loaded products from localStorage:', products);
    const productTableBody = document.getElementById('product-table-body');
    productTableBody.innerHTML = '';

    products.forEach((product) => {
        console.log('Adding product to table:', product);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>€${product.price.toFixed(2)}</td>
            <td>${product.image}</td>
            <td><a href="edit-product.html?id=${product.id}">Edit</a></td>
            <td>
                <button onclick="deleteProduct(${product.id})">Remove</button>
            </td>
        `;
        productTableBody.appendChild(row);
    });
}
function deleteProduct(productId) {
    console.log('deleteProduct function called with productId:', productId);
    let products = JSON.parse(localStorage.getItem('products')) || [];

    products = products.filter((product) => product.id !== productId);

    localStorage.setItem('products', JSON.stringify(products));

    loadProducts();
    console.log('Product deleted:', productId);
}

function deleteProductWithoutConfirm(productId) {
    console.log(
        'deleteProductWithoutConfirm called with productId:',
        productId,
    );
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Current products:', products);
    products = products.filter((product) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

function resetProducts() {
    console.log('resetProducts called');
    localStorage.removeItem('products');
    alert('Producten zijn gereset!');
    loadProducts();
}

function editProduct(productId, updatedProduct) {
    console.log(
        'editProduct called with productId:',
        productId,
        'and updatedProduct:',
        updatedProduct,
    );

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.map((product) => {
        if (product.id === productId) {
            return updatedProduct;
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}
