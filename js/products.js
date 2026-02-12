// Products Page JavaScript

let currentCategory = 'Semua';

// Load all products
function loadAllProducts(category = 'Semua') {
    const productsGrid = document.getElementById('allProductsGrid');
    if (!productsGrid) return;

    const filteredProducts = category === 'Semua' 
        ? products 
        : products.filter(p => p.category === category);

    // Update count
    const countElement = document.getElementById('productsCount');
    if (countElement) {
        countElement.textContent = filteredProducts.length;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                    ${product.category}
                </div>
            </div>
            <div class="product-info">
                <a href="product-detail.html?id=${product.id}">
                    <h3 class="product-name">${product.name}</h3>
                </a>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price-wrapper">
                        <p class="product-price">${formatCurrency(product.price)}</p>
                        <p class="product-price-label">per toples</p>
                    </div>
                    <button class="add-to-cart-btn" onclick="handleAddToCart('${product.id}')">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

// Filter button handler
document.addEventListener('DOMContentLoaded', function() {
    // Load all products
    loadAllProducts();

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category and load products
            const category = this.dataset.category;
            currentCategory = category;
            loadAllProducts(category);
        });
    });
});
