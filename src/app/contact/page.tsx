'use client';
import Image from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";

export default function Contact() {
	const CHARACTER_LIMIT: number = 1000;
	const [messageInput, setMessageInput] = useState<string>('');
	const [charCount, setCharCount] = useState<number>(0);

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.length <= CHARACTER_LIMIT) {
			setMessageInput(e.target.value);
			setCharCount(e.target.value.length);
		}
	}, []);

	const countRef = useRef<HTMLDivElement>(null);

	return (
		<main className="flex min-h-screen flex-row items-center lg:justify-between justify-center lg:py-32 lg:px-32 pt-64 bg-[#1b1e28]">
			<div className="left-container">
				<div className="images-container flex flex-row gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
					<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
						<div className="h-[30rem] rounded-2xl bg-contact-dark-blue border-dashed border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
						<div className="h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
					</div>
					<div className="container-divider-bottom flex flex-col gap-8 lg:w-full lg:opacity-100 w-0 opacity-0">
						<div className="h-[13rem] rounded-2xl bg-contact-dark-blue border-dashed border-red-100 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
						<div className="h-[30rem] rounded-2xl bg-contact-dark-blue border-dashed border-slate-400 border-2 lg:w-40 lg:opacity-100 w-0 opacity-0" />
					</div>
				</div>
			</div>
			<div className="right-container flex flex-col lg:min-w-[50vw] lg:max-w-[50vw] max-w-[80vw] gap-8">
				<div className="info flex flex-col gap-4">
					<h2 className="text-4xl font-semibold">Get in touch</h2>
					<p>You can find me on social platforms or send me a message through the form below.</p>
				</div>
				<div className="inputs flex flex-col gap-2">
					<input type="email" placeholder="EMAIL" className="py-4 px-4 rounded-lg text-slate-200 bg-contact-dark-blue" />
					<textarea name="message" id="message" placeholder="MESSAGE" value={messageInput} onChange={handleInputChange} maxLength={2000} className="flex pb-32 pt-4 px-4 rounded-lg text-slate-200 resize-none bg-contact-dark-blue"></textarea>
					<div className={`char-count flex justify-end ${charCount >= 950 ? 'text-red-500 font-bold' : charCount >= 800 ? 'text-lovely-yellow font-medium' : ''}`} ref={countRef} >{charCount}/{CHARACTER_LIMIT}</div>
				</div>
				<button type="submit" className="flex lg:w-48 w-full bg-red-500 justify-center text-center p-4 rounded-full text-slate-100 font-black tracking-widest">SEND MESSAGE</button>
				<div className="socials flex flex-row gap-4 w-full lg:justify-between justify-center">
					<div className="twitter-link flex flex-col">
						<h5 className="text-slate-400">TWITTER</h5>
						<a href="https://twitter.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="twitter" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
					</div>
					<div className="discord-link flex flex-col lg:text-start text-center">
						<h5 className="text-slate-400">DISCORD</h5>
						<a href="https://discord.gg/v8zkSc9" draggable={false} target="_blank" rel='noreferrer' aria-label="discord" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
					</div>
					<div className="github-link flex flex-col lg:text-start text-end">
						<h5 className="text-slate-400">GITHUB</h5>
						<a href="https://github.com/BluePotatoBP" draggable={false} target="_blank" rel='noreferrer' aria-label="github" className="link rounded-full no-underline text-[var(--secondary-color)] transition-[var(--transition)] text-slate-200 hover:text-slate-400">@bluepotatobp</a>
					</div>
				</div>
			</div>
		</main>
	);
}