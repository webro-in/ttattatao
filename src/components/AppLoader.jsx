
import { useEffect, useRef, useState } from "react";
import "./AppLoader.scss";

const INTRO_DURATION = 1450;
const NAV_DURATION = 850;
const EXIT_DURATION = 430;

const sectionNames = {
  "#home": "Home",
  "#menu": "Menu",
  "#combos": "Combos",
  "#our-kitchen": "Our Kitchen",
  "#contact": "Ordering",
};

export default function AppLoader() {
  const [mode, setMode] = useState("intro");
  const [isLeaving, setIsLeaving] = useState(false);
  const [destination, setDestination] = useState("#home");

  const modeRef = useRef("intro");

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const timers = new Set();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function schedule(callback, delay) {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        callback();
      }, delay);

      timers.add(timer);
    }

    function unlockScroll() {
      document.body.style.overflow = originalOverflow;
    }

    function finishLoader() {
      setIsLeaving(true);

      schedule(
        () => {
          modeRef.current = null;
          setMode(null);
          unlockScroll();
        },
        prefersReducedMotion ? 0 : EXIT_DURATION
      );
    }

    // First page load
    document.body.style.overflow = "hidden";

    schedule(
      finishLoader,
      prefersReducedMotion ? 100 : INTRO_DURATION
    );

    function handleNavigationClick(event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target.closest?.("a[href]");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (!href || !href.startsWith("#") || href === "#") {
        return;
      }

      // All navbar links trigger the loader.
      const isNavbarLink = Boolean(
        anchor.closest(".navbar")
      );

      // Order links elsewhere on the website
      // also trigger the same loader.
      const isOrderLink =
        anchor.dataset.orderLoader === "true";

      if (!isNavbarLink && !isOrderLink) return;

      if (
        anchor.target &&
        anchor.target !== "_self"
      ) {
        return;
      }

      const targetSection = document.getElementById(
        href.slice(1)
      );

      if (!targetSection) return;

      event.preventDefault();

      // Avoid multiple overlapping loaders.
      if (modeRef.current !== null) return;

      const nextMode =
        href === "#contact" ? "order" : "navigate";

      modeRef.current = nextMode;
      setMode(nextMode);
      setDestination(href);
      setIsLeaving(false);

      document.body.style.overflow = "hidden";

      schedule(
        () => {
          // Update URL to selected section.
          if (window.location.hash !== href) {
            window.history.pushState(null, "", href);
          }

          const headerHeight =
            document.querySelector(".navbar")
              ?.getBoundingClientRect().height ?? 0;

          const sectionTop =
            href === "#home"
              ? 0
              : Math.max(
                  0,
                  window.scrollY +
                    targetSection.getBoundingClientRect()
                      .top -
                    headerHeight -
                    12
                );

          // Move behind the loader so the
          // destination appears on fade-out.
          window.scrollTo({
            top: sectionTop,
            behavior: "instant",
          });

          finishLoader();
        },
        prefersReducedMotion ? 100 : NAV_DURATION
      );
    }

    document.addEventListener(
      "click",
      handleNavigationClick
    );

    return () => {
      document.removeEventListener(
        "click",
        handleNavigationClick
      );

      timers.forEach((timer) =>
        window.clearTimeout(timer)
      );

      unlockScroll();
    };
  }, []);

  if (!mode) return null;

  const isIntro = mode === "intro";
  const sectionName = sectionNames[destination] ?? "Section";

  const loadingMessage = isIntro
    ? "Preparing something delicious..."
    : destination === "#contact"
      ? "Taking you to your next craving..."
      : `Opening ${sectionName}...`;

  return (
    <div
      className={[
        "app-loader",
        `app-loader--${mode}`,
        isLeaving ? "app-loader--leaving" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-live="polite"
      aria-label={loadingMessage}
    >
      <div
        className="app-loader__texture"
        aria-hidden="true"
      />

      <div
        className="app-loader__glow app-loader__glow--one"
        aria-hidden="true"
      />

      <div
        className="app-loader__glow app-loader__glow--two"
        aria-hidden="true"
      />

      <div className="app-loader__content">
        <div className="app-loader__art" aria-hidden="true">
          <div className="app-loader__orbit app-loader__orbit--outer" />
          <div className="app-loader__orbit app-loader__orbit--inner" />

          <span className="app-loader__orbit-dot app-loader__orbit-dot--one" />
          <span className="app-loader__orbit-dot app-loader__orbit-dot--two" />

          <div className="app-loader__steam">
            <span />
            <span />
            <span />
          </div>

          <div className="app-loader__chopsticks">
            <span />
            <span />
          </div>

          <div className="app-loader__bowl">
            <div className="app-loader__bowl-rim" />

            <div className="app-loader__bowl-body">
              <span className="app-loader__bowl-mark">
                味
              </span>
            </div>

            <div className="app-loader__bowl-base" />
          </div>

          <span className="app-loader__spark app-loader__spark--one">
            ✦
          </span>

          <span className="app-loader__spark app-loader__spark--two">
            ✦
          </span>
        </div>

        <div className="app-loader__branding">
          <span className="app-loader__eyebrow">
            GOOD FOOD. GOOD MOOD.
          </span>

          <strong className="app-loader__logo">
            Ttatta<span>tao</span>
            <em>.</em>
          </strong>

          <span className="app-loader__caption">
            CHINESE CLOUD KITCHEN
          </span>
        </div>

        <div className="app-loader__progress">
          <span className="app-loader__progress-fill" />
        </div>

        <p className="app-loader__message">
          {loadingMessage}
        </p>

        <span className="app-loader__location">
          ✦ MADE FOR JAIPUR ✦
        </span>
      </div>

      <span className="app-loader__corner app-loader__corner--tl" />
      <span className="app-loader__corner app-loader__corner--tr" />
      <span className="app-loader__corner app-loader__corner--bl" />
      <span className="app-loader__corner app-loader__corner--br" />
    </div>
  );
}
