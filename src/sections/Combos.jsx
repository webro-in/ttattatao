
import "./Combos.scss";

const combos = [
  {
    id: "wok-duo",
    number: "01",
    category: "DUMPLINGS & NOODLES",
    title: "The Wok Duo",
    tagline: "Crispy bites. Bold flavours.",
    description:
      "Golden pan-fried gyoza meets bold chilli basil noodles. Two delicious Asian favourites in one perfect pairing.",
    dishes: [
      "Vegetable Pan-Fried Gyoza",
      "Asian Chilli Basil Noodles",
    ],
    mainImage:
      "/images/dishes/asian-chilli-basil-noodles.webp",
    secondImage:
      "/images/dishes/vegetable-pan-fried-gyoza.webp",
    theme: "orange",
    label: "WOK FAVOURITES",
  },
  {
    id: "sweet-heat",
    number: "02",
    category: "CRISPY & SAUCY",
    title: "The Sweet Heat",
    tagline: "A little sweet. A little spicy.",
    description:
      "Honey chilli potato paired with classic Hakka vegetable noodles. A comforting combination full of flavour.",
    dishes: [
      "Honey Chilli Potato",
      "Hakka Vegetable Noodles",
    ],
    mainImage:
      "/images/dishes/hakka-vegetable-noodles.webp",
    secondImage:
      "/images/dishes/honey-chilli-potato.webp",
    theme: "red",
    label: "SPICY CRAVINGS",
  },
  {
    id: "thai-comfort",
    number: "03",
    category: "THAI CURRY & RICE",
    title: "The Thai Comfort",
    tagline: "Rich curry. Perfectly paired.",
    description:
      "Aromatic Thai green curry served alongside vegetable fried rice. A satisfying match for your Asian food cravings.",
    dishes: [
      "Thai Green Curry",
      "Vegetable Fried Rice",
    ],
    mainImage:
      "/images/dishes/thai-green-curry.webp",
    secondImage:
      "/images/dishes/vegetable-fried-rice.webp",
    theme: "green",
    label: "THAI FAVOURITES",
  },
];

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

function ComboCard({ combo }) {
  return (
    <article
      className={`combos__card combos__card--${combo.theme}`}
    >
      <div className="combos__visual">
        <span className="combos__visual-pattern" aria-hidden="true" />

        <span className="combos__visual-number" aria-hidden="true">
          {combo.number}
        </span>

        <div className="combos__photo combos__photo--main">
          <img
            src={combo.mainImage}
            alt={combo.dishes[1 === 0 ? 1 : 0]}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="combos__photo combos__photo--second">
          <img
            src={combo.secondImage}
            alt={combo.dishes[1]}
            loading="lazy"
            decoding="async"
          />
        </div>

        <span className="combos__photo-label">
          {combo.label}
        </span>

        <span className="combos__visual-spark" aria-hidden="true">
          ✳
        </span>
      </div>

      <div className="combos__card-content">
        <div className="combos__card-meta">
          <span className="combos__veg">
            <span className="combos__veg-icon">
              <span />
            </span>
            100% VEG
          </span>

          <span className="combos__card-category">
            {combo.category}
          </span>
        </div>

        <h3>{combo.title}</h3>

        <strong className="combos__tagline">
          {combo.tagline}
        </strong>

        <p className="combos__description">
          {combo.description}
        </p>

        <div className="combos__includes">
          <span className="combos__includes-title">
            THE PERFECT PAIR
          </span>

          {combo.dishes.map((dish) => (
            <div
              key={dish}
              className="combos__dish"
            >
              <span aria-hidden="true">✳</span>
              <span>{dish}</span>
            </div>
          ))}
        </div>

        <a
          className="combos__card-link"
          href="#menu"
          aria-label={`Explore ${combo.title} dishes in the menu`}
        >
          Explore Menu
          <span aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </article>
  );
}

export default function Combos() {
  return (
    <section
      id="combos"
      className="combos"
      aria-labelledby="combos-title"
    >
      <span
        className="combos__background-symbol"
        aria-hidden="true"
      >
        食
      </span>

      <div className="container combos__container">
        <div className="combos__heading">
          <div className="combos__heading-content">
            <span className="combos__eyebrow">
              <span className="combos__eyebrow-line" />
              MADE TO MATCH
            </span>

            <h2 id="combos-title">
              Better
              <br />
              <em>Together.</em>
            </h2>

            <p>
              Some flavours are simply better together.
              Explore our handpicked Asian food pairings
              and find your next favourite combination.
            </p>
          </div>

          <div className="combos__heading-side">
            <span className="combos__heading-symbol" aria-hidden="true">
              ✳
            </span>

            <a href="#menu" className="combos__all-link">
              Explore Full Menu
              <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="combos__grid">
          {combos.map((combo) => (
            <ComboCard
              key={combo.id}
              combo={combo}
            />
          ))}
        </div>

        <div className="combos__bottom">
          <span className="combos__bottom-icon" aria-hidden="true">
            ✳
          </span>

          <p>
            TWO DISHES. MORE FLAVOUR. ONE HAPPY CRAVING.
          </p>

          <span className="combos__bottom-line" />
        </div>

        <p className="combos__disclaimer">
          Pairing suggestions only. Individual menu
          prices apply; no combo discount is implied.
        </p>
      </div>
    </section>
  );
}
