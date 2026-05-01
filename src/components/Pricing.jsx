import './Pricing.css';

export default function Pricing() {
  return (
    <div className="pricing-free">
      <div className="pricing-header">
        <div className="free-icon">🎉</div>
        <h3>All Features - Completely FREE!</h3>
        <p>CareerForge Pro is free forever. No credit card required.</p>
      </div>

      <div className="features-list">
        <h4>Available Features:</h4>
        <ul>
          <li>✅ Unlimited Resume Creation</li>
          <li>✅ 8 Professional Templates</li>
          <li>✅ 12 Premium Fonts</li>
          <li>✅ JD Analysis & ATS Scoring</li>
          <li>✅ Cover Letter Generator</li>
          <li>✅ ATS Resume Checker</li>
          <li>✅ PDF, DOCX & JSON Export</li>
          <li>✅ Save Multiple Resumes</li>
          <li>✅ Resume Library</li>
          <li>✅ User Account</li>
        </ul>
      </div>

      <div className="no-payment-message">
        <p>We're committed to helping you land your dream job - completely free!</p>
        <p className="thank-you">Thank you for using CareerForge Pro! 🚀</p>
      </div>
    </div>
  );
}
