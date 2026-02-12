// Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Load products on home page
function loadHomeProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    // Gunakan getDisplayCount() untuk jumlah dinamis berdasarkan layar
    const displayCount = getDisplayCount();
    const displayProducts = products.slice(0, displayCount);
    
    productsGrid.innerHTML = displayProducts.map(product => `
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
}

// Fungsi untuk mendeteksi ukuran layar (tetap sama)
const getDisplayCount = () => {
    if (window.innerWidth >= 1024) {
        return 3;  // Desktop: 3 kolom x 2 baris
    } else if (window.innerWidth >= 640) {
        return 4;  // Tablet: 4 kolom x 1 baris
    } else {
        return 2;  // Mobile: 2 kolom x 1 baris
    }
};

window.addEventListener('resize', () => {
    // Re-render saat resize
    if (document.getElementById('productsGrid')) {
        loadHomeProducts();
    }
});

// Handle add to cart from product card
function handleAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCart(product, 1);
    }
}

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load products on home page
    if (document.getElementById('productsGrid')) {
        loadHomeProducts();
    }
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all product cards
    document.querySelectorAll('.product-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
