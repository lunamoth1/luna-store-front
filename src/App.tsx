import React, { useEffect } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	Navigate,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { useProductStore } from "./store/useProductStore";
import { useCurrencyStore } from "./store/useCurrencyStore";
import { useSettingsStore } from "./store/useSettingsStore";
import { BasketProvider } from "./context/BasketContext";
import { CategoryProvider } from "./context/CategoryContext";

import HomePage from "./pages/home/HomePage";
import ShopPage from "./pages/shop/ShopPage";
import EventsPage from "./pages/events/EventsPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import BasketPage from "./pages/basket/BasketPage";
import ShippingPage from "./pages/shipping/ShippingPage";
import PartnersPage from "./pages/partners/PartnersPage";
import ProductPage from "./pages/product/ProductPage";
import ThanksgivingPage from "./pages/thanksgiving/ThanksgivingPage";
import Error404 from "./pages/error/Error404";

import ProtectedAdminRoute from "./pages/admin/components/ProtectedAdminRoute";
import AdminPinPage from "./pages/admin/admin-pin/AdminPinPage";
import AdminHomePage from "./pages/admin/admin-home/AdminHomePage";
import AdminActualOrder from "./pages/admin/admin-actual-order/AdminActualOrder";
import AdminArchivedOrder from "./pages/admin/admin-archived-order/AdminArchivedOrder";
import AdminOrderPage from "./pages/admin/admin-order/AdminOrderPage";
import AdminDeliverySettings from "./pages/admin/admin-delivery-settings/AdminDeliverySettings";

import Footer from "./components/footer/Footer";
import HeaderLogo from "./components/headerLogo/HeaderLogo";
import ShopNavigation from "./components/shopNavigation/ShopNavigation";

import "./styles/appPage.css";
import "./assets/fonts/fonts.css";

const AppRoutes: React.FC = () => {
	const location = useLocation();
	const hideHeaderFooter =
		location.pathname === "/404" || location.pathname.startsWith("/admin");

	return (
		<div className="container">
			{!hideHeaderFooter && <HeaderLogo />}
			<main className="main">
				{!hideHeaderFooter && <ShopNavigation />}
				<Routes>
					<Route path="/admin-pin" element={<AdminPinPage />} />
					<Route path="/admin/actual-order" element={<AdminActualOrder />} />
					<Route
						path="/admin/archived-order"
						element={<AdminArchivedOrder />}
					/>
					<Route
						path="/admin/actual-order/:orderId"
						element={<AdminOrderPage />}
					/>
					<Route
						path="/admin/delivery-settings"
						element={<AdminDeliverySettings />}
					/>

					<Route
						path="/admin/*"
						element={
							<ProtectedAdminRoute>
								<AdminHomePage />
							</ProtectedAdminRoute>
						}
					/>

					<Route path="/" element={<Navigate to="/shop" replace />} />
					<Route path="/shop" element={<ShopPage />} />
					<Route path="/main" element={<HomePage />} />
					<Route path="/events" element={<EventsPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
					<Route path="/basket" element={<BasketPage />} />
					<Route path="/shipping" element={<ShippingPage />} />
					<Route path="/partners" element={<PartnersPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/thanksgiving" element={<ThanksgivingPage />} />
					<Route path="*" element={<Navigate to="/404" replace />} />
					<Route path="/404" element={<Error404 />} />
				</Routes>
			</main>
			{!hideHeaderFooter && <Footer />}
		</div>
	);
};

const App: React.FC = () => {
	const { fetchProducts, checkProductUpdates } = useProductStore();
	const { fetchSettings } = useSettingsStore();
	const { initCurrency } = useCurrencyStore();

	useEffect(() => {
		fetchProducts();
		initCurrency();
		checkProductUpdates();
		fetchSettings();
	}, []);

	return (
		<BasketProvider>
			<BrowserRouter>
				<CategoryProvider>
					<Analytics />
					<AppRoutes />
				</CategoryProvider>
			</BrowserRouter>
		</BasketProvider>
	);
};

export default App;
