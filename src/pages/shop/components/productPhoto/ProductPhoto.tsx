import React, { useState } from "react";
import Skeleton from "../../../../components/skeleton/Skeleton";
import { ProductImage } from "../../../../types/ProductPage";
import "./productPhoto.css";

interface ProductPhotoProps {
	photo: ProductImage[];
	mainPhoto: number;
	setMainPhoto: React.Dispatch<React.SetStateAction<number>>;
}

const ProductPhoto: React.FC<ProductPhotoProps> = ({
	photo,
	mainPhoto,
	setMainPhoto,
}) => {
	const [isMainPhotoLoaded, setIsMainPhotoLoaded] = useState(false);

	const selectPhotoHandler = (index: number) => {
		if (index === mainPhoto) return;

		setMainPhoto(index);
		setIsMainPhotoLoaded(false);
	};

	const loadingHandler = (index: number) => {
		if (index === mainPhoto) setIsMainPhotoLoaded(true);
	};

	return (
		<div className="productPhotoContainer">
			{!isMainPhotoLoaded && <Skeleton className="productPhotoMain" />}
			<img
				className="productPhotoMain"
				src={photo[mainPhoto].url}
				alt={photo[mainPhoto].name}
				onLoad={() => setIsMainPhotoLoaded(true)}
				style={{ display: isMainPhotoLoaded ? "block" : "none" }}
			/>

			{photo.length > 1 && (
				<div className="productPhotoThumbnailContainer">
					{photo.map((img, index) => (
						<img
							className={`productPhotoThumbnails ${
								index === mainPhoto ? "active" : ""
							}`}
							key={img.id}
							src={img.url}
							alt={img.name}
							onClick={() => selectPhotoHandler(index)}
							onLoad={() => loadingHandler(index)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default ProductPhoto;
