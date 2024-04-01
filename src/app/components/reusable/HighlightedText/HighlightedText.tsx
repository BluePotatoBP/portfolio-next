import Link from "next/link";
import Image from 'next/image';

interface HighlightedTextProps {
	text: string;
	image?: string;
	link?: string;
	backgroundColor?: string;
	textColor?: string;
	textShadowColor?: string;
	textShadowSize?: string;
	padding?: string;
	margin?: string;
	borderRadius?: string;
	underline?: boolean;
}

const HighlightedText: React.FC<HighlightedTextProps> = (
	{
		text,
		image,
		link,
		backgroundColor = "#3e455b",
		textColor = "#fff",
		textShadowColor = null,
		textShadowSize = "10px",
		padding = "0 0.5rem 0 0.5rem",
		margin = "0 0.2rem 0 0.2rem",
		borderRadius = "0.5rem",
		underline = false
	}
) => {

	const textShadowStyle = textShadowColor ? `1px 1px ${textShadowSize} ${textShadowColor}` : "";
	const styling = { backgroundColor: backgroundColor, color: textColor, padding: padding, margin: margin, borderRadius: borderRadius, underline: underline };
	const tailwindStyling = `highlighted-text-container inline-flex justify-between items-center gap-2 rounded-md font-medium overflow-hidden`;
	const imageElement = (
		<div className="highlighted-img">
			{image && <Image className="block h-[0.8rem] w-auto rounded-full object-cover select-none" src={image} alt="highlighted" draggable={false} width={10} height={10} />}
		</div>
	);

	if (link) return (
		<Link href={link ? link : ""} className={tailwindStyling} style={styling}>
			{image ? imageElement : null}
			<div className="highlighted-text text-xl" style={{ textShadow: textShadowStyle }}>{text}</div>
		</Link>
	);

	return (
		<div className={tailwindStyling} style={styling}>
			{image ? imageElement : null}
			<div className="highlighted-text text-xl" style={{ textShadow: textShadowStyle }}>{text}</div>
		</div>
	);

};

export default HighlightedText;
