import React from "react";

interface GalleryPageDotsProps {
	active: boolean;
	onClick: () => void;
}

const GalleryPageDots: React.FC<GalleryPageDotsProps> = ({ active, onClick }) => {
	return (
	<span className={`dot ${active ? "text-slate-200" : "text-slate-500"} text-[3rem] leading-none hover:cursor-pointer hover:text-slate-400 transition-all`} onClick={onClick}>•</span>
	);
};

export default GalleryPageDots;
