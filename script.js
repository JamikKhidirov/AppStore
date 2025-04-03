let cart = [];

// Функция добавления товара в корзину
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

// Функция обновления отображения корзины
function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price').querySelector('span');

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');

        // Создаем элементы для товара
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

    // Показываем форму, если в корзине есть товары
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.style.display = cart.length > 0 ? 'block' : 'none';

    // Обновляем счетчик корзины
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Функция удаления товара из корзины
function removeFromCart(index) {
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity -= 1; // Уменьшаем количество на 1
    } else {
        cart.splice(index, 1); // Полностью удаляем товар, если количество равно 1
    }
    updateCartDisplay();
}

// Функция форматирования цены
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Функция показа уведомления
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

// Обработчик отправки формы
document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const address = document.getElementById('address').value;
    alert(`Заказ оформлен! Адрес доставки: ${address}`);
    cart = [];
    updateCartDisplay();
});
