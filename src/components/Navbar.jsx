
import { useEffect, useRef, useState } from "react";
import "./Navbar.scss";

const PHONE_NUMBER = "+918949540259";
const WHATSAPP_NUMBER = "918949540259";

const links = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Combos", href: "#combos" },
  { label: "Our Kitchen", href: "#our-kitchen" },
  { label: "Contact", href: "#contact" },
];

const whatsappLink =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Ttattatao! I'd like to enquire about ordering."
  )}`;

function NavIcon({ name, size = 20 }) {
  const icons = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),

    phone: (
      <path d="M5 3h4l2 5-2.5 2a15 15 0 0 0 5.5 5.5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
    ),

    message: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.5 9.5c.8 2.6 2.1 3.9 5 5" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    sparkle: (
      <path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" />
    ),

    chevron: (
      <path d="m9 18 6-6-6-6" />
    ),
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

export default function Navbar() {
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(max-width: 900px)").matches;
  });

  // STICKY HEADER + ACTIVE SECTION

  useEffect(() => {
    let animationFrame = 0;

    const updateNavigation = () => {
      window.cancelAnimationFrame(animationFrame);

      animationFrame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);

        const headerHeight =
          headerRef.current?.getBoundingClientRect().height ??
          90;

        const marker =
          window.scrollY + headerHeight + 65;

        let currentSection = "#home";

        links.forEach(({ href }) => {
          const section = document.getElementById(
            href.slice(1)
          );

          if (!section) return;

          const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;

          if (sectionTop <= marker) {
            currentSection = href;
          }
        });

        setActiveLink(currentSection);
      });
    };

    updateNavigation();

    window.addEventListener("scroll", updateNavigation, {
      passive: true,
    });

    window.addEventListener("resize", updateNavigation);
    window.addEventListener("hashchange", updateNavigation);

    return () => {
      window.cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "scroll",
        updateNavigation
      );

      window.removeEventListener(
        "resize",
        updateNavigation
      );

      window.removeEventListener(
        "hashchange",
        updateNavigation
      );
    };
  }, []);

  // MOBILE BREAKPOINT

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 900px)"
    );

    const onChange = (event) => {
      setIsMobile(event.matches);

      if (!event.matches) {
        setIsOpen(false);
      }
    };

    setIsMobile(media.matches);

    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  // CLOSE MOBILE MENU

  useEffect(() => {
    if (!isOpen || !isMobile) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handlePointerDown(event) {
      if (!headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleFocusIn(event) {
      if (!headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    document.addEventListener(
      "focusin",
      handleFocusIn
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      document.removeEventListener(
        "focusin",
        handleFocusIn
      );
    };
  }, [isOpen, isMobile]);

  function closeMenu(href) {
    setIsOpen(false);

    if (href) {
      setActiveLink(href);
    }
  }

  return (
    <header
      ref={headerRef}
      className={[
        "navbar",
        scrolled ? "navbar--scrolled" : "",
        isOpen ? "navbar--open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className="navbar__glow"
        aria-hidden="true"
      />

      {/* TOP UTILITY BAR */}

      <div className="navbar__utility">
        <div className="container navbar__utility-inner">
          <span className="navbar__utility-message">
            <NavIcon name="sparkle" size={13} />
            FRESH ASIAN FLAVOURS, MADE FOR YOUR CRAVINGS
          </span>

          <div className="navbar__utility-right">
            <span>
              <NavIcon name="pin" size={13} />
              JAIPUR, RAJASTHAN
            </span>

            <a href={`tel:${PHONE_NUMBER}`}>
              <NavIcon name="phone" size={13} />
              +91 89495 40259
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}

      <div className="container navbar__inner">

        {/* LOGO + LOADER */}

        <a
          className="navbar__brand"
          href="#home"
          data-order-loader="true"
          aria-label="Ttattatao - Home"
          onClick={() => closeMenu("#home")}
        >
          <span
            className="navbar__brand-symbol"
            aria-hidden="true"
          >
            <svg viewBox="0 0 48 48" fill="none">
              <path
                d="M12 22H36C36 31 31 36 24 36C17 36 12 31 12 22Z"
                fill="currentColor"
              />

              <path
                d="M16 39H32"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M12 9L31 19M19 6L38 16"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M9 22H39"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span className="navbar__brand-copy">
            <span className="navbar__brand-name">
              Ttatta<span>tao</span>
              <span className="navbar__brand-dot">.</span>
            </span>

            <span className="navbar__brand-caption">
              CHINESE CLOUD KITCHEN
            </span>
          </span>
        </a>

        {/* NAVIGATION */}

        <nav
          id="primary-navigation"
          className={`navbar__navigation ${
            isOpen ? "is-open" : ""
          }`}
          aria-label="Main navigation"
          inert={isMobile && !isOpen}
        >
          <div className="navbar__mobile-heading">
            <div>
              <span>EXPLORE</span>
              <strong>Find Your Flavour.</strong>
            </div>

            <span aria-hidden="true">味</span>
          </div>

          {/* ALL SECTIONS + LOADER */}

          <ul className="navbar__links">
            {links.map((link, index) => (
              <li
                key={link.href}
                style={{ "--nav-index": index }}
              >
                <a
                  className={`navbar__link ${
                    activeLink === link.href
                      ? "is-active"
                      : ""
                  }`}
                  href={link.href}
                  data-order-loader="true"
                  aria-current={
                    activeLink === link.href
                      ? "location"
                      : undefined
                  }
                  onClick={() => closeMenu(link.href)}
                >
                  <span className="navbar__link-text">
                    {link.label}
                  </span>

                  <span
                    className="navbar__link-indicator"
                    aria-hidden="true"
                  />

                  <span
                    className="navbar__mobile-link-arrow"
                    aria-hidden="true"
                  >
                    <NavIcon
                      name="chevron"
                      size={17}
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* MOBILE ORDER */}

          <div className="navbar__mobile-actions">
            <a
              className="navbar__mobile-order"
              href="#contact"
              data-order-loader="true"
              onClick={() => closeMenu("#contact")}
            >
              <NavIcon name="bag" size={20} />
              Build Your Order
              <NavIcon name="arrow" size={19} />
            </a>

            <div className="navbar__mobile-contact">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => closeMenu()}
              >
                <NavIcon name="message" size={18} />
                WhatsApp
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={() => closeMenu()}
              >
                <NavIcon name="phone" size={18} />
                Call Us
              </a>
            </div>
          </div>

          <div className="navbar__mobile-footer">
            <span aria-hidden="true">✦</span>
            FRESHLY MADE. FULL OF FLAVOUR.
            <span aria-hidden="true">✦</span>
          </div>
        </nav>

        {/* RIGHT ACTIONS */}

        <div className="navbar__actions">
          {/* DESKTOP ORDER NOW */}

          <a
            className="navbar__cta"
            href="#contact"
            data-order-loader="true"
            onClick={() => closeMenu("#contact")}
          >
            <NavIcon name="bag" size={18} />
            <span>Order Now</span>
            <NavIcon name="arrow" size={17} />
          </a>

          {/* MOBILE QUICK ORDER */}

          <a
            className="navbar__quick-order"
            href="#contact"
            data-order-loader="true"
            aria-label="Build your order"
            onClick={() => closeMenu("#contact")}
          >
            <NavIcon name="bag" size={19} />
            <span>Order</span>
          </a>

          {/* MOBILE TOGGLE */}

          <button
            ref={toggleRef}
            className={`navbar__toggle ${
              isOpen ? "is-open" : ""
            }`}
            type="button"
            aria-label={
              isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            onClick={() =>
              setIsOpen((previous) => !previous)
            }
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className="navbar__bottom-glow"
        aria-hidden="true"
      />
    </header>
  );
}
