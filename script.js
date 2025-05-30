
        const products = [
            { id: 1, name: "Wireless Pro Charger", price: 89.99, description: "Ultra-fast wireless charging with premium materials", icon: "⚡" },
            { id: 2, name: "Crystal Clear Case", price: 49.99, description: "Military-grade protection with crystal clarity", icon: "📱" },
            { id: 3, name: "Audio Elite Headphones", price: 199.99, description: "Studio-quality sound with noise cancellation", icon: "🎧" },
            { id: 4, name: "USB-C Power Cable", price: 29.99, description: "Braided premium cable with fast charging", icon: "🔌" },
            { id: 5, name: "Magnetic Car Mount", price: 39.99, description: "Secure magnetic mounting for any vehicle", icon: "🚗" },
            { id: 6, name: "Bluetooth Speaker Pro", price: 129.99, description: "360° sound with waterproof design", icon: "🔊" },
            { id: 7, name: "Smart Watch Neo", price: 179.99, description: "Track your health and notifications in style", icon: "⌚" },
            { id: 8, name: "Ergonomic Laptop Stand", price: 59.99, description: "Adjustable stand for better posture and cooling", icon: "💻" },
            { id: 9, name: "Noise Cancelling Earbuds", price: 99.99, description: "Compact earbuds with active noise cancellation", icon: "🎶" },
            { id: 10, name: "Portable SSD 1TB", price: 149.99, description: "High-speed portable storage for all your files", icon: "💾" },
            { id: 11, name: "Wireless Mouse Pro", price: 39.99, description: "Ergonomic wireless mouse with silent clicks", icon: "🖱️" },
            { id: 12, name: "LED Desk Lamp", price: 34.99, description: "Adjustable brightness and color temperature", icon: "💡" }
        ];
        let cart = [];

        function loadProducts(filter = "") {
            const productGrid = document.getElementById('productGrid');
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(filter) ||
                product.description.toLowerCase().includes(filter)
            );
            if (filtered.length === 0) {
                productGrid.innerHTML = `<div style="color:white;text-align:center;width:100%;">No products found.</div>`;
                return;
            }
            productGrid.innerHTML = filtered.map(product => `
                <div class="product-card">
                    <div class="product-image">${product.icon}</div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `).join('');
        }

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = Number(e.target.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push(product);
                    updateCartCount();
                    e.target.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                    e.target.textContent = 'Added!';
                    e.target.disabled = true;
                    setTimeout(() => {
                        e.target.style.background = 'linear-gradient(45deg, #ff6b6b, #ff8e8e)';
                        e.target.textContent = 'Add to Cart';
                        e.target.disabled = false;
                    }, 1000);
                }
            }
        });

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cart.length;
        }

        function toggleCart() {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }
            let summary = cart.reduce((acc, item) => {
                acc[item.name] = (acc[item.name] || 0) + 1;
                return acc;
            }, {});
            let details = Object.entries(summary).map(([name, qty]) => `${name} x${qty}`).join('\n');
            let total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
            alert(`Cart:\n${details}\n\nTotal: $${total}`);
        }

        function scrollToProducts() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }

        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
            document.getElementById('searchBar').addEventListener('input', function() {
                loadProducts(this.value.trim().toLowerCase());
            });
        });

        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(102, 126, 234, 0.9)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
