# Nissa Kuker - Website E-Commerce Kue Kering Lebaran

Website e-commerce untuk usaha kue kering "Aneka Kue Kering" milik Anissa Widalestari (@nissa.kuker) yang berlokasi di Ngadirojo, Pacitan.

## 🎨 Fitur Utama

- ✅ **7 Halaman Lengkap**: Home, Produk, Cart, Checkout, Testimoni, Tentang, Detail Produk
- ✅ **Tema Lebaran**: Dekorasi ketupat, lentera, motif Islamic dengan color palette krem-sage-emas
- ✅ **Shopping Cart**: Sistem keranjang belanja dengan localStorage
- ✅ **WhatsApp Checkout**: Checkout langsung via WhatsApp
- ✅ **Responsive Design**: Mobile-first, optimal di semua device
- ✅ **Smooth Animations**: CSS animations untuk dekorasi Lebaran
- ✅ **Filter Produk**: Filter by kategori (Tradisional/Modern)

## 📁 Struktur File

```
/public/
├── index.html              # Homepage
├── products.html           # Halaman katalog produk
├── cart.html              # Halaman keranjang belanja
├── checkout.html          # Halaman checkout
├── testimonials.html      # Halaman testimoni pelanggan
├── about.html             # Halaman tentang kami
│
├── css/
│   ├── style.css          # Main styles (navbar, buttons, cards, footer)
│   ├── decorations.css    # Lebaran decorations & animations
│   ├── products.css       # Products page styles
│   ├── cart.css           # Cart page styles
│   ├── checkout.css       # Checkout page styles
│   ├── testimonials.css   # Testimonials page styles
│   └── about.css          # About page styles
│
└── js/
    ├── products-data.js   # Data produk (5 items)
    ├── cart.js            # Cart management logic
    ├── main.js            # Main JavaScript (menu, scroll, animations)
    ├── products.js        # Products page logic (filter)
    ├── cart-page.js       # Cart page logic
    └── checkout.js        # Checkout page logic
```

## 🛍️ Produk

1. **Nastar** - Rp 85.000/toples
2. **Kastengel** - Rp 90.000/toples
3. **Putri Salju** - Rp 80.000/toples
4. **Kue Kacang** - Rp 75.000/toples
5. **Cookies Coklat** - Rp 95.000/toples

## 🎨 Color Palette

- **Cream**: `#FFFDF7`, `#FFF8E7`, `#FDF4DC`
- **Sage Green**: `#D8EDDB`, `#B4D7A8`, `#9DC88D`, `#8FBC8F`, `#7BA87B`
- **Gold**: `#FFF4D1`, `#FFE9A3`, `#FFD966`, `#F4C430`
- **Text**: `#2D3319` (dark), `#6B7044` (muted)

## 🚀 Cara Menggunakan

### Metode 1: Buka Langsung di Browser
1. Buka folder `/public`
2. Double-click file `index.html`
3. Website akan terbuka di browser default Anda

### Metode 2: Menggunakan Live Server (Recommended)
1. Install VS Code extension "Live Server"
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### Metode 3: Menggunakan http-server
```bash
# Install http-server globally
npm install -g http-server

# Navigate ke folder public
cd public

# Run server
http-server -p 8000

# Buka browser: http://localhost:8000
```

### Metode 4: Python Simple HTTP Server
```bash
# Python 3
cd public
python -m http.server 8000

# Python 2
cd public
python -m SimpleHTTPServer 8000

# Buka browser: http://localhost:8000
```

## 🔧 Kustomisasi

### Mengubah Data Produk
Edit file `/public/js/products-data.js`:
```javascript
const products = [
    {
        id: 'nama-produk',
        name: 'Nama Produk',
        category: 'Tradisional', // atau 'Modern'
        price: 85000,
        description: 'Deskripsi produk...',
        image: 'URL_GAMBAR_PRODUK'
    }
];
```

### Mengubah Nomor WhatsApp
Edit file `/public/js/checkout.js`:
```javascript
const WHATSAPP_NUMBER = '6281234567890'; // Ganti dengan nomor WA Anda
```

### Mengubah Warna
Edit file `/public/css/style.css` di bagian `:root`:
```css
:root {
    --cream-50: #FFFDF7;
    --sage-600: #669966;
    --gold-400: #F4C430;
    /* ... */
}
```

## 📱 Fitur Shopping Cart

- **Add to Cart**: Tambah produk ke keranjang
- **Update Quantity**: Ubah jumlah item (+ / -)
- **Remove Item**: Hapus item dari keranjang
- **Persistent**: Data tersimpan di localStorage
- **Real-time Update**: Cart counter update otomatis

## 💬 WhatsApp Checkout Flow

1. Customer mengisi form checkout (nama, HP, alamat, tanggal kirim)
2. Klik "Kirim via WhatsApp"
3. Otomatis membuka WhatsApp dengan pesan terformat:
   - Data pemesan
   - Detail pesanan
   - Total harga
   - Catatan tambahan
4. Customer bisa langsung chat dengan penjual untuk konfirmasi

## 🎯 Target Audience

- Warga Pacitan dan sekitarnya
- Keluarga muda dan ibu rumah tangga
- Untuk acara Lebaran dan momen spesial

## 📊 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

## 🎨 Dekorasi Lebaran

- **Ketupat Pattern**: Background pattern SVG
- **Islamic Pattern**: Geometric pattern
- **Floating Lanterns**: Animated with CSS (sway effect)
- **Sparkle Stars**: Fade in/out animation
- **Crescent & Star**: Islamic decorative icons

## 📝 Notes

- Website ini adalah **static website** (HTML, CSS, JavaScript vanilla)
- Tidak memerlukan backend server
- Data produk disimpan di JavaScript file
- Cart menggunakan localStorage browser
- Checkout via WhatsApp (tidak ada payment gateway)

## 👤 Owner Information

- **Nama**: Anissa Widalestari
- **Username**: @nissa.kuker (Instagram bisnis)
- **Personal**: @anissa.wida (Instagram personal)
- **Lokasi**: Ngadirojo, Pacitan, Jawa Timur
- **Berdiri**: 2021

## 📞 Contact

- Instagram Bisnis: [@nissa.kuker](https://instagram.com/nissa.kuker)
- Instagram Personal: [@anissa.wida](https://instagram.com/anissa.wida)
- WhatsApp: (Update nomor di checkout.js)

## 📄 License

© 2026 Aneka Kue Kering - Nissa Kuker. All rights reserved.

---

**Made with 💛 in Pacitan**
