export type categoriesType = "Gothic" | "Rituals" | "Wall Art" | "Vintage";

export interface CategoryStore {
	category: categoriesType | null;
	isSidebarOpen: boolean;
	setCategory: (category: categoriesType | null) => void;
	setSidebarOpen: (open: boolean) => void;
	handleRouteChange: (pathname: string) => void;
}
