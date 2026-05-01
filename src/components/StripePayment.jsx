import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import './StripePayment.css';

export default function StripePayment() {
  const { subscription, upgradeSubscription } = useResume();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        '✓ 1 Resume',
        '✓ Basic Templates',
        '✓ PDF Download',
        '✓ 3 JD Analysis/day'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      features: [
        '✓ Unlimited Resumes',
        '✓ All Templates',
        '✓ AI Resume Optimization',
        '✓ Cover Letter Generator',
        '✓ ATS Checker',
        '✓ DOCX Export',
        '✓ Priority Support'
      ],
      popular: true
    }
  ];

  const handleUpgrade = async (planId) => {
    if (planId === 'free') return;
    
    setIsProcessing(true);
    
    // Simulate Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    upgradeSubscription(planId);
    setIsProcessing(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  if (subscription === 'pro') {
    return (
      <div className="stripe-payment current-pro">
        <div className="current-badge">
          <span className="badge-icon">⭐</span>
          <div>
            <h4>You're on PRO!</h4>
            <p>Unlimited access to all features</p>
          </div>
        </div>
        <p className="pro-thanks">Thanks for supporting CareerForge Pro!</p>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="stripe-payment success">
        <div className="success-icon">🎉</div>
        <h3>Welcome to PRO!</h3>
        <p>You now have unlimited access to all features.</p>
      </div>
    );
  }

  return (
    <div className="stripe-payment">
      <div className="payment-header">
        <h3>💳 Choose Your Plan</h3>
        <p>Unlock all features with PRO</p>
      </div>

      <div className="plans-grid">
        {plans.map(plan => (
          <div 
            key={plan.id} 
            className={`plan-card ${plan.popular ? 'popular' : ''}`}
          >
            {plan.popular && <span className="popular-badge">Most Popular</span>}
            <h4>{plan.name}</h4>
            <div className="plan-price">
              <span className="price">${plan.price}</span>
              <span className="period">/month</span>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button
              className={`btn-plan ${plan.id === 'pro' ? 'btn-pro' : 'btn-free'}`}
              onClick={() => handleUpgrade(plan.id)}
              disabled={isProcessing || plan.id === 'free'}
            >
              {plan.id === 'free' ? 'Current' : isProcessing ? 'Processing...' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div className="payment-footer">
        <p>🔒 Secure payment powered by Stripe</p>
        <p className="cancel-note">Cancel anytime • 30-day money-back guarantee</p>
      </div>
    </div>
  );
}
