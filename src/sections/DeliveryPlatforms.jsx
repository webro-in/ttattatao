
import { useEffect, useRef, useState } from "react";
import "./DeliveryPlatforms.scss";

const platforms = [
  {
    id: "swiggy",
    name: "Swiggy",
    initials: "S",
    description: "Order on Swiggy",
  },
  {
    id: "zomato",
    name: "Zomato",
    initials: "Z",
    description: "Order on Zomato",
  },
  {
    id: "toing",
    name: "Toing",
    initials: "t",
    description: "Order on Toing",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="19"
      height="19"
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

export default function DeliveryPlatforms() {
  const [activePlatform, setActivePlatform] = useState(null);
  const [animationCount, setAnimationCount] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  function handlePlatformClick(id) {
    window.clearTimeout(timerRef.current);

    setActivePlatform(id);
    setAnimationCount((count) => count + 1);

    // Animation only — no link or redirect.
    timerRef.current = window.setTimeout(() => {
      setActivePlatform(null);
    }, 850);
  }

  return (
    <section
      className="delivery-platforms"
      aria-labelledby="delivery-platforms-title"
    >
      <div className="container">
        <div className="delivery-platforms__panel">
          <div
            className="delivery-platforms__decoration"
            aria-hidden="true"
          >
            味
          </div>

          <div className="delivery-platforms__heading">
            <span className="delivery-platforms__eyebrow">
              <span className="delivery-platforms__dot" />
              YOUR CRAVINGS, YOUR CHOICE
            </span>

            <h2 id="delivery-platforms-title">
              Love the Food?
              <span> Pick Your Platform.</span>
            </h2>

            <p>
              Swiggy, Zomato or Toing — choose your
              favourite way to order Ttattatao.
            </p>
          </div>

          <div className="delivery-platforms__grid">
            {platforms.map((platform) => {
              const isActive =
                activePlatform === platform.id;

              return (
                <article
                  key={platform.id}
                  className={[
                    "delivery-platforms__card",
                    `delivery-platforms__card--${platform.id}`,
                    isActive ? "is-active" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="delivery-platforms__card-top">
                    <span
                      className="delivery-platforms__logo"
                      aria-hidden="true"
                    >
                      {platform.initials}
                    </span>

                    <span className="delivery-platforms__card-copy">
                      <small>ORDER WITH</small>
                      <strong>{platform.name}</strong>
                    </span>

                    <span
                      className="delivery-platforms__card-spark"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                  </div>

                  <button
                    type="button"
                    className={[
                      "delivery-platforms__button",
                      isActive ? "is-clicked" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      handlePlatformClick(platform.id)
                    }
                  >
                    <span className="delivery-platforms__button-text">
                      {platform.description}
                    </span>

                    <ArrowIcon />

                    {isActive && (
                      <span
                        key={`${platform.id}-${animationCount}`}
                        className="delivery-platforms__burst"
                        aria-hidden="true"
                      >
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </span>
                    )}
                  </button>
                </article>
              );
            })}
          </div>

          <p className="delivery-platforms__note">
            Find your favourite flavours on your
            preferred ordering platform.
          </p>
        </div>
      </div>
    </section>
  );
}
