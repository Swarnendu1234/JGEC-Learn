// Mock Razorpay Payment Gateway
(function (window) {
    'use strict';

    class MockRazorpay {
        constructor(options) {
            this.options = options;
            this.isOpen = false;
        }

        open() {
            if (this.isOpen) return;
            this.isOpen = true;
            this.createModal();
        }

        createModal() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'razorpay-overlay';
            overlay.id = 'razorpay-mock-overlay';

            // Create modal container
            const modal = document.createElement('div');
            modal.className = 'razorpay-modal';
            modal.id = 'razorpay-mock-modal';

            // Modal content
            modal.innerHTML = `
                <div class="razorpay-header">
                    <div class="razorpay-logo">
                        <svg viewBox="0 0 120 30" fill="#072654">
                            <text x="10" y="20" font-family="Arial, sans-serif" font-weight="bold" font-size="18">Razorpay</text>
                        </svg>
                    </div>
                    <button class="razorpay-close" id="razorpay-close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                <div class="razorpay-content">
                    <div class="razorpay-merchant-info">
                        <img src="${this.options.image}" alt="${this.options.name}" class="razorpay-merchant-logo">
                        <h2>${this.options.name}</h2>
                        <p class="razorpay-description">${this.options.description}</p>
                    </div>

                    <div class="razorpay-amount-section">
                        <div class="razorpay-amount-label">Amount to Pay / পেমেন্ট পরিমাণ</div>
                        <div class="razorpay-amount">₹${(this.options.amount / 100).toFixed(0)}</div>
                    </div>

                    <div class="razorpay-payment-methods">
                        <div class="razorpay-tabs">
                            <button class="razorpay-tab active" data-tab="card">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                                    <line x1="2" y1="10" x2="22" y2="10"/>
                                </svg>
                                Card / কার্ড
                            </button>
                            <button class="razorpay-tab" data-tab="upi">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="6" width="18" height="12" rx="2"/>
                                    <path d="M7 10h4M7 14h2M15 10h2M15 14h2"/>
                                </svg>
                                UPI / ইউপিআই
                            </button>
                            <button class="razorpay-tab" data-tab="netbanking">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                                Net Banking
                            </button>
                        </div>

                        <div class="razorpay-tab-content">
                            <!-- Card Tab -->
                            <div class="razorpay-tab-panel active" data-panel="card">
                                <div class="razorpay-form-group">
                                    <label>Card Number / কার্ড নম্বর</label>
                                    <input type="text" id="razorpay-card-number" placeholder="1234 5678 9012 3456" maxlength="19">
                                    <div class="razorpay-card-icons">
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%231434CB' width='48' height='32' rx='4'/%3E%3Ccircle fill='%23EB001B' cx='18' cy='16' r='8'/%3E%3Ccircle fill='%23FF5F00' cx='24' cy='16' r='8'/%3E%3Ccircle fill='%23F79E1B' cx='30' cy='16' r='8'/%3E%3C/svg%3E" alt="Mastercard">
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%231A1F71' width='48' height='32' rx='4'/%3E%3Ctext x='8' y='20' fill='white' font-size='14' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa">
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 32'%3E%3Crect fill='%23016FD0' width='48' height='32' rx='4'/%3E%3Ctext x='6' y='20' fill='white' font-size='10' font-weight='bold'%3ERuPay%3C/text%3E%3C/svg%3E" alt="RuPay">
                                    </div>
                                </div>
                                <div class="razorpay-form-row">
                                    <div class="razorpay-form-group">
                                        <label>Expiry / মেয়াদ</label>
                                        <input type="text" id="razorpay-expiry" placeholder="MM/YY" maxlength="5">
                                    </div>
                                    <div class="razorpay-form-group">
                                        <label>CVV / সিভিভি</label>
                                        <input type="password" id="razorpay-cvv" placeholder="123" maxlength="3">
                                    </div>
                                </div>
                                <div class="razorpay-form-group">
                                    <label>Cardholder Name / কার্ডধারীর নাম</label>
                                    <input type="text" id="razorpay-name" placeholder="Name on card">
                                </div>
                            </div>

                            <!-- UPI Tab -->
                            <div class="razorpay-tab-panel" data-panel="upi">
                                <div class="razorpay-form-group">
                                    <label>UPI ID / ইউপিআই আইডি</label>
                                    <input type="text" id="razorpay-upi" placeholder="yourname@upi">
                                    <div class="razorpay-upi-apps">
                                        <button class="razorpay-upi-app">
                                            <span>📱</span>
                                            <span>PhonePe</span>
                                        </button>
                                        <button class="razorpay-upi-app">
                                            <span>💰</span>
                                            <span>Google Pay</span>
                                        </button>
                                        <button class="razorpay-upi-app">
                                            <span>🏦</span>
                                            <span>Paytm</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Net Banking Tab -->
                            <div class="razorpay-tab-panel" data-panel="netbanking">
                                <div class="razorpay-bank-list">
                                    <button class="razorpay-bank-item">
                                        <span class="bank-logo">🏦</span>
                                        <span>State Bank of India</span>
                                    </button>
                                    <button class="razorpay-bank-item">
                                        <span class="bank-logo">🏦</span>
                                        <span>HDFC Bank</span>
                                    </button>
                                    <button class="razorpay-bank-item">
                                        <span class="bank-logo">🏦</span>
                                        <span>ICICI Bank</span>
                                    </button>
                                    <button class="razorpay-bank-item">
                                        <span class="bank-logo">🏦</span>
                                        <span>Axis Bank</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="razorpay-security-info">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"/>
                        </svg>
                        <span>Secured by Razorpay / Razorpay দ্বারা সুরক্ষিত</span>
                    </div>

                    <button class="razorpay-pay-button" id="razorpay-pay-btn">
                        Pay ₹${(this.options.amount / 100).toFixed(0)} / ₹${(this.options.amount / 100).toFixed(0)} পেমেন্ট করুন
                    </button>
                </div>
            `;

            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            // Add event listeners
            this.attachEventListeners();

            // Animate in
            setTimeout(() => {
                overlay.classList.add('active');
                modal.classList.add('active');
            }, 10);
        }

        attachEventListeners() {
            const closeBtn = document.getElementById('razorpay-close-btn');
            const overlay = document.getElementById('razorpay-mock-overlay');
            const payBtn = document.getElementById('razorpay-pay-btn');
            const tabs = document.querySelectorAll('.razorpay-tab');

            // Close button
            closeBtn.addEventListener('click', () => this.close());

            // Overlay click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.close();
                }
            });

            // Pay button
            payBtn.addEventListener('click', () => this.processPayment());

            // Tab switching
            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const targetTab = tab.dataset.tab;

                    // Update active tab
                    document.querySelectorAll('.razorpay-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Update active panel
                    document.querySelectorAll('.razorpay-tab-panel').forEach(p => p.classList.remove('active'));
                    document.querySelector(`[data-panel="${targetTab}"]`).classList.add('active');
                });
            });

            // UPI app buttons
            document.querySelectorAll('.razorpay-upi-app').forEach(btn => {
                btn.addEventListener('click', () => this.processPayment());
            });

            // Bank buttons
            document.querySelectorAll('.razorpay-bank-item').forEach(btn => {
                btn.addEventListener('click', () => this.processPayment());
            });
        }

        processPayment() {
            const payBtn = document.getElementById('razorpay-pay-btn');
            payBtn.disabled = true;
            payBtn.innerHTML = '<div class="razorpay-spinner"></div> Processing... / প্রক্রিয়াকরণ...';

            // Simulate payment processing
            setTimeout(() => {
                const mockResponse = {
                    razorpay_payment_id: 'pay_' + Math.random().toString(36).substr(2, 9),
                    razorpay_order_id: 'order_' + Math.random().toString(36).substr(2, 9),
                    razorpay_signature: Math.random().toString(36).substr(2, 20)
                };

                this.close();

                // Call success handler
                if (this.options.handler) {
                    this.options.handler(mockResponse);
                }
            }, 2000);
        }

        close() {
            const overlay = document.getElementById('razorpay-mock-overlay');
            const modal = document.getElementById('razorpay-mock-modal');

            if (overlay && modal) {
                modal.classList.remove('active');
                overlay.classList.remove('active');

                setTimeout(() => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                }, 300);
            }

            this.isOpen = false;

            // Call dismiss handler
            if (this.options.modal && this.options.modal.ondismiss) {
                this.options.modal.ondismiss();
            }
        }
    }

    // Expose to window
    window.MockRazorpay = MockRazorpay;

})(window);
