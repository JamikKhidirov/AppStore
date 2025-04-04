let cart = [];

function addToCart(button) {
    const productElement = button.parentElement;
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseInt(productElement.getAttribute('data-price'));
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartDisplay();
    showNotification(`${productName} успешно добавлен в корзину!`);
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price').querySelector('span');
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        const details = document.createElement('div');
        details.innerHTML = `
            ${index + 1}. ${item.name} - ${formatPrice(item.price)} ₽ x ${item.quantity}
        `;
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Удалить';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => removeFromCart(index);
        li.appendChild(details);
        li.appendChild(deleteBtn);
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });
    totalPriceElement.innerText = formatPrice(total);
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.style.display = cart.length > 0 ? 'block' : 'none';
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function removeFromCart(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
    }, 2000);
}

document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const address = document.getElementById('address').value;
    alert(`Заказ оформлен! Адрес доставки: ${address}`);
    cart = [];
    updateCartDisplay();
});
