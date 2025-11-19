import React, { useState } from "react";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { ProductImage } from "../../../../types/ProductPage";
import "./productPhoto.css";

interface ProductPhotoProps {
	photo: ProductImage[];
}

const ProductPhoto: React.FC<ProductPhotoProps> = ({ photo }) => {
	const [main, setMain] = useState<number>(0);
	const [isMainPhotoLoaded, setIsMainPhotoLoaded] = useState(false);

	return (
		<div className="productPhotoContainer">
			{!isMainPhotoLoaded && <Skeleton className="productPhotoMain" />}
			<img
				className="productPhotoMain"
				src={photo[main].url}
				alt={photo[main].name}
				onLoad={() => setIsMainPhotoLoaded(true)}
				style={{ display: isMainPhotoLoaded ? "block" : "none" }}
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
							onClick={() => {
								setMain(index);
								setIsMainPhotoLoaded(false);
							}}
							onLoad={() => {
								if (index === main) setIsMainPhotoLoaded(true);
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductPhoto;
