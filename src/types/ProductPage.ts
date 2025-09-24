export interface ProductImage {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	url: string;
}

export interface Product {
	createdAt: string;
	description: string;
	documentId: string;
	id: number;
	image: ProductImage[];
	name: string;
	priceUS: number;
	priceEU: number;
	publishedAt: string;
	updatedAt: string;
	article: string;
	categories: string;
	ingredients: string;
	additional: string;
}
