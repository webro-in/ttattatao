
import "./OrderBar.scss";

export default function OrderBar() {
  return (
    <aside
      className="order-bar"
      aria-label="Quick menu access"
    >
      <div className="order-bar__content">
        <div className="order-bar__text">
          <strong>Craving Something?</strong>
          <span>Discover your next favourite.</span>
        </div>

        <a
          href="#menu"
          className="order-bar__button"
        >
          View Menu
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 12H19M13 6L19 12L13 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </aside>
  );
}
