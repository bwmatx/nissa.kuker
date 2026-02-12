// Checkout Page JavaScript

const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WA Nissa Kuker

function renderOrderSummary() {
    const cart = getCart();
    const container = document.getElementById('orderItems');

    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="order-item fade-in">
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <p class="order-item-name">${item.name}</p>
                <p class="order-item-quantity">${item.quantity} toples × ${formatCurrency(item.price)}</p>
                <p class="order-item-price">${formatCurrency(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');

    const subtotal = getCartTotal(cart);
    const itemCount = getCartItemCount(cart);

    document.getElementById('orderSubtotal').textContent = formatCurrency(subtotal);
    document.getElementById('orderItemCount').textContent = `${itemCount} toples`;
    document.getElementById('orderTotal').textContent = formatCurrency(subtotal);
}

function generateWhatsAppMessage(formData, cart) {
    const total = getCartTotal(cart);
    const itemCount = getCartItemCount(cart);

    let message = `*PESANAN BARU - NISSA KUKER* 🍪\n\n`;
    message += `*DATA PEMESAN:*\n`;
    message += `Nama: ${formData.customerName}\n`;
    message += `No. HP: ${formData.customerPhone}\n`;
    message += `Alamat: ${formData.customerAddress}\n`;
    message += `Tanggal Pengiriman: ${formatDate(formData.deliveryDate)}\n\n`;

    message += `*DETAIL PESANAN:*\n`;
    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   ${item.quantity} toples × ${formatCurrency(item.price)} = ${formatCurrency(item.price * item.quantity)}\n`;
    });

    message += `\n*TOTAL PESANAN:*\n`;
    message += `Jumlah Item: ${itemCount} toples\n`;
    message += `Subtotal: ${formatCurrency(total)}\n`;
    message += `Ongkir: _Akan dikonfirmasi_\n\n`;

    if (formData.notes) {
        message += `*CATATAN:*\n${formData.notes}\n\n`;
    }

    message += `Mohon konfirmasi ketersediaan dan total pembayaran. Terima kasih! 🙏`;

    return encodeURIComponent(message);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
}

function setMinDeliveryDate() {
    const dateInput = document.getElementById('deliveryDate');
    const today = new Date();
    // Minimal H-7
    today.setDate(today.getDate() + 7);
    const minDate = today.toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    renderOrderSummary();
    setMinDeliveryDate();

    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            customerName: document.getElementById('customerName').value,
            customerPhone: document.getElementById('customerPhone').value,
            customerAddress: document.getElementById('customerAddress').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            notes: document.getElementById('notes').value
        };

        // Validasi nomor HP
        const phonePattern = /^08\d{8,11}$/;
        if (!phonePattern.test(formData.customerPhone)) {
            showToast('Format nomor WhatsApp tidak valid! Gunakan format: 08xxxxxxxxxx', 'error');
            return;
        }

        // Validasi tanggal
        const selectedDate = new Date(formData.deliveryDate);
        const minDate = new Date();
        minDate.setDate(minDate.getDate() + 7);
        
        if (selectedDate < minDate) {
            showToast('Tanggal pengiriman minimal H-7 dari hari ini!', 'error');
            return;
        }

        const cart = getCart();
        const message = generateWhatsAppMessage(formData, cart);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show success message
        showToast('Pesanan dikirim! Silakan lanjutkan di WhatsApp', 'success');

        // Clear cart after 2 seconds
        setTimeout(() => {
            clearCart();
            window.location.href = 'index.html';
        }, 2000);
    });

    // Phone number formatting
    const phoneInput = document.getElementById('customerPhone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Auto-add 08 prefix if user starts with 8
        if (value.startsWith('8') && value.length > 1) {
            value = '0' + value;
        }
        
        e.target.value = value;
    });

    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.order-item').forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
});
