// Cart Page JavaScript

function renderCartItems() {
    const cart = getCart();
    const container = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('emptyCartState');
    const cartItemsCount = document.getElementById('cartItemsCount');

    if (cart.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        cartItemsCount.textContent = '0 items';
        updateCartSummary(cart);
        return;
    }

    container.style.display = 'flex';
    emptyState.style.display = 'none';
    cartItemsCount.textContent = `${getCartItemCount(cart)} items`;

    container.innerHTML = cart.map(item => `
        <div class="cart-item fade-in">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">${formatCurrency(item.price)}</p>
                
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity('${item.productId}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity('${item.productId}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="cart-item-actions">
                <p class="cart-item-subtotal">${formatCurrency(item.price * item.quantity)}</p>
                <button class="remove-btn" onclick="handleRemoveItem('${item.productId}', '${item.name}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Hapus
                </button>
            </div>
        </div>
    `).join('');

    updateCartSummary(cart);
}

function updateCartSummary(cart) {
    const subtotal = getCartTotal(cart);
    const itemCount = getCartItemCount(cart);

    document.getElementById('summarySubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('summaryItemCount').textContent = `${itemCount} toples`;
    document.getElementById('summaryTotal').textContent = formatCurrency(subtotal);

    // Disable checkout button if cart is empty
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (cart.length === 0) {
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.pointerEvents = 'none';
    } else {
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
    }
}

function increaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    if (item) {
        updateCartItemQuantity(productId, item.quantity + 1);
        renderCartItems();
        showToast('Jumlah diperbarui', 'success');
    }
}

function decreaseQuantity(productId) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
        updateCartItemQuantity(productId, item.quantity - 1);
        renderCartItems();
        showToast('Jumlah diperbarui', 'success');
    } else if (item && item.quantity === 1) {
        handleRemoveItem(productId, item.name);
    }
}

function handleRemoveItem(productId, productName) {
    if (confirm(`Hapus ${productName} dari keranjang?`)) {
        removeFromCart(productId);
        renderCartItems();
        showToast(`${productName} dihapus dari keranjang`, 'success');
    }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    renderCartItems();
    
    // Add animation to cart items
    setTimeout(() => {
        document.querySelectorAll('.cart-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
});
