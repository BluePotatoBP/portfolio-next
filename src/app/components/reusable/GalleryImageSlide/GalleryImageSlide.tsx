import React from "react";
import Image from 'next/image'

interface SlideProps {
	image: string;
	active: boolean;
}

const GalleryImageSlide: React.FC<SlideProps> = ({ image, active }) => {
	return (
		<div className={`slide${active ? " active" : ""}`}>
			<Image src={image} alt="" width={200} height={200} />
		</div>
	);
};

export default GalleryImageSlide;