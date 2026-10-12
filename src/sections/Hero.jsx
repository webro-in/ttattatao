
import { useEffect, useState } from "react";
import "./Hero.scss";

const featuredDishes = [
  {
    id: "noodles",
    name: "Asian Chilli Basil Noodles",
    category: "WOK-TOSSED FAVOURITES",
    image: "/images/dishes/asian-chilli-basil-noodles.webp",
    label: "BOLD. SAUCY. IRRESISTIBLE.",
  },
  {
    id: "dumplings",
    name: "Vegetable Pan-Fried Gyoza",
    category: "SIGNATURE DUMPLINGS",
    image: "/images/dishes/vegetable-pan-fried-gyoza.webp",
    label: "LITTLE BITES. BIG CRAVINGS.",
  },
  {
    id: "chilli-paneer",
    name: "Chilli Paneer",
    category: "ASIAN SPECIALS",
    image: "/images/dishes/chilli-paneer.webp",
    label: "FULL OF FLAVOUR.",
  },
  {
    id: "fried-rice",
    name: "Burnt Garlic Fried Rice",
    category: "WOK-FIRED CLASSICS",
    image: "/images/dishes/burnt-garlic-fried-rice.webp",
    label: "COMFORT IN EVERY BITE.",
  },
  {
    id: "thai-curry",
    name: "Thai Green Curry",
    category: "THAI FAVOURITES",
    image: "/images/dishes/thai-green-curry.webp",
    label: "RICH. AROMATIC. DELICIOUS.",
  },
  {
    id: "mushroom",
    name: "Asian Chilli Mushroom",
    category: "CRISPY ASIAN BITES",
    image: "/images/dishes/asian-chilli-mushroom.webp",
    label: "MADE TO CRAVE.",
  },
];

function HeroIcon({ name, size = 20 }) {
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

    sparkle: (
      <path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z" />
    ),

    chevronLeft: (
      <path d="m15 18-6-6 6-6" />
    ),

    chevronRight: (
      <path d="m9 18 6-6-6-6" />
    ),

    check: (
      <path d="m5 12 4 4L19 6" />
    ),

    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
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

function HeroImage({
  src,
  alt,
  priority = false,
  width,
  height,
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="hero__image-fallback"
        role="img"
        aria-label={`${alt} image unavailable`}
      >
        <strong>TTATTATAO</strong>
        <small>FRESH ASIAN FLAVOURS</small>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeDish = featuredDishes[activeIndex];

  // AUTO DISH ROTATION

  useEffect(() => {
    if (isPaused) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reduceMotion.matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setActiveIndex(
          (current) =>
            (current + 1) % featuredDishes.length
        );
      }
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused, activeIndex]);

  function changeDish(direction) {
    setActiveIndex(
      (current) =>
        (current + direction + featuredDishes.length) %
        featuredDishes.length
    );
  }

  return (
    <section
      id="home"
      className="hero"
      aria-labelledby="hero-title"
    >
      {/* BACKGROUND */}

      <div className="hero__texture" aria-hidden="true" />

      <div
        className="hero__ambient hero__ambient--one"
        aria-hidden="true"
      />

      <div
        className="hero__ambient hero__ambient--two"
        aria-hidden="true"
      />

      <div className="hero__watermark" aria-hidden="true">
        味
      </div>

      <div className="container hero__container">
        {/* LEFT CONTENT */}

        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />

            <span>
              CHINESE CLOUD KITCHEN · JAIPUR
            </span>

            <span className="hero__eyebrow-line" />
          </div>

          <p className="hero__overline">
            WELCOME TO TTATTATAO
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">
              <span>Wok-Fired.</span>
            </span>

            <span className="hero__title-line">
              <span>Full of</span>
            </span>

            <span className="hero__title-line hero__title-line--accent">
              <em>Flavour.</em>

              <span
                className="hero__title-spark"
                aria-hidden="true"
              >
                <HeroIcon name="sparkle" size={27} />
              </span>
            </span>
          </h1>

          <p className="hero__description">
            Crispy dumplings, wok-tossed noodles,
            aromatic fried rice and comforting Thai
            curries. Explore the Asian flavours
            you've been craving.
          </p>

          {/* LOADER CONNECTED BUTTONS */}

          <div className="hero__actions">
            {/* ORDER NOW */}

            <a
              href="#contact"
              data-order-loader="true"
              className="hero__button hero__button--primary"
            >
              <HeroIcon name="bag" size={20} />

              <span>Order Now</span>

              <HeroIcon name="arrow" size={19} />
            </a>

            {/* EXPLORE MENU */}

            <a
              href="#menu"
              data-order-loader="true"
              className="hero__button hero__button--outline"
            >
              Explore Menu

              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* FEATURES */}

          <div className="hero__features">
            <div className="hero__feature">
              <span className="hero__feature-icon">
                <HeroIcon name="check" size={17} />
              </span>

              <div>
                <strong>Vegetarian Menu</strong>
                <span>Asian favourites</span>
              </div>
            </div>

            <span className="hero__feature-divider" />

            <div className="hero__feature">
              <span className="hero__feature-icon">
                <HeroIcon name="location" size={18} />
              </span>

              <div>
                <strong>Based in Jaipur</strong>
                <span>Delivery on confirmation</span>
              </div>
            </div>
          </div>

          {/* SIGNATURE */}

          <div className="hero__signature">
            <span
              className="hero__signature-symbol"
              aria-hidden="true"
            >
              ✳
            </span>

            <div>
              <strong>BIG FLAVOURS.</strong>
              <span>HAPPY CRAVINGS.</span>
            </div>

            <span className="hero__signature-line" />
          </div>
        </div>

        {/* RIGHT FOOD SHOWCASE */}

        <div
          className="hero__visual"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setIsPaused(false);
            }
          }}
        >
          <div
            className="hero__visual-glow"
            aria-hidden="true"
          />

          <div
            className="hero__visual-ring"
            aria-hidden="true"
          />

          <div
            className="hero__visual-ring hero__visual-ring--inner"
            aria-hidden="true"
          />

          {/* MAIN FEATURED DISH */}

          <figure className="hero__main-photo">
            <div
              key={activeDish.id}
              className="hero__main-photo-slide"
            >
              <HeroImage
                src={activeDish.image}
                alt={activeDish.name}
                width={960}
                height={960}
                priority={activeIndex === 0}
              />

              <div
                className="hero__main-photo-overlay"
                aria-hidden="true"
              />

              <figcaption className="hero__main-caption">
                <span>{activeDish.category}</span>

                <strong>{activeDish.name}</strong>

                <small>{activeDish.label}</small>
              </figcaption>
            </div>
          </figure>

          {/* SECONDARY DISH PHOTOS */}

          <figure className="hero__side-photo hero__side-photo--gyoza">
            <HeroImage
              src="/images/dishes/vegetable-pan-fried-gyoza.webp"
              alt="Golden vegetable pan-fried gyoza"
              width={809}
              height={960}
            />

            <figcaption>
              CRISPY BITES
            </figcaption>
          </figure>

          <figure className="hero__side-photo hero__side-photo--curry">
            <HeroImage
              src="/images/dishes/thai-green-curry.webp"
              alt="Vegetarian Thai green curry"
              width={960}
              height={877}
            />

            <figcaption>
              THAI FAVOURITES
            </figcaption>
          </figure>

          {/* FLOATING LABEL */}

          <div className="hero__floating-label">
            <span className="hero__floating-label-icon">
              ✦
            </span>

            <div>
              <span>DISCOVER</span>
              <strong>ASIAN FLAVOURS</strong>
            </div>
          </div>

          <span
            className="hero__visual-star"
            aria-hidden="true"
          >
            ✳
          </span>

          {/* BRAND STAMP */}

          <div className="hero__stamp" aria-hidden="true">
            <span>TTATTATAO</span>
            <strong>味</strong>
            <span>MADE TO CRAVE</span>
          </div>

          {/* SLIDER CONTROLS */}

          <div
            className="hero__slider-controls"
            aria-label="Featured dishes controls"
          >
            <button
              type="button"
              className="hero__slider-arrow"
              onClick={() => changeDish(-1)}
              aria-label="Previous featured dish"
            >
              <HeroIcon
                name="chevronLeft"
                size={18}
              />
            </button>

            <span
              className="hero__slider-count"
              aria-live="off"
            >
              {String(activeIndex + 1).padStart(2, "0")}

              <span>/</span>

              {String(featuredDishes.length).padStart(
                2,
                "0"
              )}
            </span>

            <button
              type="button"
              className="hero__slider-arrow"
              onClick={() => changeDish(1)}
              aria-label="Next featured dish"
            >
              <HeroIcon
                name="chevronRight"
                size={18}
              />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}

      <div className="hero__bottom-strip">
        <div className="container hero__strip-inner">
          <span>ASIAN SMALL PLATES</span>

          <span
            className="hero__strip-star"
            aria-hidden="true"
          >
            ✳
          </span>

          <span>WOK-TOSSED NOODLES</span>

          <span
            className="hero__strip-star"
            aria-hidden="true"
          >
            ✳
          </span>

          <span>THAI CURRIES</span>

          <span
            className="hero__strip-star"
            aria-hidden="true"
          >
            ✳
          </span>

          <span>SIGNATURE DUMPLINGS</span>
        </div>
      </div>
    </section>
  );
}
