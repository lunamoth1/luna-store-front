import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useProductStore } from "./store/productStore";
import { OrderProvider } from "./context/OrderContext";
import { BasketProvider } from "./context/BasketContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CategoryProvider } from "./context/CategoryContext";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import EventsPage from "./pages/EventsPage";
import ContactsPage from "./pages/ContactsPage";
import BasketPage from "./pages/BasketPage";
import ShippingPage from "./pages/ShippingPage";
import PartnersPage from "./pages/PartnersPage";
import ProductPage from "./pages/ProductPage";
import ThanksgivingPage from "./pages/ThanksgivingPage";
import AdminPage from "./pages/AdminPage";
import Footer from "./components/footer/Footer";
import HeaderLogo from "./components/headerLogo/HeaderLogo";
import ShopNavigation from "./components/shopNavigation/ShopNavigation";
import "./styles/appPage.css";
import "./assets/fonts/fonts.css";

const AppRoutes: React.FC = () => {
	const location = useLocation();
	const hideHeaderFooter = location.pathname === "/admin";

	return (
		<div className="container">
			{!hideHeaderFooter && <HeaderLogo />}
			<main className="main">
				{!hideHeaderFooter && <ShopNavigation />}
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
					<Route path="/basket" element={<BasketPage />} />
					<Route path="/shipping" element={<ShippingPage />} />
					<Route path="/partners" element={<PartnersPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/thanksgiving" element={<ThanksgivingPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route
						path="*"
						element={<h1 style={{ textAlign: "center" }}>404 Not Found</h1>}
					/>
				</Routes>
			</main>
			{!hideHeaderFooter && <Footer />}
		</div>
	);
};

const App: React.FC = () => {
	const { fetchProducts } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<BasketProvider>
			<CurrencyProvider>
				<OrderProvider>
					<BrowserRouter>
						<CategoryProvider>
							<AppRoutes />
						</CategoryProvider>
					</BrowserRouter>
				</OrderProvider>
			</CurrencyProvider>
		</BasketProvider>
	);
};

export default App;
