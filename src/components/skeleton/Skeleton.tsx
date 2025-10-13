import React from "react";
import "./skeleton.css";

type SkeletonProps = {
	width?: string | number;
	height?: string | number;
	borderRadius?: string | number;
	style?: React.CSSProperties;
	className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
	width,
	height,
	borderRadius,
	style,
	className,
}) => {
	return (
		<div
			className={`skeleton ${className}`}
			style={{ width, height, borderRadius, ...style }}
		/>
	);
};

export default Skeleton;
