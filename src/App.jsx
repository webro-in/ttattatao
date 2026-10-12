
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import OrderBar from "./components/OrderBar";
import AppLoader from "./components/AppLoader";

import Hero from "./sections/Hero";
import Menu from "./sections/Menu";
import DeliveryPlatforms from "./sections/DeliveryPlatforms";
import Combos from "./sections/Combos";
import OurKitchen from "./sections/OurKitchen";
import Contact from "./sections/Contact";

import { CartProvider } from "./context/CartContext";

import "./styles/global.scss";

export default function App() {
  return (
    <CartProvider>
      {/* Premium website loader */}
      <AppLoader />

      {/* Navigation */}
      <Navbar />

      <main id="main-content">
        <Hero />

        {/* Food menu with Add to Cart */}
        <Menu />

        {/* Swiggy, Zomato and Toing */}
        <DeliveryPlatforms />

        <Combos />

        <OurKitchen />

        {/* Shared cart and WhatsApp checkout */}
        <Contact />
      </main>

      <Footer />

      {/* Mobile quick order bar */}
      <OrderBar />
    </CartProvider>
  );
}
