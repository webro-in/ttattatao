
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { menuItems } from "../data/menu";

// ============================================
// TTATTATAO - SHARED SHOPPING CART
// ============================================

const CartContext = createContext(null);

const STORAGE_KEY = "ttattatao_cart_v1";

const MAX_QUANTITY = 99;

// ============================================
// AVAILABLE MENU DISHES
// ============================================

const availableDishes = menuItems.filter(
  (dish) =>
    dish.id !== "maple-thyme-ramen" &&
    dish.name.toLowerCase() !== "maple & thyme ramen"
);

const dishesById = new Map(
  availableDishes.map((dish) => [dish.id, dish])
);

// ============================================
// LOAD CART FROM LOCAL STORAGE
// ============================================

function loadSavedCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const seen = new Set();

    return parsed.flatMap((item) => {
      if (
        !item ||
        !dishesById.has(item.id) ||
        seen.has(item.id)
      ) {
        return [];
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        return [];
      }

      seen.add(item.id);

      return [
        {
          id: item.id,
          quantity: Math.min(
            MAX_QUANTITY,
            Math.floor(quantity)
          ),
        },
      ];
    });
  } catch (error) {
    console.error(
      "Unable to load saved cart:",
      error
    );

    return [];
  }
}

// ============================================
// CART PROVIDER
// ============================================

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadSavedCart);

  const [cartPulse, setCartPulse] = useState(0);

  // ==========================================
  // SAVE CART AUTOMATICALLY
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [cart]);

  // ==========================================
  // ADD DISH TO CART
  // ==========================================

  function addDish(id) {
    if (!dishesById.has(id)) {
      return;
    }

    setCart((current) => {
      const existing = current.find(
        (item) => item.id === id
      );

      if (existing) {
        if (existing.quantity >= MAX_QUANTITY) {
          return current;
        }

        return current.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          id,
          quantity: 1,
        },
      ];
    });

    setCartPulse((previous) => previous + 1);
  }

  // ==========================================
  // CHANGE DISH QUANTITY
  // ==========================================

  function changeQuantity(id, amount) {
    if (
      !dishesById.has(id) ||
      !Number.isInteger(amount) ||
      amount === 0
    ) {
      return;
    }

    setCart((current) =>
      current
        .map((item) => {
          if (item.id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: Math.max(
              0,
              Math.min(
                MAX_QUANTITY,
                item.quantity + amount
              )
            ),
          };
        })
        .filter((item) => item.quantity > 0)
    );

    if (amount > 0) {
      setCartPulse((previous) => previous + 1);
    }
  }

  // ==========================================
  // REMOVE SINGLE DISH
  // ==========================================

  function removeDish(id) {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  // ==========================================
  // CLEAR ENTIRE CART
  // ==========================================

  function clearCart() {
    setCart([]);
  }

  // ==========================================
  // GET QUANTITY OF A PARTICULAR DISH
  // ==========================================

  function getDishQuantity(id) {
    return (
      cart.find((item) => item.id === id)
        ?.quantity || 0
    );
  }

  // ==========================================
  // CART ITEMS WITH FULL DISH INFORMATION
  // ==========================================

  const cartItems = useMemo(() => {
    return cart.flatMap(({ id, quantity }) => {
      const dish = dishesById.get(id);

      if (!dish) {
        return [];
      }

      return [
        {
          ...dish,
          quantity,
        },
      ];
    });
  }, [cart]);

  // ==========================================
  // TOTAL ITEM QUANTITY
  // ==========================================

  const totalItems = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  // ==========================================
  // TOTAL MENU PRICE
  // ==========================================

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0
    );
  }, [cartItems]);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    cart,
    cartItems,
    totalItems,
    subtotal,
    cartPulse,

    addDish,
    changeQuantity,
    removeDish,
    clearCart,
    getDishQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// ============================================
// CUSTOM CART HOOK
// ============================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}
