let cart = [];

function addToCart(button) {
    const productElement = button.parentElement;
    const productName = productElement.getAttribute('data-name');
    const productPrice = parseFloat(productElement.getAttribute('data-price'));

    // Проверяем, есть ли уже такой товар в корзине
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
        li.innerHTML = `
            ${index + 1}. ${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartItemsElement.appendChild(li);

        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = total.toFixed(2);

    document.getElementById('cart-count').innerText = cart.length;

    if (cart.length > 0) {
        document.getElementById('checkout-form').style.display = 'block';
    } else {
        document.getElementById('checkout-form').style.display = 'none';
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 2000);
}