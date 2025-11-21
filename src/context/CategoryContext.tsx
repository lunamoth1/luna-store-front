import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useLocation } from "react-router-dom";
import { categories } from "../constants";
import { categoriesType, CategoryContextType } from "../types/CategoryContext";

const CategoryContext = createContext<CategoryContextType | undefined>(
	undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
	const [category, setCategory] = useState<categoriesType | null>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (!location.pathname.startsWith("/shop")) {
			setCategory(null);
		} else if (!category) {
			setCategory(categories[0]);
		}
	}, [location.pathname]);

	return (
		<CategoryContext.Provider
			value={{ category, setCategory, isSidebarOpen, setIsSidebarOpen }}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategory = () => {
	const context = useContext(CategoryContext);
	if (!context) {
		throw new Error("useCategory must be used within a CategoryProvider");
	}
	return context;
};
