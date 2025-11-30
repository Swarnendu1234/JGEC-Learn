import { useState } from 'react'

const PaymentModal = ({ course, onClose, showToast }) => {
    const [selectedPlan, setSelectedPlan] = useState('full')
    const [paymentMethod, setPaymentMethod] = useState('card')
    const [processing, setProcessing] = useState(false)

    const plans = [
        {
            id: 'full',
            name: 'Full Course Access / সম্পূর্ণ কোর্স অ্যাক্সেস',
            price: 4999,
            originalPrice: 9999,
            duration: 'Lifetime / আজীবন',
            features: [
                'Complete course content / সম্পূর্ণ কোর্স কন্টেন্ট',
                'All 20 modules unlocked / সব ২০টি মডিউল আনলক',
                'Downloadable resources / ডাউনলোডযোগ্য রিসোর্স',
                'Certificate of completion / সমাপ্তি সার্টিফিকেট',
                'Lifetime access / আজীবন অ্যাক্সেস',
                '24/7 support / ২৪/৭ সহায়তা'
            ],
            badge: 'Most Popular / সবচেয়ে জনপ্রিয়',
            savings: '50% ছাড়'
        },
        {
            id: 'monthly',
            name: 'Monthly Subscription / মাসিক সাবস্ক্রিপশন',
            price: 999,
            duration: 'Per month / প্রতি মাসে',
            features: [
                'Access all content / সমস্ত কন্টেন্ট অ্যাক্সেস',
                'Monthly billing / মাসিক বিলিং',
                'Cancel anytime / যেকোনো সময় বাতিল',
                'Certificate included / সার্টিফিকেট অন্তর্ভুক্ত',
                'Community access / কমিউনিটি অ্যাক্সেস'
            ]
        }
    ]

    const paymentMethods = [
        { id: 'card', name: 'Credit/Debit Card / ক্রেডিট/ডেবিট কার্ড', icon: 'card' },
        { id: 'upi', name: 'UPI / ইউপিআই', icon: 'upi' },
        { id: 'netbanking', name: 'Net Banking / নেট ব্যাংকিং', icon: 'netbanking' },
        { id: 'wallet', name: 'Wallet / ওয়ালেট', icon: 'wallet' }
    ]

    const handlePayment = () => {
        setProcessing(true)

        // Simulate opening Razorpay
        setTimeout(() => {
            setProcessing(false)
            openRazorpayModal()
        }, 800)
    }

    const openRazorpayModal = () => {
        const totalAmount = (selectedPlanData.price * 1.18).toFixed(0)

        // Mock Razorpay options
        const options = {
            key: "rzp_test_mock123456789", // Mock key
            amount: totalAmount * 100, // Amount in paise
            currency: "INR",
            name: "JGEC Learn",
            description: course.title,
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop",
            handler: function (response) {
                // Success callback
                showToast('Payment successful! Redirecting to course... / পেমেন্ট সফল! কোর্সে রিডাইরেক্ট করা হচ্ছে...', 'success')
                setTimeout(() => {
                    onClose()
                }, 1500)
            },
            prefill: {
                name: "",
                email: "",
                contact: ""
            },
            notes: {
                course_id: course.id,
                plan: selectedPlan
            },
            theme: {
                color: "#4F46E5"
            },
            modal: {
                ondismiss: function () {
                    showToast('Payment cancelled / পেমেন্ট বাতিল করা হয়েছে', 'info')
                }
            }
        }

        // Create and open mock Razorpay
        const rzp = new window.MockRazorpay(options)
        rzp.open()
    }

    const selectedPlanData = plans.find(p => p.id === selectedPlan)

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="payment-modal-close" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="payment-header">
                    <div className="payment-course-info">
                        <img src={course.image} alt={course.title} />
                        <div>
                            <h2>{course.title}</h2>
                            <div className="payment-meta">
                                <span className="university-tag">{course.badge}</span>
                                <span>{course.duration}</span>
                                <span>⭐ {course.rating}</span>
                            </div>
                        </div>
                    </div>
                    <div className="payment-header-subtitle">
                        <span>🇮🇳 Payment in Indian Rupees (INR) / ভারতীয় রুপিতে পেমেন্ট (₹)</span>
                    </div>
                </div>

                <div className="payment-content">
                    {/* Left Section - Plans & Payment */}
                    <div className="payment-left">
                        {/* Plan Selection */}
                        <div className="payment-section">
                            <h3>Choose Your Plan / আপনার প্ল্যান চয়ন করুন</h3>
                            <div className="plans-grid">
                                {plans.map(plan => (
                                    <div
                                        key={plan.id}
                                        className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}
                                        onClick={() => setSelectedPlan(plan.id)}
                                    >
                                        {plan.badge && (
                                            <div className="plan-badge">{plan.badge}</div>
                                        )}
                                        {plan.savings && (
                                            <div className="savings-badge">{plan.savings}</div>
                                        )}
                                        <div className="plan-header">
                                            <h4>{plan.name}</h4>
                                            <div className="plan-price">
                                                {plan.originalPrice && (
                                                    <span className="original-price">₹{plan.originalPrice}</span>
                                                )}
                                                <span className="current-price">₹{plan.price}</span>
                                                <span className="price-duration">/{plan.duration}</span>
                                            </div>
                                        </div>
                                        <ul className="plan-features">
                                            {plan.features.map((feature, index) => (
                                                <li key={index}>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="payment-section">
                            <h3>Payment Method / পেমেন্ট পদ্ধতি</h3>
                            <div className="payment-methods">
                                {paymentMethods.map(method => (
                                    <div
                                        key={method.id}
                                        className={`payment-method-card ${paymentMethod === method.id ? 'selected' : ''}`}
                                        onClick={() => setPaymentMethod(method.id)}
                                    >
                                        <div className={`payment-icon ${method.icon}`}>
                                            {method.icon === 'card' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="5" width="20" height="14" rx="2" />
                                                    <line x1="2" y1="10" x2="22" y2="10" />
                                                </svg>
                                            )}
                                            {method.icon === 'netbanking' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                    <polyline points="9 22 9 12 15 12 15 22" />
                                                </svg>
                                            )}
                                            {method.icon === 'upi' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="3" y="6" width="18" height="12" rx="2" />
                                                    <path d="M7 10h4M7 14h2M15 10h2M15 14h2" />
                                                </svg>
                                            )}
                                            {method.icon === 'wallet' && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
                                                    <rect x="13" y="11" width="8" height="5" rx="1" />
                                                </svg>
                                            )}
                                        </div>
                                        <span>{method.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card Details Form (if card selected) */}
                        {paymentMethod === 'card' && (
                            <div className="payment-section">
                                <h3>Card Details / কার্ডের বিবরণ</h3>
                                <div className="card-form">
                                    <div className="form-group">
                                        <label>Card Number / কার্ড নম্বর</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Expiry Date / মেয়াদ উত্তীর্ণের তারিখ</label>
                                            <input type="text" placeholder="MM/YY" maxLength="5" />
                                        </div>
                                        <div className="form-group">
                                            <label>CVV / সিভিভি</label>
                                            <input type="text" placeholder="123" maxLength="3" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Cardholder Name / কার্ডধারীর নাম</label>
                                        <input type="text" placeholder="আপনার নাম লিখুন" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Section - Order Summary */}
                    <div className="payment-right">
                        <div className="order-summary">
                            <h3>Order Summary / অর্ডার সারাংশ</h3>

                            <div className="summary-item">
                                <span>Course Price / কোর্সের মূল্য</span>
                                <span className="price">₹{selectedPlanData.price}</span>
                            </div>

                            {selectedPlanData.originalPrice && (
                                <div className="summary-item discount">
                                    <span>Discount / ছাড় ({selectedPlanData.savings})</span>
                                    <span className="price">-₹{selectedPlanData.originalPrice - selectedPlanData.price}</span>
                                </div>
                            )}

                            <div className="summary-item">
                                <span>Tax (GST 18%) / কর (জিএসটি ১৮%)</span>
                                <span className="price">₹{(selectedPlanData.price * 0.18).toFixed(0)}</span>
                            </div>

                            <div className="summary-divider"></div>

                            <div className="summary-item total">
                                <span>Total Amount / মোট পরিমাণ</span>
                                <span className="price">₹{(selectedPlanData.price * 1.18).toFixed(0)}</span>
                            </div>

                            <button
                                className="btn-pay"
                                onClick={handlePayment}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <div className="spinner"></div>
                                        Processing... / প্রক্রিয়াকরণ...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        Secure Payment / সুরক্ষিত পেমেন্ট
                                    </>
                                )}
                            </button>

                            <div className="payment-security">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4zm0 18c-3.2-1-6-5.2-6-9V7.3l6-3 6 3V11c0 3.8-2.8 8-6 9z" />
                                    <path d="M10.5 13.5l-2-2-1 1 3 3 6-6-1-1-5 5z" />
                                </svg>
                                <div>
                                    <strong>Secure Payment / সুরক্ষিত পেমেন্ট</strong>
                                    <p>Your payment information is encrypted and secure / আপনার পেমেন্ট তথ্য এনক্রিপ্ট এবং সুরক্ষিত</p>
                                </div>
                            </div>

                            <div className="money-back">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 6v6l4 2" />
                                </svg>
                                <span>30-day money-back guarantee / ৩০ দিনের মানি-ব্যাক গ্যারান্টি</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal
