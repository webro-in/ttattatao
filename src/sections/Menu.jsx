
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  menuCategories,
  menuItems,
  formatPrice,
} from "../data/menu";

import { useCart } from "../context/CartContext";

import "./Menu.scss";
import "./MenuCart.scss";

// ==========================================
// TTATTATAO - AVAILABLE MENU
// ==========================================

const availableDishes = menuItems.filter(
  (dish) =>
    dish.id !== "maple-thyme-ramen" &&
    dish.name.toLowerCase() !== "maple & thyme ramen"
);

const categories = menuCategories.map((category) => ({
  ...category,

  count: availableDishes.filter(
    (dish) => dish.category === category.id
  ).length,
}));

// ==========================================
// ICONS
// ==========================================

function SearchIcon() {
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
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="M16 16L21 21" />
    </svg>
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
      <path d="M5 12H19M13 6L19 12L13 18" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

// ==========================================
// FOOD CARD WITH ADD TO CART
// ==========================================

function FoodCard({ dish, index }) {
  const [imageFailed, setImageFailed] = useState(false);

  const [justAdded, setJustAdded] = useState(false);

  const feedbackTimer = useRef(null);

  // SHARED CART
  const {
    addDish,
    changeQuantity,
    getDishQuantity,
  } = useCart();

  const quantity = getDishQuantity(dish.id);

  const isMaxQuantity = quantity >= 99;

  // CLEANUP TIMER
  useEffect(() => {
    return () => {
      window.clearTimeout(feedbackTimer.current);
    };
  }, []);

  // ADD ITEM WITH ANIMATION
  function handleAdd() {
    if (isMaxQuantity) return;

    addDish(dish.id);

    setJustAdded(true);

    window.clearTimeout(feedbackTimer.current);

    feedbackTimer.current = window.setTimeout(() => {
      setJustAdded(false);
    }, 850);
  }

  // REDUCE QUANTITY
  function handleDecrease() {
    window.clearTimeout(feedbackTimer.current);

    setJustAdded(false);

    changeQuantity(dish.id, -1);
  }

  return (
    <article
      className={`menu-food ${
        justAdded ? "menu-food--just-added" : ""
      }`}
      style={{ "--card-index": index }}
    >
      {/* ==================================
          FOOD IMAGE
      ================================== */}

      <div className="menu-food__media">
        {dish.image && !imageFailed ? (
          <img
            src={dish.image}
            alt={dish.name}
            width="960"
            height="960"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="menu-food__placeholder"
            role="img"
            aria-label={`${dish.name} photo unavailable`}
          >
            <span aria-hidden="true">食</span>

            <strong>TTATTATAO</strong>

            <small>FRESH ASIAN FLAVOURS</small>
          </div>
        )}

        <span
          className="menu-food__image-shade"
          aria-hidden="true"
        />

        <span className="menu-food__media-category">
          {dish.group}
        </span>

        {dish.isNew && (
          <span className="menu-food__media-new">
            NEW
          </span>
        )}

        {/* ADDED ANIMATION BADGE */}

        {justAdded && (
          <span
            className="menu-food__added-badge"
            aria-hidden="true"
          >
            <CheckIcon />
            ADDED
          </span>
        )}
      </div>

      {/* ==================================
          FOOD CONTENT
      ================================== */}

      <div className="menu-food__body">
        <div className="menu-food__meta">
          <span
            className="menu-food__veg"
            role="img"
            aria-label="Vegetarian"
          >
            <span />
          </span>

          <span className="menu-food__type">
            100% VEG
          </span>

          <span className="menu-food__brand">
            TTATTATAO
          </span>
        </div>

        <div className="menu-food__heading">
          <h5>{dish.name}</h5>
        </div>

        <p className="menu-food__description">
          {dish.description}
        </p>

        {/* ==================================
            PRICE + ADD TO CART
        ================================== */}

        <div className="menu-food__footer">
          <div className="menu-food__price">
            <span>PRICE</span>

            <strong>
              {formatPrice(dish.price)}
            </strong>
          </div>

          {/* NOT ADDED YET */}

          {quantity === 0 ? (
            <button
              type="button"
              className="menu-food__add-button"
              onClick={handleAdd}
              aria-label={`Add ${dish.name} to cart`}
            >
              <PlusIcon />

              <span>Add</span>
            </button>
          ) : (
            // ==================================
            // QUANTITY CONTROLS
            // ==================================

            <div
              className={`menu-food__quantity ${
                justAdded
                  ? "menu-food__quantity--added"
                  : ""
              }`}
              role="group"
              aria-label={`${dish.name} quantity`}
            >
              <button
                type="button"
                className="menu-food__qty-button"
                onClick={handleDecrease}
                aria-label={`Decrease ${dish.name} quantity`}
              >
                <MinusIcon />
              </button>

              <span
                className="menu-food__qty-value"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                className="menu-food__qty-button menu-food__qty-button--plus"
                onClick={handleAdd}
                disabled={isMaxQuantity}
                aria-label={`Increase ${dish.name} quantity`}
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>

        {/* ACCESSIBLE ADD FEEDBACK */}

        <span
          className="menu-food__feedback"
          role="status"
          aria-live="polite"
        >
          {justAdded
            ? `${dish.name} added to your order`
            : ""}
        </span>
      </div>
    </article>
  );
}

// ==========================================
// MAIN MENU SECTION
// ==========================================

export default function Menu() {
  const {
    totalItems,
    subtotal,
  } = useCart();

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id ?? ""
  );

  const [searchTerm, setSearchTerm] = useState("");

  // ACTIVE CATEGORY DETAILS
  const activeCategoryDetails = categories.find(
    (category) => category.id === activeCategory
  );

  // ==========================================
  // FILTER DISHES
  // ==========================================

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return availableDishes.filter((dish) => {
      if (dish.category !== activeCategory) {
        return false;
      }

      if (!query) return true;

      return [
        dish.name,
        dish.description,
        dish.group,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [activeCategory, searchTerm]);

  // ==========================================
  // GROUP DISHES
  // ==========================================

  const groupedItems = useMemo(() => {
    const groups = new Map();

    for (const dish of filteredItems) {
      const groupName =
        dish.group || "Other Dishes";

      if (!groups.has(groupName)) {
        groups.set(groupName, []);
      }

      groups.get(groupName).push(dish);
    }

    return Array.from(
      groups,
      ([name, dishes]) => ({
        name,
        dishes,
      })
    );
  }, [filteredItems]);

  // ==========================================
  // CHANGE CATEGORY
  // ==========================================

  function changeCategory(categoryId) {
    setActiveCategory(categoryId);
    setSearchTerm("");
  }

  return (
    <section
      id="menu"
      className="menu-section"
      aria-labelledby="menu-title"
    >
      {/* ==================================
          BACKGROUND DECORATION
      ================================== */}

      <div
        className="menu-section__decoration"
        aria-hidden="true"
      >
        味
      </div>

      <div className="container">
        {/* ==================================
            PREMIUM HEADING
        ================================== */}

        <div className="menu-section__intro">
          <span className="menu-section__eyebrow">
            <span />
            THE TTATTATAO MENU
            <span />
          </span>

          <div
            className="menu-section__intro-symbol"
            aria-hidden="true"
          >
            ✳
          </div>

          <h2 id="menu-title">
            Your Cravings,
            <br />
            <span>Our Speciality.</span>
          </h2>

          <p>
            Discover irresistible dumplings, crispy
            Asian bites, wok-tossed noodles,
            aromatic fried rice and rich Thai
            curries. Every dish brings its own
            delicious flavour.
          </p>

          <span className="menu-section__intro-note">
            <span aria-hidden="true">✦</span>
            EXPLORE THE FLAVOURS BELOW
            <span aria-hidden="true">✦</span>
          </span>
        </div>

        {/* ==================================
            CATEGORY TABS + SEARCH
        ================================== */}

        <div className="menu-section__controls">
          <div
            className="menu-section__tabs"
            role="group"
            aria-label="Choose menu category"
          >
            {categories.map((category) => {
              const isActive =
                activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`menu-section__tab ${
                    isActive ? "is-active" : ""
                  }`}
                  aria-pressed={isActive}
                  onClick={() =>
                    changeCategory(category.id)
                  }
                >
                  <span className="menu-section__tab-label">
                    {category.shortLabel}
                  </span>

                  <span className="menu-section__tab-count">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SEARCH */}

          <div className="menu-section__search">
            <SearchIcon />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search your craving..."
              aria-label="Search dishes in selected category"
            />

            {searchTerm && (
              <button
                type="button"
                className="menu-section__search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* ==================================
            CATEGORY HEADING
        ================================== */}

        <div className="menu-section__category-heading">
          <div>
            <span className="menu-section__category-eyebrow">
              HANDPICKED ASIAN FLAVOURS
            </span>

            <h3>
              {activeCategoryDetails?.label}
            </h3>

            <p>
              {activeCategoryDetails?.subtitle}
            </p>
          </div>

          <span
            className="menu-section__result-count"
            role="status"
          >
            {filteredItems.length}{" "}
            {filteredItems.length === 1
              ? "DISH"
              : "DISHES"}
          </span>
        </div>

        {/* ==================================
            EMPTY STATE / DISHES
        ================================== */}

        {filteredItems.length === 0 ? (
          <div className="menu-section__empty">
            <div className="menu-section__empty-icon">
              <SearchIcon />
            </div>

            <h3>No dishes found</h3>

            <p>
              Nothing matched your search.
              Try another dish name or explore
              the full category.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
            >
              Show All Dishes
              <ArrowIcon />
            </button>
          </div>
        ) : (
          <div
            className="menu-section__groups"
            key={activeCategory}
          >
            {groupedItems.map(({ name, dishes }) => (
              <div
                key={`${activeCategory}-${name}`}
                className="menu-section__group"
              >
                <div className="menu-section__group-heading">
                  <div className="menu-section__group-info">
                    <span
                      className="menu-section__group-line"
                      aria-hidden="true"
                    />

                    <h4>{name}</h4>
                  </div>

                  <span className="menu-section__group-count">
                    {dishes.length}{" "}
                    {dishes.length === 1
                      ? "ITEM"
                      : "ITEMS"}
                  </span>
                </div>

                {/* FOOD CARDS */}

                <div className="menu-section__grid">
                  {dishes.map((dish, index) => (
                    <FoodCard
                      key={dish.id}
                      dish={dish}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================================
            CART SUMMARY
        ================================== */}

        {totalItems > 0 && (
          <div className="menu-section__cart-summary">
            <div className="menu-section__cart-info">
              <span className="menu-section__cart-label">
                YOUR CURRENT ORDER
              </span>

              <strong>
                {totalItems}{" "}
                {totalItems === 1 ? "item" : "items"}
                <span> · </span>
                {formatPrice(subtotal)}
              </strong>
            </div>

            <a
              href="#contact"
              data-order-loader="true"
              className="menu-section__cart-link"
            >
              View Your Cart
              <ArrowIcon />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
