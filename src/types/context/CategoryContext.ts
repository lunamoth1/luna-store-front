export interface CategoryContextType {
	category: categoriesType | null;
	setCategory: (category: categoriesType | null) => void;
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
}

export type categoriesType = "Gothic" | "Rituals" | "Wall Art" | "Vintage";
