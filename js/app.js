// Football Store Application Logic

class FootballStore {
    constructor() {
        this.products = PRODUCTS_DATA;
        this.cart = this.loadCart();
        this.wishlist = this.loadWishlist();
        this.activeCategory = 'all';
        this.selectedBrand = 'all';
        this.selectedGround = 'all';
        this.searchQuery = '';
        this.sortBy = 'featured';
        this.appliedPromo = null;
        this.activeModalProduct = null;
        this.freeShippingThreshold = 2000;
        this.standardShippingCost = 100;

        this.init();
    }

    init() {
        this.renderProducts();
        this.updateCartBadge();
        this.updateWishlistBadge();
        this.setupEventListeners();
    }

    // --- LocalStorage Helpers ---
    loadCart() {
        try {
            const saved = localStorage.getItem('striker_cart');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveCart() {
        try {
            localStorage.setItem('striker_cart', JSON.stringify(this.cart));
        } catch (e) {}
        this.updateCartBadge();
    }

    loadWishlist() {
        try {
            const saved = localStorage.getItem('striker_wishlist');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    saveWishlist() {
        try {
            localStorage.setItem('striker_wishlist', JSON.stringify(this.wishlist));
        } catch (e) {}
        this.updateWishlistBadge();
    }

    // --- Product Filtering & Sorting ---
    getFilteredProducts() {
        return this.products.filter(item => {
            // Category filter
            if (this.activeCategory !== 'all' && item.category !== this.activeCategory) {
                return false;
            }
            // Brand filter
            if (this.selectedBrand !== 'all' && item.brand.toLowerCase() !== this.selectedBrand.toLowerCase()) {
                return false;
            }
            // Ground type filter for boots
            if (this.selectedGround !== 'all') {
                if (item.category === 'boots' && item.groundType !== this.selectedGround) {
                    return false;
                }
            }
            // Search query
            if (this.searchQuery.trim() !== '') {
                const query = this.searchQuery.toLowerCase();
                const matchName = item.name.toLowerCase().includes(query);
                const matchBrand = item.brand.toLowerCase().includes(query);
                const matchDesc = item.description.toLowerCase().includes(query);
                if (!matchName && !matchBrand && !matchDesc) return false;
            }
            return true;
        }).sort((a, b) => {
            if (this.sortBy === 'price-low') return a.price - b.price;
            if (this.sortBy === 'price-high') return b.price - a.price;
            if (this.sortBy === 'rating') return b.rating - a.rating;
            if (this.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return 0; // default featured
        });
    }

    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const emptyState = document.getElementById('emptyState');
        const countSpan = document.getElementById('productCount');
        if (!grid) return;

        const filtered = this.getFilteredProducts();
        if (countSpan) countSpan.textContent = `${filtered.length} รายการ`;

        if (filtered.length === 0) {
            grid.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        grid.innerHTML = filtered.map(product => {
            const isWishlisted = this.wishlist.includes(product.id);
            const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

            return `
                <div class="glass-card rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl">
                    <!-- Image Area -->
                    <div class="relative w-full aspect-square bg-slate-900 overflow-hidden cursor-pointer" onclick="store.openQuickView('${product.id}')">
                        <img src="${product.image}" alt="${product.name}" 
                             class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                             loading="lazy">
                        
                        <!-- Badges -->
                        <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                            ${product.isNew ? '<span class="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">ใหม่</span>' : ''}
                            ${product.isHot ? '<span class="bg-rose-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">ยอดฮิต</span>' : ''}
                            ${discountPercent > 0 ? `<span class="bg-amber-400 text-slate-950 text-xs font-extrabold px-2 py-0.5 rounded-full shadow">-${discountPercent}%</span>` : ''}
                        </div>

                        <!-- Wishlist Button -->
                        <button onclick="event.stopPropagation(); store.toggleWishlist('${product.id}')" 
                                class="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/70 backdrop-blur text-white flex items-center justify-center hover:bg-rose-500 transition-colors z-10 ${isWishlisted ? 'text-rose-500 bg-rose-500/20' : ''}">
                            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : ''}"></i>
                        </button>

                        <!-- Quick Preview Overlay button on hover -->
                        <div class="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <span class="bg-white/90 text-slate-900 text-xs font-bold px-3 py-2 rounded-xl backdrop-blur flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                                <i data-lucide="eye" class="w-4 h-4"></i> ดูสเปกและสั่งซื้อ
                            </span>
                        </div>
                    </div>

                    <!-- Details Area -->
                    <div class="p-4 flex flex-col flex-1 justify-between bg-slate-800/40">
                        <div>
                            <div class="flex items-center justify-between text-xs text-slate-400 mb-1">
                                <span class="uppercase font-semibold tracking-wider text-emerald-400">${product.brand}</span>
                                <div class="flex items-center gap-1 text-amber-400">
                                    <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
                                    <span class="font-bold">${product.rating}</span>
                                    <span class="text-slate-400">(${product.reviewsCount})</span>
                                </div>
                            </div>

                            <h3 class="font-bold text-slate-100 text-sm md:text-base leading-snug line-clamp-2 hover:text-emerald-400 transition cursor-pointer" onclick="store.openQuickView('${product.id}')">
                                ${product.name}
                            </h3>
                        </div>

                        <div class="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                            <div>
                                <div class="text-xs text-slate-400">ราคาพิเศษ</div>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-lg md:text-xl font-extrabold text-emerald-400">฿${product.price.toLocaleString()}</span>
                                    ${product.originalPrice ? `<span class="text-xs text-slate-500 line-through">฿${product.originalPrice.toLocaleString()}</span>` : ''}
                                </div>
                            </div>

                            <button onclick="store.openQuickView('${product.id}')" 
                                    class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-emerald-500/20">
                                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                                <span>เลือกไซส์</span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // --- Wishlist Management ---
    toggleWishlist(productId) {
        const index = this.wishlist.indexOf(productId);
        const product = this.products.find(p => p.id === productId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.toast(`นำ "${product ? product.name : 'สินค้า'}" ออกจากรายการที่ชอบแล้ว`, 'info');
        } else {
            this.wishlist.push(productId);
            this.toast(`บันทึก "${product ? product.name : 'สินค้า'}" ลงในรายการที่ชอบแล้ว!`, 'success');
        }
        this.saveWishlist();
        this.renderProducts();
    }

    updateWishlistBadge() {
        const badge = document.getElementById('wishlistBadge');
        if (badge) {
            badge.textContent = this.wishlist.length;
            if (this.wishlist.length > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    openWishlistModal() {
        const modal = document.getElementById('wishlistModal');
        const listContainer = document.getElementById('wishlistItemsContainer');
        if (!modal || !listContainer) return;

        const wishlistedProducts = this.products.filter(p => this.wishlist.includes(p.id));
        if (wishlistedProducts.length === 0) {
            listContainer.innerHTML = `
                <div class="py-12 text-center text-slate-400">
                    <i data-lucide="heart-off" class="w-12 h-12 mx-auto stroke-slate-500 mb-3 opacity-60"></i>
                    <p class="font-medium text-slate-300">ยังไม่มีสินค้าในรายการที่ชอบ</p>
                    <p class="text-xs text-slate-500 mt-1">คลิกที่รูปหัวใจบนการ์ดสินค้าเพื่อบันทึกสินค้าที่คุณสนใจ</p>
                </div>
            `;
        } else {
            listContainer.innerHTML = wishlistedProducts.map(p => `
                <div class="flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
                    <img src="${p.image}" class="w-16 h-16 object-cover rounded-lg bg-slate-900" alt="${p.name}">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-sm text-slate-100 truncate">${p.name}</h4>
                        <p class="text-emerald-400 font-extrabold text-sm">฿${p.price.toLocaleString()}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button onclick="store.closeWishlistModal(); store.openQuickView('${p.id}')" 
                                class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-2 rounded-lg transition">
                            สั่งซื้อ
                        </button>
                        <button onclick="store.toggleWishlist('${p.id}'); store.openWishlistModal();" 
                                class="text-slate-400 hover:text-rose-400 p-2">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    closeWishlistModal() {
        const modal = document.getElementById('wishlistModal');
        if (modal) modal.classList.add('hidden');
    }

    // --- Quick View & Product Modal ---
    openQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;
        this.activeModalProduct = product;

        const modal = document.getElementById('productDetailModal');
        if (!modal) return;

        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductBrand').textContent = product.brand;
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductPrice').textContent = `฿${product.price.toLocaleString()}`;
        
        const origPriceElem = document.getElementById('modalProductOriginalPrice');
        if (product.originalPrice) {
            origPriceElem.textContent = `฿${product.originalPrice.toLocaleString()}`;
            origPriceElem.classList.remove('hidden');
        } else {
            origPriceElem.classList.add('hidden');
        }

        document.getElementById('modalProductRating').textContent = product.rating;
        document.getElementById('modalProductReviews').textContent = `(${product.reviewsCount} รีวิว)`;
        document.getElementById('modalProductDesc').textContent = product.description;

        // Render Specs table
        const specsContainer = document.getElementById('modalProductSpecs');
        if (specsContainer && product.specs) {
            specsContainer.innerHTML = Object.entries(product.specs).map(([key, val]) => `
                <div class="flex justify-between py-1.5 border-b border-slate-700/50 text-xs">
                    <span class="text-slate-400">${key}:</span>
                    <span class="text-slate-200 font-medium text-right">${val}</span>
                </div>
            `).join('');
        }

        // Render Size Options
        const sizeContainer = document.getElementById('modalProductSizes');
        if (sizeContainer) {
            sizeContainer.innerHTML = product.sizes.map((size, idx) => `
                <button type="button" 
                        onclick="store.selectModalSize(this, '${size}')"
                        class="size-pill border border-slate-700 bg-slate-800 text-slate-300 font-medium text-xs py-2 px-3 rounded-lg hover:border-emerald-500 transition ${idx === 0 ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold active-size' : ''}">
                    ${size}
                </button>
            `).join('');
            this.selectedModalSize = product.sizes[0] || 'Default';
        }

        // Jersey Customization Section visibility
        const jerseyCustomizer = document.getElementById('jerseyCustomizerSection');
        if (jerseyCustomizer) {
            if (product.category === 'jerseys') {
                jerseyCustomizer.classList.remove('hidden');
                const nameInput = document.getElementById('customNameInput');
                const numInput = document.getElementById('customNumberInput');
                if (nameInput) nameInput.value = '';
                if (numInput) numInput.value = '';
                this.updateJerseyPreview();
            } else {
                jerseyCustomizer.classList.add('hidden');
            }
        }

        // Reset Qty to 1
        const qtyInput = document.getElementById('modalProductQty');
        if (qtyInput) qtyInput.value = 1;

        modal.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
    }

    closeProductModal() {
        const modal = document.getElementById('productDetailModal');
        if (modal) modal.classList.add('hidden');
        this.activeModalProduct = null;
    }

    selectModalSize(btn, size) {
        document.querySelectorAll('.size-pill').forEach(el => {
            el.classList.remove('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-400', 'font-bold', 'active-size');
            el.classList.add('border-slate-700', 'bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('border-emerald-500', 'bg-emerald-500/10', 'text-emerald-400', 'font-bold', 'active-size');
        this.selectedModalSize = size;
    }

    updateJerseyPreview() {
        const nameInput = document.getElementById('customNameInput');
        const numInput = document.getElementById('customNumberInput');
        const previewName = document.getElementById('jerseyPreviewName');
        const previewNum = document.getElementById('jerseyPreviewNumber');

        if (previewName && nameInput) {
            previewName.textContent = (nameInput.value.trim() || 'STRIKER').toUpperCase();
        }
        if (previewNum && numInput) {
            previewNum.textContent = numInput.value.trim() || '10';
        }
    }

    // --- Cart Management ---
    addModalProductToCart() {
        if (!this.activeModalProduct) return;
        const qty = parseInt(document.getElementById('modalProductQty')?.value) || 1;
        const size = this.selectedModalSize || this.activeModalProduct.sizes[0] || 'Free Size';

        let customName = '';
        let customNumber = '';
        if (this.activeModalProduct.category === 'jerseys') {
            customName = document.getElementById('customNameInput')?.value.trim() || '';
            customNumber = document.getElementById('customNumberInput')?.value.trim() || '';
        }

        this.addToCart(this.activeModalProduct, size, qty, customName, customNumber);
        this.closeProductModal();
        this.openCartDrawer();
    }

    addToCart(product, size, quantity = 1, customName = '', customNumber = '') {
        const existingItem = this.cart.find(item => 
            item.productId === product.id && 
            item.size === size &&
            item.customName === customName &&
            item.customNumber === customNumber
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                brand: product.brand,
                size: size,
                quantity: quantity,
                customName: customName,
                customNumber: customNumber
            });
        }

        this.saveCart();
        this.toast(`เพิ่ม "${product.name}" ลงในตะกร้าเรียบร้อย`, 'success');
    }

    updateCartItemQty(index, change) {
        if (!this.cart[index]) return;
        this.cart[index].quantity += change;
        if (this.cart[index].quantity <= 0) {
            this.removeCartItem(index);
            return;
        }
        this.saveCart();
        this.renderCartDrawer();
    }

    removeCartItem(index) {
        if (!this.cart[index]) return;
        const removed = this.cart.splice(index, 1)[0];
        this.saveCart();
        this.renderCartDrawer();
        this.toast(`ลบ "${removed.name}" ออกจากตะกร้าแล้ว`, 'info');
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (badge) {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }
    }

    openCartDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        if (drawer && overlay) {
            drawer.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            this.renderCartDrawer();
        }
    }

    closeCartDrawer() {
        const drawer = document.getElementById('cartDrawer');
        const overlay = document.getElementById('cartOverlay');
        if (drawer && overlay) {
            drawer.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        }
    }

    renderCartDrawer() {
        const container = document.getElementById('cartItemsList');
        const emptyState = document.getElementById('cartEmptyState');
        const footer = document.getElementById('cartFooter');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            if (footer) footer.classList.add('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (footer) footer.classList.remove('hidden');

        container.innerHTML = this.cart.map((item, idx) => `
            <div class="flex gap-3 p-3 bg-slate-800/70 rounded-xl border border-slate-700/60 transition hover:border-slate-600">
                <img src="${item.image}" alt="${item.name}" class="w-18 h-18 w-20 h-20 object-cover rounded-lg bg-slate-900 flex-shrink-0">
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-start gap-1">
                            <h4 class="font-bold text-xs md:text-sm text-slate-100 line-clamp-1">${item.name}</h4>
                            <button onclick="store.removeCartItem(${idx})" class="text-slate-400 hover:text-rose-400 p-0.5 transition">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                        </div>
                        <div class="text-xs text-slate-400 flex flex-wrap gap-2 mt-0.5">
                            <span class="bg-slate-700/80 px-2 py-0.5 rounded text-[11px] text-slate-300">ไซส์: ${item.size}</span>
                            ${item.customName || item.customNumber ? `
                                <span class="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[11px] font-bold">
                                    สกรีน: ${item.customName || '-'} #${item.customNumber || '-'}
                                </span>
                            ` : ''}
                        </div>
                    </div>

                    <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/40">
                        <span class="font-extrabold text-emerald-400 text-sm">฿${(item.price * item.quantity).toLocaleString()}</span>
                        <div class="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-lg p-0.5">
                            <button onclick="store.updateCartItemQty(${idx}, -1)" class="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-slate-800 transition">
                                <i data-lucide="minus" class="w-3.5 h-3.5"></i>
                            </button>
                            <span class="text-xs font-bold text-slate-100 w-5 text-center">${item.quantity}</span>
                            <button onclick="store.updateCartItemQty(${idx}, 1)" class="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white rounded hover:bg-slate-800 transition">
                                <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.updateCartCalculations();
        if (window.lucide) window.lucide.createIcons();
    }

    updateCartCalculations() {
        const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let discount = 0;
        let shipping = subtotal >= this.freeShippingThreshold ? 0 : this.standardShippingCost;

        if (this.appliedPromo) {
            if (this.appliedPromo.type === 'percent') {
                discount = Math.round((subtotal * this.appliedPromo.value) / 100);
            } else if (this.appliedPromo.type === 'fixed') {
                discount = this.appliedPromo.value;
            } else if (this.appliedPromo.type === 'shipping') {
                shipping = 0;
            }
        }

        const total = Math.max(0, subtotal - discount + shipping);

        // Update DOM elements
        const subtotalEl = document.getElementById('cartSubtotal');
        const discountEl = document.getElementById('cartDiscount');
        const shippingEl = document.getElementById('cartShipping');
        const totalEl = document.getElementById('cartTotal');
        const freeShippingNotice = document.getElementById('freeShippingProgressText');
        const freeShippingBar = document.getElementById('freeShippingProgressBar');

        if (subtotalEl) subtotalEl.textContent = `฿${subtotal.toLocaleString()}`;
        if (discountEl) discountEl.textContent = discount > 0 ? `-฿${discount.toLocaleString()}` : '฿0';
        if (shippingEl) shippingEl.textContent = shipping === 0 ? 'ส่งฟรี (Free)' : `฿${shipping.toLocaleString()}`;
        if (totalEl) totalEl.textContent = `฿${total.toLocaleString()}`;

        // Free shipping progress calculation
        if (freeShippingNotice && freeShippingBar) {
            if (subtotal >= this.freeShippingThreshold) {
                freeShippingNotice.innerHTML = `🎉 <span class="text-emerald-400 font-bold">ยอดเยี่ยม! คุณได้รับสิทธิ์ส่งฟรีทันที</span>`;
                freeShippingBar.style.width = '100%';
                freeShippingBar.classList.add('bg-emerald-400');
            } else {
                const remaining = this.freeShippingThreshold - subtotal;
                const percent = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
                freeShippingNotice.innerHTML = `ซื้อเพิ่มอีก <span class="text-emerald-400 font-bold">฿${remaining.toLocaleString()}</span> เพื่อรับสิทธิ์ <span class="text-white font-bold">ส่งฟรีทั่วไทย!</span>`;
                freeShippingBar.style.width = `${percent}%`;
                freeShippingBar.classList.remove('bg-emerald-400');
            }
        }

        this.currentTotals = { subtotal, discount, shipping, total };
    }

    applyPromoCode() {
        const input = document.getElementById('promoCodeInput');
        if (!input) return;
        const code = input.value.trim().toUpperCase();

        if (PROMO_CODES[code]) {
            this.appliedPromo = { code, ...PROMO_CODES[code] };
            this.toast(`ใช้โค้ด "${code}" สำเร็จ: ${this.appliedPromo.label}`, 'success');
            const promoBadge = document.getElementById('activePromoBadge');
            if (promoBadge) {
                promoBadge.innerHTML = `
                    <span class="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs px-2.5 py-1 rounded-full font-bold">
                        <i data-lucide="tag" class="w-3 h-3"></i> ${code} (${this.appliedPromo.label})
                        <button onclick="store.removePromoCode()" class="hover:text-rose-400 ml-1"><i data-lucide="x" class="w-3 h-3"></i></button>
                    </span>
                `;
                promoBadge.classList.remove('hidden');
                if (window.lucide) window.lucide.createIcons();
            }
            this.updateCartCalculations();
        } else {
            this.toast('ไม่พบโค้ดส่วนลดนี้ หรือหมดอายุแล้ว (ลองใช้: KICKOFF10)', 'error');
        }
    }

    removePromoCode() {
        this.appliedPromo = null;
        const promoBadge = document.getElementById('activePromoBadge');
        if (promoBadge) promoBadge.classList.add('hidden');
        const input = document.getElementById('promoCodeInput');
        if (input) input.value = '';
        this.updateCartCalculations();
        this.toast('ยกเลิกโค้ดส่วนลดแล้ว', 'info');
    }

    // --- Checkout Flow ---
    openCheckout() {
        if (this.cart.length === 0) {
            this.toast('กรุณาเลือกสินค้าลงตะกร้าก่อนดำเนินการชำระเงิน', 'error');
            return;
        }
        this.closeCartDrawer();
        const modal = document.getElementById('checkoutModal');
        if (modal) {
            modal.classList.remove('hidden');
            this.renderCheckoutSummary();
        }
    }

    closeCheckout() {
        const modal = document.getElementById('checkoutModal');
        if (modal) modal.classList.add('hidden');
    }

    renderCheckoutSummary() {
        const list = document.getElementById('checkoutItemsList');
        const total = document.getElementById('checkoutGrandTotal');
        if (list && this.cart) {
            list.innerHTML = this.cart.map(item => `
                <div class="flex justify-between items-center text-xs py-1.5 border-b border-slate-700/50">
                    <span class="text-slate-300 font-medium truncate max-w-[200px]">${item.name} (${item.size}) x${item.quantity}</span>
                    <span class="text-emerald-400 font-bold">฿${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('');
        }
        if (total && this.currentTotals) {
            total.textContent = `฿${this.currentTotals.total.toLocaleString()}`;
        }
    }

    handleCheckoutSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('buyerName')?.value.trim();
        const phone = document.getElementById('buyerPhone')?.value.trim();
        const address = document.getElementById('buyerAddress')?.value.trim();
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'PromptPay QR';

        if (!name || !phone || !address) {
            this.toast('กรุณากรอกข้อมูลการจัดส่งให้ครบถ้วน', 'error');
            return;
        }

        const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
        const orderSummary = {
            orderId,
            name,
            phone,
            address,
            paymentMethod,
            items: [...this.cart],
            totals: { ...this.currentTotals },
            date: new Date().toLocaleString('th-TH')
        };

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.closeCheckout();

        // Show Success Receipt Modal
        this.showOrderReceipt(orderSummary);
    }

    showOrderReceipt(order) {
        const modal = document.getElementById('orderSuccessModal');
        if (!modal) return;

        document.getElementById('receiptOrderId').textContent = order.orderId;
        document.getElementById('receiptDate').textContent = order.date;
        document.getElementById('receiptCustomerName').textContent = order.name;
        document.getElementById('receiptPhone').textContent = order.phone;
        document.getElementById('receiptAddress').textContent = order.address;
        document.getElementById('receiptPayment').textContent = order.paymentMethod;
        document.getElementById('receiptTotal').textContent = `฿${order.totals.total.toLocaleString()}`;

        const itemsEl = document.getElementById('receiptItemsList');
        if (itemsEl) {
            itemsEl.innerHTML = order.items.map(i => `
                <div class="flex justify-between py-1 text-xs">
                    <span class="text-slate-300">${i.name} [${i.size}] x${i.quantity}</span>
                    <span class="font-bold text-slate-100">฿${(i.price * i.quantity).toLocaleString()}</span>
                </div>
            `).join('');
        }

        modal.classList.remove('hidden');
        this.toast('🎉 สั่งซื้อสินค้าสำเร็จ! ขอบพระคุณที่ไว้วางใจร้านเรา', 'success');
        if (window.lucide) window.lucide.createIcons();
    }

    closeOrderSuccessModal() {
        const modal = document.getElementById('orderSuccessModal');
        if (modal) modal.classList.add('hidden');
        this.renderProducts();
    }

    // --- Size Guide Modal ---
    openSizeGuide() {
        const modal = document.getElementById('sizeGuideModal');
        if (modal) {
            modal.classList.remove('hidden');
            if (window.lucide) window.lucide.createIcons();
        }
    }

    closeSizeGuide() {
        const modal = document.getElementById('sizeGuideModal');
        if (modal) modal.classList.add('hidden');
    }

    // --- Toast Notification ---
    toast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toastEl = document.createElement('div');
        const iconName = type === 'success' ? 'check-circle' : (type === 'error' ? 'alert-triangle' : 'info');
        const colorClasses = type === 'success' 
            ? 'bg-slate-900 border-emerald-500/80 text-emerald-400' 
            : (type === 'error' 
                ? 'bg-slate-900 border-rose-500/80 text-rose-400' 
                : 'bg-slate-900 border-cyan-500/80 text-cyan-400');

        toastEl.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur text-sm font-medium transform transition-all duration-300 translate-y-3 opacity-0 ${colorClasses}`;
        toastEl.innerHTML = `
            <i data-lucide="${iconName}" class="w-4 h-4 flex-shrink-0"></i>
            <span class="text-slate-100 font-medium">${message}</span>
        `;

        container.appendChild(toastEl);
        if (window.lucide) window.lucide.createIcons();

        // Animate in
        requestAnimationFrame(() => {
            toastEl.classList.remove('translate-y-3', 'opacity-0');
        });

        // Auto remove
        setTimeout(() => {
            toastEl.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => toastEl.remove(), 300);
        }, 3200);
    }

    // --- Event Listeners Setup ---
    setupEventListeners() {
        // Search inputs (desktop & mobile)
        const handleSearch = (e) => {
            this.searchQuery = e.target.value;
            this.renderProducts();
        };

        const searchInput = document.getElementById('searchInput');
        const mobileSearchInput = document.getElementById('mobileSearchInput');
        if (searchInput) searchInput.addEventListener('input', handleSearch);
        if (mobileSearchInput) mobileSearchInput.addEventListener('input', handleSearch);

        // Sort selector
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderProducts();
            });
        }

        // Category tab buttons
        document.querySelectorAll('.cat-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = btn.getAttribute('data-category');
                this.activeCategory = category;

                document.querySelectorAll('.cat-filter-btn').forEach(b => {
                    b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-extrabold', 'shadow-lg');
                    b.classList.add('bg-slate-800/80', 'text-slate-300');
                });

                btn.classList.remove('bg-slate-800/80', 'text-slate-300');
                btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-extrabold', 'shadow-lg');

                this.renderProducts();
            });
        });

        // Brand filters
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            brandFilter.addEventListener('change', (e) => {
                this.selectedBrand = e.target.value;
                this.renderProducts();
            });
        }

        // Ground filter
        const groundFilter = document.getElementById('groundFilter');
        if (groundFilter) {
            groundFilter.addEventListener('change', (e) => {
                this.selectedGround = e.target.value;
                this.renderProducts();
            });
        }

        // Customizer inputs live updates
        const nameInput = document.getElementById('customNameInput');
        const numInput = document.getElementById('customNumberInput');
        if (nameInput) nameInput.addEventListener('input', () => this.updateJerseyPreview());
        if (numInput) numInput.addEventListener('input', () => this.updateJerseyPreview());
    }

    setCategory(category) {
        this.activeCategory = category;
        document.querySelectorAll('.cat-filter-btn').forEach(b => {
            if (b.getAttribute('data-category') === category) {
                b.classList.remove('bg-slate-800/80', 'text-slate-300');
                b.classList.add('bg-emerald-500', 'text-slate-950', 'font-extrabold', 'shadow-lg');
            } else {
                b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-extrabold', 'shadow-lg');
                b.classList.add('bg-slate-800/80', 'text-slate-300');
            }
        });
        this.renderProducts();

        // Scroll smoothly to catalog section
        const catalogSec = document.getElementById('catalogSection');
        if (catalogSec) {
            catalogSec.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Global instance
let store;
document.addEventListener('DOMContentLoaded', () => {
    store = new FootballStore();
    window.store = store;
});
