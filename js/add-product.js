document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('add-product-form').addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Form submission prevented');
        addProduct();
    });
});

function addProduct() {
    console.log('addProduct function called');
    const title = document.getElementById('product-title').value;
    const author = document.getElementById('product-author').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const image = document.getElementById('product-image').value;

    console.log('Product details:', {
        title,
        author,
        price,
        image,
    });
   
    let products = JSON.parse(localStorage.getItem('products')) || [];
    console.log('Current products:', products);

    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    console.log('New product ID:', newId);

    const newProduct = {
        id: newId,
        title,
        author,
        price,
        image,
    };

    products.push(newProduct);
    console.log('Updated products:', products);

    localStorage.setItem('products', JSON.stringify(products));
    console.log('Products saved to localStorage');

    alert('Product added successfully!');
    console.log('Redirecting to admin.html');
    window.location.href = 'admin.html';
}

document.getElementById('product-price').setAttribute('step', '0.01');