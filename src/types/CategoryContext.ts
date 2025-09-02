export interface CategoryContextType {
	category: categoriesType | null;
	setCategory: (category: categoriesType | null) => void;
}

export type categoriesType = "Gothic" | "Rituals" | "Wall Art" | "Vintage";
