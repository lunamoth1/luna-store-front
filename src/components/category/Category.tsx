import React from "react";
import { categories } from "../../constants";
import "./category.css";

type Props = {
	category: string;
	setCategory: (category: string) => void;
};

const Category: React.FC<Props> = ({ category, setCategory }) => {
	const selectCategoryHandler = (category: string) =>
		setCategory(category.toLowerCase());

	return (
		<div className="category-container">
			<ul>
				{categories.map((cat) => (
					<li
						key={cat}
						onClick={() => selectCategoryHandler(cat)}
						className={
							category.toLowerCase() === cat.toLowerCase() ? "active" : ""
						}
					>
						{cat}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Category;
