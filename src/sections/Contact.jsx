
import { useEffect, useMemo, useRef, useState } from "react";

import {
  menuCategories,
  menuItems,
  formatPrice,
} from "../data/menu";

import { useCart } from "../context/CartContext";

import "./Contact.scss";

// ==========================================
// BUSINESS DETAILS
// ==========================================

const WHATSAPP_NUMBER = "918949540259";
const PHONE_NUMBER = "+918949540259";

const KITCHEN_ADDRESS =
  "SKIT College Road, Shivam Nagar, Ramnagariya, Jaipur, Rajasthan 302017";

const KITCHEN_MAP =
  "https://www.google.com/maps?cid=13132419836343968304";

const DISHES = menuItems.filter(
  (dish) =>
    dish.id !== "maple-thyme-ramen" &&
    dish.name.toLowerCase() !== "maple & thyme ramen"
);

const FEATURED_DISHES = DISHES.filter(
  (dish) => Boolean(dish.image)
);

// ==========================================
// ICONS
// ==========================================

function Icon({ name, size = 20 }) {
  const icons = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    plus: <path d="M12 5v14M5 12h14" />,

    minus: <path d="M5 12h14" />,

    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15" />
        <path d="M10 10v7M14 10v7" />
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

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    locate: (
      <>
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </>
    ),

    message: (
      <>
        <path d="M20.5 11.5a8.5 8.5 0 0 1-12.2 7.6L3 20.5l1.4-5.1A8.5 8.5 0 1 1 20.5 11.5Z" />
        <path d="M8.5 9.5c.8 2.6 2.1 3.9 5 5" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    sparkle: (
      <>
        <path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" />
        <path d="m19 17 .6 1.4L21 19l-1.4.6L19 21l-.6-1.4L17 19l1.4-.6L19 17Z" />
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
    >
      {icons[name]}
    </svg>
  );
}

// ==========================================
// FOOD IMAGE WITH FALLBACK
// ==========================================

function FoodImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <div
        className="contact-section__food-fallback"
        role="img"
        aria-label={`${alt} image unavailable`}
      >
        <span aria-hidden="true">食</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

// ==========================================
// CONTACT AND ORDERING SECTION
// ==========================================

export default function Contact() {
  // SHARED CART - SAME AS MENU
  const {
    cart,
    cartItems,
    totalItems,
    subtotal,
    cartPulse,
    addDish,
    changeQuantity,
    removeDish,
  } = useCart();

  const sectionRef = useRef(null);
  const feedbackTimer = useRef(null);
  const mountedRef = useRef(true);

  const [isVisible, setIsVisible] = useState(true);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // FOOD SELECTION
  const [categoryId, setCategoryId] = useState(
    menuCategories[0]?.id ?? ""
  );

  const [dishId, setDishId] = useState("");
  const [addedDishId, setAddedDishId] = useState("");

  // GPS LOCATION
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationStatus, setLocationStatus] = useState("");
  const [locationError, setLocationError] = useState("");

  // CUSTOMER DETAILS
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    mapsLink: "",
    instructions: "",
  });

  // ==========================================
  // CLEANUP
  // ==========================================

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  // ==========================================
  // SCROLL REVEAL
  // ==========================================

  useEffect(() => {
    const element = sectionRef.current;

    if (
      !element ||
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // ==========================================
  // AUTOMATIC FOOD SLIDESHOW
  // ==========================================

  useEffect(() => {
    if (FEATURED_DISHES.length <= 1) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    const interval = window.setInterval(() => {
      if (!document.hidden) {
        setFeaturedIndex(
          (current) =>
            (current + 1) % FEATURED_DISHES.length
        );
      }
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  // ==========================================
  // SELECTED CATEGORY AND DISH
  // ==========================================

  const categoryDishes = useMemo(
    () =>
      DISHES.filter(
        (dish) => dish.category === categoryId
      ),
    [categoryId]
  );

  const selectedDish =
    categoryDishes.find(
      (dish) => dish.id === dishId
    ) ?? categoryDishes[0];

  const featuredDish = FEATURED_DISHES[featuredIndex];

  const dishesById = useMemo(
    () => new Map(DISHES.map((dish) => [dish.id, dish])),
    []
  );

  // ==========================================
  // ADD TO CART ANIMATION
  // ==========================================

  function signalAdded(id) {
    setAddedDishId(id);

    window.clearTimeout(feedbackTimer.current);

    feedbackTimer.current = window.setTimeout(() => {
      setAddedDishId("");
    }, 1150);
  }

  // ==========================================
  // ADD SELECTED DISH TO SHARED CART
  // ==========================================

  function addSelectedDish() {
    if (!selectedDish) return;

    const quantity =
      cart.find(
        (item) => item.id === selectedDish.id
      )?.quantity ?? 0;

    if (quantity >= 99) return;

    addDish(selectedDish.id);
    signalAdded(selectedDish.id);
  }

  // ==========================================
  // UPDATE CUSTOMER FIELDS
  // ==========================================

  function updateCustomer(event) {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]:
        name === "phone"
          ? value.replace(/\D/g, "").slice(0, 10)
          : value,
    }));

    if (name === "mapsLink") {
      setLocationStatus("");
      setLocationError("");
    }
  }

  // ==========================================
  // GET CURRENT GPS LOCATION
  // ==========================================

  function getCurrentLocation() {
    setLocationError("");
    setLocationStatus("");

    if (!navigator.geolocation) {
      setLocationError(
        "Your browser does not support location detection. You can enter a Maps link manually."
      );
      return;
    }

    if (!window.isSecureContext) {
      setLocationError(
        "Location detection requires HTTPS or localhost."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (!mountedRef.current) return;

        const latitude = coords.latitude.toFixed(6);
        const longitude = coords.longitude.toFixed(6);

        const googleMapsLink =
          `https://www.google.com/maps?q=` +
          `${latitude},${longitude}`;

        setCustomer((current) => ({
          ...current,
          mapsLink: googleMapsLink,
        }));

        setLocationLoading(false);

        setLocationStatus(
          "Location detected! Please verify your address below."
        );
      },

      (error) => {
        if (!mountedRef.current) return;

        const messages = {
          1: "Location permission denied. Allow access or enter a Maps link manually.",
          2: "Location unavailable. Please try again.",
          3: "Location request timed out. Please retry.",
        };

        setLocationError(
          messages[error.code] ||
            "Unable to detect your location."
        );

        setLocationLoading(false);
      },

      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }

  // ==========================================
  // WHATSAPP CHECKOUT
  // ==========================================

  function placeOrder(event) {
    event.preventDefault();

    if (cartItems.length === 0) return;

    const validPhone =
      /^[6-9]\d{9}$/.test(customer.phone);

    if (
      !validPhone ||
      !customer.name.trim() ||
      !customer.address.trim()
    ) {
      return;
    }

    // Items are taken directly from shared cart.
    const orderLines = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.name}\n` +
        `   ${item.quantity} x ` +
        `${formatPrice(item.price)} = ` +
        `${formatPrice(item.quantity * item.price)}`
    );

    const message = [
      "*TTATTATAO - NEW ORDER REQUEST*",
      "",
      "*ORDER ITEMS*",
      ...orderLines,
      "",
      `*Total Items:* ${totalItems}`,
      `*Menu Subtotal:* ${formatPrice(subtotal)}`,
      "(Taxes and delivery fees not included)",
      "",
      "*CUSTOMER DETAILS*",
      `Name: ${customer.name.trim()}`,
      `Phone: +91 ${customer.phone}`,
      "",
      "*DELIVERY ADDRESS - JAIPUR*",
      customer.address.trim(),

      customer.landmark.trim()
        ? `Landmark: ${customer.landmark.trim()}`
        : null,

      customer.mapsLink.trim()
        ? `Google Maps Location: ${customer.mapsLink.trim()}`
        : null,

      "",
      "*SPECIAL INSTRUCTIONS*",
      customer.instructions.trim() || "None",
      "",
      "Please confirm item availability, delivery coverage, taxes, delivery charges, final amount, payment method and delivery time.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  }

  // ==========================================
  // JSX
  // ==========================================

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact-section ${
        isVisible ? "contact-section--visible" : ""
      }`}
      aria-labelledby="contact-title"
    >
      <div
        className="contact-section__pattern"
        aria-hidden="true"
      />

      <div className="container">
        {/* SECTION INTRO */}

        <header className="contact-section__intro">
          <span className="contact-section__eyebrow">
            <span />
            ORDER YOUR FAVOURITES
            <span />
          </span>

          <h2 id="contact-title">
            Good Food Is
            <br />
            <span>Just an Order Away.</span>
          </h2>

          <p>
            Choose your favourite Asian dishes,
            share your Jaipur delivery location
            and send your order request to Ttattatao.
          </p>
        </header>

        <div className="contact-section__layout">
          {/* ==================================
              LEFT SIDE
          ================================== */}

          <aside className="contact-section__main">
            <span className="contact-section__main-label">
              TTATTATAO · CHINESE CLOUD KITCHEN
            </span>

            <h3>
              Hungry?
              <br />
              <span>We've Got You.</span>
            </h3>

            <p>
              Dumplings, bold wok-fired noodles,
              crispy bites and comforting Asian
              flavours — all your cravings in one place.
            </p>

            <a
              href="#menu"
              data-order-loader="true"
              className="contact-section__primary-button"
            >
              Explore Full Menu
              <Icon name="arrow" />
            </a>

            {/* AUTOMATIC FOOD SLIDER */}

            <div
              className="contact-section__hero-food"
              aria-label="Featured dishes slideshow"
            >
              {featuredDish && (
                <div
                  key={featuredDish.id}
                  className="contact-section__hero-food-slide"
                >
                  <FoodImage
                    src={featuredDish.image}
                    alt={featuredDish.name}
                  />

                  <div className="contact-section__hero-food-shade" />

                  <div className="contact-section__hero-food-info">
                    <span>DISCOVER OUR FLAVOURS</span>

                    <h4>{featuredDish.name}</h4>

                    <strong>
                      {formatPrice(featuredDish.price)}
                    </strong>
                  </div>
                </div>
              )}

              <span className="contact-section__food-badge">
                TTATTATAO SPECIALS
              </span>

              <span className="contact-section__slide-counter">
                {String(featuredIndex + 1).padStart(2, "0")}
                <span> / </span>
                {String(FEATURED_DISHES.length).padStart(2, "0")}
              </span>
            </div>

            <div
              className="contact-section__main-decor"
              aria-hidden="true"
            >
              味
            </div>

            <div className="contact-section__main-footer">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Icon name="phone" size={16} />
                +91 89495 40259
              </a>

              <a
                href={KITCHEN_MAP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="pin" size={16} />
                Find Kitchen
              </a>
            </div>
          </aside>

          {/* ==================================
              RIGHT SIDE - ORDER FORM
          ================================== */}

          <form
            className="contact-section__order"
            onSubmit={placeOrder}
          >
            <div className="contact-section__order-header">
              <div>
                <span className="contact-section__order-eyebrow">
                  YOUR FOOD, YOUR WAY
                </span>

                <h3>Build Your Order</h3>

                <p>
                  Add dishes, customize quantities
                  and share your delivery details.
                </p>
              </div>

              {/* SHARED CART BADGE */}

              <span
                key={cartPulse}
                className={`contact-section__order-bag ${
                  cartPulse
                    ? "contact-section__order-bag--pulse"
                    : ""
                }`}
                aria-label={`${totalItems} items in cart`}
              >
                <Icon name="bag" size={24} />

                <small>{totalItems}</small>
              </span>
            </div>

            {/* ==================================
                STEP 1 - CHOOSE FOOD
            ================================== */}

            <div className="contact-section__form-divider">
              <span>01</span>
              <strong>Choose Your Food</strong>
            </div>

            <div className="contact-section__field-grid">
              <label className="contact-section__field">
                <span>Food Category</span>

                <select
                  value={categoryId}
                  onChange={(event) => {
                    setCategoryId(event.target.value);
                    setDishId("");
                  }}
                >
                  {menuCategories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.shortLabel || category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contact-section__field">
                <span>Select Dish</span>

                <select
                  value={selectedDish?.id ?? ""}
                  onChange={(event) =>
                    setDishId(event.target.value)
                  }
                  disabled={!categoryDishes.length}
                >
                  {categoryDishes.map((dish) => (
                    <option
                      key={dish.id}
                      value={dish.id}
                    >
                      {dish.name} — {formatPrice(dish.price)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* SELECTED DISH */}

            {selectedDish && (
              <div
                className={`contact-section__selected-dish ${
                  addedDishId === selectedDish.id
                    ? "contact-section__selected-dish--added"
                    : ""
                }`}
              >
                <div className="contact-section__selected-image">
                  <FoodImage
                    src={selectedDish.image}
                    alt={selectedDish.name}
                  />
                </div>

                <div className="contact-section__selected-info">
                  <span>SELECTED DISH</span>

                  <strong>{selectedDish.name}</strong>

                  <b>{formatPrice(selectedDish.price)}</b>
                </div>

                <button
                  type="button"
                  className={`contact-section__add-button ${
                    addedDishId === selectedDish.id
                      ? "contact-section__add-button--added"
                      : ""
                  }`}
                  onClick={addSelectedDish}
                  disabled={
                    cart.find(
                      (item) => item.id === selectedDish.id
                    )?.quantity >= 99
                  }
                  aria-label={`Add ${selectedDish.name} to order`}
                >
                  {addedDishId === selectedDish.id ? (
                    <Icon name="check" size={18} />
                  ) : (
                    <Icon name="plus" size={18} />
                  )}

                  <span>
                    {addedDishId === selectedDish.id
                      ? "Added!"
                      : "Add"}
                  </span>
                </button>

                {addedDishId === selectedDish.id && (
                  <span
                    key={cartPulse}
                    className="contact-section__add-spark"
                    aria-hidden="true"
                  >
                    <Icon name="sparkle" size={25} />
                  </span>
                )}
              </div>
            )}

            <p
              className="contact-section__add-feedback"
              role="status"
              aria-live="polite"
            >
              {addedDishId
                ? `${
                    dishesById.get(addedDishId)?.name ||
                    "Dish"
                  } added to your order!`
                : ""}
            </p>

            {/* ==================================
                SHARED CART ITEMS
            ================================== */}

            <div className="contact-section__cart">
              <div className="contact-section__cart-header">
                <h4>
                  <Icon name="bag" size={18} />
                  Your Order
                </h4>

                <span>
                  {totalItems}{" "}
                  {totalItems === 1 ? "ITEM" : "ITEMS"}
                </span>
              </div>

              {cartItems.length ? (
                <div className="contact-section__cart-list">
                  {cartItems.map((item) => (
                    <div
                      className="contact-section__cart-item"
                      key={item.id}
                    >
                      <div className="contact-section__cart-item-info">
                        <strong>{item.name}</strong>

                        <span>
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </span>
                      </div>

                      {/* QUANTITY CONTROLS */}

                      <div className="contact-section__quantity">
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, -1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Icon name="minus" size={15} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          disabled={item.quantity >= 99}
                          onClick={() =>
                            changeQuantity(item.id, 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Icon name="plus" size={15} />
                        </button>
                      </div>

                      {/* REMOVE DISH */}

                      <button
                        type="button"
                        className="contact-section__remove"
                        onClick={() => removeDish(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="contact-section__cart-empty">
                  <span aria-hidden="true">✳</span>

                  <p>
                    Your order is empty.
                    <br />
                    Add something delicious above.
                  </p>
                </div>
              )}

              {/* SUBTOTAL */}

              <div className="contact-section__subtotal">
                <div>
                  <strong>Menu Subtotal</strong>

                  <small>
                    Excludes applicable taxes and
                    delivery charges
                  </small>
                </div>

                <strong>{formatPrice(subtotal)}</strong>
              </div>
            </div>

            {/* ==================================
                STEP 2 - DELIVERY DETAILS
            ================================== */}

            <div className="contact-section__form-divider">
              <span>02</span>
              <strong>Delivery Details · Jaipur</strong>
            </div>

            <div className="contact-section__field-grid">
              {/* CUSTOMER NAME */}

              <label className="contact-section__field">
                <span>Your Full Name *</span>

                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your name"
                  value={customer.name}
                  onChange={updateCustomer}
                  maxLength={80}
                  required
                />
              </label>

              {/* CUSTOMER PHONE */}

              <label className="contact-section__field">
                <span>Mobile Number *</span>

                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="10-digit mobile number"
                  value={customer.phone}
                  onChange={updateCustomer}
                  pattern="[6-9][0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  required
                />
              </label>

              {/* ==================================
                  GPS LOCATION
              ================================== */}

              <div className="contact-section__field contact-section__field--full contact-section__gps">
                <span>
                  <Icon name="locate" size={17} />
                  Delivery Location
                </span>

                <button
                  className="contact-section__detect-location"
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                >
                  <Icon name="locate" size={20} />

                  {locationLoading
                    ? "Detecting Location..."
                    : customer.mapsLink
                      ? "Update My Current Location"
                      : "Use My Current Location"}
                </button>

                <small>
                  Allow location permission to
                  automatically generate your Google
                  Maps pin.
                </small>

                {locationStatus && (
                  <p
                    className="contact-section__location-success"
                    role="status"
                  >
                    <Icon name="check" size={16} />
                    {locationStatus}
                  </p>
                )}

                {locationError && (
                  <p
                    className="contact-section__location-error"
                    role="alert"
                  >
                    {locationError}
                  </p>
                )}

                {customer.mapsLink && (
                  <a
                    className="contact-section__view-location"
                    href={customer.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="pin" size={16} />
                    View Your Maps Pin
                  </a>
                )}

                {/* EDITABLE MAPS LINK */}

                <label className="contact-section__field contact-section__maps-field">
                  <span>
                    Google Maps Link (Optional / Editable)
                  </span>

                  <input
                    name="mapsLink"
                    type="url"
                    value={customer.mapsLink}
                    onChange={updateCustomer}
                    placeholder="Auto-generated or enter a Maps link"
                    pattern="https://.*"
                    maxLength={1500}
                  />
                </label>
              </div>

              {/* ADDRESS */}

              <label className="contact-section__field contact-section__field--full">
                <span>Complete Delivery Address *</span>

                <textarea
                  name="address"
                  autoComplete="street-address"
                  value={customer.address}
                  onChange={updateCustomer}
                  placeholder="House / Flat No., Building, Street, Area, Jaipur"
                  rows={3}
                  maxLength={350}
                  required
                />

                <small>
                  Jaipur delivery requests only.
                  Please verify your complete address.
                  GPS cannot identify your house number.
                </small>
              </label>

              {/* LANDMARK */}

              <label className="contact-section__field contact-section__field--full">
                <span>Nearby Landmark (Optional)</span>

                <input
                  name="landmark"
                  value={customer.landmark}
                  onChange={updateCustomer}
                  placeholder="E.g. Near SKIT College"
                  maxLength={150}
                />
              </label>

              {/* SPECIAL INSTRUCTIONS */}

              <label className="contact-section__field contact-section__field--full">
                <span>Special Instructions (Optional)</span>

                <textarea
                  name="instructions"
                  value={customer.instructions}
                  onChange={updateCustomer}
                  placeholder="Spice preference, food allergies or delivery notes..."
                  rows={3}
                  maxLength={500}
                />
              </label>
            </div>

            {/* ==================================
                WHATSAPP CHECKOUT
            ================================== */}

            <div className="contact-section__checkout">
              <div className="contact-section__checkout-summary">
                <div>
                  <span>ESTIMATED MENU SUBTOTAL</span>

                  <strong>{formatPrice(subtotal)}</strong>
                </div>

                <span>
                  {totalItems}{" "}
                  {totalItems === 1 ? "item" : "items"}
                </span>
              </div>

              <button
                type="submit"
                disabled={!totalItems}
                className="contact-section__checkout-button"
              >
                <Icon name="message" size={23} />

                Send Order via WhatsApp

                <Icon name="arrow" size={18} />
              </button>

              <p className="contact-section__checkout-note">
                <Icon name="check" size={16} />

                WhatsApp will open with your order
                draft. Press Send to submit your
                request. The kitchen will confirm
                availability, delivery coverage,
                final charges and payment.
              </p>
            </div>
          </form>
        </div>

        {/* ==================================
            KITCHEN ADDRESS
        ================================== */}

        <div className="contact-section__location">
          <div>
            <span>OUR KITCHEN</span>
            <p>{KITCHEN_ADDRESS}</p>
          </div>

          <a
            href={KITCHEN_MAP}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
            <Icon name="arrow" size={18} />
          </a>
        </div>

        {/* FOOTER STRIP */}

        <div className="contact-section__bottom">
          <span>TTATTATAO</span>
          <span>FRESH FLAVOURS. HAPPY CRAVINGS.</span>
          <span>CHINESE CLOUD KITCHEN</span>
        </div>
      </div>
    </section>
  );
}
