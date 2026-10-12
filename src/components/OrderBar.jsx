
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/menu";

import "./OrderBar.scss";
import "./OrderBarCart.scss";

// ======================================
// TTATTATAO - ICONS
// ======================================

function Icon({ name, size = 20 }) {
  const icons = {
    bag: (
      <>
        <path d="M4 8h16l-1 13H5L4 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    trash: (
      <>
        <path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15" />
        <path d="M10 10v7M14 10v7" />
      </>
    ),
    check: <path d="m5 12 4 4 7-8" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

// ======================================
// CART FOOD IMAGE
// ======================================

function FoodThumbnail({ dish }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [dish.image]);

  return (
    <div className="tt-cart__thumb">
      {dish.image && !failed ? (
        <img
          src={dish.image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true">食</span>
      )}
    </div>
  );
}

// ======================================
// PREMIUM CART DRAWER
// ======================================

function CartDrawer({ onClose, triggerRef }) {
  const {
    cartItems,
    totalItems,
    subtotal,
    changeQuantity,
    removeDish,
  } = useCart();

  const panelRef = useRef(null);
  const closeRef = useRef(null);

  // ESC, FOCUS TRAP AND SCROLL LOCK

  useEffect(() => {
    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const elements = Array.from(
        panelRef.current.querySelectorAll(
          'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );

      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;

      // Do not steal focus from navigation.
      if (!window.location.hash) {
        triggerRef.current?.focus({
          preventScroll: true,
        });
      }
    };
  }, [onClose, triggerRef]);

  return createPortal(
    <div className="tt-cart">
      <div
        className="tt-cart__overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        ref={panelRef}
        className="tt-cart__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tt-cart-title"
      >
        {/* HEADER */}

        <div className="tt-cart__header">
          <div>
            <span className="tt-cart__eyebrow">
              YOUR TTATTATAO ORDER
            </span>

            <h2 id="tt-cart-title">
              <Icon name="bag" size={25} />
              Your Cart
            </h2>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "delicious item"
                : "delicious items"}
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            className="tt-cart__close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* ITEMS */}

        <div className="tt-cart__body">
          {cartItems.length > 0 ? (
            <div className="tt-cart__list">
              {cartItems.map((item) => (
                <article
                  className="tt-cart__item"
                  key={item.id}
                >
                  <FoodThumbnail dish={item} />

                  <div className="tt-cart__item-content">
                    <div className="tt-cart__item-heading">
                      <div>
                        <strong>{item.name}</strong>

                        <span>
                          {formatPrice(item.price)}
                          {" / item"}
                        </span>
                      </div>

                      <button
                        type="button"
                        className="tt-cart__remove"
                        onClick={() =>
                          removeDish(item.id)
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="trash" size={16} />
                      </button>
                    </div>

                    <div className="tt-cart__item-bottom">
                      {/* QUANTITY CONTROLS */}

                      <div
                        className="tt-cart__quantity"
                        role="group"
                        aria-label={`${item.name} quantity`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, -1)
                          }
                          aria-label={`Decrease ${item.name}`}
                        >
                          <Icon name="minus" size={16} />
                        </button>

                        <span
                          key={`${item.id}-${item.quantity}`}
                          className="tt-cart__quantity-number"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            changeQuantity(item.id, 1)
                          }
                          disabled={item.quantity >= 99}
                          aria-label={`Increase ${item.name}`}
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>

                      <strong className="tt-cart__item-price">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="tt-cart__empty">
              <div className="tt-cart__empty-icon">
                <Icon name="bag" size={38} />
              </div>

              <h3>Your Cart is Empty</h3>

              <p>
                A little craving deserves
                something delicious.
              </p>

              <a
                href="#menu"
                data-order-loader="true"
                onClick={onClose}
                className="tt-cart__explore"
              >
                Explore Menu
                <Icon name="arrow" size={17} />
              </a>
            </div>
          )}
        </div>

        {/* FOOTER */}

        {cartItems.length > 0 && (
          <div className="tt-cart__footer">
            <div className="tt-cart__total">
              <div>
                <span>Menu Subtotal</span>
                <small>
                  Taxes & delivery charges extra
                </small>
              </div>

              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <a
              href="#contact"
              data-order-loader="true"
              className="tt-cart__checkout"
              onClick={onClose}
            >
              <span>
                Proceed to Order
              </span>

              <Icon name="arrow" size={19} />
            </a>

            <p className="tt-cart__note">
              Complete your delivery details to
              send an order request on WhatsApp.
            </p>
          </div>
        )}
      </section>
    </div>,
    document.body
  );
}

// ======================================
// ANIMATED BOTTOM CART BAR
// ======================================

export default function OrderBar() {
  const { totalItems, subtotal } = useCart();

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  const [animation, setAnimation] = useState({
    id: 0,
    difference: 0,
  });

  const previousItems = useRef(totalItems);
  const animationTimer = useRef(null);
  const triggerRef = useRef(null);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const hasItems = totalItems > 0;

  // ======================================
  // ANIMATION ON EVERY CART COUNT CHANGE
  // ======================================

  useEffect(() => {
    const previous = previousItems.current;

    if (previous !== totalItems) {
      const difference = totalItems - previous;

      setAnimation((current) => ({
        id: current.id + 1,
        difference,
      }));

      window.clearTimeout(animationTimer.current);

      animationTimer.current = window.setTimeout(
        () => {
          setAnimation((current) => ({
            ...current,
            difference: 0,
          }));
        },
        850
      );
    }

    previousItems.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    return () => {
      window.clearTimeout(animationTimer.current);
    };
  }, []);

  return (
    <>
      <aside
        className={`order-bar ${
          hasItems ? "order-bar--cart-active" : ""
        }`}
        aria-label="Quick ordering"
      >
        <div className="order-bar__content">
          {/* CART DETAILS */}

          <div className="order-bar__text">
            {hasItems ? (
              <>
                <strong className="order-bar__cart-title">
                  <span
                    className={`order-bar__bag ${
                      animation.id
                        ? "order-bar__bag--animated"
                        : ""
                    }`}
                    key={`bag-${animation.id}`}
                    aria-hidden="true"
                  >
                    <Icon name="bag" size={18} />

                    <span
                      className="order-bar__badge"
                      key={`badge-${animation.id}`}
                    >
                      {totalItems > 99
                        ? "99+"
                        : totalItems}
                    </span>

                    {animation.difference > 0 && (
                      <span className="order-bar__float">
                        +{animation.difference}
                      </span>
                    )}
                  </span>

                  <span>
                    Your Cart
                  </span>
                </strong>

                <span
                  className="order-bar__cart-subtotal"
                  key={`subtotal-${animation.id}`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {totalItems}{" "}
                  {totalItems === 1
                    ? "item"
                    : "items"}
                  {" · "}
                  {formatPrice(subtotal)}
                </span>
              </>
            ) : (
              <>
                <strong>Craving Something?</strong>
                <span>
                  Discover your next favourite.
                </span>
              </>
            )}
          </div>

          {/* ACTION BUTTON */}

          {hasItems ? (
            <button
              ref={triggerRef}
              type="button"
              className={`order-bar__button ${
                animation.id
                  ? "order-bar__button--pulse"
                  : ""
              }`}
              key={`cart-button-${animation.id}`}
              onClick={() => setIsCartOpen(true)}
            >
              View Cart
              <Icon name="arrow" size={18} />
            </button>
          ) : (
            <a
              href="#menu"
              data-order-loader="true"
              className="order-bar__button"
            >
              View Menu
              <Icon name="arrow" size={18} />
            </a>
          )}
        </div>
      </aside>

      {/* CART DRAWER */}

      {isCartOpen && (
        <CartDrawer
          onClose={closeCart}
          triggerRef={triggerRef}
        />
      )}
    </>
  );
}
