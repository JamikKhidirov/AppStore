let cart = [];

function addToCart(button) {
   const productElement = button.parentElement;

   const productName = productElement.getAttribute('data-name');
   const productPrice = parseFloat(productElement.getAttribute('data-price'));

   cart.push({ name: productName, price: productPrice });

   document.getElementById('cart-count').innerText = cart.length;

   showNotification(`${productName} успешно добавлен в корзину!`);
   
   updateCartDisplay();
}

function updateCartDisplay() {
   const cartItemsElement = document.getElementById('cart-items');
   
   cartItemsElement.innerHTML = '';

   cart.forEach(item => {
       const li = document.createElement('li');
       li.innerText = `${item.name} - $${item.price}`;
       cartItemsElement.appendChild(li);
   });

   if (cart.length > 0) {
       document.getElementById('checkout-form').style.display = 'block';
   } else {
       document.getElementById('checkout-form').style.display = 'none';
   }
}

function showNotification(message) {
   const notification = document.getElementById('notification');
   
   notification.innerText = message;

   notification.style.display = 'block';
   
   setTimeout(() => {
       notification.style.opacity = '1';
       setTimeout(() => {
           notification.style.opacity = '0';
           setTimeout(() => { notification.style.display = 'none'; }, 500);
       }, 2000);
   }, 100);
}
