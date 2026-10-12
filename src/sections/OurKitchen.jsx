
import { useState } from "react";
import "./OurKitchen.scss";

const kitchenImages = {
  main: "/images/dishes/chilli-paneer.webp",
  dumplings: "/images/dishes/vegetable-steamed-dim-sum.webp",
  crispy: "/images/dishes/crispy-chilli-lotus-stem.webp",
};

const highlights = [
  {
    number: "01",
    title: "Bold Asian Flavours",
    description:
      "From chilli-loaded favourites to comforting wok classics.",
  },
  {
    number: "02",
    title: "Something for Every Craving",
    description:
      "Discover dumplings, crispy bites, noodles, rice and curries.",
  },
  {
    number: "03",
    title: "Made for Food Lovers",
    description:
      "A menu inspired by the flavours you love coming back to.",
  },
];

function KitchenImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`our-kitchen__image ${className}`}>
      {failed ? (
        <div
          className="our-kitchen__image-fallback"
          role="img"
          aria-label={`${alt} photo unavailable`}
        >
          <span aria-hidden="true">食</span>
          <strong>TTATTATAO</strong>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function OurKitchen() {
  return (
    <section
      id="our-kitchen"
      className="our-kitchen"
      aria-labelledby="our-kitchen-title"
    >
      <span
        className="our-kitchen__watermark"
        aria-hidden="true"
      >
        味
      </span>

      <div className="container our-kitchen__container">
        <div className="our-kitchen__visual">
          <div
            className="our-kitchen__visual-orbit"
            aria-hidden="true"
          />

          <span
            className="our-kitchen__decorative-star"
            aria-hidden="true"
          >
            ✳
          </span>

          <figure className="our-kitchen__main-card">
            <KitchenImage
              src={kitchenImages.main}
              alt="Chilli paneer in a rich Asian-style sauce"
            />

            <figcaption className="our-kitchen__main-caption">
              <span>THE TTATTATAO WAY</span>
              <strong>Flavour in Every Bite.</strong>
            </figcaption>
          </figure>

          <figure className="our-kitchen__floating-card our-kitchen__floating-card--top">
            <KitchenImage
              src={kitchenImages.dumplings}
              alt="Vegetable steamed dim sum"
            />

            <figcaption>DUMPLING LOVE</figcaption>
          </figure>

          <figure className="our-kitchen__floating-card our-kitchen__floating-card--bottom">
            <KitchenImage
              src={kitchenImages.crispy}
              alt="Crispy chilli lotus stem"
            />

            <figcaption>CRISPY BITES</figcaption>
          </figure>

          <div className="our-kitchen__stamp">
            <span>MADE FOR</span>
            <strong>FOOD</strong>
            <span>LOVERS</span>
          </div>
        </div>

        <div className="our-kitchen__content">
          <div className="our-kitchen__eyebrow">
            <span />
            GET TO KNOW US
          </div>

          <p className="our-kitchen__overline">
            THE TTATTATAO STORY
          </p>

          <h2 id="our-kitchen-title">
            A Little Heat.
            <br />
            <span>A Lot of</span>
            <em>Flavour.</em>
          </h2>

          <div className="our-kitchen__accent-line" />

          <p className="our-kitchen__lead">
            Great food has a way of making every
            moment better.
          </p>

          <p className="our-kitchen__description">
            At Ttattatao, our menu is inspired by
            the irresistible world of Asian comfort food.
            Think delicious dumplings, crispy appetisers,
            wok-style noodles, flavourful fried rice
            and rich, aromatic curries.
          </p>

          <p className="our-kitchen__description">
            Whether you're craving something spicy,
            saucy or wonderfully comforting, there's
            a flavour waiting to become your favourite.
          </p>

          <div className="our-kitchen__highlights">
            {highlights.map((item) => (
              <div
                className="our-kitchen__highlight"
                key={item.number}
              >
                <span className="our-kitchen__highlight-number">
                  {item.number}
                </span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="our-kitchen__actions">
            <a
              href="#menu"
              className="our-kitchen__button"
            >
              Explore Our Menu
              <ArrowIcon />
            </a>

            <span className="our-kitchen__signature">
              <span aria-hidden="true">✳</span>
              YOUR CRAVINGS, OUR INSPIRATION
            </span>
          </div>
        </div>
      </div>

      <div className="our-kitchen__bottom">
        <div className="container our-kitchen__bottom-inner">
          <span>TTATTATAO</span>
          <span aria-hidden="true">✳</span>
          <span>GOOD FOOD, GREAT MOODS</span>
          <span aria-hidden="true">✳</span>
          <span>ASIAN FLAVOURS</span>
        </div>
      </div>
    </section>
  );
}
