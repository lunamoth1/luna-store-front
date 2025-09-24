import React, { useState } from "react";
import { ProductImage } from "../../types/ProductPage";
import "./productPhoto.css";

interface ProductPhotoProps {
	photo: ProductImage[];
}

const ProductPhoto: React.FC<ProductPhotoProps> = ({ photo }) => {
	const [main, setMain] = useState<number>(0);

	return (
		<div className="productPhotoContainer">
			<img
				className="productPhotoMain"
				src={photo[main].url}
				alt={photo[main].name}
			/>
			{photo.length > 1 && (
				<div className="productPhotoThumbnailContainer">
					{photo.map((img, index) => (
						<img
							className={`productPhotoThumbnails ${
								index === main ? "active" : ""
							}`}
							key={img.id}
							src={img.url}
							alt={img.name}
							onClick={() => setMain(index)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductPhoto;
