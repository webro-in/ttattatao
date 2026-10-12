
import "./Footer.scss";

const PHONE_NUMBER = "+918949540259";
const WHATSAPP_NUMBER = "918949540259";

const MAPS_URL =
  "https://www.google.com/maps?cid=13132419836343968304";

const KITCHEN_ADDRESS =
  "SKIT College Road, Shivam Nagar, Ramnagariya, Jaipur, Rajasthan 302017";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Explore Menu", href: "#menu" },
  { label: "Combos", href: "#combos" },
  { label: "Our Kitchen", href: "#our-kitchen" },
  { label: "Order Online", href: "#contact" },
];

const categories = [
  "Asian Small Plates",
  "Dumplings",
  "Asian Mains",
  "Thai Curries",
];

function FooterIcon({ name, size = 19 }) {
  const icons = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    upRight: (
      <>
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </>
    ),

    phone: (
      <path d="M5 3h4l2 5-2.5 2a15 15 0 0 0 5.5 5.5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    message: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.5 9.5c.8 2.6 2.1 3.9 5 5" />
      </>
    ),

    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),

    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),

    sparkle: (
      <>
        <path d="m12 2 2.1 7.9L22 12l-7.9 2.1L12 22l-2.1-7.9L2 12l7.9-2.1L12 2Z" />
      </>
    ),

    chevron: <path d="m9 18 6-6-6-6" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(
      "Hi Ttattatao! I'd like to enquire about your menu and ordering."
    )}`;

  return (
    <footer className="site-footer" id="footer">
      {/* DECORATIVE BACKGROUND */}

      <div
        className="site-footer__background"
        aria-hidden="true"
      >
        <span className="site-footer__glow site-footer__glow--one" />
        <span className="site-footer__glow site-footer__glow--two" />

        <span className="site-footer__background-circle site-footer__background-circle--one" />
        <span className="site-footer__background-circle site-footer__background-circle--two" />

        <span className="site-footer__chinese-mark">
          味
        </span>
      </div>

      {/* PREMIUM ORDER CTA */}

      <div className="container">
        <div className="site-footer__cta">
          <div className="site-footer__cta-pattern" aria-hidden="true" />

          <div className="site-footer__cta-content">
            <span className="site-footer__cta-eyebrow">
              <span className="site-footer__cta-eyebrow-dot" />
              FRESH ASIAN FLAVOURS IN JAIPUR
            </span>

            <h2>
              Your Next Craving
              <br />
              <span>Starts Right Here.</span>
            </h2>

            <p>
              From delicious dumplings to sizzling
              wok favourites, find something worth
              craving at Ttattatao.
            </p>

            <div className="site-footer__cta-actions">
              <a
                href="#contact"
                className="site-footer__cta-button site-footer__cta-button--primary"
              >
                <FooterIcon name="bag" size={19} />
                Build Your Order
                <FooterIcon name="arrow" size={18} />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__cta-button site-footer__cta-button--secondary"
              >
                <FooterIcon name="message" size={19} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* FOOD VISUALS */}

          <div
            className="site-footer__cta-visual"
            aria-hidden="true"
          >
            <div className="site-footer__visual-ring site-footer__visual-ring--outer" />
            <div className="site-footer__visual-ring site-footer__visual-ring--inner" />

            <div className="site-footer__food-image site-footer__food-image--main">
              <img
                src="/images/dishes/chilli-paneer.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="site-footer__food-image site-footer__food-image--small">
              <img
                src="/images/dishes/vegetable-steamed-dim-sum.webp"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>

            <span className="site-footer__visual-seal">
              好
              <small>GOOD FOOD</small>
            </span>

            <span className="site-footer__visual-star site-footer__visual-star--one">
              ✦
            </span>

            <span className="site-footer__visual-star site-footer__visual-star--two">
              ✦
            </span>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}

      <div className="site-footer__top">
        <div className="container site-footer__container">
          {/* BRAND */}

          <div className="site-footer__brand">
            <a
              href="#home"
              className="site-footer__logo"
              aria-label="Ttattatao - Back to Home"
            >
              Ttatta<span>tao</span>
              <span className="site-footer__logo-dot">
                .
              </span>
            </a>

            <span className="site-footer__caption">
              CHINESE CLOUD KITCHEN
            </span>

            <p>
              Bringing bold Asian flavours,
              comforting classics and delicious
              little cravings together in Jaipur.
            </p>

            <div className="site-footer__brand-tag">
              <span aria-hidden="true">✦</span>
              GOOD FOOD. GOOD MOOD.
            </div>

            <a
              href="#menu"
              className="site-footer__explore"
            >
              Explore Our Menu
              <FooterIcon name="upRight" size={17} />
            </a>
          </div>

          {/* QUICK LINKS */}

          <div className="site-footer__column">
            <h3>Explore</h3>

            <nav aria-label="Footer navigation">
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>
                      <FooterIcon
                        name="chevron"
                        size={15}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* FOOD CATEGORIES */}

          <div className="site-footer__column">
            <h3>Our Flavours</h3>

            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <a href="#menu">
                    <FooterIcon
                      name="chevron"
                      size={15}
                    />
                    {category}
                  </a>
                </li>
              ))}
            </ul>

            <span className="site-footer__veg-badge">
              <span />
              VEG MENU
            </span>
          </div>

          {/* CONTACT */}

          <div className="site-footer__column site-footer__contact">
            <h3>Get in Touch</h3>

            <p className="site-footer__contact-intro">
              Questions about the menu or ready
              to order? We're just a message away.
            </p>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="site-footer__contact-item"
            >
              <span className="site-footer__contact-icon">
                <FooterIcon name="phone" size={18} />
              </span>

              <span>
                <small>CALL US</small>
                <strong>+91 89495 40259</strong>
              </span>
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__contact-item"
            >
              <span className="site-footer__contact-icon">
                <FooterIcon name="message" size={18} />
              </span>

              <span>
                <small>WHATSAPP</small>
                <strong>Chat with Ttattatao</strong>
              </span>
            </a>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__contact-item"
            >
              <span className="site-footer__contact-icon">
                <FooterIcon name="pin" size={18} />
              </span>

              <span>
                <small>OUR KITCHEN</small>
                <strong>
                  Ramnagariya, Jaipur
                </strong>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* LOCATION STRIP */}

      <div className="container">
        <div className="site-footer__address-strip">
          <div className="site-footer__address-content">
            <span className="site-footer__address-icon">
              <FooterIcon name="pin" size={20} />
            </span>

            <address>
              <span>FIND OUR KITCHEN</span>
              {KITCHEN_ADDRESS}
            </address>
          </div>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
            <FooterIcon name="upRight" size={17} />
          </a>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="site-footer__bottom-wrap">
        <div className="container site-footer__bottom">
          <p>
            © {year} Ttattatao. All rights reserved.
          </p>

          <span className="site-footer__bottom-message">
            MADE FOR EVERY CRAVING <span>♥</span>
          </span>

          <a
            href="#home"
            className="site-footer__back-top"
          >
            Back to Top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>

      {/* BACKGROUND WATERMARK */}

      <div
        className="site-footer__watermark"
        aria-hidden="true"
      >
        TTATTATAO
      </div>
    </footer>
  );
}
