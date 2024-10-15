let cart = [];
let totalPrice = 0;
let totalItems = 0;

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

function addToCart(productName, productPrice, buttonElement) {
    const quantitySelector = buttonElement.previousElementSibling;
    const quantity = parseInt(quantitySelector.querySelector('.quantity-input').value);

    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    totalItems += quantity;
    totalPrice += productPrice * quantity;

    updateCartMenu();
    updateCartModal();
    saveCartToLocalStorage(); // Guardar carrito en localStorage después de cada cambio
}

function updateCartMenu() {
    document.querySelector('.cart-count').innerText = totalItems;
    document.querySelector('.cart-total').innerText = `L ${totalPrice.toFixed(2)}`;
}

function updateCartModal() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `<p>${item.name} - L ${item.price} x ${item.quantity} = L ${itemTotal.toFixed(2)}</p>`;
        cartItemsList.appendChild(cartItemDiv);
    });

    document.getElementById('cart-subtotal').innerText = totalPrice.toFixed(2);
}

function clearCart() {
    cart = [];
    totalItems = 0;
    totalPrice = 0;
    updateCartMenu();
    updateCartModal();
    saveCartToLocalStorage(); // Limpia el carrito en localStorage
}

function toggleCartModal() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Guardar el carrito en localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar el carrito desde localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });
        updateCartMenu();
        updateCartModal();
    }
}

function updateQuantity(action, element) {
    const input = element.parentElement.querySelector('.quantity-input');
    let currentQuantity = parseInt(input.value);

    if (action === 'increase') {
        currentQuantity += 1;
    } else if (action === 'decrease' && currentQuantity > 1) {
        currentQuantity -= 1;
    }

    input.value = currentQuantity;
}
// Número de productos a mostrar inicialmente
let productosMostrados = 3;

// Función para mostrar los productos
function mostrarProductos() {
    const productos = document.querySelectorAll('.producto-card'); // Seleccionamos todas las tarjetas de productos
    productos.forEach((producto, index) => {
        if (index < productosMostrados) {
            producto.style.display = 'block'; // Mostrar producto si está dentro del límite
        } else {
            producto.style.display = 'none'; // Ocultar el resto
        }
    });

    // Mostrar o ocultar el botón "Ver más" y "Ver menos" según corresponda
    if (productosMostrados >= productos.length) {
        document.getElementById('ver-mas').style.display = 'none'; // Ocultar "Ver más" si ya se muestran todos
        document.getElementById('ver-menos').style.display = 'inline-block'; // Mostrar "Ver menos"
    } else {
        document.getElementById('ver-mas').style.display = 'inline-block'; // Mostrar "Ver más" si hay productos restantes
        document.getElementById('ver-menos').style.display = 'none'; // Ocultar "Ver menos" si no se han mostrado todos
    }
}

// Función para mostrar más productos (incrementar el límite)
function verMas() {
    productosMostrados += 3; // Incrementamos el límite en 3 productos
    mostrarProductos(); // Actualizamos la vista
}

// Función para mostrar menos productos (restablecer el límite)
function verMenos() {
    productosMostrados = 3; // Restablecemos el límite inicial
    mostrarProductos(); // Actualizamos la vista
}

// Ejecutar la función al cargar la página para mostrar los primeros productos
document.addEventListener('DOMContentLoaded', mostrarProductos);

