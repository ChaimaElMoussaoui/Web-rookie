function loadOrders() {
    console.log('loadOrders function called');
    try {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        console.log('Retrieved orders:', orders);
        const orderTableBody = document.getElementById('order-table-body');

        if (!orderTableBody) {
            console.error('Order table body element not found');
            return;
        }

        orderTableBody.innerHTML = '';

        orders.forEach((order) => {
            console.log('Processing order:', order);
            const row = document.createElement('tr');

            const orderDate = new Date(order.dateTime);
            const formattedDateTime = orderDate.toLocaleString();

            const totalPrice =
                order.totalPrice != null ? order.totalPrice.toFixed(2) : 'N/A';

            row.innerHTML = `
                <td>${order.id}</td>
                <td>€${totalPrice}</td>
                <td>${formattedDateTime}</td>
            `;
            orderTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

function resetOrders() {
    console.log('resetOrders function called');
    localStorage.removeItem('orders');
    loadOrders();
    console.log('Orders history reset');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event triggered');
    loadOrders();

    const resetButton = document.getElementById('reset-orders-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetOrders);
    }
});
