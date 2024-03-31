import "./HighlightedText.css";
import Link from "next/link";
import Image from 'next/image'

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
		borderRadius = "0.5rem"
	}
) => {
	const textShadowStyle = textShadowColor ? `1px 1px ${textShadowSize} ${textShadowColor}` : ""
	const styling = { backgroundColor: backgroundColor, color: textColor, padding: padding, margin: margin, borderRadius: borderRadius }

	const imageElement = (
		<div className="highlighted-img">
			<Image src={`${image as string}`} alt="highlighted" draggable={false} width={20} height={20} />
		</div>
	)

	// If theres a link use react router
	if (link) {
		return (
			<Link href={link ? link : ""} className="highlighted-text-container" style={styling}>
				{image ? imageElement : null}
				<div className="highlighted-text" style={{ textShadow: textShadowStyle }}>{text}</div>
			</Link>
		);
	} else {
		return (
			<div className="highlighted-text-container" style={styling}>
				{image ? imageElement : null}
				<div className="highlighted-text" style={{ textShadow: textShadowStyle }}>{text}</div>
			</div>
		);
	}
};

export default HighlightedText;
