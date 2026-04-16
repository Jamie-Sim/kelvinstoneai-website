export default function Footer() {
  return (
    <>
      <div className="glasgow-image-strip">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand_assets/Glasgow_Image_01.jpg"
          alt="Glasgow"
          className="glasgow-image"
        />
      </div>

      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#hero" className="nav-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand_assets/Logo_White.png"
                  alt="Kelvinstone AI"
                  style={{ height: "36px", width: "auto" }}
                />
                <span className="footer-brand-name">Kelvinstone AI</span>
              </a>
              <p>
                Done-for-you lead capture and qualification for UK businesses. Every enquiry assessed and on your phone in under 60 seconds.
              </p>
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Smart Enquiry Handler</a></li>
                <li><a href="#services">Your Business Website</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="#process">How It Works</a></li>
                <li><a href="#benefits">Why Kelvinstone</a></li>
                <li><a href="#cta">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Started</h4>
              <ul>
                <li><a href="#cta">Free Audit</a></li>
                <li><a href="mailto:jamie@kelvinstone.ai">jamie@kelvinstone.ai</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Kelvinstone AI Ltd. All rights reserved.</p>
            <p>Registered in the United Kingdom</p>
          </div>
        </div>
      </footer>
    </>
  );
}
