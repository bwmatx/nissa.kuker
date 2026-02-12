// Cart Management
const CART_STORAGE_KEY = 'nissa_kuker_cart';

// Get cart from localStorage
function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

// Add product to cart
function addToCart(product, quantity = 1) {
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.productId === product.id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart(cart);
    showToast(`${product.name} ditambahkan ke keranjang!`, 'success');
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        if (quantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = quantity;
        }
    }

    saveCart(cart);
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.productId !== productId);
    saveCart(cart);
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartCount();
}

// Get cart total price
function getCartTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount(cart) {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Format currency to IDR
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Update cart count in navbar
function updateCartCount() {
    const cart = getCart();
    const count = getCartItemCount(cart);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = count;
        element.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
