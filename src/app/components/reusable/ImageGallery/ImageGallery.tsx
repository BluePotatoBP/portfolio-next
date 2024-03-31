'use client';
import { useState, useEffect, useRef, useCallback, FC } from "react";
import "./ImageGallery.css";

import GalleryImageSlide from "@/app/components/reusable/GalleryImageSlide/GalleryImageSlide";
import GalleryPageDots from "@/app/components/reusable/GalleryPageDots/GalleryPageDots";

interface ImageGalleryProps {
	images: string[];
	autoplaySpeed?: number;
	maxPages?: number;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images = [], autoplaySpeed = 4000, maxPages = 5 }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const stopAutoplay = useCallback(() => {
		if (intervalRef.current !== null) clearInterval(intervalRef.current);
	}, []);

	// Previous click detection
	const handlePrevClick = () => {
		const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};

	// Next click detection
	const handleNextClick = () => {
		const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
		stopAutoplay();
	};

	// Per image selection
	const handleDotClick = (index: number) => {
		setCurrentIndex(index);
		stopAutoplay();
	};

	// When the mouse hovers over, the playback should stop
	const handleMouseEnter = useCallback(() => {
		setIsAutoPlaying(false);
		stopAutoplay();
	}, [setIsAutoPlaying, stopAutoplay]);

	// Playback should continue when the mouse is off the bounding box
	const handleMouseLeave = useCallback(() => {
		setIsAutoPlaying(true);
	}, [setIsAutoPlaying]);

	// Display controls dynamically based on the number of images
	const renderDynamicControls = () => {
		if (images.length <= 1) return null;

		if (!isAutoPlaying) {
			return (<div className="pause-icon text-slate-300 text-3xl transition-all" onClick={handleMouseLeave} aria-label="paused">&#10074;&#10074;</div>);
		} else {
			const maxPagesToShow = Math.min(maxPages, images.length);
			let dots = [];

			// Add dots
			for (let i = 0; i < maxPagesToShow; i++) {
				const handleClick = () => handleDotClick(i);
				dots.push(<GalleryPageDots key={i} active={i === currentIndex} onClick={() => handleClick()} />);
			}

			// If theres more images than max allowed dots, add overflow dots
			if (images.length > maxPagesToShow) {
				dots.push(<span key={maxPagesToShow} className={`dot overflow ${currentIndex >= maxPages ? "active" : ""}`}>∙</span>);
				dots.unshift(<span key={maxPagesToShow + 1} className={`dot overflow ${currentIndex >= maxPages ? "active" : ""}`}>∙</span>);
			}

			return <div className="dot-container flex flex-row justify-center items-center gap-3">{dots}</div>;
		}
	};

	// Autoplay for images
	useEffect(() => {
		// Update current index
		const changeImage = () => {
			const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
			setCurrentIndex(newIndex);
		};

		// Switch images
		const startAutoplay = () => {
			if (images.length <= 1 || !isAutoPlaying) {
				return;
			}
			intervalRef.current = setInterval(() => {
				changeImage();
			}, autoplaySpeed);
		};

		startAutoplay();
		return () => stopAutoplay();
	}, [currentIndex, isAutoPlaying, stopAutoplay, autoplaySpeed, images.length]);

	return (
		<div className="image-carousel">
			<div className="inner-card flex flex-col gap-5">
				<div className="slides-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ transform: `translateX(${-currentIndex * 100}%)`, transitionDuration: "0.8s" }}>
					{images.map((image, index) => (<GalleryImageSlide key={index} image={image} active={index === currentIndex} />))}
				</div>
				<div className="controls flex flex-row justify-between items-center text-center rounded-full bg-[var(--primary-color)]">
					<button className="control-btn prev leading-0 border-none text-slate-200 text-base rounded-full transition-all hover:bg-slate-500" onClick={handlePrevClick} aria-label="previous">◀</button>
					{renderDynamicControls()}
					<button className="control-btn next leading-0 border-none text-slate-200 text-base rounded-full transition-all hover:bg-slate-500" onClick={handleNextClick} aria-label="next">▶</button>
				</div>
			</div>
		</div>
	);

};

export default ImageGallery;