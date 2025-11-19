import React from "react";
import Skeleton from "../skeleton/Skeleton";
import "./productCardSkeleton.css";

const ProductCardSkeleton: React.FC = () => {
	return (
		<div className="productCardSkeletonContainer">
			<Skeleton width={258} height={168} />
			<Skeleton width={40} height={16} borderRadius={4} />
			<Skeleton width={120} height={25} borderRadius={6} />
		</div>
	);
};

export default ProductCardSkeleton;
